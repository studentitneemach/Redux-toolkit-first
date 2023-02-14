import {createApi ,fetchBaseQuery  } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath : 'api' ,
    baseQuery : fetchBaseQuery({baseUrl:"http://localhost:3500"}),
    tagTypes:["Todos"],
    endpoints: (bulider)=>({
        getTodos : bulider.query({
            query:()=>"/todos",
            transformResponse: res =>res.sort((a,b)=> b.id - a.id ) ,
            providesTags:['Todos']
        }),
        addTodo :bulider.mutation({
            query:(todo)=>({
                url:"/todos",
                method :"POST",
                body:todo
            }),
            invalidatesTags:["Todos"]
        }),
        updateTodo :bulider.mutation({
            query:(todo)=>({
                url:`/todos/${todo.id}`,
                method :"PATCH",
                body:todo
            }),
            invalidatesTags:["Todos"]
        }),
        deleteTodo :bulider.mutation({
            query:({id})=>({
                url:`/todos/${id}`,
                method :"DELETE",
                body: id
            }),
            invalidatesTags:['Todos']
        }),
    })
})

export const { 
    useGetTodosQuery ,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation
} = apiSlice;