import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.scss'
import './assets/scss/bootstrap/scss/bootstrap.scss'

import HomePage from './page/HomePage.js';
import MotelPage from './page/room/motelPage.js';
import MotelSinglePage from './page/room/motelSingle.js';
import MotelDoublePage from './page/room/motelDouble.js';
import RoomDetail from './page/RoomDetail.js'

import NewsPage from './page/newPage/newPage.js'
import NewsPageCreate from './page/newPage/newPageCreate.js'

import ContacPage from './page/contactPage.js';
import Login from './auth/Login.js'
import Register from './auth/Register.js'
import RegisterBill from './page/ResgiterBill.js';
import UserProfile from './page/profiles/index.js';
import UserContract from './page/profiles/contract.js';
import UserBill from './page/profiles/bill.js';

import Admin from './page/admin/index.js'
import AdminBill from './page//admin/bill/ListBill.js'
import Response from './page/admin/Reponse.js'
import Contact from './page//admin/contacts/index.js'

import Customers from './page/admin/customers/index.js'
import CustomerDetail from './page/admin/customers/customerDetail.js'

import Contracts from './page/admin/contracts/index.js'
import ContractDetail from './page/admin/contracts/contractDetail.js'

import Expense from './page/admin/expenses/index.js'
import ExpenseCreate from './page/admin/expenses/create.js'
import AdminExportExpense from './page/admin/expenses/export.js'

import AdminRoom from './page/admin/room/Room.js'
import UpdateRoom from './page/admin/room/Update.js'
import CancelRoom from './page/admin/room/Cancel.js'

import AdminStatistic from './page/admin/statistics/Statistic.js'
import AdminResponseNews from './page/admin/ReponseNews.js'
import Camera from './page/admin/webcam/index.js';
import CostOfElect from './page/admin/expenses/costOfElect/index.js';

import CameraPage from './page/camera/index.js'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/room' element={<MotelPage />} />
        <Route path='/room/phong-don' element={<MotelSinglePage />} />
        <Route path='/room/phong-ghep' element={<MotelDoublePage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/news/create' element={< NewsPageCreate />} />
        <Route path='/contact' element={<ContacPage />} />
        <Route path='/bill' element={<RegisterBill />} />
        <Route path='/user/profile' element={<UserProfile />} />
        <Route path='/user/contract' element={<UserContract />} />
        <Route path='/user/bill' element={<UserBill />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/room/:id' element={
          JSON.parse(window.sessionStorage.getItem('userInfo')) ? <RoomDetail /> : <Login />} />
        
        <Route path='/admin' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <Admin /> : <Login />} />
        <Route path='/admin/room' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <AdminRoom /> : <Login />} />
        <Route path='/admin/room/cancel' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <CancelRoom /> : <Login />} />
        <Route path='/admin/update' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <UpdateRoom /> : <Login />} />
        <Route path='/admin/response' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <Response /> : <Login />} />
        <Route path='/admin/customers' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <Customers /> : <Login />} />
        <Route path='/admin/customers/Detail' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <CustomerDetail /> : <Login />} />
        <Route path='/admin/create/contracts' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <Contracts /> : <Login />} />
        <Route path='/admin/contract/detail' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <ContractDetail /> : <Login />} />
        <Route path='/admin/expense' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <Expense /> : <Login />} />
        <Route path='/admin/expense/create' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <ExpenseCreate /> : <Login />} />
        <Route path='/admin/contact' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <Contact /> : <Login />} />
        <Route path='/admin/bill' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <AdminBill /> : <Login />} />
        <Route path='/admin/statistic' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <AdminStatistic /> : <Login />} />
        <Route path='/admin/expense/export' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <AdminExportExpense /> : <Login />} />
        <Route path='/admin/response-news' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <AdminResponseNews /> : <Login />} />
        <Route path='/admin/camera' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <Camera /> : <Login />} />
        <Route path='/admin/costOfElects' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <CostOfElect /> : <Login />} />

        <Route path='/camera' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.role === 2
            ? <CameraPage /> : <Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
