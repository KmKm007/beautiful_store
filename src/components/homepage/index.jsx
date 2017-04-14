import React from 'react'
import PropTypes from 'prop-types'
import HomePageHeader from './HomePageHeader'
import HomePageBody from './HomePageBody'
import HomePageFooter from './HomePageFooter'
import Alert from '../Alert'

const HomePageComponent = ({teams, isShowForm, handleFormShow, handleDetailClick, handleFormSubmit, handleFormCancel}) => {
  return (
    <div className="container">
      <div className="logo-container1">
        <img src={require('../../images/logo.png')}/>
      </div>
      <div className="body-container">
        <HomePageHeader />
        <HomePageBody
          teams={teams}
          handleFormShow={handleFormShow}
          handleDetailClick={handleDetailClick}
        />
        <HomePageFooter />
      </div>
      {isShowForm ? (
        <Alert
          handleSubmit={handleFormSubmit}
          handleCancle={handleFormCancel}
        />
    ) : null}
    </div>
  )
}

HomePageComponent.propTypes = {
  isShowForm: PropTypes.bool.isRequired,
  handleFormShow: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleFormCancel: PropTypes.func.isRequired
}

export default HomePageComponent
