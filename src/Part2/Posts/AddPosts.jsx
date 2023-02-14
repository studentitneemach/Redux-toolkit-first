import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { useDispatch,useSelector } from "react-redux";
import './Posts.css';
import { postAdd } from "../Store/PostSlice";
export  const AddPosts =()=>{
    const [title,setTitle] =useState('');
    const [content,setContent] =useState('');
    const [userId,setUserId] =useState('');
    const users = useSelector(state => state.users)
   
    const dispatch=useDispatch();
    const ChangeTitle=(e)=>setTitle(e.target.value);
    const ChangeContent=(e)=>setContent(e.target.value);
    const ChangeUserId=(e)=>setUserId(e.target.value);

    const canvas = Boolean(title) && Boolean(content) && Boolean(userId) ;
    const onSavePostClicked=(e)=>{
        e.preventDefault()
        if(title && content){
            dispatch(postAdd(title , content ,userId ))
            setTitle('');
            setContent('')
        }
    }

    const usersOption  = users.map((user,index)=>(<option key={index}  value={user.id}>
        {user.name}
    </option>))

return (
    <section>
        <h2>Add  New Post</h2>
        <form>
            <label>PostTitle</label>
            <input type="text" id="postTitle" value={title} onChange={ChangeTitle}/>

            <label>PostContent</label>
            <select value={userId} onChange={ChangeUserId}>
            <option value=""></option>
            {usersOption}
            </select>

            <label>PostContent</label>
            <textarea type="text" id="postTitle" value={content} onChange={ChangeContent}/>

            <button   onClick={onSavePostClicked} disabled={!canvas}> SavePost</button>
        </form>
       
    </section>
)
}