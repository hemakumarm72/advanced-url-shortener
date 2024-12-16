import { ClientSession, Document, FilterQuery, Model } from 'mongoose'

import { UpdateType } from '../@types'

export abstract class BaseModel<T extends Document> {
  protected model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  // Add a new document to the collection
  async add(data: Partial<T>, session?: ClientSession | null): Promise<T> {
    const newDocument = new this.model(data)
    return await newDocument.save({ session })
  }

  // Retrieve all documents (with optional filters)
  async get(filter: Partial<T> = {}): Promise<T[]> {
    return await this.model.find(filter as any)
  }

  // Retrieve a document by its ID
  async getByFieldAndValue(
    fieldName: keyof T,
    value: any,
  ): Promise<Omit<T, keyof Document> | null> {
    try {
      const query: FilterQuery<T> = {
        [fieldName]: value,
      } as FilterQuery<T> // Dynamically appending 'Id'
      const result = await this.model.findOne(query).lean()

      return result as Omit<T, keyof Document> | null
    } catch (error) {
      console.error(`Error fetching document`, error)
      throw new Error('Error fetching document')
    }
  }

  // Update a document by its ID
  async update(
    { fieldName, value, updateData }: UpdateType<T>,
    session?: ClientSession | undefined,
  ): Promise<Omit<T, keyof Document> | null> {
    try {
      const query: FilterQuery<T> = { [fieldName]: value } as FilterQuery<T>

      const updatedDocument = await this.model
        .findOneAndUpdate(query, updateData, { session })
        .lean() // Ensuring we get plain object instead of a Mongoose document

      return updatedDocument as Omit<T, keyof Document> | null // Explicitly cast the result
    } catch (error) {
      console.error(`Error updating document  :`, error) // queryField used here
      throw new Error('Error updating document')
    }
  }

  async delete(
    fieldName: keyof T,
    value: any,
    session?: ClientSession | undefined,
  ) {
    try {
      const query: FilterQuery<T> = {
        [fieldName]: value,
      } as FilterQuery<T> // Dynamically appending 'Id'
      await this.model.deleteOne(query, { session })
      return
    } catch (error) {
      console.error(`Error fetching document`, error)
      throw new Error('Error fetching document')
    }
  }
}
