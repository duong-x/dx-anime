import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactJWPlayer from 'react-jw-player'

import { Link } from 'react-router-dom'

import Loading from '../components/Loading'

function Watch() {
    const { urla, urlb } = useParams()
    return urlb == undefined ? <Post url={urla} /> : <View urla={urla} urlb={urlb} />
}

function Post({ url }) {
    const [info, setInfo] = useState({})

    useEffect(() => {
        setInfo({})
        async function load() {
            const { data } = await axios.get('/api/watch?url=' + url)
            setInfo(data)
        }

        load()
    }, [url])


    return (
        <div>
            {
                Object.entries(info).length === 0
                    ? <Loading />
                    : (
                        <>
                            {info.data.result.length == 0 && <div className='bg-black text-white w-full h-[200px] p-4 mb-4 text-xl font-bold'>Đây là phim sắp chiếu, hãy bấm nút theo dõi để nhận thông báo khi có tập mới nhé!</div>}
                            <div className='text-xl font-bold mb-2'>{info.data.name}</div>
                            {info.data.result.length == 0 && <div>{info.data.views}</div>}
                            {info.data.result.length > 0 && <ListVideo list={info.data.result} />}
                        </>
                    )
            }
        </div>
    )
}

function View({ urla, urlb }) {
    const [info, setInfo] = useState({})

    useEffect(() => {
        setInfo({})
        async function load() {
            const { data } = await axios.post('/api/watch', {
                url: urla + '/' + urlb
            })

            setInfo(data.data)
        }

        load()
    }, [urlb])


    return (
        <div>
            {
                Object.entries(info).length === 0
                    ? <Loading />
                    : (
                        <div className='md:flex'>
                            <div className='mb-8  md:w-[65%] md:mr-4'>
                                <div className="player mb-8">
                                    <ReactJWPlayer
                                        playerId='player'
                                        playerScript="https://content.jwplatform.com/libraries/j9BLvpMc.js"
                                        image={info.thumbnail_medium}
                                        file={info.source.src}
                                    />
                                </div>

                                <div className=''>
                                    <div className='font-bold'>{info.full_name}</div>
                                    <div>{info.views} lượt xem</div>
                                </div>

                                <div className='mt-6'>
                                    <div>
                                        <span className='font-semibold'>Thể loại: </span>
                                        <span>{info.content.type.map((value, index) => (
                                            <Link key={index} className='mx-1' to={value.url}>{value.name},</Link>
                                        ))}</span>
                                    </div>

                                    <div>
                                        <span className="font-semibold">Nhóm sub: </span><span>{info.content.subteam}</span>
                                    </div>

                                    <div>
                                        <span className="font-semibold">Tổng số tập: </span><span>{info.chap.length}</span>
                                    </div>

                                    <div className='mt-2'>{info.content.des}</div>

                                    
                                </div>
                            </div>

                            <div className='md:w-[35%] w-full'>
                                <ListVideo list={info.chap} />
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

function ListVideo({ list }) {
    return (
        <ul className='border'>
            <div className='border-b'>
                <div className='border-b p-2 font-bold'>Danh sách tập</div>
                <div className='p-2'>Tổng số: {list.length} video</div>
            </div>
            {list.map((value, index) => (
                <li key={index} className='flex p-3 not-last:border-b-0 border-b'>
                    <img className='w-[106px] h-[60px]' src={value.thumbnail_medium} alt={value.full_name} />
                    <div className='ml-3'>
                        <div><Link to={'/watch' + value.link} className='text-sm'>{value.full_name}</Link></div>
                        <div className='text-gray-600 text-xs mt-2'>{value.views} Lượt xem</div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Watch