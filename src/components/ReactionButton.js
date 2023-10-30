import { useDispatch } from "react-redux";
import { reactionAdded } from "../slices/postSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '💓' ,
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()

    const reactionButtons = Object.entries(reactionEmoji).map( ([name, emoji]) => 
         (
            <button
                key={name}
                type='button'  
                className=' mr-5 mb-0'
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }
            >
                <span >{emoji}</span>    {post.reactions[name]}
            </button>
        )
    )

    return <div className='mt-8' >{reactionButtons}</div>
}
export default ReactionButtons