import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {emailAdd, getPostsError, getPostsStatus, emailData, emailUpdateData, emailDeleteData} from "../Redux toolkit/Store/PostSlice";


export  const GetData=()=>{
    const status = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);
    const FetchData = useSelector(emailData);
   
    const dispatch=useDispatch() 
    const history = useHistory();
    
    const deletePostHandler =(post)=>{
       let  confidrm = window.confirm("Do You Want to Delete You Data")
        if(confidrm  === true){
            dispatch(emailDeleteData({id:post.id}))
        } 
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
        const orderSort = FetchData.map((post,index)=>{
           return ( <div className="tag" key={index}>
            <div>
            <h2>Name : {post.name}</h2>
                <h3>Email : {post.email}</h3>
                <p className="postCredit">
                  Password :  {post.password}
                </p>
            </div>
            <div>
            <button className="btn btn-danger" onClick={()=>UpdateHandler(post.id)}>
                    Updete 
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export  const AddData=()=>{
    const [addPost, setAddPost] = useState('')
    const GetData = useSelector(emailData)
    const dispatch = useDispatch()

    const history = useHistory()
    const AddPostHandler = (e) => {
        const names = e.target.name;
        const values = e.target.value;
        setAddPost(data => ({
            ...data, [names]: values, id: Math.random() 
        }))

    }



const EmailValideter=()=>{
    let check=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let DataChecking = GetData.map(user => user.email === addPost.email)
    let data= DataChecking.findIndex( (user)=>user === true )
      
    if(data !== -1 ){
        alert('User Allready Exiest ')

    } else if(check.test(addPost.email )){  
         try{
    dispatch(emailAdd(addPost))
}catch(err){
    console.error('faild to save post ', err)
}
history.push('/')
}
    else{
    alert('Invalid Email Enter Valid Email')}
}
    const SubmitHnadler = async (e) => {
        e.preventDefault();
       EmailValideter()
     
    }
    return (
        <div className="card">
             <form onSubmit={SubmitHnadler} className='form-item'>
             <input type="text" name="name"  value={addPost.name || ""} onChange={AddPostHandler} placeholder="Name"    required />
                <br />
                 <input type="text" name="email" className="email" value={addPost.email || ''} onChange={AddPostHandler} placeholder="Email"  required />
                <br />
                <input type="password" name="password" className="password" value={addPost.password || ""} onChange={AddPostHandler} placeholder="Password"    required />
                <br />

                <button type="submit">AddPost</button>
            </form>
        </div>
    )

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
export  const UpdateData=({match})=>{
    const UpadeteData  = useSelector(emailData);

const data = UpadeteData.find((el)=>el.id === Number(match.params.id))

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
    const EmailValideter=()=>{
        let check=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let  confidrm = window.confirm("Do You Want to Upadate You Data");
        if(confidrm  === false ){
            history.push('/');
        }else if(check.test(updatePost.email )){
            try{
                dispatch(emailUpdateData(updatePost))
            }catch(err){
                console.error('faild to save post ', err)
            }
            history.push('/')
        }
    else{
    alert('Invalid Email Enter Valid Email')}
        }    
    const SubmitHnadler = async (e) => {
        e.preventDefault();
        EmailValideter();
    }
    useEffect(()=>{
        if(data){
            setUpdatePost(data)
        }
    },[data])
    return (
        <div className="card">
The open/close state of the modal can be animated with a transition component. This component should respect the following conditions:
             <form onSubmit={SubmitHnadler}  className='form-item'>
             <input type="text" name="name"  value={updatePost.name || ""} onChange={AddPostHandler} placeholder="name"    required />
                <br />
                <input type="text" name="email" className="input" value={updatePost.email || ''} onChange={AddPostHandler} placeholder="Email"  required/>
                <br />
                <input type="password" name="password" className="input" value={updatePost.password || ""} onChange={AddPostHandler} placeholder="Password"    required />
                <br />

                <button type="submit"    >Update Data</button>
            </form>
        </div>
    ) 
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 