import * as actionTypes from '../actionTypes'

const initialState = {
  userId: null,
  teams: null,
  seasonId: null,
  voterStatus: null,
  errorMesgArray: [],
  isVoting: null,
  isTeamsLoading: null,
  isVoterStatusLoading: null,
  selectedTeamIds: []
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

function removeErrorMesg(state, errorType) {
  const errorMesgArray = state.errorMesgArray.filter(e => e.errorType !== errorType)
  return errorMesgArray
}

function requestTeams(state) {
  const errorMesgArray = removeErrorMesg(state, actionTypes.REQUEST_TEAMS_FAILED)
  return {
    ...state,
    isTeamsLoading: true,
    errorMesgArray
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

function requestVoterStatus(state) {
  const errorMesgArray = removeErrorMesg(state, actionTypes.RECEIVE_VOTER_STATUS_FAILED)
  return {
    ...state,
    isVoterStatusLoading: true,
    errorMesgArray
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

function selectTeam(state, action) {
  const selectedTeamIds = [...state.selectedTeamIds]
  selectedTeamIds.push(action.teamId)
  return {
    ...state,
    selectedTeamIds
  }
}

function unSelectTeam(state, action) {
  const id = action.teamId
  const selectedTeamIds = state.selectedTeamIds.filter(teamId => teamId !== id)
  return {
    ...state,
    selectedTeamIds
  }
}

function postVoting(state) {
  const errorMesgArray = removeErrorMesg(state, actionTypes.POST_VOTING_FAILED)
  return {
    ...state,
    isVoting: true,
    errorMesgArray
  }
}

function postVotingSuccess(state, actions) {
  const teamIds = actions.teamIds
  const teams = state.teams
  const nextTeams = [...teams]
  teamIds.map(id => {
    const index = nextTeams.findIndex(team => team.id === id)
    if (index >= 0) {
      nextTeams[index].votingCount++
    }
  })
  nextTeams.sort((a, b) => b.votingCount - a.votingCount)
  return {
    ...state,
    isVoting: false,
    teams: nextTeams,
    selectedTeamIds: initialState.selectedTeamIds
  }
}

function postVotingFailed(state, action) {
  const errorMesgArray = receiveErrorMesg(state, action)
  return {
    ...state,
    errorMesgArray,
    isVoting: false
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
    case actionTypes.REQUEST_VOTER_STATUS:
      return requestVoterStatus(state)
    case actionTypes.RECEIVE_VOTER_STATUS:
      return receiveVoterStatus(state, action)
    case actionTypes.RECEIVE_VOTER_STATUS_FAILED:
      return receiveVoterStatusFailed(state, action)
    case actionTypes.SELECT_TEAM:
      return selectTeam(state, action)
    case actionTypes.UN_SELECT_TEAM:
      return unSelectTeam(state, action)
    case actionTypes.POST_VOTING:
      return postVoting(state)
    case actionTypes.POST_VOTING_SUCCESS:
      return postVotingSuccess(state, action)
    case actionTypes.POST_VOTING_FAILED:
      return postVotingFailed(state, action)
    default:
      return state
  }
}

export const getUserIdFromStorage = () => {
  const userId = localStorage.getItem('userId')
  if (!userId)
    return null
  let userIdUpdateTime = localStorage.getItem('userIdUpdateTime')
  if (!userIdUpdateTime || isNaN(userIdUpdateTime))
    return null
  userIdUpdateTime = parseInt(userIdUpdateTime)
  const nowTime = Date.now()
  if (nowTime > userIdUpdateTime && (nowTime - userIdUpdateTime > (3 * 24 * 3600 * 1000))) {
    return userId
  } else {
    return null
  }
}
