import React, { Component, Fragment } from "react";
import IntlMessages from "../../util/IntlMessages";
import { Row } from "reactstrap";

import { Colxx, Separator } from "../../components/CustomBootstrap";
import BreadcrumbContainer from "../../components/BreadcrumbContainer";

export default class extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.third-single" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {
          /*Enjoy!*/
        }
      </Fragment>
    );
  }
}
