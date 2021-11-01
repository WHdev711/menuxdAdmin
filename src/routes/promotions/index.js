import { connect } from 'react-redux'

import Promotions from '../../containers/PromotionsContainer'

const mapStateToProps = ({ authUser: { user, token }, settings }) => ({ user, token, settings })

export default connect(mapStateToProps, null)(Promotions)
