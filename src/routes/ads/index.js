import { connect } from 'react-redux';
import Ads from '../../containers/AdsContainer';


const mapStateToProps = ({ authUser: { user, token }, settings }) => ({ user, token, settings });

export default connect(mapStateToProps, null)(Ads);
