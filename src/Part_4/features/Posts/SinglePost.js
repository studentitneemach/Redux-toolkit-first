import React from "react";
import { selectPostById } from "./postSlice";
import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from './TimeAgo';
import ReactionButton from './ReactionButton';
import { Link, useParams } from "react-router-dom";
const SinglePagePost =()=>{
    const {postId} = useParams()
    console.log(postId)
    const post = useSelector((state) => selectPostById(state,Number(postId)))
    if(!post){
        return(
            <section>
                <h2>Post Not Found !</h2>
            </section>
        )
    }
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0,100)}</p>
            <p className="postCredit">
                {/* <Link */}
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButton post ={post} />
        </article>
    )
}

export default SinglePagePost;