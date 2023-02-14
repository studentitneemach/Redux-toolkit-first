import React from 'react';
import { BrowserRouter, NavLink, Route,  } from 'react-router-dom';
import { AddPost, GetAllPost, GetPostById, ParmanentDelete, UpdatePost } from './Redux toolkit/GetAllPosts';
import './App.css'
import {  AddData, GetData, UpdateData } from './Email_validet/Main';
const  App=()=>{
  return (
    <BrowserRouter>
    <nav className='navbar'>
      <ul className='nav-links'>
        <li className='menu'>
      <NavLink to='/' exact  >All Post</NavLink></li>
        <li className='menu'>
      <NavLink to='/addpost'  >Add Post</NavLink></li>
        <li className='menu'>
      <NavLink to='/paemanentdelete'  >ParmanentDelete</NavLink></li>
      </ul>
    </nav>
        {/* <Route path='/' exact   component={GetAllPost} />
    <Route path='/getpostbyid/:id' component={GetPostById}/>
    <Route path='/addpost'   component={AddPost} />
    <Route path='/updatepost/:id' component={UpdatePost}/>
    <Route path='/paemanentdelete' component={ParmanentDelete}/> */}
    <Route path='/' exact   component={GetData} />
    {/* <Route path='/getpostbyid/:id' component={GetPostById}/> */}
    <Route path='/addpost'   component={AddData} />
    <Route path='/updatepost/:id' component={UpdateData}/>
    <Route path='/paemanentdelete' component={ParmanentDelete}/>
    </BrowserRouter>
  )
}

export default App;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React from 'react';
// import './App.css';
// import AddPostForm from './Part_4/features/Posts/AddPostForm';
// import PostsList from './Part_4/features/Posts/PostsList';
// // import { TodoFile } from './Part_3/TODO_File';
// // import { AddPosts } from './Part2/Posts/AddPosts';
// // import PostList from './Part2/Posts/PostFile';
// // import Counter from './Part1/Counter';
// import SinglePagePost from './Part_4/features/Posts/SinglePost';
// import Layout from './Part_4/Component/Layout';
// import {Route} from 'react-router-dom'


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//       {/* <TodoFile/> */}
//       {/* <AddPosts/>
//       <PostList/> */}
//       <Route path="/" exact component={Layout}/>
//       <Route index   component={PostsList}/>
//       <Route path="post">
//       <Route index  component={AddPostForm}/>
//       <Route path=":postId"  component={SinglePagePost}/>
//       </Route>
  
//       </header>
//     </div>
//   );
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////
// import React from 'react';
// import { BrowserRouter, NavLink, Route } from 'react-router-dom';
// import GetAllPost, { AddPost, SearchPost, UpdatePost } from './Part_55%%';

// const  App=()=>{
//   return (
//     <BrowserRouter>
//     <nav>
//       <ul>
//         <li>
//       <NavLink to='/' exact  >All Post</NavLink></li>
//         <li>
//       <NavLink to='/addpost'  >Add Post</NavLink></li>
//         {/* <li> */}
//       {/* <NavLink to='/searchpost'  >Search Post</NavLink></li> */}
//       </ul>
//     </nav>
//     <Route path='/' exact   component={GetAllPost} />
//     <Route path='/addpost'   component={AddPost} />
//     {/* <Route path='/searchpost'   component={SearchPost} /> */}
//     <Route path='/updatepost/:id' component={UpdatePost}/>
//     </BrowserRouter>
//   )
// }

// export default App;
///////////////////////////////////////////////////////////////////////////////////////////////////////
///https://www.youtube.com/watch?v=NqzdVN2tyvQ
/////https://github.com/gitdagray/react_redux_toolkit
//////https://youtu.be/jx5hdo50a2M