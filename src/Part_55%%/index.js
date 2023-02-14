import React, { useEffect,  useState } from "react";
import {  useHistory } from "react-router-dom";
import {
    useAddPostsMutation,
    useGetPostsQuery,
    useDeletePostsMutation,
    useUpdatePostsMutation
    , useGetPostsByIdQuery
} from "./Store/apiSlice";
///////////Get Post /////////////////
const GetAllPost = () => {
    const { data: posts, isError, isLoading, isSuccess } = useGetPostsQuery();
    const [deletePostApi] = useDeletePostsMutation();
    const history = useHistory();
    
    const UpdateHandler=(id)=>{
        history.push(`/updatepost/${id}`)
    }
    let Posts;
    if (isLoading) {
        Posts = "Lodging......."
    } else if (isSuccess) {
        Posts = posts.map(post => {
            return (<div key={post.id} >
                <div style={{ border: "1px red solid" }}>
                    <span> Id : {post.id}  <br /></span>
                    <span> Batch No : {post.userId}  <br /></span>
                    <span>Title :  {post.title} <br /> </span>
                    <span>Body : {post.body}  <br /></span>
                    <button onClick={()=>UpdateHandler(post.id)}>UpdatePost</button>
                    <button onClick={() => deletePostApi({ id: post.id })}>DeletePost</button>
                </div>
                <br /></div>)
        })
    } 
    // console.log(  <SearchPost/>)
    return (
        <div>
The open/close state of the modal can be animated with a transition component. This component should respect the following conditions:
           
            <br />
            {   Posts}
        </div>
    )
}

export default GetAllPost;
//////////////////////Add Post /////////////
export const AddPost =()=>{

    const [addPost, setAddPost] = useState('')
    const [addPostsApi,{isLoading}] = useAddPostsMutation();
    const history = useHistory()
    const AddPostHandler = (e) => {
        const names = e.target.name;
        const values = e.target.value;
        setAddPost(data => ({
            ...data, [names]: values, id: Math.random()
        }))

    }

    const SubmitHnadler = async (e) => {
        e.preventDefault();
        await addPostsApi(addPost)
        history.push('/')
    }
    return (
        <div>
             <form onSubmit={SubmitHnadler}>
             <input type="text" name="userId" value={addPost.userId || ""} onChange={AddPostHandler} placeholder="Batch No."  disabled={isLoading}  required />
                <br />
                <input type="text" name="title" value={addPost.title || ''} onChange={AddPostHandler} placeholder="Title" disabled={isLoading} required />
                <br />
                <input type="text" name="body" value={addPost.body || ""} onChange={AddPostHandler} placeholder="Body"  disabled={isLoading}  required />
                <br />

                <button type="submit"  disabled={isLoading}  >AddPost</button>
            </form>
        </div>
    )
}

/////////////////////serch Post ///////////////////////

export const SearchPost=()=>{

    const [getPostsId, setGetPostsId] = useState()
    const { data: posts, isError, isLoading, isSuccess } = useGetPostsByIdQuery(getPostsId);
    
    const GetPostByIdHandler = (e) => {
        e.preventDefault()
    }
    const SearchPostId=(e)=>setGetPostsId(e.target.value)


    let Posts;
    if (isLoading) {
        Posts = "Lodging......."
    }else  if (isSuccess ) {
        Posts =  <div style={{ border: "1px red solid" }}>
                    <span> Id : {posts.id}  <br /></span>
                    <span> Batch No : {posts.userId}  <br /></span>
                    <span>Title :  {posts.title} <br /> </span>
                    <span>Body : {posts.body}  <br /></span>
                </div>
                

    } 

    return (
        <div>
           
            <br />
            <div>
                <form onSubmit={GetPostByIdHandler}>
                <input type="text" placeholder='Enter Your Id' name='search' onChange={SearchPostId} />
                <button type="submit">Search</button></form>
                <br />
            </div> 
            <br />
            {/* {isLoading && <p>Loadging..................</p>}
            {isSuccess &&   <div style={{ border: "1px red solid" }}>
                   <span> Id : {posts.id}  <br /></span>
                  <span> Batch No : {posts.userId}  <br /></span>
                     <span>Title :  {posts.title} <br /> </span>
                    <span>Body : {posts.body}  <br /></span>
            </div>
              }
              {isError && console.log(isError)} */}
              { getPostsId && Posts}
        </div>
    )
}


////////////////////////Update Posts////////////////////
 
export  const UpdatePost =({match })=>{
    
    const [updatePost, setUpdatePost] = useState('')
    const [updatePosts ,{isLoading,isSuccess}] = useUpdatePostsMutation();
    const history = useHistory();
    

    const {data }  = useGetPostsQuery(undefined, {
        selectFromResult :({data})=>{
            return({
            data : data?.find((el)=>(el.id === Number( match.params.id)  ))

        })}
    })
    // console.log(updatePost) 
    useEffect(()=>{
        if(isLoading){
        alert("page Loading ")
        }
    },[isLoading,isSuccess])
    useEffect(()=>{
        if(data){
            // console.log(data)
            setUpdatePost(data)
        }
    },[data])
    const SubmitHnadler = async (e) => {
        e.preventDefault();
        // console.log(updatePost)
       history.push('/')
        await updatePosts(updatePost)
    }   
     const AddPostHandler = (e) => {
        const names = e.target.name;
        const values = e.target.value;
        setUpdatePost(data => ({
            ...data, [names]: values,
        }))

    }
    return ( 
        <div>
    <form onSubmit={SubmitHnadler}> 
     <input type="text" name="userId" value={updatePost.userId || ""} onChange={AddPostHandler} placeholder="userId" disabled={isLoading} required />
                <br />
                <input type="text" name="title" value={updatePost.title || ''} onChange={AddPostHandler} placeholder="Title" disabled={isLoading} required />
                <br />
                <input type="text" name="body" value={updatePost.body || ""} onChange={AddPostHandler} placeholder="Body" disabled={isLoading} required />
                <br />
           
           <button type="submit" disabled={isLoading}>Update</button>
       </form>
   </div>
    )
} 

/////////////https://www.youtube.com/watch?v=6FN-8-0wMZE