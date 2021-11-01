import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { injectIntl } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import Websocket from 'react-websocket';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { setTimeout } from 'timers';
import logoDark from '../../assets/img/logo-dark.svg';
import OrderNotification from '../../components/OrderNotification';
import { basePathAPI, localeOptions } from '../../constants/defaultValues';
import { changeLocale, clickOnMobileMenu, logoutUser, newNotification, setContainerClassnames, updateNotification } from '../../redux/actions';
import { updateOrderState } from '../../redux/orders/actions';
import IntlMessages from '../../util/IntlMessages';


class TopNav extends Component {
  constructor(props) {
    super(props);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.mobileMenuButtonClick = this.mobileMenuButtonClick.bind(this);
    this.handleChangeLocale = this.handleChangeLocale.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleData = this.handleData.bind(this);

    this.state = {
      isInFullScreen: false,
      searchKeyword: '',
      clientId: null
    };
  }

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    )
  };

  handleChangeLocale = locale => {
    this.props.changeLocale(locale);
  };

  handleLogout() {
    localStorage.clear();
    this.props.logoutUser();
  }

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  menuButtonClick(e, menuClickCount, containerClassnames) {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350)
    this.props.setContainerClassnames(++menuClickCount, containerClassnames);
  }

  mobileMenuButtonClick(e, containerClassnames) {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  }

  handleData(raw) {
    const data = JSON.parse(raw);
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    data.date = `${hours}:${minutes}`;

    if (data.type === 0 && !!data.table) {
      this.props.alert.success(data.message, { timeout: 10000 });
      this.props.updateOrderState({ tableId: data.table.id, type: "waiter" });
      setTimeout(() => {
        this.props.updateOrderState({ tableId: data.table.id, type: "waiter" });
      }, 30000);
    }

    if (data.type === 1 && !!data.table) {
      this.props.alert.success(data.message, { timeout: 10000 });
      this.props.updateOrderState({ tableId: data.table.id, type: "bill" });
      setTimeout(() => {
        this.props.updateOrderState({ tableId: data.table.id, type: "bill" });
      }, 30000);
    }

    if (data.type === 3) {
      return;
    }

    if (data.type === 0 || data.type === 1) {
      data.picture = `${basePathAPI}/public/logo.jpeg`;
    }

    this.props.newNotification(data)
  }

  isNotificationPath = () => {
    const path = this.props.location.pathname;

    if (
      path.includes('/client/') &&
      /[\d]/.test(path) &&
      (path.includes('cashier') ||
        path.includes('kitchen'))
    ) {
      return true
    }
    return false
  }

  render() {
    const { containerClassnames, menuClickCount, notifications } = this.props;
    return (
      <nav className='navbar fixed-top'>
        {
          this.props.pathname.includes('/client/') &&
          <NavLink
            to='#'
            className='menu-button d-none d-md-block'
            onClick={e =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <svg
              className='main'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 9 17'
            >
              <rect x='0.48' y='0.5' width='7' height='1' />
              <rect x='0.48' y='7.5' width='7' height='1' />
              <rect x='0.48' y='15.5' width='7' height='1' />
            </svg>
            <svg
              className='sub'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 18 17'
            >
              <rect x='1.56' y='0.5' width='16' height='1' />
              <rect x='1.56' y='7.5' width='16' height='1' />
              <rect x='1.56' y='15.5' width='16' height='1' />
            </svg>
          </NavLink>
        }
        <NavLink
          to='#'
          className='menu-button-mobile d-xs-block d-sm-block d-md-none'
          onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 17'>
            <rect x='0.5' y='0.5' width='25' height='1' />
            <rect x='0.5' y='7.5' width='25' height='1' />
            <rect x='0.5' y='15.5' width='25' height='1' />
          </svg>
        </NavLink>
        <div className='d-inline-block'>
          <UncontrolledDropdown className='ml-2'>
            <DropdownToggle
              caret
              color='light'
              size='sm'
              className='language-button'
            >
              <span className='name'>{this.props.locale.toUpperCase()}</span>
            </DropdownToggle>
            <DropdownMenu className='mt-3' right>
              {
                localeOptions.map((l) => (
                  <DropdownItem onClick={() => this.handleChangeLocale(l.id)} key={l.id}>
                    {l.name}
                  </DropdownItem>
                ))
              }
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <Link className='navbar-logo' to='/'>
          <img style={{ width: 'auto', height: '100%' }} src={logoDark} alt="MenuXD Logo" />
        </Link>
        <div className='ml-auto'>
          <div className='header-icons align-middle'>
            <div className='position-relative d-none d-sm-inline-block'>
              <UncontrolledDropdown className='dropdown-menu-right'>
                <DropdownToggle className='header-icon' color='empty'>
                  <img
                    style={{ borderRadius: '50%', objectFit: 'cover', height: '1.5rem', width: 'auto' }}
                    src={this.props.user.image_url}
                    alt="user profile"
                  />
                </DropdownToggle>
                <DropdownMenu
                  style={{ height: '10rem' }}
                  className='position-absolute mt-3'
                  right
                  id='iconMenuDropdown'
                >
                  <NavLink to='/profile' className='icon-menu-item'>
                    <i className='iconsmind-User d-block' />{' '}
                    <IntlMessages id='menu.profile' />
                  </NavLink>
                  <NavLink onClick={this.handleLogout} to='/' className='icon-menu-item'>
                    <i className='iconsmind-Key d-block' />{' '}
                    <IntlMessages id='menu.logout' />
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            {
              this.isNotificationPath() &&
              (<div className='position-relative d-inline-block'>
                <UncontrolledDropdown className='dropdown-menu-right'>
                  <DropdownToggle
                    className='header-icon notificationButton'
                    color='empty'
                  >
                    <i className='simple-icon-bell' />
                    <span className='count'>{notifications.filter(n => n.active).length}</span>
                  </DropdownToggle>
                  <DropdownMenu
                    className='position-absolute mt-3 scroll'
                    right
                    id='notificationDropdown'
                  >
                    <PerfectScrollbar
                      options={{ suppressScrollX: true, wheelPropagation: false }}
                    >
                      {notifications.map((n, index) => (
                        <OrderNotification
                          key={index}
                          message={n.message}
                          target='/'
                          date={n.date}
                          image={n.picture}
                        />
                      ))}
                    </PerfectScrollbar>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Websocket url={`${basePathAPI.replace("http://", "ws://")}/api/v1/orders/${this.props.location.pathname.match(/[\d]+/)[0]}/ws`}
                  onMessage={this.handleData} />
              </div>)
            }

            <button
              className='header-icon btn btn-empty d-sm-inline-block'
              type='button'
              id='fullScreenButton'
              onClick={this.toggleFullScreen}

            >
              {this.state.isInFullScreen ? (
                <i style={{ display: 'inline-block' }} className='iconsmind-Minimize' />
              ) : (
                  <i style={{ display: 'inline-block' }} className='iconsmind-Maximize' />
                )}
            </button>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ menu, settings, authUser: { user }, notification: { notifications } }) => {
  const { containerClassnames, menuClickCount } = menu
  const { locale } = settings
  return { containerClassnames, menuClickCount, locale, user, notifications }
}

const mapStDispatchToProps = dispatch => bindActionCreators({
  logoutUser,
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
  updateNotification,
  newNotification,
  updateOrderState
}, dispatch);

export default withAlert()(injectIntl(connect(
  mapStateToProps,
  mapStDispatchToProps
)(withRouter(TopNav))));
