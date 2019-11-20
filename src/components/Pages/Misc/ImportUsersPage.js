import React, { Component } from 'react'
import PageComponent from '../PageComponent'
import Block from '../../OneUI/Block'

class ImportUsersPage extends Component {
  render () {
    return <React.Fragment>
      <div className='row'>
        <div className='col-lg-6 col-md-12'>
          <div className='block block-themed'>
            <div className='block-header bg-danger'>
              <h3 className='block-title'>Import Users <small>max upload size is 10MB</small></h3>
            </div>
            <div className='block-content'>
              <div className='text-center push-10-t push-30'>
                <i className='fa fa-users' style={{fontSize: '100px'}} />
              </div>

              <form className=' form-horizontaltext-center' method='post' encType='multipart/form-data'>
                <input type='file' name='uploaded_file' accept='.csv' />
                <button style={{'margin': '20px 20px 20px 0'}} className='btn btn-sm btn-danger' type='submit'>
                  <i className='fas fa-paper-plane push-5-r' /> Import
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Block header='How To Import' dark>
        <div className='row'>
          <div className='col-md-6'>
            <div className='block'>
              <div className='block-header'>
                <span style={{'fontWeight': 700, 'fontSize': '2.5rem'}}>From Revlo.co</span>
              </div>
              <div className='block-content'>
                <p>You should have exported a .csv file which contains all the users from your channel. Just upload the file, it's that simple!</p>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='block'>
              <div className='block-header'>
                <span style={{'fontWeight': 700, 'fontSize': '2.5rem'}}>From any other service</span>
              </div>
              <div className='block-content'>
                <p>
                  To import users from another service, you need to have them in a .csv file. (Read more about csv <a href='https://en.wikipedia.org/wiki/Comma-separated_values'>here</a>).
                  CSV is short for comma-seperated values and is a very basic format. All you have to care about is, that your users are in the following format:
                </p>
                <p>Username, ID, points - (If you do not now the users ID, set it to -1)</p>
                <p>Example: </p>
                <p>First line is skipped<br />holly1337,123456789,1337<br />user2,-1,42<br />user4,987654321,7</p>
              </div>
            </div>
          </div>
        </div>
      </Block>
    </React.Fragment>
  }
}

export default PageComponent(ImportUsersPage)
