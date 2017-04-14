import React from 'react'
import PropTypes from 'prop-types'

const icon1 = require('../../images/icon1.0.png')

const HomePageBody = ({ teams, handleFormShow, handleDetailClick }) => {
  return (
    <div>
      <div className="main-container">
        <ul>
          {teams.map((team, index) => (
            <li className="item-container" key={'team' + index}>
              <header className="item-header-container" onClick={() => handleDetailClick(team.detailURL)}>
                <div className="item-header-title-container">
                  <img className="item-header-icon" src={icon1}/>
                  <span className="item-header-title">{team.name}</span>
                </div>
                <div>
                  <span className="item-header-btn">详情 &gt;</span>
                </div>
              </header>
              <div className="item-content-container">
                <span className="item-content">{team.title}</span>
              </div>
              <footer className="item-foot-container" onClick={() => team.handleClick(team.id)}>
                <span className="vote-count-span">已获&nbsp;{team.votingCount}&nbsp;票</span>
                <span className="vote-btn-label">投TA一票</span>
                <span className={team.className}></span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
      <div className="btn-container">
        <button className="vote-btn" onClick={handleFormShow}>马上投票</button>
      </div>
    </div>
  )
}

HomePageBody.propTypes = {
  teams: PropTypes.array.isRequired,
  handleFormShow: PropTypes.func.isRequired,
  handleDetailClick: PropTypes.func.isRequired
}

export default HomePageBody
