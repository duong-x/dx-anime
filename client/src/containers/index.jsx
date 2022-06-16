import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom"

import Header from '../components/Header'
import Watch from './Watch'
import Category from './Category'
import Home from './Home'

function Router() {
    return (
        <BrowserRouter>
            <Header />

            <div className="mt-14 mx-auto py-4 px-10 mxs:px-4 max-w-[1310px]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/watch/:urla" element={<Watch />} />
                    <Route path="/watch/:urla/:urlb" element={<Watch />} />
                    <Route path="/anime/:url" element={<Category />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default Router