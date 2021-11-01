import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginLayout from '../../containers/LoginContainer';
import { loginUser } from '../../redux/actions';


const mapStateToProps = ({ authUser }) => {
  const { user } = authUser
  return { user }
}

const mapStDispatchToProps = dispatch => bindActionCreators({
  loginUser: loginUser
}, dispatch)

export default connect(mapStateToProps, mapStDispatchToProps)(LoginLayout)
