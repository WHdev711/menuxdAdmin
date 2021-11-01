import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';
import { CardDeck, Row } from 'reactstrap';
import { Colxx } from '../../components/CustomBootstrap';
import GoBackButton from '../../components/GoBackButton';
import Message from '../../components/Message';
import OrderKitchenCard from '../../components/OrderKitchenCard';
import Spinner from '../../components/Spinner';
import { getOrdersActive } from '../../util/fetch/order';
import IntlMessages from '../../util/IntlMessages';

class KitchenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
      clientId: parseInt(this.props.match.params.id, 10)
    }
  }

  async loadOrders() {
    try {
      const res = await getOrdersActive(this.state.clientId, this.props.token);
       console.log(res.data)
      this.setState({ orders: res.data });
    } catch (err) {
      this.props.alert.error('Error');
    }
  }

  componentDidMount() {
    this.loadOrders();
  }

  componentDidUpdate(prevProps) {
    if (this.props.counter !== prevProps.counter) {
      this.loadOrders();
      this.forceUpdate();
    }
  }

  render() {
    const { token, history, counter } = this.props;
    const { orders } = this.state;
    return (
      <Fragment>
        <Row>
          <Colxx>
            <h1><IntlMessages id='menu.kitchen' /></h1>
          </Colxx>
        </Row>
        <Row className='mb-4'>
          <Colxx xs='8' className='ml-auto mr-1' >
            <GoBackButton history={history} />
          </Colxx>
        </Row>
        <CardDeck>
          {
            orders ?
              <Row style={{ width: '100%' }}>
                {
                  orders.length > 0 ? orders.sort((a, b) => a[0].id - b[0].id).map(order => (
                    <Colxx className='mb-5' md='12' lg='4' key={order[0].id}>
                      <OrderKitchenCard
                        loadOrders={() => this.loadOrders()}
                        token={token}
                        clientId={this.state.clientId}
                        orders={order}
                        counter={counter}
                      />
                    </Colxx>)) : <Message><IntlMessages id='forms.not-have-orders' /></Message>
                }
              </Row>
              : <Spinner />
          }
        </CardDeck>
      </Fragment>
    );
  }
};

export default withAlert()(withRouter(KitchenContainer));
