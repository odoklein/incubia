import { MongoClient } from 'mongodb'

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI!
const options = {}

const client: MongoClient = new MongoClient(uri, options)  // Use const here since it's not reassigned
let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

export default clientPromise
