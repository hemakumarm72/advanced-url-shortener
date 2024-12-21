import mongoose from 'mongoose'

export const mongoUri = `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`

const config = {
  // user: process.env.DB_USER,
  // pass: process.env.DB_PASS,
  // dbName: process.env.DB_NAME,
  autoCreate: true,
  autoIndex: true,
  ssl: true,
}

export const connectMongo = () =>
  new Promise((resolve, reject) => {
    mongoose.set('strictQuery', false)
    mongoose
      .connect(mongoUri, config)
      .then((db: any) => {
        console.log(`Connected to ${process.env.DB_NAME} DB`)
        resolve(db)
      })
      .catch((err: any) => {
        console.log(err)
        console.error(err)
        reject(err)
      })
  })
