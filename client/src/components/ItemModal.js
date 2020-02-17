import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../actions/itemActions';



const ItemModal = (props) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState({
    modal: false,
    name: ''
  });

  const toggle = () => {
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

    const newItem = {
      name: modal.name
    }

    // Add item via addItem action
    dispatch(addItem(newItem))
    toggle();
  }
  return (
    <div>
      <Button
        color="dark"
        style={{marginBottom: '2rem'}}
        onClick={toggle}
      >Add Item</Button>
      <Modal
        isOpen={modal.modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input 
                type="text" 
                name="name" 
                id="item" 
                placeholder="Add shopping item"
                onChange={onChange}
              />
              <Button
                color="dark"
                style={{marginTop: '2rem'}}
                block
              >Add Item</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ItemModal