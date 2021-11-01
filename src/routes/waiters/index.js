import { connect } from 'react-redux'

import Waiters from '../../containers/WaiterContainer'

const mapStateToProps = ({ authUser: { user, token } }) => ({ user, token })

export default connect(mapStateToProps, null)(Waiters)
