import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Badge, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import { editItem } from '../../util/fetch/order';
import IntlMessages from '../../util/IntlMessages';

const types = {
  "table": "Mesa",
  "bar": "Bar"
};

const OrderKitchenCard = ({ orders, token, loadOrders, counter }) => {
  const changeReady = async ({ id, ready }) => {
    try {
      await editItem(id, { ready: !ready }, token)
      loadOrders();
    } catch (error) {
      alert.error('Error');
    }
  };

  const items = orders.reduce((a, o) => {
    return [...a, ...o.items];
  }, []);

  const table = orders[0].table;

  return (
    <Card body outline>
      <CardTitle className='text-center d-flex align-items-center align-content-center justify-content-center'><h2>{types[table.type]} {table.number}</h2></CardTitle>
      <CardBody style={{ fontSize: '1.2rem' }}>
        {items.length ?
          (<ListGroup>
            {
              items.map((i) => <ListGroupItem key={i.id} style={{ cursor: 'pointer', textDecoration: !i.ready ? 'line-through' : 'none', borderLeft: i.ready && i.dish.category && i.dish.category.priority && "5px solid #FF006A" }} onClick={e => changeReady(i)} color={!i.ready ? 'secondary' : i.takeaway ? 'warning' : 'success'} className="justify-content-between">
                {i.dish.name} x 
                {i.mount} {!!i.selected_ingredients.length && 'con:'} 
                {i.selected_ingredients.length ? i.selected_ingredients.map((ing) => 
                {
                  if(ing.active){

                  return <Badge style={{ margin: '0 .2rem' }} key={ing.id}>{ing.ingredient.name}</Badge>
                  }
                }
                ) : ''}
              </ListGroupItem>)
            }
          </ListGroup>
          ) :
          <Fragment>
            <IntlMessages id='forms.no-orders-yet' />{' '}<i className='iconsmind-Sand-watch' />
          </Fragment>
        }
      </CardBody>
    </Card>
  );
}

OrderKitchenCard.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object.isRequired),
  counter: PropTypes.number.isRequired,
  loadOrders: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default OrderKitchenCard;
