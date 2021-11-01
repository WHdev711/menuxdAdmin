import { connect } from 'react-redux'

import Tables from '../../containers/TableContainer'

const mapStateToProps = ({ authUser: { user, token } }) => ({ user, token })

export default connect(mapStateToProps, null)(Tables)
