import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = null

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser (state, action) {
      return action.payload
    },
    /* eslint-disable */
    removeUser (state, action) {
      return initialState
    }
    /* eslint-enable */
  }
})

export const { setUser, removeUser } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const loggenInUser = window.localStorage.getItem('loggedInUser')
    if(loggenInUser){
      const user = JSON.parse(loggenInUser)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = credentials => {
  return async dispatch => {
    const user = await loginService.loginUser(credentials)
    window.localStorage.setItem(
      'loggedInUser', JSON.stringify(user)
    )
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(removeUser())
  }
}

export default userSlice.reducer