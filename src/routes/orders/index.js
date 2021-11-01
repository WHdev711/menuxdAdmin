import { connect } from 'react-redux';
import Orders from '../../containers/OrdersContainer';


const mapStateToProps = ({ authUser: { user, token }, notification: { orders } }) => ({ user, token, orders });

export default connect(mapStateToProps, null)(Orders);
