import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cashier from '../../containers/CashierContainer';
import { setOrders } from '../../redux/orders/actions';

const mapStateToProps = ({ authUser: { user, token }, notification: { orders: counter }, orders: { orders } }) => ({ user, token, counter, orders });

const mapDispatchToProps = dispatch => bindActionCreators({
  setOrders,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cashier);
