import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewPost, deletePost, postDelete, deletePostState,    getPostsError, getPostsStatus, selectAllPosts, updatePostApi, deleteAddNewPost, deletePostPermanently  } from "./Store/PostSlice";

export  const GetAllPost=()=>{
    const posts = useSelector(selectAllPosts);
    const status = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);
   
    // const deletePostById =  useSelector(state =>state.posts.deletePosts)
    const dispatch=useDispatch() 
    const history = useHistory();
  const getPostById=(id)=>{
    history.push(`/getpostbyid/${id}`)
  }
    const deletePostHandler =(post)=>{
        dispatch(deletePost({id:post.id}) ).unwrap() ;
        dispatch(deleteAddNewPost(post))
        dispatch(postDelete(post))
    }
const UpdateHandler=(id)=>{
    history.push(`/updatepost/${id}`)
}

let a = 0;
    let Content;
    if(status === 'loading'){
        // if(isLoading === true){
        Content = <div className="text-center my-5">Loadging...................</div>
    }else if(status === "succeeded"){
    // }else if(isLoading === false){
        const orderSort = posts.map((post,index)=>{
           return ( <div className="tag" key={index}>
            <div>
            <h2>Batch No. : {post.userId}</h2>
                <h3>Title : {post.title}</h3>
                <p className="postCredit">
                  Content :  {post.body.substring(0,25)}...<span type="button" onClick={()=>getPostById(post.id)} style={{color:'red',cursor:'pointer'}}>Read More</span>
                </p>
            </div>
            <div>
            <button className="btn btn-danger" onClick={()=>UpdateHandler(post.id)}>
                    Upade 
                </button>
                <button className="btn btn-danger" onClick={()=>deletePostHandler(post)}>
                    Delete
                </button>
                { a = a+1 }
            </div>
        </div>)
        })
        Content = orderSort
    }else if(error === 'failed'){
        Content = (
            <>
            <h1>Post Not Found</h1>
            <p className="text-center text-danger">{error}</p>
            </>
        )
    }


    return <>
          <section className="">
        
    <div className="card__details ">
        <div className="card">
            <div className="col-12 text-center">
                <h3>Here are all the posts</h3>
            </div>
        </div>
        <div className="card">
            <div className="gerid">

                {Content}                            
            </div>
        </div>
    </div>
</section></> 
}   

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

export const GetPostById=({match})=>{
    const posts = useSelector(selectAllPosts);
    const history = useHistory();
    const data = posts?.find((el)=>el.id === Number(match.params.id))
    
if(data !== undefined ){
   return   <div  className="item">
    <div>
            <h2>Batch No. : {data.userId}</h2>
                <h3>Title : {data.title}</h3>
                <p className="postCredit">
                  Content :  {data.body}
                </p>
                <span>If You Want Upade Post <span onClick={()=>history.push(`/updatepost/${data.id}`)} style={{color:'red',cursor:'pointer'}}>Click Here</span></span>
            </div>
            <button onClick={()=>history.push('/')} style={{cursor:'pointer'}}>Back</button>
       </div>
}
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


export  const AddPost=()=>{
    const [addPost, setAddPost] = useState('')

    const dispatch = useDispatch()
    
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
       
        try{
            dispatch(addNewPost(addPost))
        }catch(err){
            console.error('faild to save post ', err)
        }
        history.push('/')

    }
    return (
        <div className="card">
             <form onSubmit={SubmitHnadler} className='form-item'>
             <input type="number" name="userId"  value={addPost.userId || ""} onChange={AddPostHandler} placeholder="Batch No."    required />
                <br />
                <textarea type="text" name="title" className="textArea" value={addPost.title || ''} onChange={AddPostHandler} placeholder="Title"  required />
                <br />
                <textarea type="text" name="body" className="bodyTextAreac" value={addPost.body || ""} onChange={AddPostHandler} placeholder="Body"    required />
                <br />

                <button type="submit">AddPost</button>
            </form>
        </div>
    )

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 export  const UpdatePost=({match})=>{
    const posts = useSelector(selectAllPosts);

const data = posts.find((el)=>el.id === Number(match.params.id))

    const [updatePost, setUpdatePost] = useState('')

    const dispatch = useDispatch()
 
    const history = useHistory()
    const AddPostHandler = (e) => {
        const names = e.target.name;
        const values = e.target.value;
        setUpdatePost(data => ({
            ...data, [names]: values,
        }))

    }

    const SubmitHnadler = async (e) => {
        e.preventDefault();
        try{
            dispatch(updatePostApi(updatePost))
        }catch(err){
            console.error('faild to save post ',err)
        }
        history.push('/')
    }
    
    useEffect(()=>{
        if(data){
            setUpdatePost(data)
        }
    },[data])
    return (
        <div className="card">
             <form onSubmit={SubmitHnadler}  className='form-item'>
             <input type="text" name="userId"  value={updatePost.userId || ""} onChange={AddPostHandler} placeholder="Batch No."    required />
                <br />
                <textarea type="text" name="title" className="textArea" value={updatePost.title || ''} onChange={AddPostHandler} placeholder="Title"  required />
           
                <br />
                <textarea type="text" name="body" className="bodyTextAreac" value={updatePost.body || ""} onChange={AddPostHandler} placeholder="Body"    required />
                <br />

                <button type="submit"    >Update Post</button>
            </form>
        </div>
    ) 
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

export const ParmanentDelete=()=>{
    const status = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);
    const dispatch=useDispatch() 
    const deletePostParmanent =  useSelector(deletePostState)

// console.log(deletePostParmanent)
const RestorePostAddPost=(post)=>{
    // console.log(post)
    dispatch(addNewPost(post))
    dispatch(deletePostPermanently({id:post.id})).unwrap()
    
}
let a = 0;
    let Content;
    if(status === 'loading'   ){
        // if(isLoading === true){
        Content = <div className="text-center my-5">Loadging...................</div>
    }else if(status === "succeeded"){  
    // }else if(isLoading === false){
        const orderSort = deletePostParmanent.map((post,index)=>{
           return ( <div className="tag" key={index}>
            <div>
            <h2>Batch No. : {post.userId}</h2>
                <h3>Title : {post.title}</h3>
                <p className="postCredit">
                  Content : {post.body}  </p>
            </div>
            <div>
         
                <button className="btn btn-danger" onClick={()=>RestorePostAddPost(post) }>
                    Restore
                </button>
                { a = a+1 }
            </div>
            <span>If You Want To Delete Post Parmanently Delete <span onClick={()=>  dispatch(deletePostPermanently({id:post.id})).unwrap()} style={{color:"red",cursor:"pointer"}}>Click Here</span> </span>
        </div>)
        })
        Content = orderSort
    }else if(error === 'failed'){
        Content = (
            <>
            <h1>Post Not Found</h1>
            <p className="text-center text-danger">{error}</p>
            </>
        )
    } 
    if(deletePostParmanent.length === 0){
        Content = (
            <>
            <h1>Post Not Here</h1>
            <p className="text-center text-danger">{error}</p>
            </>
        )
    }

    return     <section className="">
    <div className="card__details">
        <div className="card">
            <div className="col-12 text-center">
                <h3>Here are all the posts</h3>
            </div>
        </div>
        <div className="card">
            <div className="gerid">
                {Content }                            
            </div>
        </div>
    </div>
</section>
    
    // return <button onClick={()=>dispatch(postDelete("1236"))}>  ADDDDD</button>
}     

///json-server --watch data/db.json --port 3500
// json-server --watch data/deleteData.json --port 4000