// import React from 'react';
// import {createRoot}  from 'react-dom/client';
// // import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import Store from './Part_4/app/store';
// import {Provider} from 'react-redux'
// import { fetchUsers } from './Part_4/features/users/usersSlice';
// import { BrowserRouter } from 'react-router-dom';

// Store.dispatch(fetchUsers())
// // import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
// // import { apiSlice } from './Part_3/Store/apiSlice';
// const root = createRoot( document.getElementById('root'))
// root.render(<BrowserRouter> <Provider store={Store}><App/></Provider></BrowserRouter> )

// serviceWorker.unregister();
import React from 'react';
import {createRoot}  from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import Store from './Part_55%%/Store/Store'; 
import { Provider } from 'react-redux';
import Store  from './Redux toolkit/Store/Store';
import { deleteFetchUsers } from './Redux toolkit/Store/PostSlice';

Store.dispatch(deleteFetchUsers() );
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// import { apiSlice } from './Part_55%%/Store/apiSlice';
// console.log(Store)
const root = createRoot( document.getElementById('root'))
// root.render( <Provider store={Store}><App/></Provider> )

root.render( <Provider store={Store}><App/></Provider> )

serviceWorker.unregister();