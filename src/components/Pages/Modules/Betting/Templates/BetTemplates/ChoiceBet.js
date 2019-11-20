import React, {Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

class ChoiceBet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      options: [
        {
          name: '',
          description: '',
          quota: ''
        }
      ]
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.getOption = this.getOption.bind(this)
    this.createTemplate = this.createTemplate.bind(this)
    this.clearTemplate = this.clearTemplate.bind(this)
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
    state.options = this.getOptionsFromString(editData.arguments)
    state.options.push({name: '', description: '', quota: ''})
  }

  clearTemplate () {
    this.setState({
      name: '',
      description: '',
      options: [
        {
          name: '',
          description: '',
          quota: ''
        }
      ]
    })
  }

  getOptionsFromString (argumentsString) {
    let optionsAsString = argumentsString.split(';')
    let options = []
    optionsAsString.forEach(option => {
      let optionParams = option.split(',')
      let newOption = {
        name: optionParams[0],
        description: optionParams[1],
        quota: optionParams[2]
      }
      options.push(newOption)
    })
    return options
  }

  hasOptionWithNameNotIndex (name, index) {
    let optionsWithName = this.state.options.filter((option, existingIndex) => {
      if (option.name === name && index !== existingIndex) {
        return true
      }
      return false
    })
    if (optionsWithName.length > 0) {
      return true
    }
    return false
  }

  onNameChange (event) {
    let newValue = event.target.value
    // newValue = newValue.trim();
    newValue = newValue.replace(/ /g, '_')
    // newValue = newValue.replace(/,/g,"");
    // newValue = newValue.replace(/;/g,"");
    this.setState({name: newValue})
  }

  onDescriptionChange (event) {
    let newValue = event.target.value
    // newValue = newValue.trim();
    // newValue = newValue.replace(/,/g,"");
    // newValue = newValue.replace(/;/g,"");
    this.setState({description: newValue})
  }

  onOptionNameChange (event, index) {
    let newName = event.target.value
    newName = newName.replace(/ /g, '_')
    newName = newName.replace(/,/g, '')
    newName = newName.replace(/;/g, '')

    let option = this.state.options[index]
    option.name = newName

    let state = Object.assign({}, this.state)
    state.options[index] = option
    this.setState(state)
    this.onOptionChange(option, index)
  }

  onOptionDescriptionChange (event, index) {
    let newDesc = event.target.value
    newDesc = newDesc.replace(/,/g, '')
    newDesc = newDesc.replace(/;/g, '')

    let option = this.state.options[index]
    option.description = newDesc

    let state = Object.assign({}, this.state)
    state.options[index] = option
    this.setState(state)
    this.onOptionChange(option, index)
  }

  onOptionQuotaChange (event, index) {
    let newQuota = event.target.value
    if (newQuota < 0) {
      newQuota *= -1
    }
    let option = this.state.options[index]
    option.quota = newQuota

    let state = Object.assign({}, this.state)
    state.options[index] = option
    this.setState(state)
    this.onOptionChange(option, index)
  }

  onOptionChange (option, index) {
    // check if to remove or add next option
    if (this.optionIsComplete(option) && !this.hasNextOption(index)) {
      this.addNewOption()
    }/* else if(!this.canHaveNextOption(option) && this.hasNextOption(index)) {
            if(this.canRemoveOption(index + 1)) {
                let options = this.state.options;
                console.log(options);
                options.splice(index, 1);
                console.log(options);
                this.setState({options: options});
            }
        } */
    /*
        doesn't work anyways
        if(this.canRemoveOption(index)) {
            this.removeOption(index);
        }
        */
  }

  optionIsComplete (option) {
    if (this.isNameEmpty(option)) {
      return false
    }
    if (this.isQuotaEmpty(option)) {
      return false
    }
    /*
        if(this.isDescEmpty(option)) {
            return false;
        } */
    return true
  }

  hasNextOption (index) {
    if (typeof this.state.options[index + 1] !== 'undefined') {
      return true
    }
    return false
  }

  isTemplateNameEmpty () {
    if (this.state.name === '' || this.state.name === null) {
      return true
    }
    return false
  }

  isNameEmpty (option) {
    if (typeof option === 'undefined') {
      return true
    }
    if (option.name === '' || option.name === null) {
      return true
    }
    return false
  }

  isDescEmpty (option) {
    if (typeof option === 'undefined') {
      return true
    }
    if (option.description === '' || option.description === null) {
      return true
    }
    return false
  }

  isQuotaEmpty (option) {
    if (typeof option === 'undefined') {
      return true
    }
    if (option.quota === '' || option.quota === null) {
      return true
    }
    return false
  }

  isOptionEmpty (index) {
    let option = this.state.options[index]
    if (typeof option === 'undefined') {
      return false
    }
    if (!this.isNameEmpty(option)) {
      return false
    }
    if (!this.isDescEmpty(option)) {
      return false
    }
    if (!this.isQuotaEmpty(option)) {
      return false
    }
    /*
        if(option.name !== "" && option.name !== null) {
            return false;
        }
        if(option.description !== "" && option.description !== null) {
            return false;
        }
        if(option.quota !== "" && option.quota !== null) {
            return false;
        }
        */
    return true
  }

  canRemoveOption (index) {
    if (!this.isOptionEmpty()) {
      return false
    }
    if (index === (this.state.options.length - 1)) {
      return false
    }
    return true
  }

  removeOption (index) {
    let options = this.state.options
    options.splice(index, 1)
    this.setState({options: options})
  }

  addNewOption () {
    let newOption = {name: '', description: '', quota: ''}
    this.state.options.push(newOption)
    this.setState(this.state)
  }

  moveOption (index, steps) {
    let option = this.state.options[index]
    let toSwap = this.state.options[index + steps]
    if (typeof option === 'undefined') {
      return
    }
    if (typeof toSwap === 'undefined') {
      return
    }
    let options = this.state.options
    let temp = option
    options[index] = toSwap
    options[index + steps] = temp

    this.setState({options: options})

    if (!this.isOptionEmpty(this.state.options.length - 1)) {
      this.addNewOption()
    }
  }

  getNonEmptyOptions () {
    return this.state.options.filter(function (option, index) {
      return !this.isOptionEmpty(index)
    }.bind(this))
  }

  allOptionNamesUnique () {
    let optionNames = new Set()
    let hasDuplicate = false
    this.state.options.forEach(function (option, index) {
      let name = option.name
      if (name === '' || name === null) {
        return
      }
      if (optionNames.has(name)) {
        hasDuplicate = true
      }
      optionNames.add(name)
    })
    return !hasDuplicate
  }

  templateWithNameExists (name) {
    return this.props.existingTemplateNames.has(name)
  }

  canCreateTemplate () {
    // check if template has name
    if (this.isTemplateNameEmpty()) {
      return false
    }
    // check if there is more than 1 (non empty) option
    if (this.getNonEmptyOptions().length < 2) {
      return false
    }
    // check if all option names are unique
    if (!this.allOptionNamesUnique()) {
      return false
    }

    // check if all options are filled out correctly
    let notFilledOutOptions = this.state.options.filter(function (option, index) {
      if (!this.optionIsComplete(option)) {
        // option is not completely filled out yet
        if (this.isOptionEmpty(index)) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }.bind(this))

    if (notFilledOutOptions.length > 0) {
      return false
    }
    return true
  }

  createTemplate () {
    let template = {}
    template.name = this.state.name
    template.description = this.state.description
    template.type = 'choice'
    let optionStrings = []

    this.state.options.forEach(function (option, index) {
      if (this.isOptionEmpty(index)) {
        return
      }
      optionStrings.push(this.optionToString(option))
    }.bind(this))

    template.arguments = optionStrings.join(';')
    this.props.saveTemplate(template)
  }

  optionToString (option) {
    let name = option.name
    let description = option.description
    let quota = option.quota

    name = name.trim()
    name = name.replace(/ /g, '_')
    description = description.trim()

    return name + ',' + description + ',' + quota
  }

  getOption (option, index) {
    let name = option.name
    let description = option.description
    let quota = option.quota

    let nameChangeFunc = function (event) {
      this.onOptionNameChange(event, index)
    }.bind(this)

    let desChangeFunc = function (event) {
      this.onOptionDescriptionChange(event, index)
    }.bind(this)

    let quotaChangeFunc = function (event) {
      this.onOptionQuotaChange(event, index)
    }.bind(this)

    let moveUp = function () {
      this.moveOption(index, -1)
    }.bind(this)

    let moveDown = function () {
      this.moveOption(index, +1)
    }.bind(this)

    let isFirst = (index === 0)
    let isLast = (index === this.state.options.length - 1)

    let removeButton = null
    // delete only possible if not last
    if (index !== this.state.options.length - 1) {
      let removeFunc = function () {
        this.removeOption(index)
      }.bind(this)
      removeButton = <button type='button' className='btn btn-danger' onClick={removeFunc}><i className='fa fa-trash' /></button>
    }

    let nameHasError = false
    if (this.hasOptionWithNameNotIndex(option.name, index)) {
      nameHasError = true
    }
    if (this.isNameEmpty(option) && !this.isOptionEmpty(index)) {
      nameHasError = true
    }

    let nameError = ''
    if (nameHasError) {
      nameError += ' has-error'
    }

    let quotaError = ''
    if (this.isQuotaEmpty(option) && !this.isOptionEmpty(index)) {
      quotaError += ' has-error'
    }

    return (
      <div key={index} className='form-group bet-option'>
        <div className={'col-xs-12 col-sm-6 col-md-3 option-name' + nameError}>
          <div className='form-material'>
            <input className='form-control' type='text' id={'choice-option-name-' + index} value={name} onChange={nameChangeFunc} />
            <div className='help-block hidden-md hidden-lg'>keyword</div>
          </div>
        </div>
        <div className='col-xs-12 col-sm-6 col-md-3 option-desc'>
          <div className='form-material'>
            <input className='form-control' id={'choice-option-description-' + index} value={description} onChange={desChangeFunc} />
            <div className='help-block hidden-md hidden-lg'>description</div>
          </div>
        </div>
        <div className={'col-xs-12 col-sm-6 col-md-3 option-quota' + quotaError}>
          <div className='form-material'>
            <input className='form-control' type='number' id={'choice-option-quota-' + index} min='1' step='0.1' value={quota} onChange={quotaChangeFunc} />
            <div className='help-block hidden-md hidden-lg'>quota</div>
          </div>
        </div>
        <div className='col-xs-12 col-sm-6 col-md-3 option-controls'>
          <div className='form-material'>
            <button type='button' className='btn btn-primary' onClick={moveUp} disabled={isFirst} style={{marginRight: 5, padding: 6}}><i className='fa fa-caret-up' /></button>
            <button type='button' className='btn btn-primary' onClick={moveDown} disabled={isLast} style={{marginRight: 5, padding: 6}}><i className='fa fa-caret-down' /></button>
            {removeButton}
          </div>
        </div>
      </div>
    )
  }

  getOptions () {
    return this.state.options.map((option, index) => this.getOption(option, index))
  }

  render () {
    let canCreateTemplate = this.canCreateTemplate()
    let createOrUpdate = 'Create'
    let templateName = this.state.name
    // check if a template with this name already exists
    if (this.props.existingTemplateNames.has(templateName)) {
      createOrUpdate = 'Update'
    }

    let nameError = ''
    if (this.isTemplateNameEmpty() || this.props.existingTemplateNames.has(this.state.name)) {
      nameError += ' has-error'
    }

    return (
      <React.Fragment>
        <Modal.Body>
          <span className='template-info'>
                        Create a bet with multiple <strong>options</strong> users can choose form. Each options has is own <strong>quota</strong>&nbsp;
            and a <small>(small)</small> description.
          </span>
          <span className='template-info'>
          End a bet with !endbet [option keyword]
          </span>
          <hr />
          <form className='form-horizontal push-10-t' action='' method='POST'>
            <div className='form-group'>
              <div className={'col-xs-12 col-sm-6 col-md-4' + nameError}>
                <div className='form-material'>
                  <input className='form-control' type='text' id='choice-name' value={this.state.name} onChange={this.onNameChange} />
                  <label htmlFor='choice-name'>Template Keyword</label>
                  <div className='help-block'>Used to start the bet with !startbet [keyword]</div>
                </div>
              </div>
              <div className='col-xs-12 col-sm-6 col-md-8'>
                <div className='form-material'>
                  <input className='form-control' type='text' id='choice-description' value={this.state.description} onChange={this.onDescriptionChange} />
                  <label htmlFor='choice-description'>Description</label>
                  <div className='help-block'>A short description text that is shown when the bet starts</div>
                </div>
              </div>
            </div>
            <hr />

            <div className='form-group'>
              <div className='col-xs-12 col-md-3 hidden-sm hidden-xs'>
                <div className='form-material'>
                  <label data-toggle='popover' title='' data-placement='right'
                    data-content='Uniquely identifies the option. Users will bet with !bet [amount] [keyword]'
                    data-original-title=''>Keyword <i className='fa fa-info-circle' /></label>
                </div>
              </div>
              <div className='col-xs-12 col-md-3 hidden-sm hidden-xs'>
                <div className='form-material'>
                  <label>Description</label>
                </div>
              </div>
              <div className='col-xs-12 col-md-3 hidden-sm hidden-xs'>
                <div className='form-material'>
                  <label data-toggle='popover' title='' data-placement='bottom'
                    data-content='points bet x quota = points won'
                    data-original-title=''>Quota <i className='fa fa-info-circle' /></label>
                </div>
              </div>
            </div>
            {this.getOptions()}
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

export default ChoiceBet
