import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import 'dotenv/config'
import request from 'supertest'
import RandomString from 'randomstring'

import app from '../../src/app'
import { connectMongo } from '../../src/middleware/mongo'
import mongoose from 'mongoose'
const agent = request.agent(app)

let customAlias = ''

describe('shorten', () => {
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
  test('should create a shortened URL', async () => {
    customAlias = RandomString.generate({
      length: 5,
      charset: 'alphabetic',
    })
    const response = await agent
      .post('/api/shorten')
      .send({
        longUrl: 'https://www.example.com',
        customAlias: customAlias,
        topic: 'exampleTopic',
      })
      .set('Accept', 'application/json')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('shortUrl')
    expect(response.body.shortUrl).toContain(customAlias)
    expect(response.body).toHaveProperty('createdAt')
  })

  test('should create a shortened URL without custom alias', async () => {
    const response = await agent
      .post('/api/shorten/')
      .send({
        longUrl: 'https://www.example.com',
        topic: 'activation',
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('shortUrl')
    expect(response.body.shortUrl).toMatch(/\/api\/shorten\/[A-Za-z]{4,}/)
    expect(response.body).toHaveProperty('createdAt')
  })
  test('should fail to create a shortened URL with invalid input', async () => {
    const response = await agent
      .post('/api/shorten')
      .send({
        longUrl: '',
      })
      .set('Accept', 'application/json')

    expect(response.status).toBe(400) // Or the appropriate status code for your validation errors
    expect(response.body).toHaveProperty('message', 'Validation Error: longUrl')
  })
  test('should redirect to the original URL', async () => {
    const alias = customAlias

    const response = await agent.get(`/api/shorten/${alias}`)
    expect(response.status).toBe(302)
    expect(response.headers.location).toBe('https://www.example.com') // The original URL
  })
  test('should return error for non-existent alias', async () => {
    const alias = 'nonExistentAlias'

    const response = await agent.get(`/api/shorten/${alias}`)
    expect(response.status).toBe(404) // Or the appropriate status code
    expect(response.body).toHaveProperty('message', 'url not found')
  })
  test('check redirect url with cache speed', async () => {
    const alias = customAlias

    // Pre-cache the alias by making a request to populate Redis
    await agent.get(`/api/shorten/${alias}`)

    const startTime = Date.now() // Start timing the request

    const response = await agent.get(`/api/shorten/${alias}`)
    const endTime = Date.now() // End timing the request

    const responseTime = endTime - startTime // Calculate response time

    expect(response.status).toBe(302) // Check the redirect status
    expect(response.headers.location).toBe('https://www.example.com') // Check the original URL
    expect(responseTime).toBeLessThan(50) // Assert response is under 50ms (adjust threshold as needed)
  })
})
