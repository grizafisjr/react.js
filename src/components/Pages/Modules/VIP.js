import React, { Component } from 'react'
import PageComponent from '../PageComponent'
import Block from './../../OneUI/Block'
import $ from 'jquery'
import { toast } from 'react-toastify'

class VIP extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'vip-check': false,
      'vip-command': '!getvip',
      'vip-cost-command': '!wievielkostetvip',
      'vip-cost': '100x^2+500',
      'vip-bonus': 2,
      'vip-stacking': true,
      'vip-levels': 'Bronze,Silver,Gold',
      'vip-suffix': '-VIP',
      'vip-check-extension': true,
      'saving': false,
      'loading': true
    }
    this.toggleEnabled = this.toggleEnabled.bind(this)
    this.onCommandChange = this.onCommandChange.bind(this)
    this.saveSettings = this.saveSettings.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.handleMountResponse = this.handleMountResponse.bind(this)
    this.onCostCommandChange = this.onCostCommandChange.bind(this)
    this.onCostFunctionChange = this.onCostFunctionChange.bind(this)
    this.onBonusChange = this.onBonusChange.bind(this)
    this.toggleStacking = this.toggleStacking.bind(this)
    this.onLevelsChange = this.onLevelsChange.bind(this)
    this.onSuffixChange = this.onSuffixChange.bind(this)
    this.toggleInfiniteLevels = this.toggleInfiniteLevels.bind(this)
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
    // console.log(response)
    if (typeof response['vip-check'] !== 'undefined') {
      this.setState({...response})
    } else {
      toast.error('Error loading data from server')
    }
  }

  componentDidMount () {
    this.props.startLoading()
    $.ajax({
      type: 'GET',
      url: '/panel/getVIPModuleData',
      success: this.handleMountResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => {
        this.setState({saving: false})
        this.props.endLoading()
      }
    })
  }

  toggleEnabled () {
    this.setState({'vip-check': !this.state['vip-check']})
  }

  onCommandChange (event) {
    let command = event.target.value
    command = command.replace(/\s/g, '')
    this.setState({'vip-command': command})
  }

  onCostCommandChange (event) {
    let command = event.target.value
    command = command.replace(/\s/g, '')
    this.setState({'vip-cost-command': command})
  }

  onCostFunctionChange (event) {
    this.setState({'vip-cost': event.target.value})
  }

  onBonusChange (event) {
    this.setState({'vip-bonus': event.target.value})
  }

  toggleStacking (event) {
    this.setState({'vip-stacking': !this.state['vip-stacking']})
  }

  onLevelsChange (event) {
    this.setState({'vip-levels': event.target.value})
  }

  onSuffixChange (event) {
    this.setState({'vip-suffix': event.target.value})
  }

  toggleInfiniteLevels (event) {
    this.setState({'vip-check-extension': !this.state['vip-check-extension']})
  }

  areSettingsValid () {
    // check command
    let command = this.state['vip-command']
    if (typeof command === 'string') {
      command = command.trim()
    }
    if (command === null || command === '' || typeof command === 'undefined') {
      return {'error': 'Get-VIP command cannot be empty'}
    }
    if (command.includes(' ')) {
      return {'error': 'Get-VIP command cannot contain spaces'}
    }
    // cost command
    let costCommand = this.state['vip-cost-command']
    if (typeof costCommand === 'string') {
      costCommand = costCommand.trim()
    }
    if (costCommand === null || costCommand === '' || typeof costCommand === 'undefined') {
      return {'error': 'VIP-Cost command cannot be empty'}
    }
    if (command.includes(' ')) {
      return {'error': 'VIP-Cost command cannot contain spaces'}
    }
    // cost Function
    let costFunction = this.state['vip-cost']
    if (typeof costFunction === 'string') {
      costFunction = costFunction.trim()
    }
    if (costFunction === null || costFunction === '' || typeof costFunction === 'undefined') {
      return {'error': 'Cost Function cannot be empty'}
    }
    // levels
    let levels = this.state['vip-levels']
    if (typeof levels === 'string') {
      levels = levels.trim()
    }
    if (levels === null || levels === '' || typeof levels === 'undefined') {
      return {'error': 'Levels cannot be empty'}
    }
    return true
  }

  saveSettings () {
    let settingsValid = this.areSettingsValid()
    if (settingsValid !== true) {
      toast.warn(settingsValid.error)
      return
    }

    let bonus = parseInt(this.state['vip-bonus'], 10)
    if (isNaN(bonus)) bonus = 0

    let data = {
      'vip-check': this.state['vip-check'] ? 'on' : 'off',
      'vip-command': this.state['vip-command'].trim(),
      'vip-cost-command': this.state['vip-cost-command'].trim(),
      'vip-cost': this.state['vip-cost'],
      'vip-bonus': bonus,
      'vip-stacking': this.state['vip-stacking'] ? 'on' : 'off',
      'vip-levels': this.state['vip-levels'],
      'vip-suffix': this.state['vip-suffix'],
      'vip-check-extension': this.state['vip-check-extension'] ? 'on' : 'off'
    }
    this.setState({saving: true})
    $.ajax({
      type: 'POST',
      data: data,
      url: '/panel/vip',
      success: this.handleResponse,
      error: () => { toast.error('Error sending request to save settings') },
      complete: () => { this.setState({saving: false}) }
    })
  }

  render () {
    return <Block header='Configuration' dark narrow loading={this.props.loading}>
      <div className='form-horizontal'>
        <div className='form-group'>
          <div className='col-xs-12'>
            <label className='css-input switch switch-success'>
              <input id='vip-check' name='vip-check' type='checkbox' checked={this.state['vip-check']} onChange={this.toggleEnabled} /><span />
              <div className='help-block'>Enables the Module</div>
            </label>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-12'>
            <div className='form-material'>
              <input className='form-control' type='text' id='vip-command' name='vip-command' required='required' placeholder='!getvip' value={this.state['vip-command']} onChange={this.onCommandChange} />
              <label htmlFor='vip-command'>Get-VIP Command</label>
              <div className='help-block'>With this command a user will be able to get the next VIP-level for points</div>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-12'>
            <div className='form-material'>
              <input className='form-control' type='text' id='vip-cost-command' name='vip-cost-command' required='required' placeholder='!vipcost' value={this.state['vip-cost-command']} onChange={this.onCostCommandChange} />
              <label htmlFor='vip-cost-command'>VIP-Cost Command</label>
              <div className='help-block'>This command will show the user how much it would cost for him to get the next VIP-level</div>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-12'>
            <div className='form-material'>
              <input className='form-control' type='text' id='vip-cost' name='vip-cost' required='required' placeholder='100x^2+500' value={this.state['vip-cost']} onChange={this.onCostFunctionChange} />
              <label htmlFor='vip-cost'>VIP cost-function</label>
              <div className='help-block'>This function defines the cost in points for the next VIP-level, where x is the level a user  wants to get</div>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-12'>
            <div className='form-material'>
              <input className='form-control' type='number' id='vip-bonus' name='vip-bonus' required='required' placeholder='3' value={this.state['vip-bonus']} onChange={this.onBonusChange} />
              <label htmlFor='vip-bonus' >VIP Bonus</label>
              <div className='help-block'>Bonuspoints a VIP gets each time
                interval (multiplied with his VIP-Level if stacking is enabled)</div>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-xs-12'>
            <label className='css-input switch switch-success'>
              <input type='checkbox' id='vip-stacking' name='vip-stacking' checked={this.state['vip-stacking']} onChange={this.toggleStacking} /><span /> Enable Stacking
            </label>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-12'>
            <div className='form-material'>
              <input className='form-control' type='text' id='vip-levels' name='vip-levels' required='required' placeholder='Bronze,Silver,Gold' value={this.state['vip-levels']} onChange={this.onLevelsChange} />
              <label htmlFor='ip-levels'>Levels</label>
              <div className='help-block'>A comma separated list of all
                vip-level names, low to high</div>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-xs-12'>
            <div className='form-material'>
              <input className='form-control' type='text' id='vip-suffix' name='vip-suffix' placeholder='-VIP' value={this.state['vip-suffix']} onChange={this.onSuffixChange} />
              <label htmlFor='vip-suffix'>Suffix</label>
              <div className='help-block'>Suffix used when a VIP-Level is
                shown. e.g: 'User is now Bronze-VIP'</div>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-xs-12'>
            <label className='css-input switch switch-success'>
              <input type='checkbox' id='vip-check-extension' name='vip-check-extension' checked={this.state['vip-check-extension']} onChange={this.toggleInfiniteLevels} /><span /> Allow infinite levels
              <div className='help-block'>When a user exceeds the list of
                available VIP-Level names, the highest level will be extended
                with '+n' e.g: 'User is now Gold-VIP+2'</div>
            </label>
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

export default PageComponent(VIP)
