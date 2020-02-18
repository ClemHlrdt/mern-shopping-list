import React, {useState, useEffect} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const RegisterModal = (props) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);
  
  const [modal, setModal] = useState({
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  });

  useEffect(() => {
      // check for register error
      if(error.id === 'REGISTER_FAIL'){
        setModal({
          ...modal,
          msg: error.msg.msg
        })
      } else {
        setModal({
          ...modal,
          msg: null
        })
      }
      if(modal.modal){
        if(isAuthenticated) toggle();
      }
  }, [error, isAuthenticated])

  const toggle = () => {
    // Clear errors
    dispatch(clearErrors());
    setModal({
      ...modal,
      modal: !modal.modal
    });
  }

  const onChange = (e) => {
    setModal({ 
      ...modal,
      [e.target.name]: e.target.value 
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = modal;

    // Create a user object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    dispatch(register(newUser));

    // Close the modal
    // toggle();
  }


  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal
        isOpen={modal.modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          { modal.msg ? <Alert color="danger">{ modal.msg }</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Name"
                className="mb-3"
                onChange={onChange}
              />
              <Label for="email">Email</Label>
              <Input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
              />
              <Label for="password">Password</Label>
              <Input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Password"
                className="mb-3"
                onChange={onChange}
              />
              
              <Button
                color="dark"
                style={{marginTop: '2rem'}}
                block
              >Register</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default RegisterModal