import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { withRouter } from 'react-router-dom'
import { Button, CardDeck, Row } from 'reactstrap'
import ActionModal from '../../components/ActionModal'
import { Colxx } from '../../components/CustomBootstrap'
import GoBackButton from '../../components/GoBackButton'
import Message from '../../components/Message'
import Spinner from '../../components/Spinner'
import WaiterCreateModal from '../../components/WaiterCreateModal'
import WaiterEditModal from '../../components/WaiterEditModal'
import { deleteWaiter, getWaiters } from '../../util/fetch/waiter'
import IntlMessages from '../../util/IntlMessages'


const OrdersContainer = ({ match, token, history }) => {
    const [waiters, setWaiters] = useState(null)
    const [updateModal, setUpdateModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [actionModal, setActionModal] = useState(false)
    const [currentWaiter, setCurrentWaiter] = useState(null)
    const clientId = parseInt(match.params.id, 10)
    const alert = useAlert()

    const loadWaiters = () => {
        getWaiters(clientId, token)
            .then(res => {
                setWaiters(res.data)
            })
            .catch(err => alert.error('Error'))
    }

    useEffect(() => {
        loadWaiters()
    }, [])

    const deleteWaiterById = id => {
        deleteWaiter(id, token).then(() => {
            getWaiters(clientId, token).then(res => setWaiters(res.data))
            setActionModal(false)
        }).catch(err => alert.error('Error'))
    }

    return (
        <Fragment>
            <Row>
                <Colxx>
                    <h1><IntlMessages id='menu.orders' /></h1>
                </Colxx>
            </Row>
            <Row>
                <Colxx xs='2' className='ml-auto mr-1' >
                    <GoBackButton history={history} />
                </Colxx>
                <Colxx xs='4'>
                    <Button style={{ height: '2.5rem' }} onClick={() => setCreateModal(true)} className='mr-1' color='primary'>
                        <IntlMessages id='button.add' />
                    </Button>
                </Colxx>
            </Row>
            <CardDeck>
                {waiters ?
                    <Row style={{ width: '100%' }}>
                        {waiters.length > 0 ? waiters.map((waiter, i) => (
                            <Colxx className='mb-5' xs='12' md='6' lg='4' xl='3' key={waiter.id}>
                                <h1>{`Order ${i}`}</h1>
                            </Colxx>)) : <Message><IntlMessages id='forms.not-have-waiters' /></Message>}
                    </Row>
                    : <Spinner />}
            </CardDeck>
            {currentWaiter && <WaiterEditModal
                token={token}
                updateWaiters={loadWaiters}
                open={updateModal}
                currentName={currentWaiter.name}
                currentPin={currentWaiter.pin}
                id={currentWaiter.id}
                set={setCurrentWaiter}
                close={() => setUpdateModal(false)}
            />
            }

            <WaiterCreateModal
                token={token}
                open={createModal}
                close={() => setCreateModal(false)}
                updateWaiters={loadWaiters}
                clientId={clientId}
            />

            {currentWaiter && <ActionModal
                action={() => deleteWaiterById(currentWaiter.id)}
                close={() => setActionModal(false)}
                open={actionModal}
            >
                <IntlMessages id='forms.want-delete-waiter' /> {' '} {currentWaiter.name}?
       </ActionModal>
            }
        </Fragment>
    )
}

export default withRouter(OrdersContainer)
