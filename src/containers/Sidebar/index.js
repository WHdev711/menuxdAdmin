import classnames from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { addContainerClassname, changeDefaultClassnames, setContainerClassnames } from '../../redux/actions';
import IntlMessages from '../../util/IntlMessages';


class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.addEvents = this.addEvents.bind(this)
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleProps = this.handleProps.bind(this)
    this.removeEvents = this.removeEvents.bind(this)
    this.getContainer = this.getContainer.bind(this)
    this.getMenuClassesForResize = this.getMenuClassesForResize.bind(this)
    this.setSelectedLiActive = this.setSelectedLiActive.bind(this)

    this.state = {
      selectedParentMenu: '',
      viewingParentMenu: ''
    }
  }

  handleWindowResize(event) {
    if (event && !event.isTrusted) {
      return
    }
    const { containerClassnames } = this.props
    let nextClasses = this.getMenuClassesForResize(containerClassnames)
    this.props.setContainerClassnames(0, nextClasses.join(' '))
  }

  handleDocumentClick(e) {
    const container = this.getContainer()
    let isMenuClick = false
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('menu-button') ||
        e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile'
        ))
    ) {
      isMenuClick = true
    }
    if (
      (container.contains(e.target) && container !== e.target) ||
      isMenuClick
    ) {
      return
    }
    this.toggle(e)
    this.setState({
      viewingParentMenu: ''
    })
  }

  getMenuClassesForResize(classes) {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props
    let nextClasses = classes.split(' ').filter(x => x !== '')
    const windowWidth = window.innerWidth
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile')
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter(x => x !== 'menu-mobile')
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden')
      }
    } else {
      nextClasses = nextClasses.filter(x => x !== 'menu-mobile')
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter(x => x !== 'menu-sub-hidden')
      }
    }
    return nextClasses
  }

  getContainer() {
    return ReactDOM.findDOMNode(this)
  }

  toggle() {
    const { containerClassnames, menuClickCount } = this.props
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter(x => x !== '')
      : ''

    if (currentClasses.includes('menu-sub-hidden') && menuClickCount === 3) {
      this.props.setContainerClassnames(2, containerClassnames)
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      this.props.setContainerClassnames(0, containerClassnames)
    }
  }

  handleProps() {
    this.addEvents()
  }

  addEvents() {
    ['click', 'touchstart'].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    )
  }
  removeEvents() {
    ['click', 'touchstart'].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    )
  }
  setSelectedLiActive() {
    const oldli = document.querySelector('.sub-menu  li.active')
    if (oldli !== null) {
      oldli.classList.remove('active')
    }

    /* set selected parent menu */
    const selectedlink = document.querySelector('.sub-menu  a.active')
    if (selectedlink !== null) {
      selectedlink.parentElement.classList.add('active')
      this.setState({
        selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
          'data-parent'
        )
      })
    } else {
      var selectedParentNoSubItem = document.querySelector('.main-menu  li a.active')
      if (selectedParentNoSubItem !== null) {
        this.setState({
          selectedParentMenu: selectedParentNoSubItem.getAttribute(
            'data-flag'
          )
        })
      } else if (this.state.selectedParentMenu === '') {
        this.setState({
          selectedParentMenu: 'categories'
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive()
      this.toggle()
      window.scrollTo(0, 0)
    }

    this.handleProps()
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
    this.handleProps()
    this.setSelectedLiActive()
  }

  componentWillUnmount() {
    this.removeEvents()
    window.removeEventListener('resize', this.handleWindowResize)
  }

  changeDefaultMenuType(e, containerClassnames) {
    e.preventDefault()
    let nextClasses = this.getMenuClassesForResize(containerClassnames)
    this.props.setContainerClassnames(0, nextClasses.join(' '))
  }

  openSubMenu(e, selectedParent) {
    e.preventDefault()
    const { containerClassnames, menuClickCount } = this.props
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter(x => x !== '')
      : ''

    if (!currentClasses.includes('menu-mobile')) {
      if (
        currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 2 || menuClickCount === 0)
      ) {
        this.props.setContainerClassnames(3, containerClassnames)
      } else if (
        currentClasses.includes('menu-hidden') &&
        (menuClickCount === 1 || menuClickCount === 3)
      ) {
        this.props.setContainerClassnames(2, containerClassnames)
      } else if (
        currentClasses.includes('menu-default') &&
        !currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 1 || menuClickCount === 3)
      ) {
        this.props.setContainerClassnames(0, containerClassnames)
      }
    } else {
      this.props.addContainerClassname(
        'sub-show-temporary',
        containerClassnames
      )
    }
    this.setState({
      viewingParentMenu: selectedParent
    })
  }

  changeViewingParentMenu(menu) {
    this.toggle()

    this.setState({
      viewingParentMenu: menu
    })
  }

  render() {
    const { clientId } = this.props
    return (
      <div className='sidebar'>
        <div className='main-menu'>
          <div className='scroll'>
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className='list-unstyled'>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu === 'charts' && this.state.viewingParentMenu === '') || this.state.viewingParentMenu === 'charts')
                  })}
                >
                  <NavLink
                    to={`/client/${clientId}/charts`}
                    onClick={() => this.changeViewingParentMenu('charts')}
                    data-flag='charts'>
                    <i className='iconsmind-Bar-Chart' />{' '}
                    <IntlMessages id='menu.statistics' />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu === 'categories' && this.state.viewingParentMenu === '') || this.state.viewingParentMenu === 'categories')
                  })}
                >
                  <NavLink
                    to={`/client/${clientId}/categories`}
                    onClick={() => this.changeViewingParentMenu('categories')}
                    data-flag='categories'>
                    <i className='iconsmind-Chef' />{' '}
                    <IntlMessages id='menu.categories' />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu === 'dishes' && this.state.viewingParentMenu === '') || this.state.viewingParentMenu === 'dishes')
                  })}
                >
                  <NavLink
                    to={`/client/${clientId}/dishes`}
                    onClick={() => this.changeViewingParentMenu('dishes')}
                    data-flag='dishes'>
                    <i className='iconsmind-Plates' />{' '}
                    <IntlMessages id='menu.dishes' />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu === 'waiters' && this.state.viewingParentMenu === '') || this.state.viewingParentMenu === 'waiters')
                  })}
                >
                  <NavLink
                    to={`/client/${clientId}/waiters`}
                    onClick={() => this.changeViewingParentMenu('waiters')}
                    data-flag='waiters'>
                    <i className='iconsmind-Waiter' />{' '}
                    <IntlMessages id='menu.waiters' />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu === 'tables' && this.state.viewingParentMenu === '') || this.state.viewingParentMenu === 'tables')
                  })}
                >
                  <NavLink
                    to={`/client/${clientId}/tables`}
                    onClick={() => this.changeViewingParentMenu('tables')}
                    data-flag='tables'>
                    <i className='iconsmind-Sushi' />{' '}
                    <IntlMessages id='menu.tables' />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu === 'promotions' && this.state.viewingParentMenu === '') || this.state.viewingParentMenu === 'promotions')
                  })}
                >
                  <NavLink
                    to={`/client/${clientId}/promotions`}
                    onClick={() => this.changeViewingParentMenu('promotions')}
                    data-flag='promotions'>
                    <i className='iconsmind-Sand-watch2' />{' '}
                    <IntlMessages id='menu.promotions' />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu === 'ads' && this.state.viewingParentMenu === '') || this.state.viewingParentMenu === 'ads')
                  })}
                >
                  <NavLink
                    to={`/client/${clientId}/ads`}
                    onClick={() => this.changeViewingParentMenu('ads')}
                    data-flag='ads'>
                    <i className='iconsmind-Tag-2' />{' '}
                    <IntlMessages id='menu.ads' />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu === 'score' && this.state.viewingParentMenu === '') || this.state.viewingParentMenu === 'score')
                  })}
                >
                  <NavLink
                    to={`/client/${clientId}/score`}
                    onClick={() => this.changeViewingParentMenu('score')}
                    data-flag='score'>
                    <i className='iconsmind-Speak-2' />{' '}
                    <IntlMessages id='menu.score' />
                  </NavLink>
                </NavItem>
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className='sub-menu'>
          <div className='scroll'>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ menu, currentClient }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount
  } = menu
  const { client } = currentClient
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    client
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    { setContainerClassnames, addContainerClassname, changeDefaultClassnames }
  )(Sidebar)
)
