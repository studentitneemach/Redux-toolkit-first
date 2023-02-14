import React from "react";

import PostAuthor from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import {ReactionButton} from './ReactionButton';
import { useDispatch } from "react-redux";
import { fetchPosts } from "../Store/PostSlice";
export const PostExpert=({post})=>{
    const deipatch = useDispatch()
    console.log(post)
    function data(){
        deipatch(fetchPosts())
    }
    data()
     return (
        <article  className="article">
            <h3>{post.title}</h3>
          <p>{post.body.substring(0,100)}</p> 
          <p className="postCredit">
        <PostAuthor userId={post.userId}/>
        <TimeAgo timestamp={post.date} />
        </p> 
        <ReactionButton post={post} />
            </article>
    )
}