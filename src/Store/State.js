import { createSlice } from '@reduxjs/toolkit'

export const globalState = createSlice({
  name: 'data',
  initialState: {
    value: [],
    homePageData:[]
  },
  reducers: {
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    addToArray: (state, action) => {
      state.homePageData.push(action.payload)
    },
    removeFromArray: (state) => {
      state.homePageData.pop();
    },
  },
})
// Action creators are generated for each case reducer function
export const { addToArray, removeFromArray } = globalState.actions // here to add new action

//export const selectData = (state) => state.data.value
export const homePageDataValue = (state) => state.data.homePageData

export default globalState.reducer