import React, {Component} from 'react'
import TemplateTableRow from './TemplateTableRow'

class TemplateList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: {
        'name': '',
        'description': '',
        'type': ''
      }
    }
  }

  filterTemplates (templates) {
    return templates.filter((template, index) => {
      if (this.state.filter.type !== '') {
        if (template.type.includes(this.state.filter.type)) {
          return true
        }
        return false
      }
      return true
    })
  }

  sortTemplates (templates) {
    templates.sort(function (temp1, temp2) {
      let str1 = temp1.type + temp1.name
      let str2 = temp2.type + temp2.name
      return str1.localeCompare(str2)
    })
  }

  getTableRows (templates) {
    return this.filterTemplates(templates).map((template, index) => {
      return <TemplateTableRow key={index} data={template} editTemplate={this.props.setToEdit} deleteTemplate={this.props.deleteTemplate} />
    })
  }

  addIndexesToTemplates (templates) {
    templates.forEach((template, index) => { template.index = index })
  }

  render () {
    if (this.props.templates.length === 0) {
      return (
        <div className='block'>
          <table className='table table-striped table-borderless table-header-bg'>
            <thead>
              <tr>
                <th>Keyword</th>
                <th>Type</th>
                <th>Description</th>
                <th>Arguments</th>
                <th style={{width: 120}} />
              </tr>
            </thead>
            <tbody>
              <td colSpan={5}>You don't have created any templates yet</td>
            </tbody>
          </table>
        </div>
      )
    }
    let templates = Array.from(this.props.templates)
    this.addIndexesToTemplates(templates)
    this.sortTemplates(templates)

    return (
      <div className='block'>
        <table className='table table-striped table-borderless table-header-bg'>
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Type</th>
              <th>Description</th>
              <th>Arguments</th>
              <th style={{width: 120}} />
            </tr>
          </thead>
          <tbody>
            {this.getTableRows(templates)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TemplateList
