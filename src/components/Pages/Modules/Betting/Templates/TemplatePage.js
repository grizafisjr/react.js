import React, {Component} from 'react'
import TemplateList from './TemplateList'
import TemplateCreator from './TemplateCreator'
import PageComponent from '../../../PageComponent'
import Block from '../../../../OneUI/Block'
import { toast } from 'react-toastify'
import $ from 'jquery'

class TemplatePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showChoiceModal: false,
      showClosestModal: false,
      templates: [],
      toEdit: null
    }

    this.templateWithNameExists = this.templateWithNameExists.bind(this)
    this.addOrUpdateTemplate = this.addOrUpdateTemplate.bind(this)
    this.existingTemplateNames = this.existingTemplateNames.bind(this)
    this.setToEdit = this.setToEdit.bind(this)
    this.updateDataState = this.updateDataState.bind(this)
    this.deleteTemplate = this.deleteTemplate.bind(this)
    this.setShowChoiceModal = this.setShowChoiceModal.bind(this)
    this.setShowClosestModal = this.setShowClosestModal.bind(this)
  }

  componentDidMount () {
    this.props.startLoading()
    this.loadData()
  }

  loadData () {
    $.ajax({
      url: '/panel/betting/templates',
      dataType: 'json',
      type: 'GET',
      success: this.updateDataState,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.props.endLoading() }
    })
  }

  updateDataState (data) {
    if (data.success) {
      let templates = data.data
      this.setState({templates: templates})
    } else {
      toast.warn('error loading data from server')
    }
  }

  addOrUpdateTemplate (template) {
    let success = function (response) {
      if (!response.success) {
        toast.warn('error saving template')
      } else {
        let templates = this.state.templates
        if (this.templateWithNameExists(template.name)) {
          // update template with name
          templates.forEach(function (existingTemplate, index) {
            if (existingTemplate.name === template.name) {
              templates[index] = template
            }
          })
        } else {
          template.id = response.data.id
          template.user_id = response.user_id
          templates.push(template)
        }
        if (response.text) {
          toast.success(response.text)
          this.setState({showClosestModal: false, showChoiceModal: false})
        } else {
          toast.success('Action successful')
        }
        this.setState({templates: templates})
      }
    }.bind(this)

    // load id if template should be updated
    if (this.templateWithNameExists(template.name)) {
      template.id = this.getTemplateIDByName(template.name)
    }

    let data = {type: 'save', template: JSON.stringify(template)}

    // send to server as save
    $.ajax({
      url: '/panel/betting/templates',
      dataType: 'json',
      type: 'POST',
      data: data,
      success: success,
      error: () => { toast.error('Error sending request') }
    })
    // on response
    // success
    // save/update list
  }

  templateWithNameExists (name) {
    let templates = this.state.templates.filter(template => {
      return (template.name === name)
    })
    return (templates.length > 0)
  }

  getTemplateIDByName (name) {
    let id = null
    this.state.templates.forEach(function (template) {
      if (template.name === name) {
        id = template.id
      }
    })
    return id
  }

  existingTemplateNames () {
    let names = new Set()
    this.state.templates.forEach(template => { names.add(template.name) })
    return names
  }

  setToEdit (toEdit) {
    let showChoice = false
    let showClosest = false
    if (toEdit !== null) {
      if (toEdit.type === 'choice') {
        showChoice = true
      } else if (toEdit.type === 'closest') {
        showClosest = true
      }
      this.setState({toEdit: toEdit, showChoiceModal: showChoice, showClosestModal: showClosest})
    } else {
      this.setState({toEdit: toEdit})
    }
  }

  deleteTemplate (index) {
    let templateToDelete = this.state.templates[index]
    let id = templateToDelete.id
    let templates = this.state.templates

    let success = function (response) {
      if (response.success) {
        toast.success(response.text)
        templates.splice(index, 1)
        this.setState({templates: templates})
      } else {
        toast.warn(response.text)
      }
    }.bind(this)

    let data = {type: 'delete', id: id}
    $.ajax({
      url: '/panel/betting/templates',
      dataType: 'json',
      type: 'POST',
      data: data,
      success: success,
      error: () => { toast.error('Error sending request') }
    })
  }

  setShowChoiceModal (show) {
    this.setState({showChoiceModal: show})
  }

  setShowClosestModal (show) {
    this.setState({showClosestModal: show})
  }

  render () {
    let resetToEdit = function () {
      this.setToEdit(null)
    }.bind(this)

    return (
      <React.Fragment>
        <TemplateCreator templateWithNameExists={this.templateWithNameExists} existingTemplateNames={this.existingTemplateNames()}
          saveTemplate={this.addOrUpdateTemplate} toEdit={this.state.toEdit} resetToEdit={resetToEdit}
          showChoiceModal={this.state.showChoiceModal} showClosestModal={this.state.showClosestModal}
          setShowChoiceModal={this.setShowChoiceModal} setShowClosestModal={this.setShowClosestModal} />
        <Block>
          <button className='btn btn-primary pull-right' style={{marginBottom: 15}} onClick={() => { this.setShowClosestModal(true) }}>
            Add 'Closest' Template
          </button>
          <button className='btn btn-primary pull-right' style={{marginBottom: 15, marginRight: 5}} onClick={() => { this.setShowChoiceModal(true) }}>
            Add 'Choice' Template
          </button>
          <TemplateList templates={this.state.templates} setToEdit={this.setToEdit} deleteTemplate={this.deleteTemplate} />
        </Block>
      </React.Fragment>
    )
  }
}

export default PageComponent(TemplatePage)
