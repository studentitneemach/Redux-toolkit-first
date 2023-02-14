import React from "react";
import { parseISO ,formatDistanceToNow  } from "date-fns";

export  const  TimeAgo=({timestamp})=>{
    let timeAgo ='';
    if(timestamp){
        const date = parseISO(timestamp) ;
        const timePeried = formatDistanceToNow(date)
        timeAgo =`${timePeried} ago`
    }
    return (
        <span title={timestamp}> 
           &nbsp;   <i>{timeAgo}</i> 
        </span>
    )
}