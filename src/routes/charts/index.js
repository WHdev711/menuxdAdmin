import { connect } from 'react-redux';
import Charts from '../../containers/ChartsContainer';


const mapStateToProps = ({ authUser: { user, token } }) => ({ user, token });

export default connect(mapStateToProps, null)(Charts);
