import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert';
import { Badge, Button, ButtonGroup, Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'reactstrap';
import ActionModal from '../../components/ActionModal';
import DishEditModal from '../../components/DishEditModal';
import ListItem from '../../components/ListItem';
import Price from '../../components/Price';
import { deleteDish, editDish } from '../../util/fetch/dish';
import IntlMessages from '../../util/IntlMessages';

const styles = {
  pill: {
    position: 'absolute',
    fontSize: '1.2rem',
    zIndex: 1
  },
  available: {
    top: '5%',
    right: '.5rem',
    opacity: .9
  },
  price: {
    left: '50%',
    transform: 'translate(-50%)',
    top: '180px'
  },
  star: {
    color: '#000',
    fontSize: '2.2rem',
  },
  circle: {
    transform: 'rotate(-75deg)',
    padding: '.4rem',
    left: '.5rem',
    borderRadius: '50%',
    top: '5%',
    cursor: 'pointer'
  },
  active: 'radial-gradient(circle at center, rgba(255, 255, 0, .8), rgba(0, 0, 0, 0.2))'
};

const DishCard = ({ id, name, description, available, pictures, price, suggested, category, ingredients = [], category_id: categoryId, half_price: halfPrice, is_half: isHalf, updateDishes, clientId, token, isCardView, dishes }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const currentDish = {
    id,
    name,
    description,
    available,
    pictures,
    price,
    category,
    suggested,
    ingredients,
    isHalf,
    halfPrice
  };

  pictures = pictures.filter(p => p.trim() !== '');
  const alert = useAlert();

  const updateSuggested = () => {
    if (!categoryId) {
      alert.error('This dish does not yet belong to a category.');
      return;
    }

    const count = dishes.reduce((count, d) => {
      if (d.category_id === categoryId && d.suggested) {
        return count + 1;
      }
      return count
    }, 0);

    if (count >= 3 && !suggested) {
      alert.error('You can only have 3 suggested dishes for each category.');
      return;
    }
    editDish(id, { suggested: !suggested }, token).then(() => {
      updateDishes()
    }).catch(() => alert.error('It was not possible to mark the plate as suggested.'));
  };

  const updateAvailable = () => {
    editDish(id, { available: !available }, token)
      .then(() => {
        updateDishes()
      }).catch((err) => {
        alert.error('Error');
      });
  };

  const deleteDishById = id => {
    deleteDish(id, token).then(() => {
      updateDishes();
      setActionModal(false);
    }).catch((err) => {
      alert.error('Error');
    });
  };

  return (
    <Fragment>
      {
        isCardView ? (
          <Card style={{ position: 'relative', overflow: 'hidden' }}>
            <div onClick={updateSuggested} style={{ ...styles.pill, ...styles.circle, backgroundImage: suggested ? styles.active : '' }}>
              <i style={styles.star} className='iconsmind-Magic-Wand' />
            </div>
            <Badge style={{ ...styles.pill, ...styles.price }} pill color={available ? 'success' : 'danger'}>
              <Price value={price} currency={'Gs.'} />
            </Badge>
            <CardImg
              style={{ height: '200px', cursor: 'pointer', transition: 'all .5s', filter: available ? null : 'grayscale(100%)' }}
              src={pictures[0]}
              alt='Card image cap'
              onClick={updateAvailable}
            />
            <CardBody>
              <CardTitle className='text-center d-flex align-items-center align-content-center justify-content-center'>
                <h3>{name}</h3>
              </CardTitle>
              <CardSubtitle className='text-center'>
                {description && <h4 className='text-muted'>{description}</h4>}
                {
                  ingredients && ingredients.map((ing, i) => (
                    <Badge
                      key={i}
                      color={ing.price > 0 ? 'primary' : 'secondary'}
                      className="mb-1 mr-1"
                    >
                      {ing.name} {ing.price > 0 && (<Price value={ing.price} currency='Gs.' />)}
                    </Badge>)
                  )
                }
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
          </Card >

        ) : <ListItem
            title={name}
            onEdit={() => setUpdateModal(true)}
            onDelete={() => setActionModal(true)}
          />
      }
      <DishEditModal
        token={token}
        oldDish={currentDish}
        updateDishes={updateDishes}
        clientId={clientId}
        open={updateModal}
        close={() => setUpdateModal(false)}
      />

      <ActionModal
        action={() => deleteDishById(id)}
        close={() => setActionModal(false)}
        open={actionModal}
      >
        <IntlMessages id='forms.want-delete-dish' /> {' '} <strong>{name}</strong>?
       </ActionModal>
    </Fragment>
  );
};

DishCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object),
  price: PropTypes.number,
  category: PropTypes.object,
  available: PropTypes.bool,
  suggested: PropTypes.bool,
  openModal: PropTypes.func,
  setCurrentDish: PropTypes.func,
  setActionModal: PropTypes.func,
  token: PropTypes.string.isRequired,
  isCardView: PropTypes.bool,
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DishCard;
