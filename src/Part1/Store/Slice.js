import { createSlice } from "@reduxjs/toolkit";
const  initialState={
    count: 0
}
const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
         increment:(state)=>{
            state.count +=1
        },
        decrement:(state)=>{
            state.count -=1
        },
        restCount:(state)=>{
            state.count = 0
        },
        amount:(state,action)=>{
           state.count += action.payload
        },
    }
})

export const  {increment,decrement,restCount,amount} = counterSlice.actions ;
export default  counterSlice.reducer; 