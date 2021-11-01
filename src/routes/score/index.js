import { connect } from 'react-redux';
import Score from '../../containers/ScoreContainer';


const mapStateToProps = ({ authUser: { user, token } }) => ({ user, token });

export default connect(mapStateToProps, null)(Score);
