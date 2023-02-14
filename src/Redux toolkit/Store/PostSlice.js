import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchUsers = createAsyncThunk('/posts/fetchUsers',async()=>{
    // console.log("post get scess")
    const response = await axios.get("http://localhost:4000/posts")
    return response.data
});

export const  addNewPost = createAsyncThunk('/posts/addNewPost',async(initialState)=>{
//    console.log(initialState)
    const response = await axios.post("http://localhost:4000/posts",initialState)
    return response.data
});

export const updatePostApi = createAsyncThunk('/posts/updatePostApi',async({id,...initialState})=>{

    const response = await axios.put(`http://localhost:4000/posts/${id}` , initialState )
    return response.data
});

export const deletePost = createAsyncThunk('/posts/deletePost',async({id})=>{
    const response = await axios.delete(`http://localhost:4000/posts/${id}`)
    return response.data
});

///////////////////////////////////////////// delete  Post Permanently url ///////////////////////////////////////////////////////////////////////////

export const deleteFetchUsers = createAsyncThunk('/deleteData/deleteFetchUsers',async()=>{
  
    const response = await axios.get("http://localhost:4000/deleteData")
    // console.log(response)
    return response.data
});

export const  deleteAddNewPost = createAsyncThunk('/deleteData/deleteAddNewPost',async(initialState)=>{
    
        const response = await axios.post(`http://localhost:4000/deleteData`,initialState)
        return response.data
});

export const deletePostPermanently = createAsyncThunk('/deleteData/deletePostPermanently',async({id})=>{

    const response = await axios.delete(`http://localhost:4000/deleteData/${id}`)
    return response.data
});
///////////////////////////////////////////// delete  Post Permanently url ///////////////////////////////////////////////////////////////////////////

    export const emailAdd= createAsyncThunk('/email/emailAdd',async(initialData)=>{
        const response = await axios.post('http://localhost:4000/email',initialData)
        return response.data
    })
    export const emailGetData= createAsyncThunk('/email/emailAdd',async(initialData)=>{
        const response = await axios.get('http://localhost:4000/email',initialData)
        return response.data
    })
    export const emailUpdateData= createAsyncThunk('/email/emailUpdateData',async({id,...initialData})=>{
        const response = await axios.put(`http://localhost:4000/email/${id}`,initialData)
        return response.data
    })
    export const emailDeleteData= createAsyncThunk('/email/emailDeleteData',async({id})=>{
        const response = await axios.delete(`http://localhost:4000/email/${id}`)
        return response.data
    })
  ///////////////////////////////////////////// Email VALIdetion url ///////////////////////////////////////////////////////////////////////////
 
const initialState = {
    posts: [],
    deletePosts:[],
    emailCheck:[],
    status: 'idle',
    isLoading: false, //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const PostSlice= createSlice({
// name:'posts',
// initialState,
// reducers:{

// },
// extraReducers :{ ///////////////////////// Get Post /////////////////////////
// [fetchUsers.pending]:(state)=>{
//    state.isLoading = true;
//    state.error=null 
// },
// [fetchUsers.fulfilled]:(state,action)=>{
//     state.isLoading = false;
//      state.posts = state.posts.concat( action.payload)
//  },
//  [fetchUsers.rejected]:(state,action)=>{
//     state.isLoading = false;
//      state.error = action.payload;
//  },/////////////////////////Addd post /////////////////////////
//  [addNewPost.pending]:(state)=>{
//     state.isLoading = true;
//     state.error=null 
//  },
//  [addNewPost.fulfilled]:(state,action)=>{
//      state.isLoading = false;
//       state.posts = state.posts.concat( action.payload)
//   },
//   [addNewPost.rejected]:(state,action)=>{
//      state.isLoading = false;
//       state.error = action.payload;
//   }, ///////////////////////// Upadete posts /////////////////////////
//    [updatePostApi.pending]:(state)=>{
    
//     state.isLoading = true;
//     state.error=null 
//  },
//  [updatePostApi.fulfilled]:(state,{  payload })=>{
//      state.isLoading = false; 
//      state.posts= state.posts.map(valu => (valu.id === payload.id ? payload : valu))
//   },
//   [updatePostApi.rejected]:(state,action)=>{
//      state.isLoading = false;
//       state.error = action.payload;
//   },//////////////////////// DElete Posts//////////////////////////
// [deletePost.pending]:(state)=>{
//     state.isLoading = true;
//     state.error=null 
//  },
//  [deletePost.fulfilled]:(state,action)=>{
//      state.isLoading = false;
//      state.posts= state.posts.filter(el=>(el.id !== action.meta.arg.id ))
//   },
//   [deletePost.rejected]:(state,action)=>{
//      state.isLoading = false;
//       state.error = action.payload;
//   }, 
//   //////////////////////// //////////////////////////
// }


// })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// console.log(initialState.status)
const PostSlice= createSlice({
name:'posts',
initialState,
reducers:{
        postDelete: (state,action)=>{ 
            state.posts = state.posts.filter(el=> (el.id !== action.payload.id ))

            state.deletePosts = [...state.deletePosts , action.payload ]
    },
 
    },
extraReducers(builder){
    ///////Get Posts//////////////
    builder.addCase(fetchUsers.pending,(state,action)=>{
        state.isLoading =  true
        state.status = 'loading';
    }).addCase(fetchUsers.fulfilled,(state,action)=>{
        state.status = 'succeeded';
        state.isLoading = false;
        
        state.posts = state.posts.concat( action.payload)
    })
    .addCase(fetchUsers.rejected,(state,action)=>{
        state.status = 'failed'
        state.isLoading =  false;
        state.error = action.error.message;
    })  
    //////////////Add Posts///////////////////////////
    .addCase(addNewPost.pending,(state,action)=>{
        
        state.status = 'loading';
        state.isLoading = true;
    }).addCase(addNewPost.fulfilled,(state,action)=>{
        state.status = 'succeeded';
        state.isLoading = false;
        // console.log(action)
        state.posts = state.posts.concat( action.payload)
    }) 
    .addCase(addNewPost.rejected,(state,action)=>{
        state.status = 'failed'
        state.error = action.error.message
    }) 
    /////////////////////////////Update Posts/////////////////////////////////////
    .addCase(updatePostApi.pending,(state,action)=>{
        state.status = 'loading';
        state.isLoading = true;
    }).addCase(updatePostApi.fulfilled,(state,{payload})=>{
        state.status = 'succeeded';
        state.isLoading = false;
        state.posts= state.posts.map(valu => (valu.id === payload.id ? payload : valu))
    })
    .addCase(updatePostApi.rejected,(state,action)=>{
        state.status = 'failed'
        state.error = action.error.message
    }) 
    /////////////////////////////Delete Posts///////////////////////////
 .addCase(deletePost.pending,(state,action)=>{
        state.status = 'loading';
        state.isLoading = true;
    }).addCase(deletePost.fulfilled,(state,action)=>{
        state.status = 'succeeded';
        state.isLoading = false;
        // state.posts = state.posts.filter(el=> (el.id !== action.meta.arg.id ))
        state.deletePosts = state.deletePosts.filter(el=> (el.id !== action.meta.arg.id ))
    })
    .addCase(deletePost.rejected,(state,action)=>{
        state.status = 'failed'
        state.error = action.error.message
    }) 
    ///////////////////////  delete post temprily  and    add new in new data post url ///////////////////////

     ///////Get Posts//////////////
        builder.addCase(deleteFetchUsers.pending,(state,action)=>{
            state.isLoading =  true
            state.status = 'loading';
        }).addCase(deleteFetchUsers.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.isLoading = false;
            // console.log(action.payload)
            state.deletePosts = state.deletePosts.concat( action.payload)
        })
        .addCase(deleteFetchUsers.rejected,(state,action)=>{
            state.status = 'failed'
            state.isLoading =  false;
            state.error = action.error.message;
        })  
         //////////////Add Posts///////////////////////////
    .addCase(deleteAddNewPost.pending,(state,action)=>{
        
        state.status = 'loading';
        state.isLoading = true;
    }).addCase(deleteAddNewPost.fulfilled,(state,action)=>{
        state.status = 'succeeded';
        state.isLoading = false;
        // console.log(action)
        state.deletePosts = state.deletePosts.concat( action.meta.arg)
    }) 
    .addCase(deleteAddNewPost.rejected,(state,action)=>{
        state.status = 'failed'
        state.error = action.error.message
    }) 
     /////////////////////////////Delete Posts///////////////////////////
 .addCase(deletePostPermanently.pending,(state,action)=>{
    state.status = 'loading';
    state.isLoading = true;
}).addCase(deletePostPermanently.fulfilled,(state,action)=>{
    state.status = 'succeeded';
    state.isLoading = false;
    // state.posts = state.posts.filter(el=> (el.id !== action.meta.arg.id ))
    // state.deletePosts = state.deletePosts.filter(el=> (el.id !== action.meta.arg.id ))
})
.addCase(deletePostPermanently.rejected,(state,action)=>{
    state.status = 'failed'
    state.error = action.error.message
}) 
     /////////////////////////////Delete Posts Restore on All Post Page ///////////////////////////
     .addCase(emailAdd.pending,(state,action)=>{
        
        state.status = 'loading';
        state.isLoading = true;
    }).addCase(emailAdd.fulfilled,(state,action)=>{
        state.status = 'succeeded';
        state.isLoading = false;
        state.emailCheck = state.emailCheck.concat( action.payload)
    }) 
    .addCase(emailAdd.rejected,(state,action)=>{
        state.status = 'failed'
        state.error = action.error.message
    }) //////////////////////////////////////
    .addCase(emailUpdateData.pending,(state,action)=>{
        state.status = 'loading';
        state.isLoading = true;
    })
    .addCase(emailUpdateData.fulfilled,(state,{payload})=>{
        state.status = 'succeeded';
        state.isLoading = false;
        state.emailCheck = state.emailCheck.map(data => (data.id === payload.id ? payload : data))
    })//////////////////////////////////////
    .addCase(emailUpdateData.rejected,(state,action)=>{
        state.status = 'loading';
        state.isLoading = true;
    })
    .addCase(emailDeleteData.pending,(state,action)=>{
        state.status = 'loading';
        state.isLoading = true;
    })
    .addCase(emailDeleteData.fulfilled,(state,action)=>{
        state.status = 'succeeded';
        state.isLoading = false;
        state.emailCheck = state.emailCheck.filter(valu => valu.id !== action.meta.arg.id)
    })
    .addCase(emailDeleteData.rejected,(state,action)=>{
        state.status = 'failed';
        state.isLoading = action.error.message;
    })
}
})
//state.deletePosts = state.deletePosts.filter(el=> (el.id !== action.meta.arg.id ))
export  const {postDelete } = PostSlice.actions;
export const deletePostState = (state)=>state.posts.deletePosts
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsError = (state) => state.posts.error;
export const getPostsStatus = (state) => state.posts.status;
export const emailData =(state)=> state.posts.emailCheck ;
export const getIsLoading = (state) => state.posts.isLoading;

export default PostSlice.reducer

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const POSTS_URL="http://localhost:4000";


// const initialPost ={
//     posts:[],
//     status:'idle',
//     error:null
// }

// // export  const fetchPosts =createAsyncThunk('/posts/fetchPosts' ,async()=>{
// //     const response = await axios.get(POSTS_URL)
// //     return response
// // }) 


// //  const postSlice = createSlice({
// //     name:'posts',
// //     initialPost,
// //     reducers:{
// //         postAdd:{
// //             reducer(state,action){
// //                 state.posts.push(action.payload)
// //             }
// //         }
// //     },
// //     extraReducers (builder){
// //         builder
// //         .addCase(fetchPosts.pending,(state,action)=>{
// //             state.status ="loading"
// //         })
// //         .addCase(fetchPosts.fulfilled,(state,action)=>{
// //             state.status ="succeeded"
// //             state.posts = state.posts.concat(action.payload)
// //         })
// //         .addCase(fetchPosts.rejected,(state,action)=>{
// //             state.status ="failed"
// //             state.error = action.error.message
// //         })
// //     }
// // })
// // const postSlice = createSlice({
// //     name: 'posts',
// //     initialPost,
// //     reducers: {
  
// //   },
// //     extraReducers(builder) {
// //           builder
// //               .addCase(fetchPosts.pending, (state, action) => {
// //                   state.status = "loading"
// //               })
// //               .addCase(fetchPosts.fulfilled, (state, action) => {
// //                   state.status = "succeeded"
// //                   state.posts = state.posts.concat(action.payload);
// //               })
// //               .addCase(fetchPosts.rejected, (state, action) => {
// //                   state.status = "failed"
// //                   state.error = action.error.message
// //               })
// //             //   .addCase(deletePost.fulfilled, (state, action) => {
// //             //       if (!action?.payload.id) {
                    //   console.log("could not delete");
                    //   console.log(action.payload)
// //             //           return 
// //             //       }
  
// //             //       const { id } = action.payload;
// //             //       const OldPosts = state.posts.filter(post => 
// //             //       post.id !== id)
// //             //       state.posts = OldPosts
// //             //   })
// //       }
// //   })
  
// // export const getAllPosts = (state)=>state.posts.posts;
// // export const getPostStatus =(state)=>state.posts.status;
// // export const getPostError =(state)=>state.posts.error;
// // // export const {postAdd} = postSlice.actions;

// // export default postSlice


// // const USERS_URL = 'https:/\\';

// // const initialState = []

// // export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
// //     const response = await axios.get(USERS_URL);
// //     return response.data
// // })

// // const postsSlice = createSlice({
// //     name: 'posts',
// //     initialState,
// //     reducers: {},
// //     extraReducers(builder) {
// //         builder.addCase(fetchUsers.fulfilled, (state, action) => {
// //             return action.payload;
// //         })
// //     }
// // })

// // export const selectAllUsers = (state) => state.users;

// // export default postsSlice.reducer