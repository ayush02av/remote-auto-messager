import dotenv from 'dotenv'
import Queue from 'bull'

dotenv.config()

const Job = new Queue(
    'AutoMessager', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    }
})

export default Job