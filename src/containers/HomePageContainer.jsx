import React from 'react'
import PropTypes from 'prop-types'
import HomePageComponent from '../components/homepage'
import { showErrorMesg, showSucceedMesg } from '../middleWares/AlertUtil'

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
      showErrorMesg('投票失败', nextVotingErrorMesg.errorMesg)
    }
    if (!nextVotingErrorMesg && isVoting !== nextIsVoting && nextIsVoting === false) {
        showSucceedMesg('投票成功！', '恭喜你，投票成功！')
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
    const selectedTeamIds = this.props.selectedTeamIds
    if (selectedTeamIds <= 0) {
      showErrorMesg('操作错误', '请选择支持对象！')
    } else {
      this.setState({
        isShowForm: true
      })
    }
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
    teams.map(team => {
      if (selectedTeamIds.findIndex(id => team.id === id) >= 0) {
        team.className = 'vote-btn-btn-selected'
        team.handleClick = handleUnSelectTeam
      } else {
        team.className = 'vote-btn-btn-default'
        team.handleClick = length >= 3 ?
          () => showErrorMesg('投票失败', '投票数不能超过3个')
          :
          handleSelectTeam
      }
    })
    return (
      <HomePageComponent
        teams={teams}
        handleFormShow={this.handleFormShow}
        handleDetailClick={this.handleDetailClick}
        handleSubmit={this.handleFormSubmit}
        handleCancle={this.handleFormCancel}
        isShowForm={this.state.isShowForm}
        handleFormSubmit={this.handleFormSubmit}
        handleFormCancel={this.handleFormCancel}
      />
    )
  }
}

export default HomePageContainer
