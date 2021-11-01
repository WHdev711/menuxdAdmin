import React from 'react'
import { Col } from 'reactstrap'

export const Colxx = (props) => <Col {...props} widths={['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']} />

export const Separator = ({className}) => <div className={`separator ${className}`}></div>
