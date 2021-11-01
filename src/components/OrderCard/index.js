import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert';
import { Badge, Button, ButtonGroup, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import ActionModal from '../../components/ActionModal';
import Price from '../../components/Price';
import { editItem, editOrder } from '../../util/fetch/order';
import IntlMessages from '../../util/IntlMessages';

const OrderCard = ({ orders, clientId, token, loadOrders }) => {
  const [modal, setModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const types = {
    "table": "Mesa",
    "bar": "Bar"
  };

  const payAll = async () => {
    for (let order of orders) {
      setIsLoading(true);
      try {
        setIsLoading(false);
        await editOrder(order.id, { client_id: clientId, canceled: true }, token);
        loadOrders();
      } catch (error) {
        setIsLoading(false);
        alert.error('Error');
      }
    }
  };

  const changeActive = async ({ id, active }) => {
    try {
      await editItem(id, { active: !active }, token)
      loadOrders();
    } catch (error) {
      alert.error('Error');
    }
  };

  const items = orders.reduce((a, o) => {
    return [...a, ...o.items];
  }, []);

  const getPrice = (item) => {
    let ingredients = items.selected_ingredients || [];
    ingredients = ingredients.filter(i => i.active);

    return item.dish.price * item.mount + ingredients.reduce((p, c) => p + c.price, 0);
  };

  const getTotal = () => items.filter(i => i.active).reduce((p, c) => p + getPrice(c), 0);

  const table = orders[0].table;
  return (
    <Fragment>
      <Card body outline style={{ backgroundColor: table.asks_for_bill ? '#FF854A' : table.calls_waiter ? '#9FE9F4' : '', borderRadius: '2px', transition: 'all .5s' }}>
        <CardTitle className='text-center d-flex align-items-center align-content-center justify-content-center'><h2>{types[table.type]} {table.number}</h2></CardTitle>
        <CardBody style={{ fontSize: '1.2rem' }}>
          {items.length ?
            (<ListGroup>
              {
                items.map((i) => (
                  <ListGroupItem
                    key={i.id}
                    style={{
                      cursor: 'pointer',
                      textDecoration: !i.active ? 'line-through' : 'none', borderLeft: i.active && i.dish.category && i.dish.category.priority && "5px solid #FF006A"
                    }
                    }
                    onClick={e => changeActive(i)}
                    color={!i.active ? 'secondary' : i.takeaway ? 'warning' : 'success'}
                    className="justify-content-between"
                  >
                    {i.dish.name} x {i.mount} {!!i.selected_ingredients.length && 'con:'} {i.selected_ingredients.length ? i.selected_ingredients.map((ing) => 
                    {
                      if(ing.active){
    
                      return <Badge style={{ margin: '0 .2rem' }} key={ing.id}>{ing.ingredient.name}</Badge>
                      }
                    }
                    ) : ''}
                  </ListGroupItem>))
              }
            </ListGroup>
            ) :
            <Fragment>
              <IntlMessages id='forms.no-orders-yet' />{' '}<i className='iconsmind-Sand-watch' />
            </Fragment>
          }
        </CardBody>
        <ButtonGroup className='text-center d-flex align-items-center align-content-center justify-content-center'>
          <Button style={{ cursor: 'auto' }} color='secondary' >
            <Price value={getTotal()} currency='Gs.' />
          </Button>
          <Button disabled={isLoading} onClick={() => setModal(true)} color="primary">
            <IntlMessages id='button.pay' />
          </Button>
        </ButtonGroup>

      </Card>
      <ActionModal
        action={payAll}
        close={() => setModal(false)}
        open={modal}
      >
        <IntlMessages id='forms.want-cancel-order' />
      </ActionModal>
    </Fragment>
  )
}


OrderCard.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  clientId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  loadOrders: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
}

export default OrderCard
