import { configureStore } from'@reduxjs/toolkit'
import counterSlice  from './counterSlice'
import userSlice  from './userSlice'

export default configureStore({
  reducer: {
    userId: counterSlice,
    userName: userSlice
  }
})