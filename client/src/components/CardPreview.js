import { useEffect, useState } from "react"
import { apiMotelsRead, apiUsersRead } from "../axios/axios"
import { image0, image06, image1, image2 } from '../assets/img/panner'

export default function CardPreview() {
    const [motels, setMotels] = useState([])
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        fetData()
    }, [])
    const fetData = async () => {
        const room = await apiMotelsRead()
        const client = await apiUsersRead()
        setCustomers(client.user)
        setMotels(room.motels)
    }
    return (
        <div class="container-xxl py-5 bg-white">
            <div class="container ">
                <div class="row g-5 align-items-center">
                    <div class="col-lg-6">
                        <h6 class="section-title text-start text-primary text-uppercase">About Us</h6>
                        <h1 class="mb-4">Welcome to <span class="text-primary text-uppercase">Hotelier</span></h1>
                        <p class="mb-4">Embark on a journey of indulgence and relaxation at our exquisite hotel, where every moment is crafted to perfection, offering unparalleled comfort, luxury, and impeccable service to make your stay truly unforgettable</p>
                        <div class="row g-3 pb-4 hotel-preview-parent">
                            <div class="col-sm-4 wow fadeIn hotel-preview-item-1" data-wow-delay="0.1s" >
                                <div class="border rounded p-1">
                                    <div class="border rounded text-center p-4 ">
                                        <i class="bi bi-door-open-fill fs-2 text-primary mb-2"></i>
                                        <h2 class="mb-1" data-toggle="counter-up">{motels.length}</h2>
                                        <p class="mb-0">Rooms</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 wow fadeIn hotel-preview-item-2" data-wow-delay="0.3s" >
                                <div class="border rounded p-1">
                                    <div class="border rounded text-center p-4">
                                        <i class="bi bi-person-fill-gear fs-2 text-primary mb-2"></i>
                                        <h2 class="mb-1" data-toggle="counter-up">5</h2>
                                        <p class="mb-0">Staffs</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 wow fadeIn hotel-preview-item-3" data-wow-delay="0.5s" >
                                <div class="border rounded p-1">
                                    <div class="border rounded text-center p-4">
                                        <i class="bi bi-people-fill fs-2 text-primary mb-2"></i>
                                        <h2 class="mb-1" data-toggle="counter-up">{customers.length}</h2>
                                        <p class="mb-0">Clients</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="row g-3">
                            <div class="col-6 text-end">
                                <img class="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.1s" src={image0} />
                            </div>
                            <div class="col-6 text-start">
                                <img class="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.3s" src={image1} />
                            </div>
                            <div class="col-6 text-end">
                                <img class="img-fluid rounded w-50 wow zoomIn" data-wow-delay="0.5s" src={image06} />
                            </div>
                            <div class="col-6 text-start">
                                <img class="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.7s" src={image2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}