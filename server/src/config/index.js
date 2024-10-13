const mongoose = require('mongoose')

const urlMongodb = 'mongodb://127.0.0.1:27017/motel-main-project'

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(urlMongodb)
        console.log('Connect successfully!')
    } catch (error) {
        console.log('Connect failure!')
    }
}

module.exports = connectDB
