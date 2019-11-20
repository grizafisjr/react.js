import React, { PureComponent } from 'react'
import PageComponent from '../PageComponent'
import { Link } from 'react-router-dom'

class AdminCommands extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      pointsName: '',
      points: '',
      getvip: '',
      vipcost: ''
    }
  }

  render () {
    return <React.Fragment>
      <h3>Custom Commands</h3>
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
              <td style={{width: '20%'}}>!addcommand</td>
              <td style={{width: '20%'}}>[command][response]</td>
              <td style={{width: '20%'}}>Creates a command with a given response</td>
            </tr>
            <tr>
              <td style={{width: '20%'}}>!addwhispercommand</td>
              <td style={{width: '30%'}}>[command][response]</td>
              <td style={{width: '50%'}}>Creates a command with a given response that will be whispered back to the user</td>
            </tr>
            <tr>
              <td style={{width: '20%'}}>!removecommand</td>
              <td style={{width: '30%'}}>[command]</td>
              <td style={{width: '50%'}}>Deletes created command</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Points Module Commands</h3>
      <hr className='hr-dark' />
      <div className='block'>
        <div className='table-responsive'>
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
                <td style={{width: '20%'}}>!giveall</td>
                <td style={{width: '20%'}}>[amount]</td>
                <td style={{width: '20%'}}>Gives points to every user in the channel</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>!admingive</td>
                <td style={{width: '30%'}}>[name][amount]</td>
                <td style={{width: '50%'}}>Adds points to user</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>!modgive</td>
                <td style={{width: '30%'}}>[name][amount]</td>
                <td style={{width: '50%'}}>Adds points to user</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3>Points Module Commands</h3>
      <hr className='hr-dark' />
      <div className='block'>
        <div className='table-responsive'>
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
                <td style={{width: '20%'}}>!givevip</td>
                <td style={{width: '20%'}}>[name]</td>
                <td style={{width: '20%'}}>Gives 1 VIP-level to a user</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>!setvip</td>
                <td style={{width: '30%'}}>[name][level]</td>
                <td style={{width: '50%'}}>Sets the VIP-level of a user. Can't be negative</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3>Points Module Commands</h3>
      <hr className='hr-dark' />
      <div className='block'>
        <div className='table-responsive'>
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
                <td style={{width: '20%'}}>!startbet</td>
                <td style={{width: '20%'}}>[type]</td>
                <td style={{width: '20%'}}>Starts a bet. Available types are <strong>sc2</strong>, <strong>pubg </strong>(<Link to='/modules/betting/config'>read more</Link>). Blank type will start sc2 type bet.</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>!endbet</td>
                <td style={{width: '30%'}}>[winning option]</td>
                <td style={{width: '50%'}}>Ends a bet and rewards points to users who either <strong>chose the winning</strong> option (sc2 type) or are the <strong>closest</strong> to it (pubg type)</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>!cancelbet</td>
                <td style={{width: '30%'}} />
                <td style={{width: '50%'}}>Cancels a bet. Every user will get his placed Minerals returned</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>!win</td>
                <td style={{width: '30%'}} />
                <td style={{width: '50%'}}>Alias for !endbet win - Also used to resolve bets with no type/sc2 type</td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>!lose</td>
                <td style={{width: '30%'}} />
                <td style={{width: '50%'}}>Alias for !endbet lose - Also used to resolve bets with no type/sc2 type</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </React.Fragment>
  }
}

export default PageComponent(AdminCommands)
