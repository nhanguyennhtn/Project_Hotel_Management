import React, { useState } from 'react'
import AdminHeader from '../components/Header'
import ContentMenu from '../components/ContentMenu'
import CustomerRegister from './customerRegister'
import ListStaff from './listStaff'
import InfoVehicle from './infoVehicle'
import CardVehicle from './cardVehicle'
import ListVehicleIn from './listCardIn'
import HistoryVehicle from './historyVehicle'

export default function Camera() {
  const [activeComponent, setActiveComponent] = useState(null)

  const handleClick = (component) => {
    setActiveComponent(component)
  }

  return (
    <div className='content-reponse'>
      <div className='wrapper'>
        <AdminHeader />
        <div class="container-fluid">
          <div class="row">
            <ContentMenu />
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h4 ms-4">Camera</h1>
              </div>
              <div className=' m-2 card'>
                <div className='d-flex gap-2 justify-content-center'>
                  <div className={`card p-2 my-2 btn-primary px-3 rounded-3 btn ${activeComponent === 'staff' ? 'active' : ''}`} onClick={() => handleClick('staff')}>
                    Nhân viên bãi xe
                  </div>
                  <div className={`card p-2 my-2 btn-primary px-3 rounded-3 btn ${activeComponent === 'cusRegister' ? 'active' : ''}`} onClick={() => { handleClick('cusRegister') }}>
                    Khách đăng ký
                  </div>
                  <div className={`card p-2 my-2 btn-primary px-3 rounded-3 btn ${activeComponent === 'infoVehicle' ? 'active' : ''}`} onClick={() => { handleClick('infoVehicle') }}>
                    Thông tin xe
                  </div>
                  <div className={`card p-2 my-2 btn-primary px-3 rounded-3 btn ${activeComponent === 'historyVehicle' ? 'active' : ''}`} onClick={() => { handleClick('historyVehicle') }}>
                    Lịch sử xe (ra/vào)
                  </div>
                  <div className={`card p-2 my-2 btn-primary px-3 rounded-3 btn ${activeComponent === 'currentVehicle' ? 'active' : ''}`} onClick={() => { handleClick('currentVehicle') }}>
                    Xe trong bãi
                  </div>
                  <div className={`card p-2 my-2 btn-primary px-3 rounded-3 btn ${activeComponent === 'cardVehicle' ? 'active' : ''}`} onClick={() => { handleClick('cardVehicle') }}>
                    Thẻ xe
                  </div>
                </div>
              </div>
              <div className='m-2'>
                {activeComponent === 'staff' && <ListStaff />}
                {activeComponent === 'cusRegister' && <CustomerRegister />}
                {activeComponent === 'infoVehicle' && <InfoVehicle />}
                {activeComponent === 'cardVehicle' && <CardVehicle />}
                {activeComponent === 'currentVehicle' && <ListVehicleIn />}
                {activeComponent === 'historyVehicle' && <HistoryVehicle />}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>

  );

}