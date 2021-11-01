import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { withRouter } from 'react-router-dom'
import { Button, CardDeck, Row } from 'reactstrap'
import ActionModal from '../../components/ActionModal'
import { Colxx } from '../../components/CustomBootstrap'
import GoBackButton from '../../components/GoBackButton'
import Message from '../../components/Message'
import Spinner from '../../components/Spinner'
import TableCard from '../../components/TableCard'
import TableCreateModal from '../../components/TableCreateModal'
import { deleteTable, getTables } from '../../util/fetch/table'
import IntlMessages from '../../util/IntlMessages'


const TableContainer = ({ match, user, token, history }) => {
  const [tables, setTables] = useState(null)
  const [createModal, setCreateModal] = useState(false)
  const [actionModal, setActionModal] = useState(false)
  const [currentTable, setCurrentTable] = useState(null)
  const clientId = parseInt(match.params.id, 10)
  const types = {
    bar: 'bar',
    table: 'mesa'
  }
  const alert = useAlert()

  const loadTables = () => {
    getTables(clientId, token)
      .then(res => {
        setTables(res.data)
      })
      .catch(() => alert.error('It was not possible to load the tables.'));
  }
  useEffect(() => {
    loadTables()
  }, [])

  const deleteTableById = id => {
    deleteTable(id, token).then(() => {
      getTables(clientId, token).then(res => setTables(res.data))
      setActionModal(false)
    }).catch(err => alert.error('It was not possible to delete the table.'));
  }

  return (
    <Fragment>
      <Row>
        <Colxx>
          <h1><IntlMessages id='menu.tables' /></h1>
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
        {tables ?
          <Row style={{ width: '100%' }}>
            {tables.length > 0 ? tables.map(table => (
              <Colxx className='mb-5' xs='12' md='6' lg='4' xl='3' key={table.id}>
                <TableCard
                  token={token}
                  setCurrentTable={() => setCurrentTable(table)}
                  setActionModal={setActionModal}
                  updateTables={loadTables}
                  deleteTable={() => deleteTable(table.id)}
                  num={table.number}
                  available={table.available}
                  id={table.id}
                  type={types[table.type]}
                />
              </Colxx>)) : <Message><IntlMessages id='forms.not-have-tables' /></Message>}
          </Row>
          : <Spinner />}
      </CardDeck>
      <TableCreateModal
        token={token}
        open={createModal}
        close={() => setCreateModal(false)}
        updateTables={tables => setTables(tables)}
        clientId={clientId}
        userId={user.id}
      />
      {currentTable && <ActionModal
        action={() => deleteTableById(currentTable.id)}
        close={() => setActionModal(false)}
        open={actionModal}
      >
        <IntlMessages id='forms.want-delete-table' /> {' '} {currentTable.number}?
       </ActionModal>
      }
    </Fragment>
  )
}

export default withRouter(TableContainer)
