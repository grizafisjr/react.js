import React, { Component } from 'react'
import PageComponent from '../../PageComponent'
import Modal from 'react-bootstrap/lib/Modal'
import Block from '../../../OneUI/Block'
import { toast } from 'react-toastify'
import $ from 'jquery'

class CounterCommandPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      newCounterName: '',
      counters: [],
      saving: false
    }
    this.handleMountResponse = this.handleMountResponse.bind(this)
    this.onNewCounterNameChange = this.onNewCounterNameChange.bind(this)
    this.saveCounter = this.saveCounter.bind(this)
    this.handleSaveResponse = this.handleSaveResponse.bind(this)
    this.deleteCounter = this.deleteCounter.bind(this)
    this.handleDeleteResponse = this.handleDeleteResponse.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.showCreateCounter = this.showCreateCounter.bind(this)
  }

  componentDidMount () {
    this.props.startLoading()
    $.ajax({
      type: 'GET',
      url: '/panel/getCounters',
      success: this.handleMountResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.props.endLoading() }
    })
  }

  handleMountResponse (response) {
    if (Array.isArray(response.counters)) {
      this.setState({counters: response.counters})
    } else {
      toast.error('Error loading data from server')
    }
  }

  onNewCounterNameChange (e) {
    let newCounter = e.target.value
    newCounter = newCounter.replace(/\s/g, '')
    this.setState({newCounterName: newCounter})
  }

  getCounterRow (counter, index) {
    return <tr key={counter['counter-name']}>
      <td>{counter['counter-name']}</td>
      <td>{counter.value}</td>
      <td>{counter.default}</td>
      <td><a href={counter.path}>paulobot.com{counter.path}</a></td>
      <td>{counter.commands}</td>
      <td>
        <button className='btn btn-danger' onClick={() => { this.deleteCounter(counter['counter-name']) }}><i className='fa fa-trash icon-large' /></button>
      </td>
    </tr>
  }

  getCounterRows () {
    let rows = this.state.counters.map((counter, index) => this.getCounterRow(counter, index))
    if (rows.length > 0) return rows
    return <tr><td colSpan={6}>Created counters will be shown here</td></tr>
  }

  counterExists (counterName) {
    let counter = this.state.counters.find(counter => counter['counter-name'] === counterName)
    return !!counter
  }

  saveCounter () {
    let newCounterName = this.state.newCounterName
    let data = {
      action: 'add',
      'counter-name': newCounterName,
      'init_val': 0
    }

    this.setState({saving: true})
    $.ajax({
      type: 'POST',
      data: data,
      url: '/panel/updateCounters',
      success: this.handleSaveResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.setState({saving: false}) }
    })
  }

  handleSaveResponse (response) {
    if (response.type !== 'success') {
      toast.warn(response.text)
      return
    }
    toast.success(response.text)

    let counters = Array.from(this.state.counters)
    if (typeof response.data !== 'undefined') {
      counters.push(response.data)
      this.setState({counters: counters, showModal: false})
    } else {
      toast.warn('Error loading data of new counter from server. Please refresh the page')
    }
  }

  deleteCounter (name) {
    // TODO: Confirm delete popup
    let data = {
      action: 'remove',
      'counter-name': name
    }

    $.ajax({
      type: 'POST',
      data: data,
      url: '/panel/updateCounters',
      success: (response) => { this.handleDeleteResponse(response, name) },
      error: () => { toast.error('Error sending request') }
    })
  }

  handleDeleteResponse (response, name) {
    if (response.type !== 'success') {
      toast.warn(response.text)
      return
    }

    toast.success(response.text)

    let counters = Array.from(this.state.counters)
    let index = -1
    counters.find((cntr, i) => {
      if (cntr['counter-name'] === name) {
        index = i
        return true
      }
      return false
    })
    if (index < 0) return
    counters.splice(index, 1)
    this.setState({counters: counters})
  }

  canSave () {
    let name = this.state.newCounterName
    if (typeof name === 'undefined' || name === '' || name === null) {
      return false
    }
    return !this.counterExists(this.state.newCounterName)
  }

  showCreateCounter () {
    this.setState({showModal: true, newCounterName: ''})
  }

  closeModal () {
    this.setState({showModal: false})
  }

  render () {
    let canSave = this.canSave()

    return <React.Fragment>

      <Modal className={'block block-themed block-transparent remove-margin-b'} show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Header closeButton className={'block-header bg-primary-dark'}>
          <Modal.Title><h3 className={'block-title'}>Create Counter</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-horizontal'>
            <div className='form-group'>
              <div className='col-md-12'>
                <div className={'form-material' + (!canSave ? ' has-error' : '')}>
                  <input className='form-control' type='text' name='title' id='title' required='required' value={this.state.newCounterName} onChange={this.onNewCounterNameChange} />
                  <label htmlFor='title'>Name</label>
                  <div className='help-block'>Name of the counter</div>
                </div>
              </div>
              <div className='col-md-12'>
                <p />
                <ul style={{paddingLeft: 15}}>
                  <li>Increase with <span className='label label-primary'>![countername]</span> or <span className='label label-primary'>![countername] [amount]</span></li>
                  <li>Decrease with <span className='label label-primary'>!dec[countername]</span> or <span className='label label-primary'>!dec[countername] [amount]</span> or <span className='label label-primary'>![countername] [negative amount]</span></li>
                  <li>Reset with <span className='label label-primary'>!reset[countername]</span></li>
                </ul>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {this.state.saving
            ? <button className='btn btn-primary' disabled><span className='fa fa-spinner fa-spin' /> Saving</button>
            : <button className='btn btn-success' onClick={this.saveCounter} disabled={!canSave}>Create</button>}
          <button className={'btn btn-primary'} onClick={this.closeModal}>Close</button>
        </Modal.Footer>
      </Modal>

      <Block loading={this.props.loading}>
        <button className='btn btn-primary pull-right' onClick={this.showCreateCounter} style={{marginBottom: 15}}>
          <span className='fa fa-plus' />Add Counter
        </button>
        <table className='table table-striped table-borderless table-header-bg content-middle' style={{marginBottom: 0, 'boxShadow': '0 0 6px rgba(0,0,0,.1)', backgroundColor: 'white'}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Value</th>
              <th>Default Value</th>
              <th>path</th>
              <th>commands</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.getCounterRows()}
          </tbody>
        </table>
      </Block>

    </React.Fragment>
  }
}

export default PageComponent(CounterCommandPage)
