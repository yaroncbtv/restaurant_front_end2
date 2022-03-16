import { configureStore } from '@reduxjs/toolkit'
import globalState from '../Store/State';

export default configureStore({
  reducer: {
      data: globalState
  },
})