import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HomePageContainer from '../containers/HomePageContainer'
// import { getUserIdFromStorage } from '../reducers'
import * as actions from '../actions'
import * as actionTypes from '../actionTypes'
import 'loaders.css/loaders.css'

class HomePage extends React.Component {

  static defaultProps = {
    title: '最美分行第一季度评选'
  }
  static propTypes = {
    fetchRequestTeams: PropTypes.func.isRequired,
    teams: PropTypes.array
  }
  componentWillMount() {
    document.title = this.props.title
    this.props.fetchRequestTeams()
  }

  render () {
    const { teams, selectedTeamIds, errorMesgArray,
      handleSelectTeam, handleUnSelectTeam, handlePostVoting, isVoting } = this.props
    const votingErrorMesg =
      errorMesgArray.find(e => e.errorType === actionTypes.POST_VOTING_FAILED) || null
    return teams? (
      <HomePageContainer
        teams={teams}
        selectedTeamIds={selectedTeamIds}
        handleSelectTeam={handleSelectTeam}
        handleUnSelectTeam={handleUnSelectTeam}
        handlePostVoting={handlePostVoting}
        votingErrorMesg={votingErrorMesg}
        isVoting={isVoting}
      />
  ) : <div>loading...</div>
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
  selectedTeamIds: state.selectedTeamIds,
  errorMesgArray: state.errorMesgArray,
  isVoting: state.isVoting
})

const mapDispatchToProps = dispatch => ({
  fetchRequestTeams: () => dispatch(actions.fetchRequestTeams()),
  handleSelectTeam: teamId => dispatch(actions.selectTeam(teamId)),
  handleUnSelectTeam: teamId => dispatch(actions.unSelectTeam(teamId)),
  handlePostVoting: (userMesg, teamIds) => dispatch(actions.beginPostVoting(userMesg, teamIds))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
