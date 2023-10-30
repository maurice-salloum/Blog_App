import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../slices/userSlice';
import { Link } from 'react-router-dom'

const UsersList = () => {
    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))

    return (
        <section className='flex flex-col items-center gap-y-20' >
            <h2 className='text-5xl underline decoration-double w-3/5 ' >USERS</h2>

            <ul className='list-[upper-roman] ' >
                {renderedUsers}
            </ul>
        </section>
    )
}

export default UsersList