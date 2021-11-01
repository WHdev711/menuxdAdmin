import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { Button, CardDeck, ListGroup, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import { Colxx } from '../../components/CustomBootstrap';
import DishBackupModal from '../../components/DishBackupModal';
import DishCard from '../../components/DishCard';
import DishCreateModal from '../../components/DishCreateModal';
import GoBackButton from '../../components/GoBackButton';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import { getCategories } from '../../util/fetch/category';
import { getDishByCategory, getDishes } from '../../util/fetch/dish';
import IntlMessages from '../../util/IntlMessages';


const DishContainer = ({ match, user, token, history }) => {
  const [dishes, setDishes] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [backupModal, setBackupModal] = useState(false);
  const [isCardView, setIsCardView] = useState(true);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const clientId = parseInt(match.params.id, 10);
  const [currentPage, setCurrenPage] = useState(1);
  const alert = useAlert();
  const [totalDishes, setTotalDishes] = useState(0);

  const getPages = (pages, total) => {
    if (total <= 0) {
      return [];
    }
    let newPages = [...pages];
    const n = Math.ceil(total / 12);
    for (let i = 1; i <= n; i++) {
      newPages.push(i);
    }
    return newPages;
  };

  const loadDishes = (page) => {
    if (category) {
      getDishByCategory(category, token)
        .then(res => {
          setTotalDishes(res.data.length);
          setDishes(res.data);
        })
        .catch(err => {
          alert.error('Error');
        });
    } else {
      getDishes(token, clientId, page)
        .then(res => {
          setTotalDishes(res.data.total);
          setDishes(res.data.dishes);
        })
        .catch(err => {
          alert.error('Error');
        });
    }
  }

  useEffect(() => {
    getCategories(clientId, token)
      .then(res => setCategories(res.data))
      .catch((err) => {
        alert.error('Error');
      });
  }, [clientId]);

  useEffect(() => {
    loadDishes(currentPage);
  }, [currentPage, category]);

  let renderPages = getPages([], totalDishes);

  return (
    <Fragment>
      <Row>
        <Colxx>
          <h1><IntlMessages id='menu.dishes' /></h1>
        </Colxx>
      </Row>
      <Row className='mb-4 z-10'>
        <Colxx className='mb-1 d-ms-hidden' style={{ zIndex: 10 }} ms={3} lg={2}>
          <i
            style={{ fontSize: '1.2rem', cursor: 'pointer' }}
            onClick={() => setIsCardView(true)}
            className={classNames('iconsmind-Stop', 'btn', { 'text-primary': isCardView })}
          />
          <i
            style={{ fontSize: '1.2rem', transform: 'rotateY(-45deg)', cursor: 'pointer' }}
            onClick={() => setIsCardView(false)}
            className={classNames('iconsmind-Pause', 'btn', { 'text-primary': !isCardView })}
          />
        </Colxx>
        <Colxx className='mb-1' style={{ zIndex: 10 }} sm={4} lg={6}>
          <Select
            noOptionsMessage={() => 'Sin opciones'}
            options={categories.map(c => ({ label: c.title, value: c.id }))}
            onChange={e => setCategory(e.value)}
            defaultValue={categories.map(c => ({ label: c.title, value: c.id }))
              .filter(c => c.value === category)}
          />
        </Colxx>
        <Colxx ms='1' xs='2' className='ml-auto mr-1' >
          <GoBackButton history={history} />
        </Colxx>
        <Colxx className='mr-3' ms='2' xs='4'>
          <Button style={{ height: '2.5rem' }} onClick={() => setCreateModal(true)} className='mr-1' color='primary'>
            <IntlMessages id='button.add' />
          </Button>
          <Button style={{ height: '2.5rem' }} onClick={() => setBackupModal(true)} color='primary'>
            <IntlMessages id='button.backup' />
          </Button>
        </Colxx>
      </Row>
      <CardDeck>
        {dishes ?
          <Row style={{ width: '100%' }}>
            {dishes.length > 0 ? dishes.map(dish => {
              const Card = (
                <DishCard
                  dishes={dishes}
                  deleteDish={() => (dish.id)}
                  updateDishes={() => loadDishes(currentPage)}
                  token={token}
                  dish={dish}
                  clientId={clientId}
                  isCardView={isCardView}
                  {...dish}
                />
              );
              return (
                isCardView ? <Colxx className='mb-5' xs='12' md='6' lg='4' xl='3' key={dish.id}>
                  {Card}
                </Colxx> : <Colxx className='mb-1' md='12' key={dish.id}><ListGroup>{Card}</ListGroup></Colxx>
              );
            }) : <Message><IntlMessages id='forms.not-have-dishes' /></Message>}
          </Row>
          : <Spinner />}
      </CardDeck>
      {
        renderPages.length > 1 && (
          <Row>
            <Colxx sm={12} className='d-flex justify-content-center align-items-center text-center'>
              <Pagination>
                {renderPages.map((e, i) => (
                  <PaginationItem active={e === currentPage} key={i}>
                    <PaginationLink onClick={() => setCurrenPage(e)}>
                      {e}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </Pagination>
            </Colxx>
          </Row>
        )
      }

      <DishCreateModal
        token={token}
        open={createModal}
        close={() => setCreateModal(false)}
        updateDishes={() => loadDishes(currentPage)}
        clientId={clientId}
        userId={user.id}
      />

      <DishBackupModal
        token={token}
        close={() => setBackupModal(false)}
        open={backupModal}
        clientId={clientId}
        updateDishes={() => loadDishes(currentPage)}
      />
    </Fragment>
  );
};

export default withRouter(DishContainer);
