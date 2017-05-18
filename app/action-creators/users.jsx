import axios from 'axios'

export const GET_USERLIST = 'GET_USERLIST'
export const getUserList = (userList) => ({
  type: GET_USERLIST,
  userList: userList
})

export const retrieveUserList = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res => dispatch(getUserList(res.data)))
      .catch(err => console.error(err))
