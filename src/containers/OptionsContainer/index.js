import React, { Fragment } from 'react';
import { Button, Card, CardDeck, CardTitle, Row } from 'reactstrap';
import { Colxx } from '../../components/CustomBootstrap';
import GoBackButton from '../../components/GoBackButton';
import IntlMessages from '../../util/IntlMessages';



const OptionsContainer = ({ history, client, match }) => {
    if (!client) return history.push('/')

    return (
        <Fragment>
            <Row>
                <Colxx>
                    <h1><IntlMessages id='menu.select' /></h1>
                </Colxx>
            </Row>
            <Row>
                <Colxx xs='2' className='ml-auto mr-1' >
                    <GoBackButton history={history} />
                </Colxx>
            </Row>
            <CardDeck>
                <Row style={{ width: '100%' }}>
                    <Colxx className='mb-5' xs='12' md='6' lg='4' xl='4'>
                        <Card body>
                            <CardTitle
                                className='text-center d-flex align-items-center align-content-center justify-content-center'
                                style={{ textAligne: 'center', fontSize: '5rem' }}
                            >
                                <i className='iconsmind-Business-Man' />
                            </CardTitle>
                            <Button
                                color="primary"
                                onClick={() => history.push(`/client/${match.params.id}/categories`)}
                            >
                                <IntlMessages id='button.administrator' />
                            </Button>
                        </Card>
                    </Colxx>
                    <Colxx className='mb-5' xs='12' md='6' lg='4' xl='4'>
                        <Card body>
                            <CardTitle
                                className='text-center d-flex align-items-center align-content-center justify-content-center'
                                style={{ textAligne: 'center', fontSize: '5rem' }}
                            >
                                <i className='iconsmind-Cash-register2' />
                            </CardTitle>
                            <Button
                                color="primary"
                                onClick={() => history.push(`/client/${match.params.id}/cashier`)}
                            >
                                <IntlMessages id='button.cash-register' />
                            </Button>
                        </Card>
                    </Colxx>
                    <Colxx className='mb-5' xs='12' md='6' lg='4' xl='4'>
                        <Card body>
                            <CardTitle
                                className='text-center d-flex align-items-center align-content-center justify-content-center'
                                style={{ textAligne: 'center', fontSize: '5rem' }}
                            >
                                <i className='iconsmind-Chef-Hat' />
                            </CardTitle>
                            <Button
                                color="primary"
                                onClick={() => history.push(`/client/${match.params.id}/kitchen`)}
                            >
                                <IntlMessages id='button.kitchen' />
                            </Button>
                        </Card>
                    </Colxx>
                </Row>
            </CardDeck>
        </Fragment>
    )
}

export default OptionsContainer
