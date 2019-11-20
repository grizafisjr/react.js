import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import Header from './components/Header/Header'
import ControlPanel from './components/Pages/ControlPanel'
import Points from './components/Pages/Modules/Points'
import VIP from './components/Pages/Modules/VIP'
import Starcraft from './components/Pages/Modules/Starcraft'
import BetSettings from './components/Pages/Modules/Betting/BetSettings'
import TemplatePage from './components/Pages/Modules/Betting/Templates/TemplatePage'
import BaseCommands from './components/Pages/Commands/BaseCommands'
import AdminCommands from './components/Pages/Commands/AdminCommands'
import CustomCommandPage from './components/Pages/Commands/Custom/CustomCommandPage'
import CounterCommandPage from './components/Pages/Commands/Counters/CounterCommandPage'
import RewardsPage from './components/Pages/Rewards/RewardsPage'
import RedeemedRewardsPage from './components/Pages/Rewards/RedeemedRewardsPage'

import ImportUsersPage from './components/Pages/Misc/ImportUsersPage'
import BugtrackerPage from './components/Pages/Misc/BugtrackerPage'
import PlannedFeaturesPage from './components/Pages/Misc/PlannedFeaturesPage'

import { ToastContainer } from 'react-toastify'

class App extends Component {
  // TODO: add react-helmet
  constructor (props) {
    super(props)
    this.state = {
      pageTitle: 'Control Panel',
      currencyName: window.PauloBot.currencyName,
      loading: {
        active: false,
        percent: 20
      },
      showSidebarMobile: false
    }
    this.setPageTitle = this.setPageTitle.bind(this)
    this.createPageComponent = this.createPageComponent.bind(this)
    this.toggleSidebarMobile = this.toggleSidebarMobile.bind(this)
    this.hideSidebarMobile = this.hideSidebarMobile.bind(this)
  }

  setPageTitle (newTitle) {
    this.setState({pageTitle: newTitle})
  }

  createPageComponent (Component, pageTitle, props) {
    return <Component
      currencyName={this.state.currencyName}
      setPageTitle={this.setPageTitle}
      pageTitle={pageTitle}
      {...props}
    />
  }

  toggleSidebarMobile () {
    this.setState({showSidebarMobile: !this.state.showSidebarMobile})
  }

  hideSidebarMobile () {
    this.setState({showSidebarMobile: !this.state.showSidebarMobile})
  }

  getAlertbar () {
    return <div className='alert alert-warning text-center info-bar' role='alert' style={{'borderRadius': 0, 'backgroundColor': '#677bc4', 'color': '#fff', 'boxShadow': 'none'}}>
      <span>
        <i className='fab' style={{'fontSize': '17px'}} /> <strong>Welcome !</strong>
      </span>
    </div>
  }

  render () {
    return (
      <HashRouter>
        <div id='page-container' className={'sidebar-l sidebar-o side-scroll header-navbar-fixed' + (this.state.showSidebarMobile ? ' sidebar-o-xs' : '')}>
          <ToastContainer 
            position="top-center"
          />
          <Sidebar toggleShowSidebarMobile={this.toggleSidebarMobile} hideSidebarMobile={this.hideSidebarMobile} />
          <Header header={this.state.pageTitle} toggleShowSidebarMobile={this.toggleSidebarMobile} />
          <main id='main-container' style={{overflow: 'visible'}}>
            {this.getAlertbar()}
            <Route exact path='/' render={() => this.createPageComponent(ControlPanel, 'Dashboard')} />
            <Route path='/modules/points' render={() => this.createPageComponent(Points, 'Points Module')} />
            <Route path='/modules/vip' render={() => this.createPageComponent(VIP, 'VIP Module')} />
            <Route path='/modules/sc2' render={() => this.createPageComponent(Starcraft, 'Starcraft 2 Module')} />
            <Route path='/modules/betting/config' render={() => this.createPageComponent(BetSettings, 'Bet Module - Configuration')} />
            <Route path='/modules/betting/templates' render={() => this.createPageComponent(TemplatePage, 'Bet Templates')} />
            <Route path='/commands/usercommands' render={() => this.createPageComponent(BaseCommands, 'Commands for everyone')} />
            <Route path='/commands/admin' render={() => this.createPageComponent(AdminCommands, 'Commands for admins')} />
            <Route path='/commands/custom' render={() => this.createPageComponent(CustomCommandPage, 'Custom Commands')} />
            <Route path='/commands/counters' render={() => this.createPageComponent(CounterCommandPage, 'Counters')} />
            <Route path='/rewards/manage' render={() => this.createPageComponent(RewardsPage, 'Rewards')} />
            <Route path='/rewards/redemptions' render={() => this.createPageComponent(RedeemedRewardsPage, 'Redeemed Rewards')} />
            <Route path='/import' render={() => this.createPageComponent(ImportUsersPage, 'Import Users')} />
            <Route path='/bugs' render={() => this.createPageComponent(BugtrackerPage, 'Bugtracker')} />
            <Route path='/planned' render={() => this.createPageComponent(PlannedFeaturesPage, 'Planned Features')} />
          </main>
        </div>
      </HashRouter>
    )
  }
}

export default App
