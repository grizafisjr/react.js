import React, { Component } from 'react'
import PageComponent from '../PageComponent'
import Block from './../../OneUI/Block'
import $ from 'jquery'
import { toast } from 'react-toastify'

class Starcraft extends Component {
  // TODO: split in Settings, MMR Overlay, Title Updater and HonyHelper
  constructor (props) {
    super(props)

    this.state = {
      'sc2-check': true,
      'sc2-region': 'eu',
      'sc2-id': '',
      'sc2-race': 'protoss',
      'sc2-name': '',
      'sc2-token': '{token not loaded}',
      'sc2-title-ingame': '',
      'sc2-title-menu': '',
      'sc2-show-games': false,
      'sc2-title-check': false,
      'saving': false,
      'testing': false
    }
    this.toggleEnabled = this.toggleEnabled.bind(this)
    this.saveSettings = this.saveSettings.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.handleMountResponse = this.handleMountResponse.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
    this.onProfileIDChange = this.onProfileIDChange.bind(this)
    this.onRaceChange = this.onRaceChange.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.toggleTitleUpdating = this.toggleTitleUpdating.bind(this)
    this.onTitleIngameChange = this.onTitleIngameChange.bind(this)
    this.onTitleMenuChange = this.onTitleMenuChange.bind(this)
    this.toggleShowGames = this.toggleShowGames.bind(this)
    this.testProfile = this.testProfile.bind(this)
  }

  handleResponse (response) {
    if (typeof response === 'string') {
      response = JSON.parse(response)
    }
    if (response.type === 'success') {
      toast.success(response.text)
    } else {
      toast.warn(response.text)
    }
  }

  handleMountResponse (response) {
    if (typeof response['sc2-check'] !== 'undefined') {
      this.setState({...response})
    } else {
      toast.error('Error loading data from server')
    }
  }

  componentDidMount () {
    this.props.startLoading()
    $.ajax({
      type: 'GET',
      url: '/panel/getSC2SettingsData',
      success: this.handleMountResponse,
      error: () => { toast.error('Error sending request') },
      complete: () => { this.props.endLoading() }
    })
  }

  toggleEnabled () {
    this.setState({'sc2-check': !this.state['sc2-check']})
  }

  onRegionChange (event) {
    this.setState({'sc2-region': event.target.value})
  }

  onProfileIDChange (event) {
    this.setState({'sc2-id': event.target.value})
  }

  onRaceChange (event) {
    this.setState({'sc2-race': event.target.value})
  }

  onNameChange (event) {
    this.setState({'sc2-name': event.target.value})
  }

  onTitleIngameChange (event) {
    this.setState({'sc2-title-ingame': event.target.value})
  }

  onTitleMenuChange (event) {
    this.setState({'sc2-title-menu': event.target.value})
  }

  toggleTitleUpdating () {
    this.setState({'sc2-title-check': !this.state['sc2-title-check']})
  }

  toggleShowGames () {
    this.setState({'sc2-show-games': !this.state['sc2-show-games']})
  }

  areSettingsValid () {
    if (!['eu', 'na'].includes(this.state['sc2-region'])) {
      return {'error': 'Selected region is not available'}
    }
    if (!['protoss', 'terran', 'zerg', 'random'].includes(this.state['sc2-race'])) {
      return {'error': 'Selected race is not available'}
    }
    return true
  }

  saveSettings () {
    let settingsValid = this.areSettingsValid()
    if (settingsValid !== true) {
      toast.warn(settingsValid.error)
      return
    }
    let data = {
      'sc2-check': this.state['sc2-check'] ? 'on' : 'off',
      'sc2-region': this.state['sc2-region'],
      'sc2-id': this.state['sc2-id'],
      'sc2-race': this.state['sc2-race'],
      'sc2-name': this.state['sc2-name'],
      'sc2-title-ingame': this.state['sc2-title-ingame'],
      'sc2-title-menu': this.state['sc2-title-menu'],
      'sc2-show-games': this.state['sc2-show-games'] ? 'on' : 'off',
      'sc2-title-check': this.state['sc2-title-check'] ? 'on' : 'off'
    }
    this.setState({saving: true})
    $.ajax({
      type: 'POST',
      data: data,
      url: '/panel/sc2',
      success: this.handleResponse,
      error: () => { toast.error('Error sending request to save settings') },
      complete: () => { this.setState({saving: false}) }
    })
  }

  testProfile () {
    let data = {
      'sc2-region': this.state['sc2-region'],
      'sc2-id': this.state['sc2-id'],
      'sc2-race': this.state['sc2-race'],
      'sc2-name': this.state['sc2-name']
    }
    this.setState({testing: true})
    $.ajax({
      type: 'POST',
      data: data,
      url: '/panel/sc2/test',
      success: this.handleResponse,
      error: () => { toast.error('Error sending request to test profile') },
      complete: () => { this.setState({testing: false}) }
    })
  }

  render () {
    let tableStyle = {marginBottom: 0}
    return <React.Fragment>
      <Block header='Configuration' dark narrow loading={this.props.loading}>
        <div className='form-horizontal'>
          <div className='form-group'>
            <div className='col-xs-12'>
              <label className='css-input switch switch-success'>
                <input id='sc2-check' name='sc2-check' type='checkbox' checked={this.state['sc2-check']} onChange={this.toggleEnabled} /><span />
                <div className='help-block'>Enables the Module</div>
              </label>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <div className='form-material'>
                <select className='form-control' id='sc2-region' name='sc2-region' value={this.state['sc2-region']} onChange={this.onRegionChange}>
                  <option value='eu'>Europe</option>
                  <option value='na'>US</option>
                </select>
                <label htmlFor='sc2-region'>Region</label>
                <div className='help-block'>The region you play in (currently only Europe and US are supported)</div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <div className='form-material'>
                <input className='form-control' type='text' id='sc2-id' name='sc2-id' required='required' placeholder='283478' value={this.state['sc2-id']} onChange={this.onProfileIDChange} />
                <label htmlFor='sc2-id'>Profile ID</label>
                <div className='help-block'>How to find your profile ID: Log into <a href='http://battle.net/sc2'>battle.net/sc2</a>, go to your profile, copy the number after profile. Example: http://eu.battle.net/sc2/en/profile/<strong>283478</strong>/1/Holly/</div>
                <div className='help-block'>Your profile ID is different for every region</div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <div className='form-material'>
                <select className='form-control' id='sc2-race' name='sc2-race' value={this.state['sc2-race']} onChange={this.onRaceChange}>
                  <option value='protoss'>Protoss</option>
                  <option value='terran'>Terran</option>
                  <option value='zerg'>Zerg</option>
                  <option value='random'>Random</option>
                </select>
                <label htmlFor='sc2-race'>Race</label>
                <div className='help-block'>The race you play (zerg, protoss, terran, random)</div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <div className='form-material'>
                <input className='form-control' type='text' id='sc2-name' name='sc2-name' required='required' placeholder='TheDestroyer' value={this.state['sc2-name']} onChange={this.onNameChange} />
                <label htmlFor='sc2-name'>Name</label>
                <div className='help-block'>Your Starcraft 2 ingame name</div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <div className='form-material'>
                <input className='form-control' type='text' id='sc2-token' name='sc2-token' placeholder='' value={this.state['sc2-token']} />
                <label htmlFor='sc2-name'>HonyHelper Token - <span className='text-danger'>Do not give this to anyone!</span></label>
                <div className='help-block'>Your HonyHelper Token - download HonyHelper <a href='#honyhelper'>here</a></div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-xs-12'>
              <label className='css-input switch switch-success'>
                <input id='sc2-title-check' name='sc2-title-check' type='checkbox' checked={this.state['sc2-title-check']} onChange={this.toggleTitleUpdating} /><span />
                <div className='help-block'><span className='text-danger'>HonyHelper required!</span> Enables automatic stream-title updating every 2 minutes (only supports 1on1)</div>
              </label>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <div className='form-material'>
                <input className='form-control' type='text' id='sc2-title-ingame' name='sc2-title-ingame' required='required' placeholder='' value={this.state['sc2-title-ingame']} onChange={this.onTitleIngameChange} />
                <label htmlFor='sc2-title-menu'>Title when ingame</label>
                <div className='help-block'>This title will be set when you are in a game or replay (see below for examples)</div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <div className='form-material'>
                <input className='form-control' type='text' id='sc2-title-menu' name='sc2-title-menu' required='required' placeholder='' value={this.state['sc2-title-menu']} onChange={this.onTitleMenuChange} />
                <label htmlFor='sc2-title-ingame'>Title when in menu</label>
                <div className='help-block'>This title will be set when you are not in game or in a replay (see below for examples)</div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-xs-12'>
              <label className='css-input switch switch-success'>
                <input id='sc2-show-games' name='sc2-show-games' type='checkbox' checked={this.state['sc2-show-games']} onChange={this.toggleShowGames} /><span />
                <div className='help-block'>Make your history of games played with HonyHelper available for everyone to view on the website</div>
              </label>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-9'>
              {this.state.testing
                ? <button className='btn btn-warning' style={{marginRight: 5}}><span className='fa fa-spinner fa-spin' /> Testing</button>
                : <button className='btn btn-warning' style={{marginRight: 5}} onClick={this.testProfile}>Test Profile</button>}
              {this.state.saving
                ? <button className='btn btn-primary'><span className='fa fa-spinner fa-spin' /> Saving</button>
                : <button className='btn btn-primary' onClick={this.saveSettings}>Submit</button>}

            </div>
          </div>

        </div>
      </Block>

      <Block header={'MMR PROGRESSION OVERLAY'} secondary='only works with a valid sc2 profile' dark loading={this.props.loading}>
        <div className='block-content'>
          <img className='img-responsive' style={{'maxWidth': '200px'}} src='http://images.PauloBot.com/sc/mmr-overlay.jpg' alt='' />
          <h4><a href={'https://www.PauloBot.com/mmr/' + this.state['sc2-token']}>{'https://www.PauloBot.com/mmr/' + this.state['sc2-token']}</a></h4>
          <p>Just add this link to your OBS (or streaming software of your choice) as Browser Source</p>
          <p>height: 350px, width: 200px works best</p>
        </div>
      </Block>

      <Block header='Title Examples' dark>
        <div className='table-responsive'>
          <table className='table table-striped table-borderless table-header-bg' style={tableStyle}>
            <thead>
              <tr>
                <th>Input</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>$L $tier $PR - Ladder and Chill vs $opp</div>
                </td>
                <td>
                  <div>Diamond 3 Terran - Ladder and Chill vs TheDestroyer</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>[$status] $mmr mmr Protoss - $mu vs $opp at $time minutes</div>
                </td>
                <td>
                  <div>[Replay] 3870 mmr Protoss - TvP vs TheDestroyer at 9 minutes</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>[$status] $mmr mmr Protoss waiting for next match</div>
                </td>
                <td>
                  <div>[Menu] 3870 mmr Protoss waiting for next match</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block header='Possible title parameters' dark>
        <div className='table-responsive'>
          <table className='table table-striped table-borderless table-header-bg' style={tableStyle}>
            <thead>
              <tr>
                <th style={{width: '10%'}}>What</th>
                <th style={{width: '10%'}}>How</th>
                <th style={{width: '10%'}}>Example</th>
                <th style={{width: '15%'}}>Availability</th>
                <th style={{width: '60%'}}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{width: '10%'}}>League</td>
                <td style={{width: '10%'}}>$L</td>
                <td style={{width: '10%'}}>Diamond</td>
                <td style={{width: '15%'}}>valid profile required</td>
                <td style={{width: '10%'}}>Your current league</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>League</td>
                <td style={{width: '10%'}}>$l</td>
                <td style={{width: '10%'}}>D</td>
                <td style={{width: '15%'}}>valid profile required</td>
                <td style={{width: '10%'}}>First letter of your current league in capital</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>MMR</td>
                <td style={{width: '10%'}}>$mmr</td>
                <td style={{width: '10%'}}>3870</td>
                <td style={{width: '15%'}}>valid profile required</td>
                <td style={{width: '10%'}}>Your current mmr (refreshes every 5 minutes)</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>Matchup</td>
                <td style={{width: '10%'}}>$mu</td>
                <td style={{width: '10%'}}>PvZ</td>
                <td style={{width: '15%'}}>ingame</td>
                <td style={{width: '10%'}}>The current matchup in short</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>Opponent</td>
                <td style={{width: '10%'}}>$opp</td>
                <td style={{width: '10%'}}>Holly</td>
                <td style={{width: '15%'}}>ingame</td>
                <td style={{width: '10%'}}>The Starcraft 2 ingame name of your current opponent</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>Opponent Race</td>
                <td style={{width: '10%'}}>$OR</td>
                <td style={{width: '10%'}}>Protoss</td>
                <td style={{width: '15%'}}>ingame</td>
                <td style={{width: '10%'}}>Your opponents race</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>Opponent Race</td>
                <td style={{width: '10%'}}>$or</td>
                <td style={{width: '10%'}}>P</td>
                <td style={{width: '15%'}}>ingame</td>
                <td style={{width: '10%'}}>First letter of your opponents race in capital</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>Player Race</td>
                <td style={{width: '10%'}}>$PR</td>
                <td style={{width: '10%'}}>Terran</td>
                <td style={{width: '15%'}}>ingame</td>
                <td style={{width: '10%'}}>Your current race</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>Player Race </td>
                <td style={{width: '10%'}}>$pr</td>
                <td style={{width: '10%'}}>T</td>
                <td style={{width: '15%'}}>ingame</td>
                <td style={{width: '10%'}}>First letter of your current race in capital</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>Gametime</td>
                <td style={{width: '10%'}}>$time</td>
                <td style={{width: '10%'}}>12</td>
                <td style={{width: '15%'}}>ingame</td>
                <td style={{width: '10%'}}>The current gametime in minutes</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>Gamestatus</td>
                <td style={{width: '10%'}}>$status</td>
                <td style={{width: '10%'}}>Ingame/Menu/Replay</td>
                <td style={{width: '15%'}}>always</td>
                <td style={{width: '10%'}}>Current game status</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>Ingame tag</td>
                <td style={{width: '10%'}}>$game</td>
                <td style={{width: '10%'}}>Ingame</td>
                <td style={{width: '15%'}}>Ingame</td>
                <td style={{width: '10%'}}>Only shows when you are in a game</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>Menu tag</td>
                <td style={{width: '10%'}}>$menu</td>
                <td style={{width: '10%'}}>Menu</td>
                <td style={{width: '15%'}}>Menu</td>
                <td style={{width: '10%'}}>Only shows when you are in menu</td>
              </tr>
              <tr>
                <td style={{width: '10%'}}>Replay tag</td>
                <td style={{width: '10%'}}>$replay</td>
                <td style={{width: '10%'}}>Replay</td>
                <td style={{width: '15%'}}>Replay</td>
                <td style={{width: '10%'}}>Only shows when you are in a replay</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Block>

      <div className='block'>
        <div className='block-header bg-primary-dark'>
          <h3 className='block-title'>HonyHelper</h3>
        </div>
        <div className='block-content'>
          <h3>Your Token:</h3>
          <p className='content-mini content-mini-full bg-primary-darker' style={{color: 'white', marginTop: 15}}>{this.state['sc2-token']}</p>
          <ul>
            <li>HonyHelper detects when you play a game in Starcraft 2.</li>
            <li>It will automatically start and end bets. It will also save played games to the server,
              gathering statistics of your current session and overall games.</li>
            <li>When activated, it will send data to the server for automatic stream title updating.</li>
            <li>It is using the official client API, so there is no risk of getting banned.</li>
            <li>Requires Java. (Download <a href='https://java.com/download/'>here</a>)</li>
          </ul>
        </div>
        <div className='block-content'>
          <img className='img-responsive' src='http://images.PauloBot.com/helper.jpg' style={{'maxWidth': '425px'}} alt='' />
        </div>

        <div className='block-content'>
          <table className='table' style={tableStyle}>
            <tbody>
              <tr>
                <td className='font-w600' style={{width: 200}}>Start/Stop</td>
                <td>
                  <div className='text-muted push-5-t'>Starts/Stops to look for an active game</div>
                </td>
              </tr>
              <tr>
                <td className='font-w600' style={{width: 200}}>Status/Action</td>
                <td>
                  <div className='text-muted push-5-t'>Shows game status and what is done right now</div>
                </td>
              </tr>
              <tr>
                <td className='font-w600' style={{width: 200}}>Token</td>
                <td>
                  <div className='text-muted push-5-t'>Used to identify you to the server. <span className='text-danger'>Do not give this to anyone!</span></div>
                </td>
              </tr>
              <tr>
                <td className='font-w600' style={{width: 200}}>Cancel Time (in seconds)</td>
                <td>
                  <div className='text-muted push-5-t'>Bet will be automatically cancelled if game is shorter than the cancel time</div>
                </td>
              </tr>
              <tr>
                <td className='font-w600' style={{width: 200}}>SC2 Player Name</td>
                <td>
                  <div className='text-muted push-5-t'>Your Stracraft 2 ingame name. Must match your ingame name exactly, without clan tag</div>
                </td>
              </tr>
              <tr>
                <td className='font-w600' style={{width: 200}}>New Session</td>
                <td>
                  <div className='text-muted push-5-t'>Starts a new session. Games you play are saved into sessions. !stats will show stats of the newest session</div>
                </td>
              </tr>
              <tr>
                <td className='font-w600' style={{width: 200}}>Betting</td>
                <td>
                  <div className='text-muted push-5-t'>Enables automatic starting of bets</div>
                </td>
              </tr>
              <tr>
                <td className='font-w600' style={{width: 200}}>Title Updating</td>
                <td>
                  <div className='text-muted push-5-t'>Enables automatic updating of stream title</div>
                </td>
              </tr>
              <tr>
                <td className='font-w600' style={{width: 200}}>Start bet from replay</td>
                <td>
                  <div className='text-muted push-5-t'>A bet will be started when a replay is started</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='block-content'>
          <p>
            <a href='http://downloads.PauloBot.com/HonyHelper0.4.2.zip' className='btn btn-primary'>Download</a>
          </p>
        </div>
      </div>
    </React.Fragment>
  }
}

export default PageComponent(Starcraft)
