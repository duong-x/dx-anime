import React from 'react'

import New from '../components/list/New'
import Category from '../components/list/Category'
import Rank from '../components/list/Rank'

function Home() {
    return (
        <div>
            <New />
            <Rank />
            <Category />
        </div>
    )
}

export default Home