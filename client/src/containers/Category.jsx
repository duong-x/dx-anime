import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import Loading from '../components/Loading'
import All from '../components/list/All'


function Category() {
    const { url } = useParams()
    const [info, setInfo] = useState({})
    const [page, setPage] = useState(1)

    useEffect(() => {
        async function load(){
            const { data } = await axios.get('/api/category/' + url + '?p=' + page)
            setInfo(data.data)
        }

        load()
    }, [])
    return (
        <div>
            {
                Object.entries(info).length === 0
                ? <Loading />
                : (
                    <div>
                        <All api={'category/' + url}/>
                    </div>
                )
            }
        </div>
    )
}

export default Category