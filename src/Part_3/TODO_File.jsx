import React, { useState } from "react";
import {BiUpload} from 'react-icons/bi';
import {BsFillTrashFill} from 'react-icons/bs';
import { useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation } from "./Store/apiSlice";

export  const TodoFile=()=>{
    const [newTodo,setNewTodo] = useState('');
    const {
        data : todos,
        isLoading,
        isError,
        isSuccess,
        error
    } = useGetTodosQuery() ;
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit=(e)=>{
        e.preventDefault();
        addTodo({userId:1,title: newTodo ,completed : false})
        setNewTodo('')
    }
    const newItemSection = <form onSubmit={handleSubmit}>  
    <label>Enter a new Todo items</label>
            <div>
            <input type="text" id='new-todo' 
            value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}
            placeholder="Enter new TOdo" />
            </div>
        <button><BiUpload /></button>

        </form>
    let content;
    if(isLoading){
        content =<p>Loading.......</p>
        3
    }else if(isSuccess){
        content = todos.map(todo=>{
            return (
                <article key={todo.id}>
                    <div>
                        <input
                        type="checkbox" 
                        checked={todo.completed||todo.completed}
                        id={todo.id} 
                        onClick={()=>updateTodo({...todo,completed : !true.completed})} 
                        />
                    <label  htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button onClick={()=>deleteTodo({id:todo.id})}><BsFillTrashFill/></button>
                </article>
            )
        })
    }else if(isError){
        content = <p>{error}</p>
    }
    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}