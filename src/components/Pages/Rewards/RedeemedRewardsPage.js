import React, { Component } from 'react'
import PageComponent from '../PageComponent'
import { toast } from 'react-toastify'
import $ from 'jquery'

class RedeemedRewardsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redemptions: []
    }
    this.deleteRedemption = this.deleteRedemption.bind(this)
    this.handleMountResponse = this.handleMountResponse.bind(this)
  }

  componentDidMount () {
    this.props.startLoading()
    $.ajax({
      type: 'GET',
      url: '/panel/getRedemptions',
      success: this.handleMountResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.props.endLoading() }
    })
  }

  handleMountResponse (response) {
    if (Array.isArray(response.redemptions)) {
      this.setState({redemptions: response.redemptions})
    } else {
      toast.error('Error loading data from server')
    }
  }

  deleteRedemption (id) {
    // TODO: Confirm delete popup
    let data = {
      action: 'remove',
      'ID': id
    }

    $.ajax({
      type: 'POST',
      data: data,
      url: '/panel/redeems',
      success: (response) => { this.handleDeleteResponse(response, id) },
      error: () => { toast.error('Error sending request') }
    })
  }

  handleDeleteResponse (response, id) {
    if (response.type !== 'success') {
      toast.warn(response.text)
      return
    }

    toast.success(response.text)

    let redemptions = Array.from(this.state.redemptions)
    let index = -1
    redemptions.find((rdmptn, i) => {
      if (rdmptn.id === id) {
        index = i
        return true
      }
      return false
    })
    if (index < 0) return
    redemptions.splice(index, 1)
    this.setState({redemptions: redemptions})
  }

  getRedemptionRow (redemption) {
    return <tr key={redemption.id}>
      <td style={{padding: 0}}><img src={redemption.imageUrl} width={50} height={50} alt={''} /></td>
      <td>{redemption.rewardTitle}</td>
      <td>{redemption.viewerName}</td>
      <td>{redemption.comment}</td>
      <td>{new Date(redemption.timestamp).toLocaleDateString() + ' - ' + new Date(redemption.timestamp).toLocaleTimeString()}</td>
      <td>
        <button className='btn btn-danger btn-delete' onClick={() => { this.deleteRedemption(redemption.id) }}>
          <i className='fa fa-trash icon-large' />
        </button>
      </td>
    </tr>
  }

  getRedemptions () {
    let redemptions = this.state.redemptions.map(redemption => this.getRedemptionRow(redemption))
    if (redemptions.length === 0) {
      return <tr><td colSpan={6}>No viewer has redeemed any rewards yet</td></tr>
    }
    return redemptions
  }

  render () {
    return <div className={'block' + (this.props.loading ? ' block-opt-refresh' : '')}>
      <div className={this.props.loading ? ' block-content' : ''} style={{padding: 0}}>
        <table id='redemptions-table' className='table table-striped table-borderless table-header-bg content-middle'
          style={{marginBottom: 0, 'boxShadow': '0 0 6px rgba(0,0,0,.1)', backgroundColor: 'white'}}>
          <thead>
            <tr>
              <th style={{width: 50}} />
              <th>Reward</th>
              <th>Viewer</th>
              <th>Message</th>
              <th>Redeemed at</th>
              <th style={{'width': 60}} />
            </tr>
          </thead>
          <tbody>
            {this.getRedemptions()}
          </tbody>
        </table>
      </div>
    </div>
  }
}

export default PageComponent(RedeemedRewardsPage)
