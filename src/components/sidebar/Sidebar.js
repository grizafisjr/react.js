import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import React_icon from '../React_icon.svg'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modulesOpen: false,
      bettingOpen: false,
      commandsOpen: false,
      rewardsOpen: false
    }
    this.toggleModulesOpen = this.toggleModulesOpen.bind(this)
    this.toggleBettingOpen = this.toggleBettingOpen.bind(this)
    this.toggleCommandsOpen = this.toggleCommandsOpen.bind(this)
    this.toggleRewardsOpen = this.toggleRewardsOpen.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    let isModulesOpen = this.pathStartsWith('/modules', nextProps)
    let isBettingOpen = this.pathStartsWith('/modules/betting', nextProps)
    let isCommandsOpen = this.pathStartsWith('/commands', nextProps)
    let isRewardsOpen = this.pathStartsWith('/rewards', nextProps)

    this.setState({
      modulesOpen: isModulesOpen ? true : this.state.modulesOpen,
      bettingOpen: isBettingOpen ? true : this.state.bettingOpen,
      commandsOpen: isCommandsOpen ? true : this.state.commandsOpen,
      rewardsOpen: isRewardsOpen ? true : this.state.rewardsOpen
    })

    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.hideSidebarMobile()
    }
  }

  pathStartsWith (subPath, props) {
    return props.location.pathname.startsWith(subPath)
  }

  setModules (open) {
    this.setState({modulesOpen: open})
  }

  toggleModulesOpen () {
    this.setState({modulesOpen: !this.state.modulesOpen})
  }

  setBetting (open) {
    this.setState({bettingOpen: open})
  }

  toggleBettingOpen () {
    this.setState({bettingOpen: !this.state.bettingOpen})
  }

  setCommands (open) {
    this.setState({commandsOpen: open})
  }

  toggleCommandsOpen () {
    this.setState({commandsOpen: !this.state.commandsOpen})
  }

  setRewards (open) {
    this.setState({rewardsOpen: open})
  }

  toggleRewardsOpen () {
    this.setState({rewardsOpen: !this.state.rewardsOpen})
  }

  render () {
    return <nav id='sidebar'>
      {/* Sidebar Scroll Container */}
      <div id='sidebar-scroll'>
        {/* Sidebar Content */}
        <div className='sidebar-content'>
          {/* Side Header */}
          <div className='side-header side-content bg-grey-op'>
            {/* <button className='btn btn-link text-gray pull-right hidden-md hidden-lg' type='button' data-toggle='layout' data-action='sidebar_close' onClick={this.props.toggleShowSidebarMobile}>
              <i className='fa fa-times' />
            </button> */}

            <a className='h5 text-white' href='/'>
              <img src={React_icon} width='32' height='32' alt='' /> <span className='h4 font-w600 sidebar-mini-hide'>Grizafis BB Service</span>
            </a>
          </div>
          {/* END Side Header */}

          {/* Side Content */}
          <div className='side-content'>
            <ul className='nav-main'>
              {/*
              <li>
                <a href='' className='text-center'><span className='label label-success flot-pie-label'>Join Channel</span></a>
              </li>
              */}
              <li>
                <NavLink to='/' exact activeClassName='active'>
                  <i className='fa fa-tachometer-alt fa-lg' />
                  <span className='sidebar-mini-hide'> Dashboard </span>
                </NavLink>
              </li>

              <li>
                <a target='_blank' href={'/streamers/' + window.Grizafis.username + '/leaderboard'}>
                  <i className='fas fa-list-ol fa-lg' />
                  <span className='sidebar-mini-hide'> Leaderboard <small style={{fontSize: '66%', verticalAlign: 'middle'}}>&nbsp;<i className='fas fa-external-link-alt' /></small></span>
                </a>
              </li>

              <li className={this.state.modulesOpen ? 'open' : ''}>
                <a className={'nav-submenu' + (this.pathStartsWith('/modules', this.props) ? ' active' : '')} data-toggle='nav-submenu' onClick={this.toggleModulesOpen}>
                  <i className='fa fa-lg fa-puzzle-piece' /><span className='sidebar-mini-hide'> Modules</span>
                </a>

                <ul>
                  <li>
                    <NavLink to='/modules/points' exact activeClassName='active'>
                      Points
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/modules/vip' exact activeClassName='active'>
                      VIP
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/modules/sc2' exact activeClassName='active'>
                      Starcraft 2
                    </NavLink>
                  </li>
                  <li className={this.state.bettingOpen ? 'open' : ''}>
                    <a className={'nav-submenu' + (this.pathStartsWith('/modules/betting', this.props) ? ' active' : '')} data-toggle='nav-submenu' onClick={this.toggleBettingOpen}>Betting</a>
                    <ul>
                      <li>
                        <NavLink to='/modules/betting/config' exact activeClassName='active'>
                          Configuration
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to='/modules/betting/templates' exact activeClassName='active'>
                          Templates <span className='label label-success'>new</span>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className={this.state.commandsOpen ? 'open' : ''}>
                <a className={'nav-submenu' + (this.pathStartsWith('/command', this.props) ? ' active' : '')} data-toggle='nav-submenu' onClick={this.toggleCommandsOpen}>
                  <i className='fa fa-lg fa-terminal' /><span className='sidebar-mini-hide'> Commands</span>
                </a>
                <ul>
                  <li>
                    <NavLink to='/commands/usercommands' exact activeClassName='active'>
                      <span>Everyone</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/commands/admin' exact activeClassName='active'>
                      <span>Admin</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/commands/custom' exact activeClassName='active'>
                      <span>Custom</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/commands/counters' exact activeClassName='active'>
                      <span>Counters</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={this.state.rewardsOpen ? 'open' : ''}>
                <a className={'nav-submenu' + (this.pathStartsWith('/rewards', this.props) ? ' active' : '')} data-toggle='nav-submenu' onClick={this.toggleRewardsOpen}>
                  <i className='fas fa-gift fa-lg /' /><span className='sidebar-mini-hide'> Rewards</span>
                </a>
                <ul>
                  <li>
                    <NavLink to='/rewards/manage' exact activeClassName='active'>
                      <span>Manage Rewards</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/rewards/redemptions' exact activeClassName='active'>
                      <span>Redeemed Rewards</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to='/import' exact activeClassName='active'>
                  <i className='fa fa-users fa-lg' /><span className='sidebar-mini-hide'> Import Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/bugs' exact activeClassName='active'>
                  <i className='fa fa-bug fa-lg' /><span className='sidebar-mini-hide'> Known Bugs/Problems</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='/planned' exact activeClassName='active'>
                  <i className='fas fa-list-ul fa-lg' /><span className='sidebar-mini-hide'> Planned Features</span>
                </NavLink>
              </li>
              {/*
                  <li>
                      <a href='/panel/contact'><i className='fa fa-envelope fa-lg'></i><span className='sidebar-mini-hide'>Contact</span></a>
                  </li>
                   */}
            </ul>
          </div>
          {/* END Side Content */}
        </div>
        {/* Sidebar Content */}
      </div>
      {/* END Sidebar Scroll Container */}
    </nav>
  }
}

export default withRouter(Sidebar)
