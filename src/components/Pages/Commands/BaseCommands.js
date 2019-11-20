import React, { PureComponent } from 'react'
import PageComponent from '../PageComponent'
import $ from 'jquery'
import { toast } from 'react-toastify'

class BaseCommands extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      pointsName: '',
      points: '',
      getvip: '',
      vipcost: ''
    }
    this.handleMountResponse = this.handleMountResponse.bind(this)
  }

  handleMountResponse (response) {
    if (typeof response.pointsName !== 'undefined') {
      this.setState({...response})
    } else {
      toast.error('Error loading data from server')
    }
  }

  componentDidMount () {
    this.props.startLoading()
    $.ajax({
      type: 'GET',
      url: '/panel/getCommands',
      success: this.handleMountResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.props.endLoading() }
    })
  }

  render () {
    return <React.Fragment>
      <h3>Points Module Commands</h3>
      <hr className='hr-dark' />
      <div className={'block' + (this.props.loading ? ' block-opt-refresh' : '')}>
        <div className={this.props.loading ? ' block-content' : ''} style={{padding: 0}}>
          <table className='table table-striped table-borderless table-header-bg'>
            <thead>
              <tr>
                <th style={{width: '20%'}}>Command</th>
                <th style={{width: '30%'}}>Parameters</th>
                <th style={{width: '50%'}}>Descpription</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{width: '20%'}}>{this.state.points}</td>
                <td style={{width: '20%'}} />
                <td style={{width: '20%'}}>Links to {this.state.pointsName} overview</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>!give</td>
                <td style={{width: '30%'}}>[name] [amount, all]</td>
                <td style={{width: '50%'}}>Transfers points to another user</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>!throw</td>
                <td style={{width: '30%'}}>[amount &gt;= 100, all]</td>
                <td style={{width: '50%'}}>Gives points randomly to users in channel</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <h3>VIP Commands</h3>
      <hr className='hr-dark' />
      <div className={'block' + (this.props.loading ? ' block-opt-refresh' : '')}>
        <div className={this.props.loading ? ' block-content' : ''} style={{padding: 0}}>
          <table className='table table-striped table-borderless table-header-bg'>
            <thead>
              <tr>
                <th style={{width: '20%'}}>command</th>
                <th style={{width: '30%'}}>Parameters</th>
                <th style={{width: '50%'}}>Descpription</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{width: '20%'}}>!vips</td>
                <td style={{width: '20%'}} />
                <td style={{width: '20%'}}>Links to VIP page</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>{this.state.vipcost}</td>
                <td style={{width: '30%'}} />
                <td style={{width: '50%'}}>Shows the cost of the next VIP-level in {this.state.pointsName}</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>{this.state.getvip}</td>
                <td style={{width: '30%'}} />
                <td style={{width: '50%'}}>Buys the next VIP-level for {this.state.pointsName}</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>!topbetters</td>
                <td style={{width: '30%'}} />
                <td style={{width: '50%'}}>Lists the top betters in certain categories (most bets, most {this.state.pointsName} won, most {this.state.pointsName} lost, etc)</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>!top10</td>
                <td style={{width: '30%'}} />
                <td style={{width: '50%'}}>Lists the 10 richest users</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3>Betting Commands</h3>
      <hr className='hr-dark' />
      <div className='block'>
        <table className='table table-striped table-borderless table-header-bg'>
          <thead>
            <tr>
              <th style={{width: '20%'}}>Command</th>
              <th style={{width: '30%'}}>Parameters</th>
              <th style={{width: '50%'}}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{width: '20%'}}>!bet</td>
              <td style={{width: '20%'}}>[amount, all] [option]</td>
              <td style={{width: '20%'}}>Places {this.state.pointsName} on an option if a bet is open</td>
            </tr>
            <tr>
              <td style={{width: '20%'}}>!quota <span className='label label-success'>available again</span></td>
              <td style={{width: '30%'}} />
              <td style={{width: '50%'}}>Shows the quota/multiplier when bet on win/lose</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Starcraft 2 Commands</h3>
      <hr className='hr-dark' />
      <div className='block'>
        <table className='table table-striped table-borderless table-header-bg'>
          <thead>
            <tr>
              <th style={{width: '20%'}}>Command</th>
              <th style={{width: '30%'}}>Parameters</th>
              <th style={{width: '50%'}}>Descpription</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{width: '20%'}}>!rank</td>
              <td style={{width: '20%'}} />
              <td style={{width: '20%'}}>Shows the streamers current rank</td>
            </tr>
            <tr>
              <td style={{width: '20%'}}>!matchup</td>
              <td style={{width: '30%'}} />
              <td style={{width: '50%'}}>Shows the current matchup if a game is running</td>
            </tr>
            <tr>
              <td style={{width: '20%'}}>!stats</td>
              <td style={{width: '30%'}} />
              <td style={{width: '50%'}}>Shows stats of the latest session</td>
            </tr>
          </tbody>
        </table>
      </div>

    </React.Fragment>
  }
}

export default PageComponent(BaseCommands)
