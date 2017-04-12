import * as actionTypes from '../actionTypes'

export function requestTeams(seasonId) {
  return {
    type: actionTypes.REQUEST_TEAMS,
    seasonId
  }
}

export function receiveTeams(teams) {
  return {
    type: actionTypes.REQUEST_TEAMS,
    teams
  }
}

export function receiveTeamsFailed(errorMesg) {
  return {
    type: actionTypes.REQUEST_TEAMS_FAILED,
    errorMesg
  }
}

export function voteForTeams(teams) {
  return {
    type: actionTypes.VOTE_FOR_TEAMS,
    teams
  }
}

export function voteForTeamsSucceed() {
  return {
    type: actionTypes.VOTE_FOR_TEAMS_SUCCEED
  }
}

export function voteForTeamsFailed(errorMesg) {
  return {
    type: actionTypes.VOTE_FOR_TEAMS_FAILED,
    errorMesg
  }
}

export function requestVoterStatus(userId) {
  return {
    type: actionTypes.REQUEST_VOTER_STATUS,
    userId
  }
}

export function receiveVoterStatus(voterStatus) {
  return {
    type: actionTypes.RECEIVE_VOTER_STATUS,
    teams
  }
}

export function receiveVoterStatusFailed(errorMesg) {
  return {
    type: actionTypes.RECEIVE_VOTER_STATUS_FAILED,
    errorMesg
  }
}
