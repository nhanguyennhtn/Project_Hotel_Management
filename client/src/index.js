import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.scss'

import HomePage from './page/HomePage.js';
import MotelPage from './page/motelPage.js';
import ContacPage from './page/contactPage.js';
import RoomDetail from './page/RoomDetail.js'
import Login from './auth/Login.js'
import Register from './auth/Register.js'
import RegisterBill from './page/ResgiterBill.js';
import UserContract from './page/profiles/contract.js';
import UserBill from './page/profiles/bill.js';

import Admin from './page/admin/room/Room.js'
import UpdateRoom from './page/admin/room/Update.js'
import Response from './page/admin/Reponse.js'
import Contracts from './page/admin/contracts/index.js'
import Customers from './page/admin/customers/index.js'
import CustomerDetail from './page/admin/customers/customerDetail.js'
import CancelRoom from './page/admin/room/Cancel.js'
import ContractDetail from './page/admin/contracts/contractDetail.js'
import Expense from './page/admin/expenses/index.js'
import Contact from './page//admin/contacts/index.js';
import AdminBill from './page//admin/bill/ListBill.js';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/room' element={<MotelPage />} />
        <Route path='/room/:id' element={<RoomDetail />} />
        <Route path='/contact' element={<ContacPage />} />
        <Route path='/bill' element={<RegisterBill />} />
        <Route path='/user/contract' element={<UserContract />} />
        <Route path='/user/bill' element={<UserBill />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/room' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <Admin /> : <Login />} />
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
        <Route path='/admin' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <CancelRoom /> : <Login />} />
        <Route path='/admin/contract/detail' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <ContractDetail /> : <Login />} />
        <Route path='/admin/expense' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <Expense /> : <Login />} />
        <Route path='/admin/contact' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <Contact /> : <Login />} />
        <Route path='/admin/bill' element={
          JSON.parse(window.sessionStorage.getItem('userInfo'))?.username === 'nhanguyen'
            ? <AdminBill /> : <Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
