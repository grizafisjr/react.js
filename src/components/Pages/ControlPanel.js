import React, { Component } from 'react'
import Block from '../OneUI/Block'
import PageComponent from './PageComponent'
import $ from 'jquery'
import { toast } from 'react-toastify'
import {XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Brush, ResponsiveContainer} from 'recharts'

const CustomTooltip = (props) => {
  if (typeof props.label === 'undefined') {
    return null
  }
  return <div className=''>{new Date(props.label).toISOString()}</div>
}

class ControlPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      botRunning: window.PauloBot.botRunning,
      starting: false,
      restarting: false,
      stopping: false,
      setCommunity: window.PauloBot.community,
      toUser: {
        name: '',
        amount: 0
      },
      toEveryone: 0,
      stats: []
    }
    this.handleViewerStatsResponse = this.handleViewerStatsResponse.bind(this)
    this.toggleCommunity = this.toggleCommunity.bind(this)
    this.startBot = this.startBot.bind(this)
    // this.restartBot = this.restartBot.bind(this)
    this.stopBot = this.stopBot.bind(this)
    this.toUserAmountChange = this.toUserAmountChange.bind(this)
    this.toUserNameChange = this.toUserNameChange.bind(this)
    this.toEveryoneAmountChange = this.toEveryoneAmountChange.bind(this)
    this.giveToUser = this.giveToUser.bind(this)
    this.giveToEveryone = this.giveToEveryone.bind(this)
    this.handleStartResponse = this.handleStartResponse.bind(this)
    this.handleStopResponse = this.handleStopResponse.bind(this)
    this.startBet = this.startBet.bind(this)
    this.cancelBet = this.cancelBet.bind(this)
    this.betWin = this.betWin.bind(this)
    this.betLose = this.betLose.bind(this)
    this.sendControlPanelPost = this.sendControlPanelPost.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.toggleCommunity = this.toggleCommunity.bind(this)
    this.handleCommunityResponse = this.handleCommunityResponse.bind(this)
    this.giveToUser = this.giveToUser.bind(this)
    this.giveToEveryone = this.giveToEveryone.bind(this)
  }

  componentDidMount () {
    this.loadViewerGraphData()
  }

  loadViewerGraphData () {
    // /panel/dashboard/viewerStats
    $.ajax({
      type: 'GET',
      url: '/panel/dashboard/viewerStats',
      success: this.handleViewerStatsResponse,
      error: () => { toast.error('Error sending request') }
    })
  }

  handleViewerStatsResponse (response) {
    if (response.status !== 200) {
      toast.warn('Could not load graph data')
      return
    }
    this.setState({stats: response.stats})
  }

  getStatsBar () {
    return <div className='bg-white border-b' style={{margin: '-30px -30px 0 -30px', padding: '15px 15px 15px 30px'}}>
      <div className='row items-push text-uppercase text-center'>
        <div className='col-xs-6 col-sm-4 col-md-3' style={{margin: 0}}>
          <div className='font-w700 text-gray-darker animated fadeIn'>Unique Viewers</div>
          <span className='h2 font-w300 text-primary animated flipInX'>7045</span>
        </div>
        <div className='col-xs-6 col-sm-4 col-md-3' style={{margin: 0}}>
          <div className='font-w700 text-gray-darker animated fadeIn'>Total Hours Watched</div>
          <span className='h2 font-w300 text-primary animated flipInX'>52368.9</span>
        </div>
        <div className='col-xs-6 col-sm-4 col-md-3' style={{margin: 0}}>
          <div className='font-w700 text-gray-darker animated fadeIn'>Followers</div>
          <span className='h2 font-w300 text-primary animated flipInX'>Soon&trade;</span>
        </div>
        <div className='col-xs-6 col-sm-4 col-md-3' style={{margin: 0}}>
          <div className='font-w700 text-gray-darker animated fadeIn'>???</div>
          <span className='h2 font-w300 text-primary animated flipInX'>???</span>
        </div>
      </div>
    </div>
  }

  toggleCommunity () {
    let newValue = !this.state.setCommunity
    let data = {
      'type': 'community',
      'value': newValue
    }
    $.ajax({
      type: 'POST',
      url: '/panel/control_center',
      data: data,
      success: (response) => { this.handleCommunityResponse(response, newValue) },
      error: () => { toast.error('Error sending request') }
    })
  }

  handleCommunityResponse (response, newValue) {
    if (response.type === 'success') {
      this.setState({setCommunity: newValue})
      toast.success(response.text)
    } else {
      toast.error(response.text)
    }
  }

  startBot () {
    if (this.state.starting || this.state.restarting || this.state.stopping) {
      return
    }
    this.setState({starting: true})
    $.ajax({
      type: 'POST',
      url: '/panel/control_center',
      data: {'type': 'bot-start'},
      success: this.handleStartResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.setState({starting: false}) }
    })
  }

  handleStartResponse (response) {
    if (response.type === 'success') {
      this.setState({botRunning: true})
      window.PauloBot.botRunning = true
      toast.success(response.text)
    } else {
      toast.error(response.text)
    }
  }

  stopBot () {
    if (this.state.starting || this.state.restarting || this.state.stopping) {
      return
    }
    this.setState({stopping: true})
    $.ajax({
      type: 'POST',
      url: '/panel/control_center',
      data: {'type': 'bot-stop'},
      success: this.handleStopResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.setState({stopping: false}) }
    })
  }

  handleStopResponse (response) {
    if (response.type === 'success') {
      this.setState({botRunning: false})
      window.PauloBot.botRunning = false
      toast.success(response.text)
    } else {
      toast.error(response.text)
    }
  }
  /*
  restartBot () {
    if (this.state.starting || this.state.restarting || this.state.stopping) {
      return
    }

    console.log('restart bot')
    this.setState({restarting: true})
  }
  */
  toUserAmountChange (e) {
    this.setState({toUser: {
      amount: e.target.value,
      name: this.state.toUser.name
    }})
  }

  toUserNameChange (e) {
    this.setState({toUser: {
      amount: this.state.toUser.amount,
      name: e.target.value
    }})
  }

  toEveryoneAmountChange (e) {
    this.setState({toEveryone: e.target.value})
  }

  getMainControls () {
    let label = this.state.botRunning
      ? <span id='bot-status' className='label label-success'>joined</span>
      : <span id='bot-status' className='label label-danger'>disconnected</span>

    return <React.Fragment>
      <h2 className='content-heading'>
        Bot Controls <span style={{marginLeft: 10}}>{label}</span>
      </h2>
      <div className='content-grid push-50'>
        <div className='row'>
          {this.state.botRunning
            ? <div className='col-xs-6 col-sm-4 col-lg-2'>
              <a className='control-button block block-link-hover3 text-center' onClick={this.stopBot}>
                <div className='block-content block-content-full'>
                  {this.state.stopping
                    ? <i id='start-button' className='fa fa-spinner fa-spin fa-4x' />
                    : <i className='fas fa-sign-out-alt fa-4x' />}
                  <div className='font-w600 push-15-t'>Leave Channel</div>
                </div>
              </a>
            </div>
            : <div className='col-xs-6 col-sm-4 col-lg-2'>
              <a className='control-button block block-link-hover3 text-center' onClick={this.startBot}>
                <div className='block-content block-content-full'>
                  {this.state.starting
                    ? <i id='start-button' className='fa fa-spinner fa-spin fa-4x' />
                    : <i id='start-button' className='fa fa-sign-in-alt fa-4x' />}
                  <div className='font-w600 push-15-t'>Join Channel</div>
                </div>
              </a>
            </div>
          }
          {/*
          <div className='col-xs-6 col-sm-4 col-lg-2'>
            <form action='' method='post'>
              <input type='hidden' name='type' value='bot-restart' />
              <a className='control-button block block-link-hover3 text-center' onClick={this.restartBot}>
                <div className='block-content block-content-full'>
                  <i id='restart-button' className={'fa fa-sync-alt fa-4x' + (this.state.restarting ? ' fa-spin' : '')} />
                  <div className='font-w600 push-15-t'>Rejoin Channel</div>
                </div>
              </a>
            </form>
          </div>
          */}

          <div className='col-xs-6 col-sm-4 col-lg-2'>
            <a className='control-button block block-link-hover3 text-center' onClick={this.startBet}>
              <div className='block-content block-content-full'>
                <i className='fa fa-play fa-4x' />
                <div className='font-w600 push-15-t'>Start Bet</div>
              </div>
            </a>
          </div>

          <div className='col-xs-6 col-sm-4 col-lg-2'>
            <a className='control-button block block-link-hover3 text-center' onClick={this.cancelBet}>
              <div className='block-content block-content-full'>
                <i className='fa fa-ban fa-4x' />
                <div className='font-w600 push-15-t'>Cancel Bet</div>
              </div>
            </a>
          </div>

          <div className='col-xs-6 col-sm-4 col-lg-2'>
            <a className='control-button block block-link-hover3 text-center' onClick={this.betWin}>
              <div className='block-content block-content-full'>
                <i className='fas fa-thumbs-up fa-4x' />
                <div className='font-w600 push-15-t'>Bet Is Win</div>
              </div>
            </a>
          </div>

          <div className='col-xs-6 col-sm-4 col-lg-2'>
            <a className='control-button block block-link-hover3 text-center' onClick={this.betLose}>
              <div className='block-content block-content-full'>
                <i className='fas fa-thumbs-down fa-4x' />
                <div className='font-w600 push-15-t'>Bet Is Lose</div>
              </div>
            </a>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <label className='css-input switch switch-success'>
              <input type='checkbox' id='community' checked={this.state.setCommunity} onChange={this.toggleCommunity} /><span /> Automatically set community to  when bot starts
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  }

  sendControlPanelPost (data) {
    $.ajax({
      type: 'POST',
      url: '/panel/control_center',
      data: data,
      success: this.handleResponse,
      error: () => { toast.error('Error sending request') }
    })
  }

  handleResponse (response) {
    if (response.type === 'success') {
      toast.success(response.text)
    } else {
      toast.warn(response.text)
    }
  }

  startBet () {
    this.sendControlPanelPost({'type': 'bet-start'})
  }

  cancelBet () {
    this.sendControlPanelPost({'type': 'bet-cancel'})
  }

  betWin () {
    this.sendControlPanelPost({'type': 'bet-win'})
  }

  betLose () {
    this.sendControlPanelPost({'type': 'bet-lose'})
  }

  getBetControls () {
    return <React.Fragment>
      <h2 className='content-heading'>Betting Controls</h2>
      <div className='content-grid push-50'>
        <div className='row'>

          <div className='col-xs-6 col-sm-4 col-lg-2'>
            <a className='control-button block block-link-hover3 text-center' onClick={this.startBet}>
              <div className='block-content block-content-full'>
                <i className='fa fa-play fa-4x' />
                <div className='font-w600 push-15-t'>Start Bet</div>
              </div>
            </a>
          </div>

          <div className='col-xs-6 col-sm-4 col-lg-2'>
            <a className='control-button block block-link-hover3 text-center' onClick={this.cancelBet}>
              <div className='block-content block-content-full'>
                <i className='fa fa-ban fa-4x' />
                <div className='font-w600 push-15-t'>Cancel Bet</div>
              </div>
            </a>
          </div>

          <div className='col-xs-6 col-sm-4 col-lg-2'>
            <a className='control-button block block-link-hover3 text-center' onClick={this.betWin}>
              <div className='block-content block-content-full'>
                <i className='fas fa-thumbs-up fa-4x' />
                <div className='font-w600 push-15-t'>Win</div>
              </div>
            </a>
          </div>

          <div className='col-xs-6 col-sm-4 col-lg-2'>
            <a className='control-button block block-link-hover3 text-center' onClick={this.betLose}>
              <div className='block-content block-content-full'>
                <i className='fas fa-thumbs-down fa-4x' />
                <div className='font-w600 push-15-t'>Lose</div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </React.Fragment>
  }

  giveToUser () {
    let amount = parseInt(this.state.toUser.amount, 10)
    if (amount === 0 || isNaN(amount) || amount === null) {
      toast('Amount cannot be 0')
      return
    }
    let name = this.state.toUser.name
    if (name === '' || name === null || typeof name === 'undefined') {
      toast.warn('Name cannot be empty')
      return
    }
    let data = {
      'type': 'points-to-user',
      'amount': amount,
      'user': name
    }
    this.sendControlPanelPost(data)
  }

  giveToEveryone () {
    let amount = parseInt(this.state.toEveryone, 10)
    if (amount === 0 || isNaN(amount) || amount === null) {
      toast('Amount cannot be 0')
      return
    }
    let data = {
      'type': 'points-to-all',
      'amount': this.state.toEveryone
    }
    this.sendControlPanelPost(data)
  }

  getCurrencyControls () {
    return <React.Fragment>
      <h2 className='content-heading'>Currency Controls</h2>
      <div className='content-grid push-50'>
        <div className='row'>
          <div className='col-lg-6 col-md-12 col-sm-12'>
            <Block header={`Give ${this.props.currencyName} to user`} dark>
              <div className='form-inline'>
                <div className='form-group'>
                  <label className='control-label' htmlFor='amount'>Give &nbsp;</label>
                  <input className='form-control' type='number' name='amount' id='amount' required='required' min='1' step='1' value={this.state.toUser.amount} onChange={this.toUserAmountChange} placeholder='amount' />
                </div>
                <div className='form-group'>
                  <label className='control-label' htmlFor='user'>&nbsp; to &nbsp;</label>
                  <input className='form-control' type='text' name='user' required='required' id='user' placeholder='username' value={this.state.toUser.name} onChange={this.toUserNameChange} />
                </div>
                <div className='form-group'>
                  &nbsp; <button className='btn btn-default' onClick={this.giveToUser}>OK</button>
                </div>
              </div>
            </Block>
          </div>
          <div className='col-lg-6 col-md-12 col-sm-12'>
            <Block header={`Give ${this.props.currencyName} to everyone`} dark>
              <div className='form-inline'>
                <div className='form-group'>
                  <label className='control-label' htmlFor='amount'>Give &nbsp;</label>
                  <input className='form-control' type='number' name='amount' id='amount' required='required' min='1' step='1' placeholder='amount' value={this.state.toEveryone} onChange={this.toEveryoneAmountChange} />
                </div>
                <label className='' htmlFor='example-if-password'>&nbsp; to all viewers &nbsp;</label>
                <div className='form-group'>
                  <button className='btn btn-default' onClick={this.giveToEveryone}>OK</button>
                </div>
              </div>
            </Block>
          </div>
        </div>
      </div>
    </React.Fragment>
  }

  myTooltip (props) {
    if (typeof props === 'undefined') return null
    if (typeof props.label === 'undefined') return null
    if (typeof props.payload === 'undefined') return null
    if (props.payload.length === 0) return null
    return (
      <div className='recharts-tooltip-wrapper'>
        <div className='recharts-default-tooltip' style={{'margin': '0px', padding: '10px', 'background-color': 'rgb(255, 255, 255)', border: '1px solid rgb(204, 204, 204)', ' white-space': 'nowrap'}}>
          <p className='recharts-tooltip-label' style={{'margin': '0px'}}>{new Date(props.label).toLocaleDateString() + ' ' + new Date(props.label).toLocaleTimeString()}</p>
          <ul className='recharts-tooltip-item-list' style={{'padding': '0px', margin: '0px'}}>
            <li className='recharts-tooltip-item' style={{'display': 'block', 'padding-top': '4px', 'padding-bottom': '4px', 'color': 'rgb(136, 132, 216);'}}>
              <span className='recharts-tooltip-item-name'>Viewers</span>
              <span className='recharts-tooltip-item-separator'>: </span>
              <span className='recharts-tooltip-item-value'>{props.payload[0].payload.viewerAmount}</span>
              <span className='recharts-tooltip-item-unit'></span>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  getGraph () {
    if (this.state.stats.length === 0) {
      return <div className='block block-content block-content-full'>
        <h3>No data yet</h3>
      </div>
    }
    return <div style={{width: '100%', height: 400}} className='block'>
      <ResponsiveContainer>
        <BarChart data={this.state.stats}
          margin={{top: 30, right: 30, left: 0, bottom: 30}}>
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey='timestamp'
            type='number'
            domain = {['auto', 'auto']}
            tickFormatter={(unixTime) => new Date(unixTime).toISOString().substring(0, 10)} />
          <YAxis/>
          <Tooltip content={this.myTooltip}/>
          {/* <Area type='monotone' dataKey='viewerAmount' stroke='#8884d8' fill='#8884d8' /> */}
          <Brush/>
          <Bar dataKey='viewerAmount' fill='#6092d3' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  }

  render () {
    return <React.Fragment>
      {/* {this.getStatsBar()} */}
      {this.getMainControls()}
      {/* {this.getBetControls()} */}
      {this.getCurrencyControls()}
      <div className='block' style={{marginBottom: 0}}>
        <div className='block-header bg-primary-dark'><h3 className='block-title'>Viewers last week <small>(experimental feature)</small></h3></div>
      </div>
      {this.getGraph()}
    </React.Fragment>
  }
}

export default PageComponent(ControlPanel, false)
