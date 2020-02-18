import React, {useState, useEffect, useCallback} from 'react';
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
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);

  const [modal, setModal] = useState({
    isOpen: false,
    email: '',
    password: '',
    msg: null
  });

  const toggle = useCallback(() => {
    // Clear errors
    dispatch(clearErrors());
    setModal(prevState => {
      return {
      ...prevState,
      isOpen: !modal.isOpen
    }});
  }, [modal.isOpen, dispatch])

  useEffect(() => {
      // check for register error
        if(error.id === 'LOGIN_FAIL'){
        setModal(prevState => {
          return {
            ...prevState,
            msg: error.msg.msg
          }
        })
        } else {
          setModal(prevState => {
          return {
            ...prevState,
            msg: null
          }
        })
        }    
  }, [error])

  useEffect(() => {
    if(modal.isOpen && isAuthenticated){
          toggle();
        }
  }, [modal, isAuthenticated, toggle])

  

  const onChange = (e) => {
    setModal({ 
      ...modal,
      [e.target.name]: e.target.value 
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = modal;

    const user = {
      email,
      password
    }
    // Attempt to login
    dispatch(login(user));

    // Close the modal
    // toggle();
  }


  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal
        isOpen={modal.isOpen}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          { modal.msg ? <Alert color="danger">{ modal.msg }</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
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
              >Login</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default LoginModal