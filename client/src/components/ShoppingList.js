import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';

const ShoppingList = (props) => {

  const dispatch = useDispatch();
  const items = useSelector(state => state.item.items);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <Container>
      
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({_id, name}) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => {
                    dispatch(deleteItem(_id))
                  }}
                >&times;</Button>
                {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
    </Container>
  )
}

export default ShoppingList;