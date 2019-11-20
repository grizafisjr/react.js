import React, {PureComponent} from 'react'
import $ from 'jquery'

class TemplateTableRow extends PureComponent {
  constructor (props) {
    super(props)
    this.onEditClick = this.onEditClick.bind(this)
    this.deleteSelf = this.deleteSelf.bind(this)
  }

  onEditClick () {
    this.props.editTemplate(this.props.data)
  }

  deleteSelf () {
    this.props.deleteTemplate(this.props.data.index)
  }

  render () {
    let type = this.props.data.type

    if (type === 'choice') {
      type = 'options'
    } else if (type === 'closest') {
      type = 'estimation'
    }

    return (<tr>
      <td>{this.props.data.name}</td>
      <td>{type}</td>
      <td>{this.props.data.description}</td>
      <td>{this.props.data.arguments}</td>
      <th>
        <button type='button' className='btn btn-primary' onClick={this.onEditClick} style={{marginRight: 5}}><i className='fa fa-pencil-square-o' /></button>
        <button type='button' className='btn btn-danger' onClick={this.deleteSelf}><i className='fa fa-trash' /></button>
      </th>
    </tr>)
  }
}

export default TemplateTableRow
