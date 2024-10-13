import React from 'react'
import AdminHeader from '../components/Header'
import ContentMenu from '../components/ContentMenu'

export default function Camera() {

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
                <div className='row d-flex p-1'>
                  <div className='col '>
                    <label>video Camera</label>
                    <div className='card mt-2' style={{ height: '450px' }}>
                    </div>
                  </div>
                  <div className='col'>
                    <label>Ảnh ghi nhận</label>
                    <div className='row card mt-2 w-100 '>
                      <div className='row d-flex gap-2 '>
                        <div className='card col-3' style={{ height: '100px' }}>
                          Ảnh getScreenshot
                        </div>
                        <div className='card col'>
                          <label>biển số xe</label>
                          <label>thời gian</label>
                        </div>
                        <div className='col-1 text=-center'>
                        <i class="bi bi-trash3-fill text-primary fs-5"></i>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </main>
          </div>
        </div>
      </div>
    </div>

  );

}