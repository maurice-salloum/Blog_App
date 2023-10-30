import { useSelector } from 'react-redux'
import { selectPostById } from '../../slices/postSlice';
import PostAuthor from '../users/PostAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButton';
import { useParams, Link } from 'react-router-dom';


const SinglePostPage = () => {
    const { postId } = useParams()
    
    const post = useSelector( (state) => selectPostById(state, Number(postId)) )

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article className='border-4 border-solid border-green-200 rounded m-4 p-3' >
            <h2 className='mb-3 text-[30px] ' > { post.title } </h2>
            <p className=' mb-10 ' > { post.body } </p>
        
            <p className='border-4 w-[180px] text-3xl font-bold text-center bg-emerald-300 rounded-2xl' >  
                <Link to={`/post/edit/${post.id}`} > Edit Post </Link>
            </p>
            
            <ReactionButtons  post={post} />
            <PostAuthor userId={post.userId} /> 
            <TimeAgo timestamp={post.date} />
        </article>

        
    )
}

export default SinglePostPage