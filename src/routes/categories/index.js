import { connect } from 'react-redux'

import Categories from '../../containers/CategoriesContainer'

const mapStateToProps = ({ authUser: { user, token } }) => ({ user, token })

export default connect(mapStateToProps, null)(Categories)
