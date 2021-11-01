import { connect } from 'react-redux';
import Kitchen from '../../containers/KitchenContainer';


const mapStateToProps = ({ authUser: { user, token }, notification: { orders } }) => ({ user, token, counter: orders });

export default connect(mapStateToProps, null)(Kitchen);
