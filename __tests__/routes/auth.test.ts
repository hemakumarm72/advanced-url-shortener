import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import 'dotenv/config'
import request from 'supertest'

import app from '../../src/app'
import { connectMongo } from '../../src/middleware/mongo'
import mongoose from 'mongoose'
const agent = request.agent(app)

describe('authorization', () => {
  beforeAll(async () => {
    connectMongo()
  })
  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('login', async () => {
    await agent
      .put('/api/auth/update')
      .send({
        sessionId: 'XjAbc-Yem-e2',
        userId: '2ca21120-5fb',
        googleId: '118023058173038381124',
        email: 'softwaretech12@gmail.com',
        name: 'software Tech',
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocK5jOmt9O9ii4ZQmdl4zhIMJJ0tno3R1ZLMaPCPWVWYtvmN66o=s96-c',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('get me', async () => {
    await agent
      .get('/api/auth/me')
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.result).toMatchObject({
          email: 'softwaretech12@gmail.com',
          name: 'software Tech',
          picture:
            'https://lh3.googleusercontent.com/a/ACg8ocK5jOmt9O9ii4ZQmdl4zhIMJJ0tno3R1ZLMaPCPWVWYtvmN66o=s96-c',
        })
      })
  })

  test('logOut', async () => {
    await agent.get('/api/auth/logout').expect(200)
  })
})
