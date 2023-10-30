
import PostsList from './components/posts/PostsList';
import AddPost from './components/posts/AddPost';
import SinglePostPage from './components/posts/SinglePostPage';
import EditPost from './components/posts/EditPost'; 
import UserPage from './components/users/UserPage';
import UsersList from './components/users/UsersList';
import Layout from './components/lay/Layout';
import { Routes, Route, Navigate } from "react-router-dom";





const App = () => {
  return (
    <Routes>
      <Route  path='/' element={ <Layout /> } >

        <Route index  element={ <PostsList /> } />

        <Route path='post' >
          <Route index  element={ <AddPost /> } />
          <Route path=':postId'  element={ <SinglePostPage /> } />
          <Route path='edit/:postId' element={ <EditPost /> } />
        </Route>

        <Route path='user' >
          <Route index  element={ <UsersList /> }  />
          <Route path=':userId'  element={ <UserPage /> } />
        </Route>

        <Route path='*' element={ <Navigate to='/' replace /> } />

      </Route>
    </Routes>
  )
}

export default App