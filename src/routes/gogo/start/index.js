import React, { Fragment } from 'react'
import IntlMessages from '../../../util/IntlMessages'
import { Row } from 'reactstrap'

import { Colxx, Separator } from '../../../components/CustomBootstrap'
import BreadcrumbContainer from '../../../components/BreadcrumbContainer'

const Gogo = ({ match }) => (
  <Fragment>
    <Row>
      <Colxx xxs='12'>
        <BreadcrumbContainer
          heading={<IntlMessages id='menu.start' />}
          match={match}
        />
        <Separator className='mb-5' />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs='12'>
        <h1>Hello GoGo</h1>
      </Colxx>
    </Row>
    {
      /*Enjoy!*/
    }
  </Fragment>
)

export default Gogo
