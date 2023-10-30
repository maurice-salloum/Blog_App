import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewPost } from "../../slices/postSlice"
import { selectAllUsers } from "../../slices/userSlice"
import { useNavigate } from "react-router-dom"




const AddPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ title, setTitle ] = useState('')
  const [ body, setBody ] = useState('')
  const [ userId, setUserId ] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const users = useSelector(selectAllUsers)
 
  const canSave = [title, body, userId].every(Boolean) && addRequestStatus === 'idle';

  const onSavePost = async () => {
    if (canSave) {
        try {   
            setAddRequestStatus('pending')
            await dispatch(addNewPost({ title, body, userId })).unwrap()

            setTitle('')
            setBody('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to save the post', err)
        } finally {
            setAddRequestStatus('idle')
        }
    }

}


  const usersOptions = users.map( user => (
    <option key={user.id} value={user.id} >
        { user.name }
    </option>
  ))
  
  

  return (
    <section> 
        <h2 className='mb-12 font-bold' > Add A New Post </h2>
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
                <select id='postAuthor' value={userId} onChange={ e => setUserId(e.target.value) } >
                    <option value='' ></option>
                    { usersOptions }
                </select>
            </div> 

            <div className='shape'>
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
                onClick={ onSavePost }
                className={`${!canSave ? 'cursor-default bg-green-900' : 'cursor-pointer bg-green-200'} btn` }
                disabled={ !canSave }
            > Save Post </button>
        </form>
    </section>
  )
}

export default AddPost