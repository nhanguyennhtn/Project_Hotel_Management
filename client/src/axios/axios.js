import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://localhost:3535'
})

axiosClient.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error.response.data)
)

//Account
export const apiAccountRegister = data =>
    axiosClient.post('/api/accounts/register', data)

export const apiAccountLogin = data =>
    axiosClient.post('/api/accounts/login', data)

//user
export const apiUsersCreate = data =>
    axiosClient.post('/api/users/create', data)

export const apiUsersRead = () =>
    axiosClient.get('/api/users/read')

export const apiUsersReadUsername = username =>
    axiosClient.get('/api/users/readUsername/' + username)

export const apiUsersUpdate = data =>
    axiosClient.put(`/api/users/update/${data._id}`, data)

export const apiUsersDelete = id =>
    axiosClient.delete('/api/users/delete/' + id)
//Motels
export const apiMotelsCreate = data =>
    axiosClient.post('/api/motels/create', data)

export const apiMotelsRead = () =>
    axiosClient.get('/api/motels/read')

export const apiMotelsReadUsername = username =>
    axiosClient.get('/api/motels/readUsername/' + username)

export const apiMotelsUpdate = data =>
    axiosClient.put(`/api/motels/update/${data._id}`, data)

export const apiMotelsDelete = id =>
    axiosClient.delete('/api/motels/delete/' + id)
//Contact
export const apiContactCreate = data =>
    axiosClient.post('/api/contacts/create', data)

export const apiContactRead = () =>
    axiosClient.get('/api/contacts/read')

export const apiContactReadUsername = username =>
    axiosClient.get('/api/contacts/readUsername/' + username)

export const apiContactDelete = id =>
    axiosClient.delete('/api/contacts/delete/' + id)
//Bill
export const apiBillCreate = data =>
    axiosClient.post('/api/bills/create', data)

export const apiBillRead = () =>
    axiosClient.get('/api/bills/read')

export const apiBillReadUsername = username =>
    axiosClient.get('/api/bills/readUsername/' + username)

export const apiBillDelete = id =>
    axiosClient.delete('/api/bills/delete/' + id)

//Contracts
export const apiContractsCreate = data =>
    axiosClient.post('/api/contracts/create', data)

export const apiContractsRead = () =>
    axiosClient.get('/api/contracts/read')

export const apiContractsReadUsername = username =>
    axiosClient.get('/api/contracts/readUsername/' + username)

export const apiContractsUpdate = data =>
    axiosClient.put(`/api/contracts/update/${data._id}`, data)

export const apiContractsDelete = id =>
    axiosClient.delete('/api/contracts/delete/' + id)
//expense
export const apiExpensesCreate = data =>
    axiosClient.post('/api/expenses/create', data)

export const apiExpensesRead = () =>
    axiosClient.get('/api/expenses/read')

export const apiExpensesReadUsername = username =>
    axiosClient.get('/api/expenses/readUsername/' + username)

export const apiExpensesUpdate = data =>
    axiosClient.put(`/api/expenses/update/${data._id}`, data)

export const apiExpensesDelete = id =>
    axiosClient.delete('/api/expenses/delete/' + id)

//News
export const apiNewsCreate = data =>
    axiosClient.post('/api/news/create', data)

export const apiNewsRead = () =>
    axiosClient.get('/api/news/read')

export const apiNewsReadUsername = username =>
    axiosClient.get('/api/news/readUsername/' + username)

export const apiNewsUpdate = data =>
    axiosClient.put(`/api/news/update/${data._id}`, data)

export const apiNewsDelete = id =>
    axiosClient.delete('/api/news/delete/' + id)
//Img
export const apiReviewsCreate = data =>
    axiosClient.post('/api/reviews/create', data)

export const apiReviewsRead = () =>
    axiosClient.get('/api/reviews/read')

export const apiReviewsUpdate = data =>
    axiosClient.put(`/api/reviews/update/${data._id}`, data)

export const apiReviewsDelete = id =>
    axiosClient.delete('/api/reviews/delete/' + id)