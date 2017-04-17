import * as actionTypes from '../actionTypes'
import { getTeamsRank, postVoting as postVotingAPI } from '../../middleWares/api'

export function requestTeams(seasonId) {
  return {
    type: actionTypes.REQUEST_TEAMS,
    seasonId
  }
}

export const fetchRequestTeams = seasonId => dispatch => {
  dispatch(requestTeams(seasonId))
  getTeamsRank(seasonId, (dataList, isSeasonEnd) => {
    dispatch(receiveTeams(dataList, isSeasonEnd))
  }, errorMesg => {
    dispatch(receiveTeamsFailed(errorMesg))
  })
}

export function receiveTeams(teams, isSeasonEnd) {
  return {
    type: actionTypes.RECEIVE_TEAMS,
    isSeasonEnd,
    teams
  }
}

export function receiveTeamsFailed(errorMesg) {
  return {
    type: actionTypes.RECEIVE_TEAMS_FAILED,
    errorMesg
  }
}

export function receiveVoterStatus(voterStatus) {
  return {
    type: actionTypes.RECEIVE_VOTER_STATUS,
    voterStatus
  }
}

export function receiveVoterStatusFailed(errorMesg) {
  return {
    type: actionTypes.RECEIVE_VOTER_STATUS_FAILED,
    errorMesg
  }
}

export function selectTeam(teamId) {
  return {
    type: actionTypes.SELECT_TEAM,
    teamId
  }
}

export function unSelectTeam(teamId) {
  return {
    type: actionTypes.UN_SELECT_TEAM,
    teamId
  }
}

export const beginPostVoting = (userMesg, teamIds) => dispatch => {
  const params = {
    userMesg,
    teamIds
  }
  dispatch(postVoting(userMesg, teamIds))
  postVotingAPI(params, () => {
    dispatch(postVotingSuccess(teamIds))
  }, errorMesg => {
    dispatch(postVotingFailed(errorMesg))
  })
}

export const postVoting = (userMesg, teamIds) => ({
  type: actionTypes.POST_VOTING,
  userMesg,
  teamIds
})

export const postVotingSuccess = teamIds => ({
  type: actionTypes.POST_VOTING_SUCCESS,
  teamIds
})

export const postVotingFailed = errorMesg => ({
  type: actionTypes.POST_VOTING_FAILED,
  errorMesg
})
