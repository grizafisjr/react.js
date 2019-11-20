import React, { PureComponent } from 'react'
import PageComponent from '../../PageComponent'
import Block from '../../../OneUI/Block'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import $ from 'jquery'

class BetSettings extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      'betting-check': true,
      'betting-notification': '',
      'betting-time': '',
      'betting-win': '',
      'betting-lose': '',
      'betting-mmr-quotas-check': false,
      'saving': false
    }
    this.toggleEnabled = this.toggleEnabled.bind(this)
    this.saveSettings = this.saveSettings.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.handleMountResponse = this.handleMountResponse.bind(this)
    this.onNotificationChange = this.onNotificationChange.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
    this.onWinQuotaChange = this.onWinQuotaChange.bind(this)
    this.onLoseQuotaChange = this.onLoseQuotaChange.bind(this)
    this.toggleMMRQuotas = this.toggleMMRQuotas.bind(this)
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
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
    } catch (ex) { console.error(ex) }

    if (typeof response['betting-check'] !== 'undefined') {
      this.setState({...response})
    } else {
      toast.error('Error loading data from server')
    }
  }

  componentDidMount () {
    this.props.startLoading()
    $.ajax({
      type: 'GET',
      url: '/panel/getBetSettings',
      success: this.handleMountResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.props.endLoading() }
    })
  }

  toggleEnabled () {
    this.setState({'betting-check': !this.state['betting-check']})
  }

  onNotificationChange (event) {
    this.setState({'betting-notification': event.target.value})
  }

  onTimeChange (event) {
    this.setState({'betting-time': event.target.value})
  }

  onWinQuotaChange (event) {
    this.setState({'betting-win': event.target.value})
  }

  onLoseQuotaChange (event) {
    this.setState({'betting-lose': event.target.value})
  }

  toggleMMRQuotas (event) {
    this.setState({'betting-mmr-quotas-check': !this.state['betting-mmr-quotas-check']})
  }

  areSettingsValid () {
    return true
  }

  saveSettings () {
    let settingsValid = this.areSettingsValid()
    if (settingsValid !== true) {
      toast.warn(settingsValid.error)
      return
    }

    let winQuota = parseFloat(this.state['betting-win'])
    if (isNaN(winQuota)) winQuota = 1
    let loseQuota = parseFloat(this.state['betting-lose'])
    if (isNaN(loseQuota)) loseQuota = 1
    let time = parseInt(this.state['betting-time'], 10)
    if (isNaN(time)) time = 30
    let notification = parseFloat(this.state['betting-notification'])
    if (isNaN(notification)) notification = 0

    let data = {
      'betting-check': this.state['betting-check'] ? 'on' : 'off',
      'betting-notification': notification,
      'betting-time': time,
      'betting-win': winQuota,
      'betting-lose': loseQuota,
      'betting-mmr-quotas-check': this.state['betting-mmr-quotas-check'] ? 'on' : 'off'
    }
    this.setState({saving: true})
    $.ajax({
      type: 'POST',
      data: data,
      url: '/panel/betting',
      success: this.handleResponse,
      error: () => { toast.error('Error sending request to save settings') },
      complete: () => { this.setState({saving: false}) }
    })
  }

  render () {
    return <React.Fragment>
      <Block header='Configuration' dark narrow loading={this.props.loading}>
        <div className='form-horizontal'>
          <div className='form-group'>
            <div className='col-xs-12'>
              <label className='css-input switch switch-success'>
                <input id='betting-check' name='betting-check' type='checkbox' checked={this.state['betting-check']} onChange={this.toggleEnabled} /><span />
                <div className='help-block'>Enables the Module</div>
              </label>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <div className='form-material'>
                <input className='form-control' type='number' step='0.01' id='betting-win' name='betting-win' required='required' placeholder='2.1' value={this.state['betting-win']} onChange={this.onWinQuotaChange} />
                <label htmlFor='betting-win'>Multiplier when betting on 'win'</label>
                <div className='help-block'>When a user places a bet on 'win' and wins, his waged points will be multiplied by the 'Win Multiplier'</div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <div className='form-material'>
                <input className='form-control' type='number' step='0.01' id='betting-lose' name='betting-lose' required='required' placeholder='1.9' value={this.state['betting-lose']} onChange={this.onLoseQuotaChange} />
                <label htmlFor='betting-lose'>Multiplier when betting on 'lose'</label>
                <div className='help-block'>When a user places a bet on 'lose'
                  and wins, his waged points will be multiplied by the 'Lose
                  Multiplier'</div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-xs-12'>
              <label className='css-input switch switch-success'>
                <input id='betting-mmr-quotas-check' name='betting-mmr-quotas-check' type='checkbox' checked={this.state['betting-mmr-quotas-check']} onChange={this.toggleMMRQuotas} /><span />
                <strong>MMR dependent quotas for Starcraft 2 <span className='text-danger'> - Experimental</span></strong>
                <div className='help-block'>Quotas are dynamically calculated based on the players difference in MMR.
                  Same MMR results in quotas of 1.8 for both win and lose. If the opponent has 150 MMR more, quotas on win are ~2.0 and on lose ~1.6.
                  300 MMR difference results in win: ~2.3, lose ~1.47 and so on. Sometimes no matching opponent is found and standard quotas are used.
                <br />
                <span className='text-warning'>MMR differences might in some cases not be accurate, please report any bigger inaccuracies.</span>
                </div>
              </label>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <div className='form-material'>
                <input className='form-control' type='number' id='betting-time' name='betting-time' required='required' placeholder='180' value={this.state['betting-time']} onChange={this.onTimeChange} />
                <label htmlFor='betting-time'>Time to bet</label>
                <div className='help-block'>Specifies the time users can bet (in seconds)</div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <div className='form-material'>
                <input className='form-control' type='number' id='betting-notification' name='betting-notification' required='required' placeholder='30' value={this.state['betting-notification']} onChange={this.onNotificationChange} />
                <label htmlFor='betting-notification'>Rien ne vas plus notification</label>
                <div className='help-block'>
                  Sends a notification to chat x seconds before the time to bet runs out. 0 to disable
                </div>
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

      <Block header='More information' dark narrow>
        <h4 style={{'text-decoration': 'underline'}} id='types'>There are 2 types of bets:</h4>
        <p />
        <ol>
          <li>
            Bets where you choose from a number of options - type <strong>choice</strong>
          </li>
          <li>
            Bets where you try to get as close to the result as possible - type <strong>closest</strong>
          </li>
        </ol>
        <h4 style={{'text-decoration': 'underline'}}>How To:</h4>
        <p />
        <h5>1. Choice bets</h5>
        <p />
        <ul>
          <li><strong>!startbet</strong> or <strong>!startbet sc2</strong></li>
          <li><strong>!endbet [option]</strong></li>
        </ul>
        <h5>2. Closest bets (or estimation bets)</h5>
        <p />
        <ul>
          <li><strong>!startbet pubg</strong></li>
          <li><strong>!endbet [value]</strong> - value must be a number (floats are possible e.g. 8.5)</li>
          <li>
            Currently the top <strong> 33%</strong> of betters will win the bet. The worst player gets a quota of 1.8 <strong>increasing</strong> by 0.1 for the next players
          </li>
        </ul>
        <p />
        <h4>Create your own templates <Link to={'/modules/betting/templates'}>here</Link></h4>
        <p />
      </Block>
    </React.Fragment>
  }
}

export default PageComponent(BetSettings)
