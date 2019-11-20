import React from 'react'
import ProgressBar from 'react-progress-bar-plus'

const PageComponent = (Component, narrow = true) => class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: {
        active: false,
        percent: 0
      }
    }
    this.startLoading = this.startLoading.bind(this)
    this.endLoading = this.endLoading.bind(this)
    this.hardEndLoading = this.hardEndLoading.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    this.props.setPageTitle(this.props.pageTitle)
  }

  startLoading () {
    this.setState({
      loading: {
        active: true,
        percent: 20
      }
    })
  }

  endLoading () {
    let completeFully = () => {
      window.setTimeout(() => {
        this.setState({
          loading: {
            active: false,
            percent: 100
          }
        })
      }, 100)
    }
    this.setState({
      loading: {
        active: true,
        percent: 99
      }
    }, completeFully)
  }

  hardEndLoading () {
    this.setState({
      loading: {
        active: false,
        percent: 100
      }
    })
  }

  getLoadingBar () {
    if (this.state.loading.active) {
      return <ProgressBar percent={this.state.loading.percent} autoIncrement intervalTime={10} onTop={false} spinner={false} />
    } else {
      return null
    }
  }

  render () {
    return <React.Fragment>
      {this.getLoadingBar()}
      <div className={'content' + (narrow ? ' content-narrow' : '')}>
        <Component
          loading={this.state.loading.active}
          startLoading={this.startLoading}
          endLoading={this.endLoading}
          {...this.props} />
      </div>
    </React.Fragment>
  }
}

export default PageComponent
