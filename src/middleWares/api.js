import {
  GET_TEAMS_RANK,
  POST_VOTING
} from './apiURL'

import 'whatwg-fetch'

export const getTeamsRank = (seasonid, callback, failCallback) => {
  const url = GET_TEAMS_RANK
  fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(resp => {
      if (resp.ok && resp.status === 200) {
        resp.json().then(json => {
          if (json.status === 0) {
            callback(json.dataList, json.isSeasonEnd)
          } else {
            failCallback(json.message)
          }
        })
      }
    }, error => {
      failCallback(error)
    })
}

export const postVoting = (params, callback, failCallback) => {
  const url = POST_VOTING
  const {
    userMesg,
    teamIds
  } = params
  const {
    userId,
    idcard
  } = userMesg
  const body = `userId=${userId}&idcard=${idcard}&teamIds=${JSON.stringify(teamIds)}`
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.status === 0) {
        callback()
      } else {
        failCallback(json.message)
      }
    })
}
