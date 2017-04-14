import React from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'
import 'sweetalert/themes/google/google.css'
import Alert from '../components/Alert'

class HomePageContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowForm: false
    }
  }

  static propTypes = {
    teams: PropTypes.array.isRequired,
    selectedTeamIds: PropTypes.array.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { votingErrorMesg, isVoting } = this.props
    const { votingErrorMesg: nextVotingErrorMesg, isVoting: nextIsVoting } = nextProps
    if (nextVotingErrorMesg && votingErrorMesg !== nextVotingErrorMesg) {
      this.showErrorMesg('投票失败', nextVotingErrorMesg.errorMesg)
    }
    if (!nextVotingErrorMesg && isVoting !== nextIsVoting && nextIsVoting === false) {
        this.showSucceedMesg('投票成功！', '恭喜你，投票成功！')
      }
  }

  handleFormSubmit = (userId, idcard) => {
    this.handleVotingSubmit(userId, idcard)
    this.handleFormCancel()
  }

  handleFormCancel = () => {
    this.setState({
      isShowForm: false
    })
  }

  handleFormShow = () => {
    this.setState({
      isShowForm: true
    })
  }

  showErrorMesg = (title, errorMesg, callback) => {
    swal({
      title,
      text: errorMesg,
      type: 'error'
    }, isConfirm => {
      if (isConfirm) {
        callback
      }
    })
  }

  showSucceedMesg = (title, successMesg, callback) => {
    swal({
      title,
      text: successMesg,
      type: 'success'
    }, isConfirm => {
      if (isConfirm) {
        callback()
      }
    })
  }

  handleVotingSubmit = (userId, idcard) => {
    const { selectedTeamIds: teamIds, handlePostVoting } = this.props
    const userMesg = {
      userId,
      idcard
    }
    handlePostVoting(userMesg, teamIds)
  }

  handleDetailClick = detailURL => {
    if (detailURL)
      window.location.href = detailURL
  }

  render () {
    const { teams, selectedTeamIds, handleSelectTeam, handleUnSelectTeam } = this.props
    const length = selectedTeamIds.length
    const icon1 = require('../images/icon1.0.png')
    teams.map(team => {
      if (selectedTeamIds.findIndex(id => team.id === id) >= 0) {
        team.className = 'vote-btn-btn-selected'
        team.handleClick = handleUnSelectTeam
      } else {
        team.className = 'vote-btn-btn-default'
        team.handleClick = length >= 3 ?
          () => this.showErrorMesg('投票失败', '投票数不能超过3个')
          :
          handleSelectTeam
      }
    })
    return (
      <div className="container">
        <div className="body-container">
          <header className="header-img-container">
            <img className="header-img" src={require('../images/WechatIMG715.png')}/>
          </header>
          <div className="main-container">
            <ul>
              {teams.map((team, index) => (
                <li className="item-container" key={'team' + index}>
                  <header className="item-header-container" onClick={() => this.handleDetailClick(team.detailURL)}>
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
            <button className="vote-btn" onClick={this.handleFormShow}>马上投票</button>
          </div>
          <footer className="footer">
            <div className="rule-container">
              <p>投票规则：</p>
              <p>每人每天最多投3间分行</p>
            </div>
            <div className="logo-container">
              <img className="logo-img" src={require('../images/icon1.1.png')}/>
            </div>
          </footer>
        </div>
        {this.state.isShowForm ? (
          <Alert
            handleSubmit={this.handleFormSubmit}
            handleCancle={this.handleFormCancel}
          />
      ) : null}
      </div>
    )
  }
}

export default HomePageContainer
