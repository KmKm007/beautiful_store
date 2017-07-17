let GET_TEAMS_RANK, POST_VOTING

if (process.env.NODE_ENV !== 'production') {
  GET_TEAMS_RANK = 'http://localhost:8888/beautifulstore/api/team/rank?seasonId=2'
  POST_VOTING = 'http://locahost:8888/beautifulstore/api/voting/add'
} else {
  GET_TEAMS_RANK = 'http://121.12.154.196:8888/beautifulstore/api/team/rank?seasonId=2'
  POST_VOTING = 'http://121.12.154.196:8888/beautifulstore/api/voting/add'
}

export { GET_TEAMS_RANK, POST_VOTING }
