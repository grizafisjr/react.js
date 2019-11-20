import React, { Component } from 'react'

class CommandCreator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      command: '',
      response: '',
      cost: 0,
      vip: 0,
      permission: 0,
      whisper: false,
      input: false
    }
    this.onCommandChange = this.onCommandChange.bind(this)
    this.onResponseChange = this.onResponseChange.bind(this)
    this.onCostChange = this.onCostChange.bind(this)
    this.onVipChange = this.onVipChange.bind(this)
    this.onPermissionChange = this.onPermissionChange.bind(this)
    this.toggleInput = this.toggleInput.bind(this)
  }

  onCommandChange (e) {
    let command = Object.assign({}, this.props.currentCommand)
    command.command = e.target.value
    command.command = command.command.replace(/\s/g, '')
    this.props.updateCurrentCommand(command)
  }

  onResponseChange (e) {
    let command = Object.assign({}, this.props.currentCommand)
    command.response = e.target.value
    this.props.updateCurrentCommand(command)
  }

  onCostChange (e) {
    let cost = parseInt(e.target.value, 10)
    if (cost < 0) cost = 0

    let command = Object.assign({}, this.props.currentCommand)
    command.cost = cost
    this.props.updateCurrentCommand(command)
  }

  onVipChange (e) {
    let vip = parseInt(e.target.value, 10)
    if (vip < 0) vip = 0

    let command = Object.assign({}, this.props.currentCommand)
    command.vip = vip
    this.props.updateCurrentCommand(command)
  }

  onPermissionChange (e) {
    let permission = parseInt(e.target.value, 10)
    if (permission < 0) permission = 0

    let command = Object.assign({}, this.props.currentCommand)
    command.permission = permission
    this.props.updateCurrentCommand(command)
  }

  toggleInput (e) {
    let command = Object.assign({}, this.props.currentCommand)
    command.input = !command.input
    this.props.updateCurrentCommand(command)
  }

  render () {
    let command = this.props.currentCommand
    let commandExists = this.props.commandExists
    return <div className='form-horizontal'>
      <div className='form-group'>
        <div className='col-xs-12 col-md-6'>
          <div className={'form-material' + (!command.command ? ' has-error' : '')}>
            <input className='form-control' type='text' name='command' id='command' required='required' value={command.command} onChange={this.onCommandChange} />
            <label htmlFor='command'>Command</label>
            <div className='help-block'>The (new) command. Typically starts with an exclamation mark '!'</div>
          </div>
        </div>
        <div className='col-xs-12 col-md-6'>
          <div className={'form-material' + (!command.response ? ' has-error' : '')}>
            <input className='form-control' type='text' name='response' id='response' required='required' value={command.response} onChange={this.onResponseChange} />
            <label htmlFor='response'>Response Message</label>
            <div className='help-block'>Response sent to chat. Parameters: $user, $me, $input</div>
          </div>
        </div>
      </div>
      <div className='form-group'>
        <div className='col-xs-12 col-md-4'>
          <div className='form-material'>
            <input className='form-control' type='number' min='0' name='cost' id='cost' required='required' placeholder='0' value={command.cost} onChange={this.onCostChange} />
            <label htmlFor='cost'>Cost</label>
            <div className='help-block'>Points a user has to pay to use this command</div>
          </div>
        </div>
        <div className='col-xs-12 col-md-4'>
          <div className='form-material'>
            <input className='form-control' type='number' min='0' name='vip' id='vip' required='required' placeholder='0' value={command.vip} onChange={this.onVipChange} />
            <label htmlFor='vip'>Required VIP-Level</label>
            <div className='help-block'>Minimum VIP-Level required to use this command</div>
          </div>
        </div>
        <div className='col-xs-12 col-md-4'>
          <div className='form-material'>
            <select className='form-control' name='permission' id='permission' value={command.permission} onChange={this.onPermissionChange}>
              <option value={0}>Everyone</option>
              <option value={1}>Moderators</option>
              <option value={2}>Channel Owner</option>
            </select>
            <label htmlFor='permission'>Permission</label>
            <div className='help-block'>The minimum required userlevel to execute the command</div>
          </div>
        </div>
      </div>

      <div className='form-group'>
        <div className='col-xs-12 col-md-6'>
          <div className='form-material'>
            <select className='form-control' name='whisper' id='whisper' value={command.whisper}>
              <option>to chat</option>
              <option disabled>as whisper (currently disabled)</option>
            </select>
            <label htmlFor='whisper'>Response is sent ...</label>
          </div>
        </div>
        <div className='col-xs-12 col-md-6'>
          <div className='form-material'>
            <select className='form-control' name='input' id='input' value={command.input} onChange={this.toggleInput}>
              <option value={true}>yes</option>
              <option value={false} selected='true'>no</option>
            </select>
            <label htmlFor='input'>Command allows user input</label>
          </div>
        </div>
      </div>
      {/*
      <div className='form-group' style={{marginBottom: 0}}>
        <div className='col-sm-9'>
          <button className='btn btn-primary' onClick={this.props.saveCommand}>
            {commandExists ? 'Update' : 'Create'}
          </button>
          {commandExists && <button className='btn btn-danger' onClick={() => { this.props.deleteCommand(command.command) }} style={{marginLeft: 5}}>Delete</button>}
        </div>
      </div>
      */}
    </div>
  }
}

export default CommandCreator
