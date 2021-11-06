import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Badge, Button, ButtonGroup, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import ActionModal from '../../components/ActionModal';
import PromotionEditModal from '../../components/PromotionEditModal';
import { deletePromotion } from '../../util/fetch/promotion';
import IntlMessages from '../../util/IntlMessages';
import Price from '../../components/Price';

const PromotionCard = ({ id, title, pictures, start_at: startAt, end_at: endAt, days = [], description, price, ingredients, clientId, token, loadPromotions, locale }) => {
    const [updateModal, setUpdateModal] = useState(false);
    const [actionModal, setActionModal] = useState(false);
    days = days.filter(p => p.trim() !== '');

    const currentPromotion = {
        id,
        title,
        pictures,
        start_at: startAt,
        end_at: endAt,
        days,
        description,
        price,
        ingredients,
        clientId
    };

    // pictures = pictures.filter(p => p.trim() !== '');

    const deletePromotionById = id => {
        deletePromotion(id, token)
            .then(() => {
                loadPromotions()
                setActionModal(false)
            })
            .catch(() => {
                alert.error('Error')
            });
    };

    return (
        <Fragment>
            <Card>
                <CardImg style={{ height: '150px'}} src={pictures[0]} alt='Card image cap'/>
                <CardBody>
                    <CardTitle className='text-center mb-1'>
                        <h1 className='text-center'>{title}</h1>
                    </CardTitle>
                    <CardText className='text-center' style={{ fontSize: '1.5rem' }}>
                        <i className='iconsmind-Plates' />{' '} {description}
                    </CardText>
                    <CardSubtitle className='text-center'>
                        <Badge>{startAt}</Badge> - <Badge>{endAt}</Badge>
                    </CardSubtitle>
                    <CardSubtitle className='text-center'>
                        {
                            ingredients && ingredients.map((ing, i) => (
                                <Badge
                                    key={i}
                                    color={ing.price > 0 ? 'primary' : 'secondary'}
                                    className="mb-1 mr-1 mt-2"
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
            <PromotionEditModal
                token={token}
                oldPromotion={currentPromotion}
                updatePromotions={() => loadPromotions()}
                open={updateModal}
                clientId={clientId}
                locale={locale}
                close={() => setUpdateModal(false)}
            />

            <ActionModal
                action={() => deletePromotionById(id)}
                close={() => setActionModal(false)}
                open={actionModal}
            >
                <IntlMessages id='forms.want-delete-promotions' /> {' '} <strong>{currentPromotion.name}</strong>?
       </ActionModal>
        </Fragment>
    );
};

PromotionCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
    start_at: PropTypes.string.isRequired,
    end_at: PropTypes.string.isRequired,
    days: PropTypes.arrayOf(PropTypes.string).isRequired,
    openModal: PropTypes.func,
    setCurrentPromotion: PropTypes.func,
    setActionModal: PropTypes.func,
};

export default PromotionCard;
