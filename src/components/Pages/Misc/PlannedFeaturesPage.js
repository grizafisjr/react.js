import React, { Component } from 'react'
import PageComponent from '../PageComponent'
import Block from '../../OneUI/Block'

class PlannedFeaturesPage extends Component {
  render () {
    let header = 'Planned Features'
    let secondary = <span>&nbsp;- submit your idea via twitter <a href='https://www.twitter.com/Grizafis'> @Grizafis</a> or <a href='https://www.twitter.com/HollySC2'> @HollySC2</a></span>

    return <Block header={header} secondary={secondary} dark>
      <div className='pull-r-l'>
        <table className='table table-hover table-vcenter' style={{marginBottom: 0}}>
          <tbody><tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-default'>implemented, testing</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  MMR progression stream overlay
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Starcraft 2</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-default'>Implemented</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Save all played games and make a history/stats available
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Starcraft 2</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-default'>Implemented</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Automatic streamtitle updater with current matchup/opponent
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Starcraft 2</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-default'>implemented</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  More functionality for bets, like custom bets
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Bets</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-warning'>Medium</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Support multiple SC2 profiles via battle.net authentication.
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Starcraft 2</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-success'>High</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  List all available commands on Grizafis.com/streamers/name
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Usability</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-success'>High</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Command to change stream title and game. Command to get uptime
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Commands/Twitch</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-warning'>Medium</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Triggers/Actions for counters
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Counters</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-warning'>Medium</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Let users bet on Grizafis.com directly, in addition (or alternatively) to chat
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Starcraft 2</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-warning'>Medium</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Automatically start/stop Bot when streamer goes online/offline
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Usability</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-warning'>Medium</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Find a good way to re-enable whispers
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Usability</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-warning'>Medium</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  A lot more stats (for a dashboard)
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Analytics</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-warning'>Medium</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Pre-built counters/commands (e.g. Dark Souls)
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Modules/Counters</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-warning'>Medium</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Polls
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>General Features</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-warning'>Medium</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Raffles/Giveaways
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>General Features</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-danger'>Low</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Betting (and other) support for CS:GO
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Games/Modules</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-danger'>Low</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  The Binding Of Isaac: Afterbirth+ support
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Games/Modules</em></td>
          </tr>

          <tr>
            <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-danger'>Low</span>
            </td>
            <td>
              <span className='font-w600' data-toggle='modal'>
                  Playlist/Songrequest functionality
              </span>
            </td>
            <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Fun</em></td>
          </tr>
          </tbody>
        </table>
      </div>
    </Block>
  }
}

export default PageComponent(PlannedFeaturesPage)
