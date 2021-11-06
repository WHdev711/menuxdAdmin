import React, { Fragment, useState } from 'react';
import { Badge, Button, Col, FormGroup, Input, Label } from 'reactstrap';
import Price from '../../components/Price';
import IntlMessages from '../../util/IntlMessages';


const IngredientsPromo = ({ ingredients = [], promotionId = 0, updateIngredients }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    const remove = (id) => {
        let newIngredients = ingredients.filter((i, n) => n !== id)
        console.log(newIngredients)
        updateIngredients(newIngredients)
    }

    const promotion_add = () => {
        console.log("In Promotion Ingredients Added!");
        let newIngredients = [...ingredients, { price, name, promotion_id: promotionId, active: price <= 0 }]
        updateIngredients(newIngredients)
        setName('')
        setPrice(0)
    }

    return (
        <Fragment>
            <div className='mt-2 mb-2'>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0" row>
                    <Label sm={2} for="ingredientName" className="mr-sm-2">
                        <IntlMessages id='forms.name' />
                    </Label>
                    <Col sm={10}>
                        <Input id='ingredientName' value={name} type='text' onChange={e => setName(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0" row>
                    <Label sm={2} for="ingredientPrice" className="mr-sm-2">
                        <IntlMessages id='forms.price' />
                    </Label>
                    <Col sm={10}>
                        <Input id='ingredientPrice' value={price} type='number' onChange={e => setPrice(parseInt(e.target.value, 10))} />
                    </Col>
                </FormGroup>
                <Button
                    className='mx-auto mt-3'
                    onClick={() => promotion_add()} color='primary'
                >
                    <IntlMessages id='button.add' />
                </Button>
            </div>
            {
                ingredients && (<div>
                    {
                        ingredients.map((i, n) => (
                            <Badge
                                style={{ cursor: 'pointer' }}
                                onClick={() => remove(n)}
                                key={n}
                                color="secondary"
                                className="mb-1 mr-1"
                            >
                                {i.name} <Price value={i.price} currency='Gs.' />
                            </Badge>
                        ))
                    }
                </div>)
            }
        </Fragment >
    )
}

export default IngredientsPromo