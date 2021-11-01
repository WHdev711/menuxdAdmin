import { connect } from 'react-redux'

import UserProfile from '../../components/UserProfile'

const mapStateToProps = ({ authUser }) => {
  const { user, token } = authUser;
  return { user, token };
};

export default connect(mapStateToProps, null)(UserProfile)
