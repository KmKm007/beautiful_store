import * as actionTypes from '../actionTypes'

const initialState = {
  userId: null,
  teams: null,
  seasonId: null,
  voterStatus: null,
  errorMesgArray: [],
  isVoting: null,
  isTeamsLoading: null,
  isVoterStatusLoading: null
}

function receiveErrorMesg(state, action) {
  const errorMesg = action.errorMesg
  const errorType = action.type
  const errorMesgArray = state.errorMesgArray.filter(e => e.errorType !== errorType)
  errorMesgArray.push({
    errorType,
    errorMesg
  })
  return errorMesgArray
}

function requestTeams(state) {
  return {
    ...state,
    isTeamsLoading: true
  }
}

function receiveTeams(state, action) {
  return {
    ...state,
    teams: action.teams,
    isTeamsLoading: false
  }
}

function receiveTeamsFailed(state, action) {
  const errorMesgArray = receiveErrorMesg(state, action)
  return {
    ...state,
    errorMesgArray,
    isTeamsLoading: false
  }
}

function voteForTeams(state) {
  return {
    ...state,
    isVoting: true
  }
}

function voteForTeamsSucceed(state) {
  return {
    ...state,
    isVoting: false
  }
}

function voteForTeamsFailed(state, action) {
  const errorMesgArray = receiveErrorMesg(state, action)
  return {
    ...state,
    errorMesgArray,
    isVoting: false
  }
}

function requestVoterStatus(state) {
  return {
    ...state,
    isVoterStatusLoading: true
  }
}

function receiveVoterStatus(state, action) {
  return {
    ...state,
    voterStatus: action.voterStatus,
    isVoterStatusLoading: false
  }
}

function receiveVoterStatusFailed(state, action) {
  const errorMesgArray = receiveErrorMesg(state, action)
  return {
    ...state,
    errorMesgArray,
    isVoterStatusLoading: false
  }
}

export default function reducers(state = initialState, action) {
  switch(action.type) {
    case actionTypes.REQUEST_TEAMS:
      return requestTeams(state)
    case actionTypes.RECEIVE_TEAMS:
      return receiveTeams(state, action)
    case actionTypes.RECEIVE_TEAMS_FAILED:
      return receiveTeamsFailed(state, action)
    case actionTypes.VOTE_FOR_TEAMS:
      return voteForTeams(state)
    case actionTypes.VOTE_FOR_TEAMS_FAILED:
      return voteForTeamsFailed(state, action)
    case actionTypes.VOTE_FOR_TEAMS_SUCCEED:
      return voteForTeamsSucceed(state)
    case actionTypes.REQUEST_VOTER_STATUS:
      return requestVoterStatus(state)
    case actionTypes.RECEIVE_VOTER_STATUS:
      return receiveVoterStatus(state, action)
    case actionTypes.RECEIVE_VOTER_STATUS_FAILED:
      return receiveVoterStatusFailed(state, action)
    default:
      return state
  }
}
