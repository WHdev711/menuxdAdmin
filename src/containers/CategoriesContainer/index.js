import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { withRouter } from 'react-router-dom';
import { Button, CardDeck, Row } from 'reactstrap';
import CategoryBackupModal from '../../components/CategoryBackupModal';
import CategoryCard from '../../components/CategoryCard';
import CategoryCreateModal from '../../components/CategoryCreateModal';
import CategoryOrganizeModal from '../../components/CategoryOrganizeModal';
import { Colxx } from '../../components/CustomBootstrap';
import GoBackButton from '../../components/GoBackButton';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import { getCategories } from '../../util/fetch/category';
import IntlMessages from '../../util/IntlMessages';


const CategoryContainer = ({ match, user, token, history }) => {
  const [categories, setCategories] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [backupModal, setBackupModal] = useState(false);
  const [organizeModal, setOrganizeModal] = useState(false);
  const clientId = parseInt(match.params.id, 10);
  const alert = useAlert();

  const loadCategories = () => {
    getCategories(clientId, token)
      .then(res => {
        setCategories(res.data);
      })
      .catch(() => alert.error('Error'));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Fragment>
      <Row>
        <Colxx>
          <h1><IntlMessages id='menu.categories' /></h1>
        </Colxx>
      </Row>
      <Row className='mb-4'>
        <Colxx xs='8' className='ml-auto mr-1' >
          <GoBackButton history={history} />
        </Colxx>
        <Colxx xs='4'>
          <Button style={{ height: '2.5rem' }} onClick={() => setCreateModal(true)} className='mr-1' color='primary'>
            <IntlMessages id='button.add' />
          </Button>
          <Button style={{ height: '2.5rem' }} onClick={() => setOrganizeModal(true)} className='mr-1' color='primary'>
            <IntlMessages id='button.organize' />
          </Button>
          <Button style={{ height: '2.5rem' }} onClick={() => setBackupModal(true)} color='primary'>
            <IntlMessages id='button.backup' />
          </Button>
        </Colxx>
      </Row>
      <CardDeck>
        {categories ?
          <Row style={{ width: '100%' }}>
            {categories.length > 0 ? categories.map(category => (
              <Colxx className='mb-5' xs='12' md='6' lg='4' xl='3' key={category.id}>
                <CategoryCard
                  clientId={clientId}
                  loadCategory={() => loadCategories()}
                  token={token}
                  {...category}
                />
              </Colxx>)) : <Message><IntlMessages id='forms.not-have-categories' /></Message>}
          </Row>
          : <Spinner />}
      </CardDeck>

      <CategoryCreateModal
        token={token}
        open={createModal}
        close={() => setCreateModal(false)}
        updateCategories={categories => setCategories(categories)}
        clientId={clientId}
        userId={user.id}
      />

      <CategoryBackupModal
        token={token}
        close={() => setBackupModal(false)}
        open={backupModal}
        clientId={clientId}
        updateCategories={() => loadCategories()}
      />
      <DndProvider backend={HTML5Backend}>
        <CategoryOrganizeModal
          token={token}
          close={() => setOrganizeModal(false)}
          categories={categories}
          open={organizeModal}
          clientId={clientId}
          setCategories={setCategories}
          updateCategories={() => loadCategories()}
        />
      </DndProvider>
    </Fragment>
  );
};

export default withRouter(CategoryContainer);
