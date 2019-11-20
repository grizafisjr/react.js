import React, {PureComponent} from 'react'
import ChoiceBet from './BetTemplates/ChoiceBet'
import ClosestBet from './BetTemplates/ClosestBet'
import Modal from 'react-bootstrap/lib/Modal'

class TemplateCreator extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
    this.closeChoiceModal = this.closeChoiceModal.bind(this)
    this.closeClosestModal = this.closeClosestModal.bind(this)
  }

  closeChoiceModal () {
    this.props.setShowChoiceModal(false)
  }

  closeClosestModal () {
    this.props.setShowClosestModal(false)
  }

  render () {
    let toEdit = this.props.toEdit

    let choiceEdit = null
    let closestEdit = null

    if (toEdit !== null) {
      if (toEdit.type === 'choice') {
        choiceEdit = toEdit
      } else if (toEdit.type === 'closest') {
        closestEdit = toEdit
      }
    }

    return (<div>

      <Modal className={'block block-themed block-transparent remove-margin-b'} show={this.props.showChoiceModal} onHide={this.closeChoiceModal}>
        <Modal.Header closeButton className={'block-header bg-primary-dark'}>
          <Modal.Title><h3 className={'block-title'}>Create Template</h3></Modal.Title>
        </Modal.Header>
        <ChoiceBet templateWithNameExists={this.props.templateWithNameExists} saveTemplate={this.props.saveTemplate}
          existingTemplateNames={this.props.existingTemplateNames} editData={choiceEdit} resetToEdit={this.props.resetToEdit} closeModal={this.closeChoiceModal} />
      </Modal>

      <Modal className={'block block-themed block-transparent remove-margin-b'} show={this.props.showClosestModal} onHide={this.closeClosestModal}>
        <Modal.Header closeButton className={'block-header bg-primary-dark'}>
          <Modal.Title><h3 className={'block-title'}>Create Template</h3></Modal.Title>
        </Modal.Header>
        <ClosestBet templateWithNameExists={this.props.templateWithNameExists} saveTemplate={this.props.saveTemplate}
          existingTemplateNames={this.props.existingTemplateNames} editData={closestEdit} resetToEdit={this.props.resetToEdit} closeModal={this.closeClosestModal} />
      </Modal>

    </div>)
  }
}

export default TemplateCreator
