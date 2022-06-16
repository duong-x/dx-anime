import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Loading from '../Loading'

function Rank() {
    const [list, setList] = useState([])
    useEffect(() => {
        axios.get('/api/rank').then(({ data }) => {
            setList(data.data)
        })
    })

    return (
        <div className='my-4'>
            <div className="text-xl font-medium mb-2">Bảng Xếp Hạng</div>
            {
                list.length == 0
                    ? <Loading />
                    : (
                        <ul className='grid grid-cols-auto-fill mxs:grid-cols-2 gap-2'>
                            {list.map((value, index) => (
                                <li key={index}>
                                    <Link to={'/watch/' + value.slug}>
                                        <div className='relative text-white h-full'>
                                            <img className='h-full' src={value.thumbnail} alt={value.name} />
                                            <div className='bg-ts w-full absolute top-0 left-0 text-base font-semibold p-2'>{value.name}</div>
                                            <div className='absolute bottom-0 right-0 text-[30px] font-bold p-2'>{index + 1}</div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )
            }
        </div>
    )
}

export default Rank