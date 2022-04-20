import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    user: {
    firstName: '', 
    lastName: '',
    token: '',
    id: ''
    },
    isLogged: false,
  },
  reducers: {
    changeUser(state, { payload }){
      return { ...state, isLogged: true, user:{
        firstName: payload.firstName,
        lastName: payload.lastName,
        token: payload.token,
        id: payload.id
      }}
    },
    logOut(state){
      return {...state, isLogged: false,     user: {
        firstName: '', 
        lastName: '',
        token: '',
        id: ''
        }}
    },
  }
})

export const {changeUser, logOut} = slice.actions;

export const selectUser = state => state.user

export default slice.reducer;