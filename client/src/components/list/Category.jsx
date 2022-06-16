import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Loading from '../Loading'

function Category() {
    const [list, setList] = useState([])

    useEffect(() => {
        async function load(){
            const { data } = await axios.get('/api/category')
            setList(data.data)
        }

        load()
    }, [])
    return (
        <div className='border'>
            <div className='border-b p-2 text-xl font-semibold'>Chuyên Mục</div>
            <ul className='grid gap-2 grid-cols-auto-fill mxs:grid-cols-2 p-2'>
                {list.map((value, index) => (
                    <li className='p-2 border hover:bg-gray-200' key={index}><Link to={value.url}>{value.name}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default Category