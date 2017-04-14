let GET_TEAMS_RANK, POST_VOTING

if (process.env.NODE_ENV !== 'production') {
  GET_TEAMS_RANK = 'http://10.17.1.157:8888/beautifulstore/api/team/rank?seasonId=1'
  POST_VOTING = 'http://10.17.1.157:8888/beautifulstore/api/voting/add'
} else {
  GET_TEAMS_RANK = 'http://121.12.154.196:8888/beautifulstore/api/team/rank?seasonId=1'
  POST_VOTING = 'http://121.12.154.196:8888/beautifulstore/api/voting/add'
}

export { GET_TEAMS_RANK, POST_VOTING }
