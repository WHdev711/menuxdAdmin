import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Options from '../../containers/OptionsContainer'

const mapStateToProps = ({ authUser: { user, token }, currentClient }) => ({ user, token, client: currentClient })

export default connect(mapStateToProps, null)(withRouter(Options))
