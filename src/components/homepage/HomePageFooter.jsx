import React from 'react'

const HomePageFooter = () => {
  return (
    <footer className="footer">
      <div className="rule-container">
        <p>投票规则：</p>
        <p>每人每天最多投3间分行</p>
      </div>
      <div className="logo-container">
        <img className="logo-img" src={require('../../images/icon1.1.png')}/>
      </div>
    </footer>
  )
}

export default HomePageFooter
