
import { Link } from "react-router-dom"


const Header = () => {


    return (

        <header className='flex justify-between items-center sticky top-0 bg-green-400 text-white p-4' >
            
            <h1 className='text-5xl' >Redux Blog</h1>
            
            <nav className='basis-2/4'>
                <ul className='flex justify-between'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Post</Link></li>
                    <li><Link to="user">Users</Link></li>
                </ul>
            </nav>
        
        </header>

    )
}

export default Header