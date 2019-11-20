import React, { PureComponent } from 'react'

class Header extends PureComponent {
  render () {
    return <header id='header-navbar' className='content-mini content-mini-full'>
      {/* Header Navigation Right */}
      <ul className='nav-header nav-header-right pull-right'>
        <li className='visible-xs' style={{marginLeft: 0}}>
          <button className='btn btn-primary' data-toggle='layout' data-action='sidebar_toggle' type='button' onClick={this.props.toggleShowSidebarMobile}>
            <i className='fa fa-navicon' />
          </button>
        </li>
        <li className='pull-right'>
          <a className='btn btn-minw btn-rounded btn-primary' type='button' href='/logout'>
            <i className='fas fa-sign-out-alt' /> Logout
          </a>
        </li>
        {/* <li className='pull-right'>
          <a className='btn btn-minw btn-rounded btn-primary' type='button'
            href='https://github.com/Paulo/PBbot' target='_blank'
            rel='noopener noreferrer'
            style={{'backgroundColor': '#677bc4', 'border': 'none'}}>
            <i className='fab fa-github' style={{'fontWeight': 500}} /> GitHub
          </a>
        </li> */}
      </ul>
      {/* END Header Navigation Right */}
      {/* Header Navigation Left */}
      <ul className='nav-header nav-header-left pull-left'>
        <li className='visible-sm' style={{marginLeft: 0}}>
          <button className='btn btn-primary' data-toggle='layout' data-action='sidebar_toggle' type='button' onClick={this.props.toggleShowSidebarMobile}>
            <i className='fa fa-navicon' />
          </button>
        </li>
        <li>
          <h2 className={'text-white'}>{this.props.header}</h2>
        </li>
      </ul>
      {/* END Header Navigation Left */}
    </header>
  }
}

export default Header
