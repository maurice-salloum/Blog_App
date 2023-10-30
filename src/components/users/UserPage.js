import { useSelector } from 'react-redux'
import { selectUserById } from '../../slices/userSlice'
import { selectPostsByUser } from '../../slices/postSlice'
import { Link, useParams } from 'react-router-dom'
// import { selectAllPosts } from '../../slices/postSlice'

const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

    const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId)))
    
    // const postsForUser = useSelector( state => {
    //     const allPosts = selectAllPosts(state)
    //     return allPosts.filter( post => post.userId  ===  Number(userId) ) 
    // } )


    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section className='flex flex-col items-center gap-y-20' >
            <h2 className='text-5xl' > {user?.name} </h2>

            <ol className='list-[upper-roman] ' >
            {postTitles}
            </ol>
        </section>

    )
}

export default UserPage