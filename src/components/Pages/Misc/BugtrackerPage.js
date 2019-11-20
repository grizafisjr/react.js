import React, { Component } from 'react'
import PageComponent from '../PageComponent'
import Block from '../../OneUI/Block'

class BugtrackerPage extends Component {
  render () {
    let header = <span>Known Bugs and Problems</span>
    let secondary = <span>&nbsp;- submit via twitter <a href='https://www.twitter.com/PauloBot'> @PauloBot</a> or <a href='https://www.twitter.com/PauloSC2'> @HollySC2</a></span>

    return <React.Fragment>
      <Block header={header} secondary={secondary} dark>
        <div className='pull-r-l'>
          <table className='table table-hover table-vcenter' style={{marginBottom: 0}}>
            <tbody>
              <tr>
                <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-success'>Open</span>
                </td>
                <td>
                  <span className='font-w600' data-toggle='modal'>
                    Rewinding games might lead to wrong bet outcomes
                  </span>
                </td>
                <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Betting/SC2</em></td>
              </tr>
              <tr>
                <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-success'>Open</span>
                </td>
                <td>
                  <span className='font-w600' data-toggle='modal'>
                    Whispers are disabled.
                  </span>
                </td>
                <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Chat</em></td>
              </tr>
              <tr>
                <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-warning'>Fixed</span>
                </td>
                <td>
                  <span className='font-w600' data-toggle='modal'>
                    If a bet is started, cancelled and restarted all within betting-time of first bet,
                    the second one will get closed when the first bet would have been closed.
                  </span>
                </td>
                <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Betting</em></td>
              </tr>
              <tr>
                <td className='hidden-xs hidden-sm hidden-md text-center' style={{width: 100}}><span className='label label-success'>Open</span>
                </td>
                <td>
                  <span className='font-w600' data-toggle='modal'>
                    Certain commands might still work, even if its module is disabled - please report if you notice this
                  </span>
                </td>
                <td className='hidden-xs hidden-sm hidden-md text-muted' style={{width: 150}}><em>Commands/Modules</em></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Block>
    </React.Fragment>
  }
}

export default PageComponent(BugtrackerPage)
