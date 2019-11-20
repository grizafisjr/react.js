import React, { Component } from 'react'
import PageComponent from '../PageComponent'
import RewardsCreator from './RewardsCreator'
import Block from '../../OneUI/Block'
import Modal from 'react-bootstrap/lib/Modal'
import { toast } from 'react-toastify'
import $ from 'jquery'

class RewardsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCreate: false,
      showEdit: false,
      saving: false,
      newReward: {
        'title': 'Wave at you',
        'command': '!wave',
        'response': 'o/ $user',
        'imageUrl': 'https://cdn2.iconfinder.com/data/icons/hands-gestures/512/Gesture_Hand_Palm_Wave_Waving_Bye_Wavinghand1-512.png',
        'description': "This reward will make me wave at the cam for you. That's all it does. It's silly.",
        'cost': 50,
        'vip': 0,
        'permission': 0,
        'enabled': true,
        'username': 'holly1337'
      },
      rewards: [/*
        {
          'cost': 50,
          'response': 'o/ $user',
          'imageUrl': 'https://cdn2.iconfinder.com/data/icons/hands-gestures/512/Gesture_Hand_Palm_Wave_Waving_Bye_Wavinghand1-512.png',
          'description': "This reward will make me wave at the cam for you. Thats all it does. It's silly.",
          'permission': 0,
          'id': 45,
          'title': 'Wave at you',
          'vip': 0,
          'command': '!wave',
          'enabled': true,
          'username': 'holly1337'
        },
        {
          'cost': 300,
          'response': "$user requested a song, let's hope it doesn't suck!",
          'imageUrl': 'https://cdn2.iconfinder.com/data/icons/game-center-mixed-icons/512/song.png',
          'description': 'Once you request a song I will try to play it as soon as possible.',
          'permission': 0,
          'id': 46,
          'title': 'Request a song',
          'vip': 0,
          'command': '!request',
          'enabled': true,
          'username': 'holly1337'
        },
        {
          'cost': 1000,
          'response': '$user wants to fight Holly1337',
          'imageUrl': 'http://daily-heroic.de/wp-content/uploads/2015/03/sc2lotv.png',
          'description': "Fight me in an epic battle. Show your skills in one of the most epic multiplayer games of all time. Don't cheese or I will hate you!",
          'permission': 0,
          'id': 43,
          'title': 'A game of Starcraft 2',
          'vip': 0,
          'command': '!fight',
          'enabled': true,
          'username': 'holly1337'
        } */
      ]
    }
    this.updateNewReward = this.updateNewReward.bind(this)
    this.showCreateModal = this.showCreateModal.bind(this)
    this.showEditModal = this.showEditModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleMountResponse = this.handleMountResponse.bind(this)
    this.createNewReward = this.createNewReward.bind(this)
    this.handleCreateResponse = this.handleCreateResponse.bind(this)
    this.updateExistingReward = this.updateExistingReward.bind(this)
    this.handleUpdateResponse = this.handleUpdateResponse.bind(this)
    this.handleDeleteResponse = this.handleDeleteResponse.bind(this)
  }

  componentDidMount () {
    this.props.startLoading()
    $.ajax({
      type: 'GET',
      url: '/panel/getRewards',
      success: this.handleMountResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.props.endLoading() }
    })
  }

  handleMountResponse (response) {
    if (Array.isArray(response.rewards)) {
      this.setState({rewards: response.rewards})
    } else {
      toast.error('Error loading data from server')
    }
  }

  showCreateModal () {
    let newReward = {
      'title': '',
      'command': '!',
      'response': '',
      'imageUrl': '',
      'description': '',
      'cost': 0,
      'vip': 0,
      'permission': 0,
      'enabled': true
    }
    this.setState({showCreate: true, newReward: newReward})
  }

  showEditModal () {
    this.setState({showEdit: true})
  }

  closeModal () {
    this.setState({showCreate: false, showEdit: false})
  }

  updateNewReward (newData) {
    this.setState({newReward: newData})
  }

  getRewardByCommand (command) {
    return this.state.rewards.find(reward => reward.command === command)
  }

  rewardExists (command) {
    return !!this.getRewardByCommand(command)
  }

  onEditReward (reward) {
    let newReward = Object.assign({}, reward)
    this.setState({newReward: newReward, showEdit: true})
  }

  createNewReward () {
    let reward = Object.assign({}, this.state.newReward)
    let data = Object.assign({}, this.state.newReward)
    data.image_url = this.state.newReward.imageUrl
    data.action = 'add'

    this.setState({saving: true})

    $.ajax({
      type: 'POST',
      url: '/panel/rewards',
      data: data,
      success: (response) => { this.handleCreateResponse(response, reward) },
      error: () => { toast.error('Error sending request') },
      complete: () => { this.setState({saving: false}) }
    })
  }

  handleCreateResponse (response, reward) {
    if (response.type === 'success') {
      let rewards = Array.from(this.state.rewards)
      reward.id = response.data
      rewards.push(reward)
      toast.success(response.text)
      this.setState({rewards: rewards, showCreate: false})
    } else {
      toast.warn(response.text)
    }
  }

  updateExistingReward () {
    let reward = Object.assign({}, this.state.newReward)
    let data = Object.assign({}, this.state.newReward)
    data.ID = reward.id
    data.image_url = reward.imageUrl
    data.action = 'update'

    this.setState({saving: true})

    $.ajax({
      type: 'POST',
      url: '/panel/rewards',
      data: data,
      success: (response) => { this.handleUpdateResponse(response, reward) },
      error: () => { toast.error('Error sending request') },
      complete: () => { this.setState({saving: false}) }
    })
  }

  handleUpdateResponse (response, reward) {
    if (response.type !== 'success') {
      toast.warn(response.text)
      return
    }
    let rewards = Array.from(this.state.rewards)
    let toUpdate = rewards.find(rwrd => rwrd.id === reward.id)
    Object.assign(toUpdate, reward)
    toast.success(response.text)
    this.setState({rewards: rewards, showEdit: false})
  }

  deleteReward (id) {
    $.ajax({
      type: 'POST',
      url: '/panel/rewards',
      data: {action: 'remove', ID: id},
      success: (response) => { this.handleDeleteResponse(response, id) },
      error: () => { toast.error('Error sending request') }
    })
  }

  handleDeleteResponse (response, id) {
    if (response.type !== 'success') {
      toast.warn(response.text)
      return
    }
    let rewards = Array.from(this.state.rewards)
    let index = -1
    rewards.forEach((rwrd, i) => {
      if (rwrd.id === id) {
        index = i
      }
    })
    if (index < 0) return

    rewards.splice(index, 1)
    toast.success(response.text)
    this.setState({rewards: rewards, showEdit: false, showCreate: false})
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

  createRewardRow (reward) {
    return <tr key={reward.id}>
      <td style={{padding: 0}}>
        <img src={reward.imageUrl ? reward.imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Human-emblem-star-black-128.png'} width='50' height='50' alt='' />
      </td>
      <td>{reward.title}</td>
      <td>{reward.command}</td>
      <td>{reward.response}</td>
      <td>{reward.description}</td>
      <td>{reward.cost}</td>
      <td>{reward.vip}</td>
      <td>{this.getPermissionString(reward.permission)}</td>
      <td>
        <button className='btn btn-primary' style={{marginRight: 5}} onClick={() => { this.onEditReward(reward) }}>
          <i className='fa fa-edit icon-large' />
        </button>
        <button className='btn btn-danger' onClick={() => { this.deleteReward(reward.id) }}>
          <i className='fa fa-trash icon-large' />
        </button>
      </td>
    </tr>
  }

  getRewardRows () {
    let rows = this.state.rewards.map(reward => this.createRewardRow(reward))
    if (rows.length === 0) {
      return <tr><td colSpan={9}>No rewards created yet</td></tr>
    }
    return rows
  }

  canSave () {
    if (!this.state.newReward.title) {
      return false
    }
    if (!this.state.newReward.command) {
      return false
    }
    return true
  }

  render () {
    let saveReward = () => {}
    if (this.state.showCreate) {
      saveReward = this.createNewReward
    } else if (this.state.showEdit) {
      saveReward = this.updateExistingReward
    }

    return <React.Fragment>
      <Block loading={this.props.loading}>
        <div style={{display: 'block'}}>
          <button className='btn btn-primary pull-right' style={{marginBottom: 15}} onClick={this.showCreateModal}>
            <span className='fa fa-plus' /> Add Reward
          </button>
        </div>

        <table id='rewards-table' className='table table-striped table-borderless table-header-bg content-middle'
          style={{marginBottom: 0, 'boxShadow': '0 0 6px rgba(0,0,0,.1)', backgroundColor: 'white'}}>
          <thead>
            <tr>
              <th style={{width: 50}} />
              <th>Title</th>
              <th>Command</th>
              <th>Response</th>
              <th>Description</th>
              <th>Cost</th>
              <th>VIP</th>
              <th>Permission</th>
              <th style={{minWidth: 105}} />
            </tr>
          </thead>
          <tbody>
            {this.getRewardRows()}
          </tbody>
        </table>
      </Block>

      <Modal className={'block block-themed block-transparent remove-margin-b'} show={this.state.showCreate || this.state.showEdit} onHide={this.closeModal}>
        <Modal.Header closeButton className={'block-header bg-primary-dark'}>
          <Modal.Title><h3 className={'block-title'}>{this.state.showCreate ? 'Create Reward' : 'Update Reward'}</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RewardsCreator data={this.state.newReward} updateNewReward={this.updateNewReward} saving={this.state.saving}
            create={this.state.showCreate} edit={this.state.showEdit} saveReward={saveReward} />
        </Modal.Body>
        <Modal.Footer>
          {this.state.saving
            ? <button className='btn btn-primary' disabled><span className='fa fa-spinner fa-spin' /> Saving</button>
            : <button className='btn btn-success' onClick={saveReward} disabled={!this.canSave()}>{this.state.showEdit ? 'Update' : 'Create'}</button>}
          {this.state.showEdit && <button className='btn btn-danger' onClick={() => { this.deleteReward(this.state.newReward.id) }}>Delete</button>}
          <button className={'btn btn-primary'} onClick={this.closeModal}>Close</button>
        </Modal.Footer>
      </Modal>

    </React.Fragment>
  }
}

export default PageComponent(RewardsPage)
