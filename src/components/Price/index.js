import React, { Fragment } from 'react';

const Price = ({ value, currency }) => {
    const format = (n = 0) => {
        return n.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.')
            .split('').reverse().join('').replace(/^[.]/, '')
    }

    const getPrice = (price) => {
        return `${currency} ${format(price)}`
    }

    return (
        <Fragment>
            {getPrice(value)}
        </Fragment>
    )
}

export default Price
