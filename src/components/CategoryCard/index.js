import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Badge, Button, ButtonGroup, Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'reactstrap';
import ActionModal from '../../components/ActionModal';
import CategoryEditModal from '../../components/CategoryEditModal';
import { deleteCategory, patchCategory } from '../../util/fetch/category';
import IntlMessages from '../../util/IntlMessages';


const CategoryCard = ({ id, title, active, picture, suggested1, suggested2, suggested3, clientId, priority, token, loadCategory }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const currentCategory = {
    id, title, active, picture, clientId, suggested1, suggested2, suggested3, priority
  };

  const updateActive = () => {
    patchCategory(id, { active: !active }, token).then(res => {
      loadCategory()
    }).catch(err => console.log(err))
  };

  const deleteCategoryById = id => {
    deleteCategory(id, token)
      .then(() => {
        setActionModal(false);
        loadCategory();
      }).catch(() => {
        alert.error('Error');
        setActionModal(false);
      });
  };

  return (
    <Fragment>
      <Card>
        <CardImg
          style={{ height: '200px', cursor: 'pointer', transition: 'all .5s', filter: active ? null : 'grayscale(100%)' }}
          src={picture}
          alt='Card image cap'
          onClick={updateActive}
        />
        <CardBody>
          <CardTitle className='text-center d-flex align-items-center align-content-center justify-content-center'>
            <h3>{title}</h3>
          </CardTitle>
          <CardSubtitle className='text-center'>
            <Badge
              color={active ? 'info' : 'success'}
              style={{ cursor: 'pointer' }}
              onClick={updateActive}
            >{active ? 'active' : 'inactive'}</Badge>
          </CardSubtitle>
          <ButtonGroup className='text-center d-flex align-items-center align-content-center justify-content-center'>
            <Button onClick={() => setUpdateModal(true)} color='primary' >
              <IntlMessages id='button.edit' />
            </Button>
            <Button onClick={() => setActionModal(true)} color='secondary' >
              <IntlMessages id='button.delete' />
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
      <CategoryEditModal
        token={token}
        oldCategory={currentCategory}
        updateCategories={loadCategory}
        open={updateModal}
        close={() => setUpdateModal(false)}
      />
      <ActionModal
        action={() => deleteCategoryById(id)}
        close={() => setActionModal(false)}
        open={actionModal}
      >
        <IntlMessages id='forms.want-delete-category' /> {' '} {title}?
       </ActionModal>
    </Fragment>
  )
}


CategoryCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  active: PropTypes.bool,
  openModal: PropTypes.func,
  setCurrentCategory: PropTypes.func,
  setActionModal: PropTypes.func,
  loadCategory: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

export default CategoryCard
