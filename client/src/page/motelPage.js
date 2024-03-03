import React, { useEffect, useState } from 'react'
import '../assets/scss/home/Home.scss'
import Header from '../components/Header'
import RoomPage from '../components/RoomPage'
import Footer from '../components/Footer'
import { apiMotelsRead } from '../axios/axios'
export default function Room() {
    const [Motels, setMotels] = useState([])
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiMotelsRead()
        setMotels(res.motels)
    }
    return (
        <div className='home-wrapper'>
            <Header />
            <div className='container-md mt-4'>
                <RoomPage />
            </div >

            <Footer />
        </div>
    )
}
