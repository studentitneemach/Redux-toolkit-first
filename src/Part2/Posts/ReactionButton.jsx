import React from "react";
import { useDispatch } from "react-redux"
import { reactionAdded } from "../Store/PostSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

export  const ReactionButton=({post})=>{
    const dispatch= useDispatch();
    const reactionButton= Object.entries(reactionEmoji).map(([name,emoji])=>{
        return (
            <button key={name} className="reactionButton" onClick={()=>dispatch(reactionAdded({postId:post.id,reaction:name}))}>
                {emoji} {post.reactions[name]} </button>
        )
    })
    return <div>{reactionButton}</div>
}