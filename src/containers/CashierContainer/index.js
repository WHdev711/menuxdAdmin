import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';
import { CardDeck, Row } from 'reactstrap';
import { Colxx } from '../../components/CustomBootstrap';
import GoBackButton from '../../components/GoBackButton';
import Message from '../../components/Message';
import OrderCard from '../../components/OrderCard';
import Spinner from '../../components/Spinner';
import { getOrdersActive } from '../../util/fetch/order';
import IntlMessages from '../../util/IntlMessages';

class CashierContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clientId: parseInt(this.props.match.params.id, 10),
        }

        this.loadOrders = this.loadOrders.bind(this);
    }

    async loadOrders() {
        try {
            const res = await getOrdersActive(this.state.clientId, this.props.token);
            if (Boolean(res.data.length)) {
                this.props.setOrders(res.data);
            } else {
                this.props.setOrders([]);
            }
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
        const { token, history, orders, counter } = this.props;
        const { clientId } = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx>
                        <h1><IntlMessages id='menu.cash-register' /></h1>
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
                                    orders.length > 0 ? orders.sort((a, b) => a[0].id - b[0].id).map(order => {
                                        return (
                                            <Colxx className='mb-5' md='12' lg='4' key={order[0].id}>
                                                <OrderCard
                                                    loadOrders={() => this.loadOrders()}
                                                    token={token}
                                                    clientId={clientId}
                                                    orders={order}
                                                    counter={counter}
                                                />
                                            </Colxx>)
                                    }) : <Message><IntlMessages id='forms.not-have-orders' /></Message>
                                }
                            </Row>
                            : <Spinner />
                    }
                </CardDeck>
            </Fragment>
        );
    }
}

export default withAlert()(withRouter(CashierContainer));
