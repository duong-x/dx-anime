import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Loading from '../Loading'

function All({ api }) {
    const [info, setInfo] = useState({})
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setList([])

        async function load() {
            const { data } = await axios.get(`/api/${api}?p=${page}`)
            setInfo(data.data)
            setList(data.data.result)
            setTotal(Math.ceil(data.data.total / data.data.limit))
        }

        load()
    }, [page])

    const nextPage = () => {
        setPage(page + 1)
    }

    const prevPage = () => {
        setPage(page - 1)
    }

    return (
        <div className='my-4'>
            <div className="text-xl font-medium mb-2">{info.title}</div>
            {
                list.length == 0
                    ? <Loading />
                    : (
                        <>
                            <ul className='grid grid-cols-auto-fill mxs:grid-cols-2 gap-2'>
                                {list.map((value, index) => (
                                    <li key={index} className='bg-red-200'>
                                        <Link to={'/watch' + value.url}>
                                            <div className='relative text-white h-full'>
                                                <img className='h-full' src={value.thumbnail} alt={value.full_name} />
                                                <div className='absolute bottom-0 left-0 w-full bg-ts p-2'>
                                                    <div className='msm:text-[11px] text-[15px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-[60%] mxs:w-[40%]'>{value.film_name}</div>
                                                    <div className='msm:text-[11px] text-[13px] font-semibold'>{value.view}</div>
                                                </div>

                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className='p-4 overflow-auto'>
                                <div className="float-right">
                                    {page > 1 && <button onClick={prevPage} className='border-red-800 border px-4 mx-4'><i className="far fa-angle-left"></i></button>}
                                    <button className='border-red-800 border px-4 mx-1'>{page}</button>
                                    {page < total && <button onClick={nextPage} className='border-red-800 border px-4 mx-4'><i className="far fa-angle-right"></i></button>}
                                </div>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default All