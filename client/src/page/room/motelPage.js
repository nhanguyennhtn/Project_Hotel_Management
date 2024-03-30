import React, { useEffect, useState } from 'react'
import '../../assets/scss/home/Home.scss'
import Header from '../../components/Header'
import RoomPage from '../../components/RoomPage'
import Footer from '../../components/Footer'
import { apiMotelsRead } from '../../axios/axios'
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
        <div>
            <Header />
            <div className='home-wrapper'>
                <div className=' card pt-4'>
                    <RoomPage />
                </div >

                <Footer />
            </div>
        </div>

    )
}
