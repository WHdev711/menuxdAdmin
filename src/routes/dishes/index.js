import { connect } from 'react-redux'

import Dishes from '../../containers/DishContainer'

const mapStateToProps = ({ authUser: { user, token } }) => ({ user, token })

export default connect(mapStateToProps, null)(Dishes)

