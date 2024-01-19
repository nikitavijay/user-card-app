
import { configureStore } from '@reduxjs/toolkit'
// ...
import cardDataslice from './slice/cardDataslice'
const store = configureStore({
  reducer: {
   cardData: cardDataslice
  },
})
export type RootState = ReturnType<typeof store.getState>
export default store