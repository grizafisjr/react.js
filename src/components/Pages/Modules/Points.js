import React, { Component } from 'react'
import PageComponent from '../PageComponent'
import Block from './../../OneUI/Block'
import $ from 'jquery'
import { toast } from 'react-toastify'

class Points extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enabled: true,
      pointsName: '',
      command: '',
      replyAsWhisper: false,
      reply: '',
      initialPoints: null,
      pointsPerInterval: null,
      interval: null,
      saving: false
    }
    this.toggleEnabled = this.toggleEnabled.bind(this)
    this.onPointsNameChange = this.onPointsNameChange.bind(this)
    this.onCommandChange = this.onCommandChange.bind(this)
    this.toggleReplyAsWhisper = this.toggleReplyAsWhisper.bind(this)
    this.onReplyChange = this.onReplyChange.bind(this)
    this.onInitialPointsChange = this.onInitialPointsChange.bind(this)
    this.onPointsPerIntervalChange = this.onPointsPerIntervalChange.bind(this)
    this.onIntervalChange = this.onIntervalChange.bind(this)
    this.saveSettings = this.saveSettings.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.handleMountResponse = this.handleMountResponse.bind(this)
  }

  handleResponse (response) {
    if (typeof response === 'string') {
      response = JSON.parse(response)
    }
    if (response.type === 'success') {
      toast.success(response.text)
    } else {
      toast.warn(response.text)
    }
  }

  handleMountResponse (response) {
    let data = {}
    if (typeof response['points-name'] !== 'undefined') {
      data.enabled = response['points-check']
      data.pointsName = response['points-name']
      data.command = response['points-command']
      data.replyAsWhisper = response['points-whisper']
      data.reply = response['points-reply']
      data.initialPoints = response['points-initial']
      data.pointsPerInterval = response['points-get']
      data.interval = response['points-time']
      this.setState({...data})
    } else {
      toast.error('Error loading data from server')
    }
  }

  componentDidMount () {
    this.props.startLoading()
    $.ajax({
      type: 'GET',
      url: '/panel/getPointsModuleData',
      success: this.handleMountResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.props.endLoading() }
    })
  }

  toggleEnabled () {
    this.setState({enabled: !this.state.enabled}, this.saveSettings)
  }

  onPointsNameChange (event) {
    this.setState({pointsName: event.target.value})
  }

  onCommandChange (event) {
    let command = event.target.value
    command = command.replace(/\s/g, '')
    this.setState({command: command})
  }

  toggleReplyAsWhisper () {
    this.setState({replyAsWhisper: !this.state.replyAsWhisper})
  }

  onReplyChange (event) {
    this.setState({reply: event.target.value})
  }

  onInitialPointsChange (event) {
    this.setState({initialPoints: event.target.value})
  }

  onPointsPerIntervalChange (event) {
    this.setState({pointsPerInterval: event.target.value})
  }

  onIntervalChange (event) {
    this.setState({interval: event.target.value})
  }

  areSettingsValid () {
    // check pointsName
    let pointsName = this.state.pointsName
    if (typeof pointsName === 'string') {
      pointsName = pointsName.trim()
    }
    if (pointsName === null || pointsName === '' || typeof pointsName === 'undefined') {
      return {'error': 'Pointsname cannot be empty'}
    }
    // check command
    let command = this.state.command
    if (typeof command === 'string') {
      command = command.trim()
    }
    if (command === null || command === '' || typeof command === 'undefined') {
      return {'error': 'Command cannot be empty'}
    }
    if (command.includes(' ')) {
      return {'error': 'Command cannot contain spaces'}
    }
    return true
  }

  saveSettings () {
    let settingsValid = this.areSettingsValid()
    if (settingsValid !== true) {
      toast.warn(settingsValid.error)
      return
    }
    let enabled = !!this.state.enabled

    let pointsName = this.state.pointsName
    pointsName = pointsName.trim()

    let command = this.state.command
    command = command.trim()

    let replyAsWhisper = !!this.state.replyAsWhisper
    let reply = this.state.reply

    let initialPoints = parseInt(this.state.initialPoints, 10)
    if (isNaN(initialPoints)) initialPoints = 0
    let pointsPerInterval = parseInt(this.state.pointsPerInterval, 10)
    if (isNaN(pointsPerInterval)) pointsPerInterval = 0
    let interval = parseInt(this.state.interval, 10)
    if (isNaN(interval)) interval = 0

    let data = {
      'points-check': enabled ? 'on' : 'off',
      'points-name': pointsName,
      'points-command': command,
      // 'points-whisper': replyAsWhisper ? 'on' : 'off',
      // 'points-reply': reply,
      'points-initial': initialPoints,
      'points-get': pointsPerInterval,
      'points-time': interval
    }
    this.setState({saving: true})
    $.ajax({
      type: 'POST',
      data: data,
      url: '/panel/points',
      success: this.handleResponse,
      error: () => { toast.error('Error sending request to save settings') },
      complete: () => { this.setState({saving: false}) }
    })
  }

  render () {
    let toggle = <label className='css-input switch switch-success'>
      <input id='points-check' name='points-check' type='checkbox' checked={this.state.enabled} onChange={this.toggleEnabled} /><span />
    </label>

    return <Block header='Configuration' dark narrow loading={this.props.loading}>
      <div className='form-horizontal'>
        <div className='form-group'>
          <div className='col-xs-12'>
            <label className='css-input switch switch-success'>
              <input id='points-check' name='points-check' type='checkbox' checked={this.state.enabled} onChange={this.toggleEnabled} /><span />
              <div className='help-block'>Enables the Module</div>
            </label>
          </div>
        </div>

        <div className='form-group'>
          <div className='col-sm-12'>
            <div className='form-material'>
              <input className='form-control' type='text' id='points-name' name='points-name' required='required' placeholder='Points' value={this.state.pointsName} onChange={this.onPointsNameChange} />
              <label htmlFor='points-name'>Pointsname</label>
              <div className='help-block'>The name of your Points</div>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-12'>
            <div className='form-material'>
              <input className='form-control' type='text' id='points-command' name='points-command' required='required' placeholder='!points' value={this.state.command} onChange={this.onCommandChange} />
              <label htmlFor='points-command'>Command</label>
              <div className='help-block'>Command that shows the points of a user</div>
            </div>
          </div>
        </div>

        <div className='form-group'>
          <div className='col-xs-12'>
            <label className='css-input switch switch-success'> <input type='checkbox' id='points-whisper' name='points-whisper' disabled /><span />Send reply as whisper <span className='text-danger'>Currently disabled</span>
            </label>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-12'>
            <div className='form-material'>
              <input className='form-control' type='text' id='points-reply' name='points-reply' required='required' placeholder='$user: $points $pointname - $time hrs' value={this.state.reply} disabled /> <label htmlFor='points-reply'>Reply</label>
              <div className='help-block'><span className='text-danger'>Currently disabled</span> The reply to command. Possible
                parameters: $user, $points, $pointname, $time ($vipname,
                $viplevel)</div>
            </div>
          </div>
        </div>

        <div className='form-group'>
          <div className='col-sm-12'>
            <div className='form-material'>
              <input className='form-control' type='number' min='0' id='points-initial' name='points-initial' required='required' placeholder='25' value={this.state.initialPoints} onChange={this.onInitialPointsChange} />
              <label htmlFor='points-inital'>Initial Points</label>
              <div className='help-block'>The amount of points a user starts with</div>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-xs-6'>
            <div className='form-material'>
              <input className='form-control' type='number' min='0' id='points-get' name='points-get' required='required' placeholder='5' value={this.state.pointsPerInterval} onChange={this.onPointsPerIntervalChange} />
              <label htmlFor='points-get'>Points per Interval</label>
              <div className='help-block'>All users will get {(this.state.pointsPerInterval === null || this.state.pointsPerInterval === '') ? '0' : this.state.pointsPerInterval} {this.state.pointsPerInterval == 1 ? 'point' : 'points'} every {this.state.interval} minute{(this.state.interval == 1 ? '' : 's')}</div>
            </div>
          </div>
          <div className='col-xs-6'>
            <div className='form-material'>
              <input className='form-control' type='number' min='0' id='points-time' name='points-time' required='required' placeholder='5' value={this.state.interval} onChange={this.onIntervalChange} />
              <label htmlFor='points-time'>Interval in minutes </label>
              <div className='help-block'>All users will get points every {this.state.interval} {(this.state.interval == 1 ? 'minute' : ' minutes')}</div>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-9'>
            {this.state.saving
              ? <button className='btn btn-primary'><span className='fa fa-spinner fa-spin' /> Saving</button>
              : <button className='btn btn-primary' onClick={this.saveSettings}>Submit</button>}
          </div>
        </div>
      </div>
    </Block>
  }
}

export default PageComponent(Points)
