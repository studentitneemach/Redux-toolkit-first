import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

///////////////////////////////////////////////
export const  apiSlice =createApi({
    reducerPath:'postApi',
    tagTypes:['posts'],
    baseQuery : fetchBaseQuery({ baseUrl: "http://localhost:3500"}),
    endpoints: (builder)=>({
        getPosts : builder.query({query :()=>({
            url: 'posts',
            method:'GET'
        }) ,
        providesTags:['posts']
    }),
        getPostsById : builder.query({
            query:(id)=> {
          return  ({
               url: `posts/${id}`,
               method:'GET',
            })},
            providesTags:['posts']
        }) ,

        addPosts: builder.mutation({
            query:({title,body,id,userId})=>({
                headers :{'Content-type': 'application/json', },
                url : "posts",
                method : 'POST',
                body: {title,body,id,userId},
            }),
            invalidatesTags:['posts']
        }),

        updatePosts: builder.mutation({
         query:({id,...rest})=>({
            url:`posts/${id}`,
            method:'PUT',
            body: rest
         }),
         invalidatesTags:['posts']
        }),
        
        deletePosts : builder.mutation({
            query:({id})=>({
                url:`posts/${id}`,
                method:'DELETE',
                body: id
            }),
            invalidatesTags:['posts']
        })

    })
})
export const {useGetPostsQuery ,useAddPostsMutation ,  useUpdatePostsMutation 
                ,useDeletePostsMutation,   useGetPostsByIdQuery } =  apiSlice ;

///////////////////////////////////////////////
// export const apiSlice =createApi({
//     reducerPath:'posts',
//         baseQuery:fetchBaseQuery({
//             baseUrl:POSTS_URL
//         }),
//         endpoints :(builder)=>({
//             getPosts: builder.query({
//                 query:()=>"posts",
    

//             }),
//         })
// })
// export  const { useGetPostsQuery} = apiSlice;
// console.log(useGetPostsQuery) 
// export const apiSlice = createApi({
//     reducerPath:"posts",
//     baseQuery :fetchBaseQuery ({baseUrl:"https://jsonplaceholder.typicode.com"}),
//     endpoints :(bulider)=>({

//         getPosts : bulider.query({
//           query :()=> '/posts',
//         })
        
//     })
// })
// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//     const response = await axios.get(POSTS_URL)
//     return response.data
// })
// export  const apiSlice = createApi({
//     reducerPath : 'userApi' ,
//     baseQuery : fetchBaseQuery({baseUrl:"https://jsonplaceholder.typicode.com"}),

//     endpoints: (bulider)=>({
//         getTodos : bulider.query({
//             query:()=>"/posts",
//             transformResponse: res =>res.sort((a,b)=> b.id - a.id ) ,
         
//         }),
// })
// })
// export const fetchPost  =createAsyncThunk('posts',async()=>{
//     const response = axios.get(POSTS_URL)
//     console.log(response)
//     return  response.data
// } )
// console.log(fetchPost())
// const initialState = {
//     posts: [],
//     status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null
// }


// export const apiSlice = createApi({
// name :"posts",
// initialState,
// reducers:{
//     addPost:{
//         reducer(state,action){
//             state.posts.push(action.payload)
//         }
//     }
// },
// extraReducers : (builder)=>{
//     builder.addCase(fetchPost.fulfilled,(state,action)=>{
//         console.log(state)
//     })
// }
// })
// export const { useGetTodosQuery } = apiSlice;
// console.log(useGetTodosQuery)