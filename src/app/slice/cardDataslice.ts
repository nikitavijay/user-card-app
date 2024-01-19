import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ISelectOption {
    id:number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string 
}

export interface CardDataState {
  cardData: Array<ISelectOption>

}

const initialState = {
    cardData: []
}

export const cardDataSlice = createSlice({
  name: 'cardDataReducer',
  initialState,
  reducers: {
    setUserData : (state, Payload)=>{
        state.cardData = Payload?.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserData } = cardDataSlice.actions;
export default cardDataSlice.reducer