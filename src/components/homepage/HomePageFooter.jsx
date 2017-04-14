import React from 'react'

const HomePageFooter = () => {
  return (
    <footer className="footer">
      <div className="rule-container">
        <p className="rule-title">投票规则：</p>
        <p>评委得分占30%</p>
        <p>网络投票占70%</p>
        <p>每人最多投3间不同分行</p>
      </div>
      <div className="logo-container">
        <img className="logo-img" src={require('../../images/icon1.1.png')}/>
      </div>
    </footer>
  )
}

export default HomePageFooter
