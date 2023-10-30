
import PostAuthor from "../users/PostAuthor"
import TimeAgo from "../TimeAgo"
import ReactionButtons from "../ReactionButton"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectPostById } from "../../slices/postSlice"




const PostsExcerpt = ({ postId }) => {

  const post = useSelector(state =>selectPostById(state, postId))

  return (
    <article className='border-4 border-solid border-green-200 rounded m-4 p-3 w-2/4' >
        <h2 className='mb-3 text-[30px] ' > { post.title } </h2>
        <p className=' mb-10 ' > { post.body.substring(0, 75) }... </p>
      
        <p className='border-4 w-[180px] text-3xl font-bold text-center bg-emerald-300 rounded-2xl' >  
            <Link to={ `post/${post.id}` } > View Post </Link>
        </p>
        
        <ReactionButtons  post={post} />
        <PostAuthor userId={post.userId} /> 
        <TimeAgo timestamp={post.date} />
    </article>
  )
}




export default PostsExcerpt