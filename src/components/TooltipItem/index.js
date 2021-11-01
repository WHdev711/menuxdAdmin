import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Badge, Tooltip } from 'reactstrap';
import Price from '../../components/Price';

class TooltipItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const { placement, id, tooltip, ingredients, mount, dish, cashier, color, price } = this.props
    const tooltipText = ingredients.filter(i => i.active).join(', ')
    return (
      <Fragment>
        <Badge className='mr-1 mb-1' id={`item-${id}`} color={color} key={id}>
          {dish.name} x {mount} {ingredients.length ? '+ extra' : ''} {cashier ? (<span> = <Price value={price} currency='Gs.' /></span>) : ''
          }
        </Badge>
        {tooltip && (<Tooltip placement={placement} isOpen={this.state.tooltipOpen} target={`item-${id}`} toggle={this.toggle}>
          {tooltipText}
        </Tooltip>)}
      </Fragment>
    );
  }
}

TooltipItem.propTypes = {
  id: PropTypes.number.isRequired,
  tooltip: PropTypes.bool.isRequired,
  mount: PropTypes.number.isRequired,
  dish: PropTypes.object.isRequired,
  price: PropTypes.number,
  kitchen: PropTypes.bool,
  ingredients: PropTypes.arrayOf(PropTypes.object),
  placement: PropTypes.string,
  color: PropTypes.string,
};

TooltipItem.defaultValues = {
  placement: 'top',
  color: 'info',
  cashier: true,
  ingredients: [],
};

export default TooltipItem;
