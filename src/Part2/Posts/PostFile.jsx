import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import './Posts.css';
import { fetchPosts,getError,getStatus,getPosts } from "../Store/PostSlice";
import { PostExpert } from "./PostsExcerpt";
const PostList =()=>{
    const dispatch =  useDispatch();
    const posts =  useSelector(getPosts);
    const error =  useSelector(getError);
    const postStatus = useSelector(getStatus);
   
    console.log(posts)
    console.log(error )
    console.log(postStatus)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostExpert key={post.id} post={post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

   
       return (
        <section>
            <h2>Posts</h2>
            {content}
            <button onClick={()=> dispatch(fetchPosts()) }>o</button>
            </section>
    )
}
export default PostList;