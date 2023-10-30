import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById, updatePost, deletePost } from '../../slices/postSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { selectAllUsers } from "../../slices/userSlice"


const EditPost = () => {
    const { postId } = useParams(); 
    
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [body, setBody] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

   
    const canSave = [title, body, userId].every(Boolean) && requestStatus === 'idle';

    const onSavePost = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body, userId, reactions: post.reactions })).unwrap()

                setTitle('')
                setBody('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ))

    const onDeletePost = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setBody('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section>
            <h2 className='mb-12 font-bold' >Edit Post</h2>
            <form >
                <div className='shape' >
                    <label htmlFor='postTitle' > Post Title : </label>
                    <input 
                        type='text'
                        id='postTitle'
                        name='postTitle'
                        value={ title }
                        onChange={ e => setTitle(e.target.value) }
                    />
                </div>

               <div className='shape'>
                    <label htmlFor='postAuthor'> Author : </label>
                    <select id='postAuthor' value={userId} onChange={ e => setUserId( Number(e.target.value) ) } >
                        <option value='' ></option>
                        { usersOptions }
                    </select>
               </div>

               <div className='shape' >
                    <label htmlFor='postbody' > Post body : </label>
                        <textarea
                            id='postbody'
                            name='postbody'
                            value={ body }
                            onChange={ e => setBody(e.target.value) }
                        />
               </div>

                <button 
                    type='button'
                    className={`${!canSave ? 'cursor-default bg-green-900' : 'cursor-pointer bg-green-200'} btn` }
                    onClick={ onSavePost }
                    disabled={ !canSave }
                > Save Post </button>
                <button 
                    type='button'
                    className='btn bg-red-700'
                    onClick={ onDeletePost }
                > Delete Post </button>

            </form>
        </section>
    )
}

export default EditPost