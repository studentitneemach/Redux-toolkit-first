import { configureStore } from "@reduxjs/toolkit"
import counterReduser from './Slice';

 const store = configureStore({
    reducer:{
        counter:counterReduser
    }
})
export default store