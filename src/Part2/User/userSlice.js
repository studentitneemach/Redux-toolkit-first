import { createSlice} from '@reduxjs/toolkit';
const initialState=[
    {id:"0",name:'ABCD_0'},
    {id:"1",name:'EFGH_1'},
    {id:"2",name:'HIJK_2'}, 
]

const UserSlice = createSlice({
    name:"users",
    initialState,
    reducers:{}
})

export default UserSlice.reducer;