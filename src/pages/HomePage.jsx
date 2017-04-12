import React from 'react'
import { connect } from 'react-redux'
import HomePageContainer from '../containers/HomePageContainer'

class HomePage extends React.Component {
  render () {
    return (
      <HomePageContainer />
    )
  }
}

export default connect()(HomePage)
