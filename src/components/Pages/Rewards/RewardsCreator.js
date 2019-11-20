import React, { Component } from 'react'

class RewardsCreator extends Component {
  constructor (props) {
    super(props)
    this.onFieldChange = this.onFieldChange.bind(this)
  }

  onFieldChange (fieldName, event) {
    let data = Object.assign({}, this.props.data)
    let value = event.target.value

    if (fieldName === 'command') {
      value = value.replace(/\s/g, '')
    }

    data[fieldName] = value
    this.props.updateNewReward(data)
  }

  render () {
    let data = this.props.data
    let edit = this.props.edit
    return <div className='form-horizontal' action=''>
      <div className='form-group'>
        <div className='col-xs-12 col-md-6'>
          <div className={'form-material' + (!data.title ? ' has-error' : '')}>
            <input className='form-control' type='text' name='title' id='title' required='required' value={data.title} onChange={(e) => { this.onFieldChange('title', e) }} />
            <label htmlFor='title'>Title</label>
            <div className='help-block'>Name of the reward</div>
          </div>
        </div>
        <div className='col-xs-12 col-md-6'>
          <div className={'form-material' + (!data.command ? ' has-error' : '')}>
            <input className='form-control' type='text' name='command' id='command' required='required' value={data.command} onChange={(e) => { this.onFieldChange('command', e) }} />
            <label htmlFor='command'>Command</label>
            <div className='help-block'>Used by a viewer to redeem this reward</div>
          </div>
        </div>
      </div>
      <div className='form-group'>
        <div className='col-xs-12 col-md-6'>
          <div className='form-material'>
            <input className='form-control' type='text' name='response' id='response' value={data.response} onChange={(e) => { this.onFieldChange('response', e) }} />
            <label htmlFor='response'>Response</label>
            <div className='help-block'>
              Response sent to chat. Parameters: <strong>$user</strong> - name of viewer, <strong>$input</strong> - input by viewer after command
            </div>
          </div>
        </div>
        <div className='col-xs-12 col-md-6'>
          <div className='form-material'>
            <input className='form-control' type='text' name='image_url' id='image_url' value={data.imageUrl} onChange={(e) => { this.onFieldChange('imageUrl', e) }} />
            <label htmlFor='image_url'>Link to Icon</label>
            <div className='help-block'>Icon for the reward. Will be shown in 100px * 100px</div>
          </div>
        </div>
      </div>
      <div className='form-group'>
        <div className='col-xs-12 col-md-12'>
          <div className='form-material'>
            <textarea className='form-control' name='description' id='description' value={data.description} onChange={(e) => { this.onFieldChange('description', e) }} />
            <label htmlFor='description'>Description</label>
            <div className='help-block'>Describe how your reward works</div>
          </div>
        </div>
      </div>
      <div className='form-group'>
        <div className='col-xs-12 col-md-4'>
          <div className='form-material'>
            <input className='form-control' type='number' min='0' name='cost' id='cost' required='required' placeholder='0' value={data.cost} onChange={(e) => { this.onFieldChange('cost', e) }} />
            <label htmlFor='cost'>Cost</label>
            <div className='help-block'>Points a user has to pay to redeem this reward</div>
          </div>
        </div>
        <div className='col-xs-12 col-md-4'>
          <div className='form-material'>
            <input className='form-control' type='number' min='0' name='vip' id='vip' required='required' placeholder='0' value={data.vip} onChange={(e) => { this.onFieldChange('vip', e) }} />
            <label htmlFor='vip'>Required VIP-Level</label>
            <div className='help-block'>Minimum VIP-Level required to redeem this reward</div>
          </div>
        </div>
        <div className='col-xs-12 col-md-4'>
          <div className='form-material'>
            <select className='form-control' name='permission' id='permission' value={data.permission} onChange={(e) => { this.onFieldChange('permission', e) }}>
              <option value={0}>Everyone</option>
              <option value={1}>Moderators</option>
              <option value={2}>Channel Owner</option>
            </select>
            <label htmlFor='permission'>Permission</label>
            <div className='help-block'>0: everyone, 1: mods, ≥2: you</div>
          </div>
        </div>
      </div>
      {/*
      <div className='form-group'>
        <div className='col-sm-9'>
          {this.props.saving
            ? <button className='btn btn-primary' disabled><span className='fa fa-spinner fa-spin' /> Saving</button>
            : <button className='btn btn-primary' onClick={this.props.saveReward}>{edit ? 'Update' : 'Create'}</button>}
          <div>
            <small>*Requires a restart</small>
          </div>
        </div>
      </div>
      */}
    </div>
  }
}

export default RewardsCreator
