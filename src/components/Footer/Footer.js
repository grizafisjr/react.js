import React, { PureComponent } from 'react'

class Footer extends PureComponent {
  shouldComponentUpdate () {
    return false
  }

  render () {
    return <footer id='page-footer' className='content-mini content-mini-full font-s12 bg-gray-lighter clearfix'>
      <div className='row'>
        <div className='col-sm-6 col-xs-12'>
          <i className='fa fa-twitter' aria-hidden='true' /><a className='font-w600' href='https://www.twitter.com/PauloBot'>PauloBot</a> - A Twitchbot by <a className='font-w600' href='https://www.twitter.com/PauloBB'>PauloBB</a>
        </div>
        <div className='col-sm-6 col-xs-12'>
          <div className='text-right'>
            <a className='font-w600' href='/terms'>Terms of Service</a><span> - </span>
            <a className='font-w600' href='/privacy'>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  }
}

export default Footer
