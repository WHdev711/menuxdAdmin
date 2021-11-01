import PropTypes from 'prop-types';
import React from 'react';
import { Button, ButtonGroup, Col, ListGroupItem, Row } from 'reactstrap';

const ListItem = ({ title, onEdit, onDelete }) => (
  <ListGroupItem>
    <Row>
      <Col lg='10' md='8' sm='9' xs='5'>
        <h2>{title}</h2>
      </Col>
      <Col lg='2' md='4' sm='3' xs='7'>
        <ButtonGroup className='text-center'>
          <Button onClick={onEdit} color='primary' >
            <i className='iconsmind-Pencil' />
          </Button>
          <Button onClick={onDelete} color='secondary' >
            <i className='iconsmind-Recycling' />
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  </ListGroupItem>
);

ListItem.prototype = {
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ListItem;
