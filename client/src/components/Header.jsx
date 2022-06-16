import { useState } from 'react'
import { Link } from 'react-router-dom'

import Search from './Search'

function Header() {
    const [isSearch, setSearch] = useState(false)

    const onClick = () => {
        setSearch(!isSearch)
    }

    return (
        <>
            <div className='z-50 border fixed top-0 left-0 w-full bg-white'>
                <div className="py-2 px-4 max-w-[1310px] mx-auto flex items-center">
                    <div className='w-full'><Link className="text-xl font-[800] text-red-800" to='/'>DX Anime</Link></div>
                    <div className='py-2 px-4 border' onClick={onClick}>
                        <button><i className="far fa-search"></i></button>
                    </div>
                </div>
            </div>

            {isSearch && <Search onClose={onClick}/>}
        </>
    )
}

export default Header