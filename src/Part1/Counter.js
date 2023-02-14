import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { increment,decrement,restCount,amount } from "./Store/Slice";
const Counter=()=>{
    const [amountValue,setAmountValue] = useState(0)
    const state = useSelector(state => state.counter.count);
    const dispatch=useDispatch();
    const addValue= Number(amountValue)|| 0;
    const restAll=()=>{
        setAmountValue(0)
        dispatch(restCount())
    }
    return (
        <div>
            <h3>{state}</h3>
            <button onClick={()=>dispatch(increment())}>Increment</button>
            <button  onClick={()=>dispatch(decrement())}>Decrement</button>
            <br/><br/>
            <input type="number" value={amountValue} onChange={e=>setAmountValue(e.target.value)} />
            <button onClick={restAll}>Rest</button>
            <button onClick={()=>dispatch(amount(addValue))}>Amount</button>
        </div>
    )
}

export default Counter;