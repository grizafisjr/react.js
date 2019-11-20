import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Block extends Component {
  getOptions () {
    if (!Array.isArray(this.props.options)) {
      return null
    }
    let options = this.props.options.map(option => <li>{option}</li>)
    return <ul className='block-options'>
      {options}
    </ul>
  }

  getHeader () {
    let secondary = this.props.secondary ? <small> {this.props.secondary}</small> : null
    if (typeof this.props.header !== 'undefined' || typeof this.props.secondary !== 'undefined' || typeof this.props.options !== 'undefined') {
      return <div className={'block-header' + (this.props.dark ? ' bg-primary-dark' : '')}>
        {this.getOptions()}
        <h3 className='block-title'>{this.props.header}{secondary}</h3>
      </div>
    }
    return null
  }

  render () {
    return <div className={'block' + (this.props.loading ? ' block-opt-refresh' : '') + (this.props.hidden ? ' block-opt-hidden' : '')}>
      {this.getHeader()}
      <div className={'block-content' + (this.props.narrow ? ' block-content-narrow' : ' block-content-full')}>
        {this.props.children}
      </div>
    </div>
  }
}

Block.propTypes = {
  'header': PropTypes.string,
  'secondary': PropTypes.string,
  'options': PropTypes.array,
  'dark': PropTypes.bool,
  'narrow': PropTypes.bool,
  'loading': PropTypes.bool
}

export default Block
