import Redis from 'ioredis'

const redisClient = new Redis({
    port: 6379,
    host: process.env.REDIS_HOST,
    db: 0,
})

export default redisClient
