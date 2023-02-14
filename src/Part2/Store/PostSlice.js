import { createSlice ,nanoid ,createAsyncThunk} from '@reduxjs/toolkit';
import {sub} from 'date-fns';
// import {nanoid} from '@reduxjs/toolkit';
import axios from 'axios';

const POST_URL="https://jsonplaceholder.typicode.com/posts";
const initialState ={
    posts:[],
    status:'idle',
    error:null,
}

export  const fetchPosts=createAsyncThunk('posts/fetchPosts',async()=>{
        const response =await axios.get(POST_URL)
        return [...response.data]
});


const PostSlice = createSlice({
   name:"posts",
   initialState,
   reducers:{
    postAdd:{
        reducer(state,action){
        state.posts.push(action.payload)
    },
prepare(title,content,userId){
   return{ payload: { 
    id:nanoid(),
    title,
    content,
    date: new Date().toISOString() ,
    userId,
    reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0
    }
}}
}},
reactionAdded(state,action){
    const {postId,reaction} = action.payload;
    const existingPost = state.posts.find(post => post.id=== postId)
    if(existingPost){
        existingPost.reactions[reaction]++
    }
}, 
extraReducers(builder) {
    builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Adding date and reactions
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString();
                post.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                return post;
            });

            // Add any fetched posts to the array
            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            
            state.status = 'failed'
            state.error = action.error.message
        })

   }
   }
})

export const getPosts = (state)=>state.posts.posts;
export  const getError= (state)=>state.posts.error;
export const getStatus= (state)=>state.posts.status;
export default PostSlice.reducer;

export const  {postAdd ,reactionAdded  }  = PostSlice.actions;

// extraReducers(builder){
//     builder
//     .addCase(fetchPosts.pending,(state,action)=>{
//         state.posts.status = "loading"

//     })
//     .addCase(fetchPosts.fulfilled,(state,action)=>{
//         state.posts.status ="succeded"
//         let min = 1 ;
//         const loadedPosts = action.payload.map(post =>{
//             post.date = sub(new Date() ,{minutes:min++}).toISOString;
//             post.reaction ={
//                 thumbsUp: 0,
//                 wow: 0,
//                 heart: 0,
//                 rocket: 0, 
//                 coffee: 0,
                
//             }
//             return post;
//         });
        
//         state.posts.posts = state.posts.posts.concat(loadedPosts)
//     })
//     .addCase(fetchPosts.rejected,(state,action)=>{
//         state.posts.status = 'faild'
//         state.posts.error = action.error.message
//     })
// }
