import Redis from 'ioredis'

// export const redis = new Redis();
const port = Number(process.env.REDIS_URL_PORT)
const host = process.env.REDIS_URL_HOST as string
const redisConnect = new Redis(port, host, {
  db: 0,
  showFriendlyErrorStack: true, // See https://github.com/luin/ioredis#error-handling
  lazyConnect: false,
  maxRetriesPerRequest: 20,
})

redisConnect
  .on('connect', async () => {
    console.info('✔️  Connected to redis instance')
  })
  .on('ready', () => {
    console.info('✔️  Redis instance is ready (data loaded from disk)')
  })
  .on('error', (e) => {
    console.error(`🔴 Error connecting to redis: "${e}"`)
  })
  .on('close', () => {
    console.error('🔴 Redis close')
  })
  .on('reconnecting', () => {
    console.error('✔️  Redis reconnecting')
  })
  .on('end', () => {
    console.error('🔴 Redis end')
  })
  .on('SIGINT', () => {
    console.error('🔴 Redis SIGNT')
    redisConnect.quit()
  })
  .on('SIGTERM', () => {
    redisConnect.quit()
  })

export { redisConnect }
