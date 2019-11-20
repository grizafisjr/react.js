import React, {Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

class ClosestBet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      winners: 0.33,
      baseQuota: 1.8,
      quotaIncrease: 0.1
    }
    this.clearTemplate = this.clearTemplate.bind(this)
    this.createTemplate = this.createTemplate.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onWinnersChange = this.onWinnersChange.bind(this)
    this.onBaseQuotaChange = this.onBaseQuotaChange.bind(this)
    this.onQuotaIncreaseChange = this.onQuotaIncreaseChange.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    // update state
    let state = this.state
    let editData = this.props.editData
    if (editData === null) {
      return
    }
    // reset to edit state in app.js    this is done here to prevent errors further down and thus loops
    this.props.resetToEdit()

    state.name = editData.name
    state.description = editData.description

    // parse args
    let args = editData.arguments.split(';')
    state.winners = args[0]
    state.baseQuota = args[1]
    state.quotaIncrease = args[2]
  }

  clearTemplate () {
    this.setState({
      name: '',
      description: '',
      winners: 0.33,
      baseQuota: 1.8,
      quotaIncrease: 0.1
    })
  }

  isTemplateNameEmpty () {
    if (this.state.name === '' || this.state.name === null) {
      return true
    }
    return false
  }

  onNameChange (event) {
    let newValue = event.target.value
    newValue = newValue.replace(/ /g, '_')
    this.setState({name: newValue})
  }

  onDescriptionChange (event) {
    let newValue = event.target.value
    this.setState({description: newValue})
  }

  onWinnersChange (event) {
    let newValue = event.target.value
    this.setState({winners: newValue})
  }

  onBaseQuotaChange (event) {
    let newValue = event.target.value
    this.setState({baseQuota: newValue})
  }

  onQuotaIncreaseChange (event) {
    let newValue = event.target.value
    this.setState({quotaIncrease: newValue})
  }

  isWinnersAmountValid () {
    let winners = this.state.winners
    if (winners === '' || winners === null || winners <= 0) {
      return false
    }
    return true
  }

  isBaseQuotaValid () {
    let quota = this.state.baseQuota
    if (quota === '' || quota === null || quota <= 0) {
      return false
    }
    return true
  }

  isQuotaIncreaseValid () {
    let quota = this.state.quotaIncrease
    if (quota === '' || quota === null || quota < 0) {
      return false
    }
    return true
  }

  canCreateTemplate () {
    // check if template has name
    if (this.isTemplateNameEmpty()) {
      return false
    }
    if (!this.isWinnersAmountValid()) {
      return false
    }
    if (!this.isBaseQuotaValid()) {
      return false
    }
    if (!this.isQuotaIncreaseValid()) {
      return false
    }
    return true
  }

  createTemplate () {
    let state = this.state
    let args = state.winners + ';' + state.baseQuota + ';' + state.quotaIncrease
    let template = {
      name: state.name,
      description: state.description,
      type: 'closest',
      arguments: args
    }
    this.props.saveTemplate(template)
  }

  getNameDiv () {
    let nameError = ''
    if (this.isTemplateNameEmpty() || this.props.existingTemplateNames.has(this.state.name)) {
      nameError = ' has-error'
    }

    return (
      <div className={'col-xs-12 col-sm-6 col-md-4' + nameError}>
        <div className='form-material'>
          <input type='text' className='form-control' id='closest-name' value={this.state.name} onChange={this.onNameChange} />
          <label htmlFor='closest-name'>Template Keyword</label>
          <div className='help-block'>Used to start the bet with !startbet [keyword]</div>
        </div>
      </div>
    )
  }

  getWinnersField () {
    let winnersError = ''
    if (!this.isWinnersAmountValid()) {
      winnersError = ' has-error'
    }

    let step = 0.01
    if (this.state.winners > 1) {
      step = 1
    }

    return (
      <div className={'col-xs-12 col-md-4' + winnersError}>
        <div className='form-material'>
          <input className='form-control' type='number' id='closest-winners' min='0' step={step} value={this.state.winners} onChange={this.onWinnersChange} />
          <label htmlFor='closest-winners' data-toggle='popover' title='' data-placement='top'
            data-content='Adjusts how many viewers will win the bet. If amount is >= 1. Then an absolute number of winners will be selected (e.g. best 3). If amount is <1, then the best percentage will be selected (e.g. 0.33 = best 33%)'
            data-original-title=''>Winner amount/percentage <i className='fa fa-info-circle' /></label>
          <div className='help-block'>Absolute amount (&gt;1), Percentage (&lt;1)</div>
        </div>
      </div>
    )
  }

  getBaseQuotaField () {
    let quotaError = ''
    if (!this.isBaseQuotaValid()) {
      quotaError = ' has-error'
    }

    return (
      <div className={'col-xs-12 col-md-4' + quotaError}>
        <div className='form-material'>
          <label htmlFor='closest-quota' data-toggle='popover' title='' data-placement='top'
            data-content="The winner who is the furthest away from the result will receive the base quota. Everyone else will get an increased quota, increasing by their 'quota increase' the better they are."
            data-original-title=''>Base Quota <i className='fa fa-info-circle' /></label>
          <input className='form-control' type='number' id='closest-quota' min='0' step='0.1' value={this.state.baseQuota} onChange={this.onBaseQuotaChange} />
          <div className='help-block'>Quota for the worst (winning) player</div>
        </div>
      </div>
    )
  }

  getQuotaIncreaseField () {
    let quotaError = ''
    if (!this.isQuotaIncreaseValid()) {
      quotaError = ' has-error'
    }

    return (
      <div className={'col-xs-12 col-md-4' + quotaError}>
        <div className='form-material'>
          <input className='form-control' type='number' id='closest-quota-increase' min='0' step='0.1' value={this.state.quotaIncrease} onChange={this.onQuotaIncreaseChange} />
          <label data-toggle='popover' title='' data-placement='top'
            data-content="The winner who is the furthest away from the result will receive the base quota. Everyone else will get an increased quota, increasing by their 'quota increase' the better they are."
            data-original-title=''>Quota Increase <i className='fa fa-info-circle' /></label>
          <div className='help-block'>Increases the base quota for increasing placement</div>
        </div>
      </div>
    )
  }

  render () {
    let canCreateTemplate = this.canCreateTemplate()
    let createOrUpdate = 'Create'
    let templateName = this.state.name
    // check if a template with this name already exists
    if (this.props.existingTemplateNames.has(templateName)) {
      createOrUpdate = 'Update'
    }

    return (
      <React.Fragment>
        <Modal.Body>
          <span className='template-info'>
                        Create a bet where users will <strong>estimate the outcome</strong>. You can set the winners to be an <strong>absolute</strong> amount of betters (e.g. 3)
                         or a <strong>percentage</strong> of betters (e.g. 0.33 = 33%). The winner with the worst estimate will get the <strong>base quota</strong> (e.g. of 1.8),
                        while the quota will <strong>increase</strong> (e.g. by 0.1) the closer the estimate is to the outcome.
          </span>
          <span className='template-info'>
             End a bet with !endbet [number]
          </span>
          <hr />
          <form className='form-horizontal push-10-t' action='' method='POST'>
            <div className='form-group'>
              {this.getNameDiv()}
              <div className='col-xs-12 col-sm-6 col-md-8'>
                <div className='form-material'>
                  <input className='form-control' type='text' id='choice-description' value={this.state.description} onChange={this.onDescriptionChange} />
                  <label htmlFor='closest-description'>Description</label>
                  <div className='help-block'>A short description text that is shown when the bet starts</div>
                </div>
              </div>
            </div>
            <div className='form-group'>
              {this.getWinnersField()}
              {this.getBaseQuotaField()}
              {this.getQuotaIncreaseField()}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn btn-success' disabled={!canCreateTemplate} onClick={this.createTemplate}>{createOrUpdate}</button>
          <button type='button' className='btn btn-default' onClick={this.clearTemplate}>Clear</button>
          <button className={'btn btn-primary'} onClick={this.props.closeModal}>Close</button>
        </Modal.Footer>

      </React.Fragment>
    )
  }
}

export default ClosestBet
