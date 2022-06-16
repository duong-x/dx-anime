import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Loading from './Loading'

function Search({ onClose }) {
    const [list, setList] = useState([])
    const [search, setSearch] = useState('')
    const [load, setLoad] = useState(false)
    const [first, setFirst] = useState(true)

    const onSearch = () => {
        setFirst(false)
        setLoad(true)
        axios.post('/api/search', {
            q: search
        }).then(({ data }) => {
            setList(data.data.data)
            setLoad(false)
        })
    }

    const onEnter = e => {
        if (e.code == 'Enter') onSearch()
    }

    return (
        <div className='bg-ts fixed top-0 left-0 z-50 w-full h-full flex justify-center'>
            <div className='max-w-[500px] w-[80%] h-full bg-white mxs:w-full mxs:h-full'>
                <div className='px-4 py-2 overflow-auto' onClick={onClose}><i className="float-right fal fa-times"></i></div>
                <div className='m-2 relative h-full'>
                    <div className="flex border">
                        <input className='p-2 w-full' type="text" placeholder='Tìm Kiếm ...' onChange={e => setSearch(e.target.value)} onKeyDown={onEnter} />
                        <button className='border-l py-2 px-4' onClick={onSearch}><i className="far fa-search"></i></button>
                    </div>
                    <ul className='border w-full h-full overflow-y-auto absolute'>
                        {
                            first
                                ? <div className='p-2'>Hãy tìm kiếm gì đó =))</div>
                                : load
                                    ? <Loading />
                                    : list.length == 0
                                        ? <div className='p-2'>Không tìm thấy kết quả phù hợp =))</div>
                                        : list.map((value, index) => (
                                            <li key={index} className='border-b last:border-b-0 p-2 hover:bg-gray-200' onClick={onClose}>
                                                <Link className='flex' to={'/watch/' + value.slug}>
                                                    <div className='min-w-[120px] w-[120px] h-[70px]'>
                                                        <img className='w-full h-full' src={value.thumbnail} alt={value.name} />
                                                    </div>
                                                    <div className='ml-2 py-1'>
                                                        <div className='text-[14px] font-semibold '>{value.name}</div>
                                                        <div className='text-[12px] text-gray-600'>{value.views} lượt xem</div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Search