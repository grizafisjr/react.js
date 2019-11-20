import React, { Component } from 'react'
import PageComponent from '../../PageComponent'
import Block from '../../../OneUI/Block'
import CommandCreator from './CommandCreator'
import Modal from 'react-bootstrap/lib/Modal'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { toast } from 'react-toastify'
import $ from 'jquery'

const inputFormatter = (cell, row) => {
  return cell ? 'yes' : 'no'
}

const defaultSorted = [{
  dataField: 'command',
  order: 'asc'
}]

class CustomCommandPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      saving: false,
      currentCommand: {
        command: '',
        response: '',
        cost: 0,
        vip: 0,
        permission: 0,
        whisper: false,
        input: false
      },
      commands: []
    }
    this.handleMountResponse = this.handleMountResponse.bind(this)
    this.commandExists = this.commandExists.bind(this)
    this.updateCurrentCommand = this.updateCurrentCommand.bind(this)
    this.saveCommand = this.saveCommand.bind(this)
    this.handleSaveResponse = this.handleSaveResponse.bind(this)
    this.deleteCommand = this.deleteCommand.bind(this)
    this.handleDeleteResponse = this.handleDeleteResponse.bind(this)
    this.loadCommandToEdit = this.loadCommandToEdit.bind(this)
    this.actionsFormatter = this.actionsFormatter.bind(this)
    this.onAddCommand = this.onAddCommand.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount () {
    this.props.startLoading()
    $.ajax({
      type: 'GET',
      url: '/panel/commands/custom',
      success: this.handleMountResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.props.endLoading() }
    })
  }

  handleMountResponse (response) {
    if (Array.isArray(response.commands)) {
      this.setState({commands: response.commands})
    } else {
      toast.error('Error loading data from server')
    }
  }

  getPermissionString (permissionLevel) {
    switch (permissionLevel) {
      case 0:
        return 'Everyone'
      case 1:
        return 'Moderators'
      case 2:
        return 'Channel Owner'
      default:
        return 'Channel Owner'
    }
  }

  createCommandRow (command, index) {
    return <tr key={command.command}>
      <td>{command.command}</td>
      <td>{command.response} </td>
      <td>{command.cost}</td>
      <td>{command.vip}</td>
      <td>{this.getPermissionString(command.permission)}</td>
      {/* <td>{command.whisper ? 'yes' : 'no'}</td> */}
      <td>{command.input ? 'yes' : 'no'}</td>
      <td className='pull-right'>
        <button className='btn btn-primary' style={{marginRight: 5}} onClick={() => { this.loadCommandToEdit(index) }}><i className='fa fa-edit icon-large' /></button>
        <button className='btn btn-danger' onClick={() => { this.deleteCommand(command.command) }}><i className='fa fa-trash-alt icon-large' /></button>
      </td>
    </tr>
  }

  getCommands () {
    let commands = this.state.commands.map((command, index) => this.createCommandRow(command, index))
    if (commands.length === 0) {
      return <tr><td colSpan={7}>Created commands will be shown here</td></tr>
    }
    return commands
  }

  commandExists (commandName) {
    let found = this.state.commands.find(command => command.command === commandName)
    return !!found
  }

  updateCurrentCommand (newCommand) {
    this.setState({currentCommand: newCommand})
  }

  saveCommand () {
    let command = Object.assign({}, this.state.currentCommand)
    let data = Object.assign({}, this.state.currentCommand)
    data.action = 'add'

    this.setState({saving: true})

    $.ajax({
      type: 'POST',
      data: data,
      url: '/panel/commands/custom',
      success: (response) => { this.handleSaveResponse(response, command) },
      error: () => { toast.error('Error sending request') },
      complete: () => { this.setState({saving: false}) }
    })
  }

  handleSaveResponse (response, command) {
    if (response.type !== 'success') {
      toast.warn(response.text)
      return
    }
    toast.success(response.text)

    let commands = Array.from(this.state.commands)
    let existingCommand = commands.find(cmd => cmd.command === command.command)
    if (existingCommand) {
      Object.assign(existingCommand, command)
    } else {
      commands.push(command)
    }
    this.setState({commands: commands, showModal: false})
  }

  deleteCommand (command) {
    // TODO: Confirm delete popup
    let data = {
      action: 'remove',
      command: command
    }

    $.ajax({
      type: 'POST',
      data: data,
      url: '/panel/commands/custom',
      success: (response) => { this.handleDeleteResponse(response, command) },
      error: () => { toast.error('Error sending request') }
    })
  }

  handleDeleteResponse (response, command) {
    if (response.type !== 'success') {
      toast.warn(response.text)
      return
    }

    toast.success(response.text)

    let commands = Array.from(this.state.commands)
    let index = -1
    commands.find((cmd, i) => {
      if (cmd.command === command) {
        index = i
        return true
      }
      return false
    })
    if (index < 0) return
    commands.splice(index, 1)
    this.setState({commands: commands, showModal: false})
  }

  loadCommandToEdit (index) {
    let command = Object.assign({}, this.state.commands[index])
    this.setState({currentCommand: command, showModal: true})
  }

  actionsFormatter (cell, row) {
    return <div>
      <button className='btn btn-primary' style={{marginRight: 5}} onClick={() => { this.loadCommandToEdit(row.id) }}><i className='fa fa-edit icon-large' /></button>
      <button className='btn btn-danger' onClick={() => { this.deleteCommand(row.command) }}><i className='fa fa-trash-alt icon-large' /></button>
    </div>
  }

  getTableColumns () {
    return [{
      dataField: 'id',
      text: 'Product ID',
      sort: true,
      hidden: true,
      classes: 'column-id'
    }, {
      dataField: 'command',
      text: 'Command',
      sort: true
    }, {
      dataField: 'response',
      text: 'Response',
      sort: true
    }, {
      dataField: 'cost',
      text: 'Cost',
      sort: true
    }, {
      dataField: 'vip',
      text: 'REQUIRED VIP-LEVEL',
      sort: true
    }, {
      dataField: 'permission',
      text: 'PERMISSION LEVEL',
      sort: true
    }, {
      dataField: 'input',
      text: 'Allows Input',
      sort: true,
      formatter: inputFormatter
    }, {
      dataField: 'actions',
      classes: 'table-actions-double',
      formatter: this.actionsFormatter
    }]
  }

  getTable () {
    return <BootstrapTable keyField='id' data={this.getTableData()} columns={this.getTableColumns()}
      striped hover bordered={false}
      noDataIndication='Created commands will be shown here' classes='table-header-bg'
      pagination={paginationFactory()} defaultSorted={defaultSorted} />
  }

  getTableData () {
    let data = []

    Array.from(this.state.commands).forEach((command, index) => {
      command.id = index
      data.push(command)
    })

    return data
  }

  canSaveCommand () {
    let command = this.state.currentCommand
    if (!command.command) {
      return false
    }
    if (!command.response) {
      return false
    }
    return true
  }

  onAddCommand () {
    let currentCommand = {
      command: '',
      response: '',
      cost: 0,
      vip: 0,
      permission: 0,
      whisper: false,
      input: false
    }
    this.setState({showModal: true, currentCommand: currentCommand})
  }

  closeModal () {
    this.setState({showModal: false})
  }

  render () {
    let commandExists = this.commandExists(this.state.currentCommand.command)
    let canSaveOrUpdate = this.canSaveCommand()

    return <React.Fragment>
      <Modal className={'block block-themed block-transparent remove-margin-b'} show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Header closeButton className={'block-header bg-primary-dark'}>
          <Modal.Title><h3 className={'block-title'}>{commandExists ? 'Update Command' : 'Create Command'}</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CommandCreator commandExists={commandExists} currentCommand={this.state.currentCommand} updateCurrentCommand={this.updateCurrentCommand} />
        </Modal.Body>
        <Modal.Footer>
          {this.state.saving
            ? <button className={'btn btn-success'} disabled><span className='fa fa-spinner fa-spin' /> Saving</button>
            : <button className='btn btn-success' onClick={this.saveCommand} disabled={!canSaveOrUpdate}>
              {commandExists ? 'Update' : 'Create'}
            </button>}
          {commandExists && <button className='btn btn-danger' onClick={() => { this.deleteCommand(this.state.currentCommand.command) }} style={{marginLeft: 5}}>Delete</button>}
          <button className={'btn btn-primary'} onClick={this.closeModal}>Close</button>
        </Modal.Footer>
      </Modal>

      <Block loading={this.props.loading}>
        <button className={'btn btn-primary pull-right'} style={{marginBottom: 20}} onClick={this.onAddCommand}><span className='fa fa-plus' /> Add Command</button>
        {this.getTable()}
      </Block>
    </React.Fragment>
  }
}

export default PageComponent(CustomCommandPage)
