import { connect } from "mongoose"

const monogodbUrl = process.env.MONGODB_URL

if(!monogodbUrl){
    throw new Error("monogodbUrl not found.")
}

let cache = global.mongoose

if(!cache){
    cache = {conn: null, promise: null}
}

const connectDb = async () => {
    if(cache.conn){
        console.log("DB connected from cache")
        return cache.conn
    }
    if(!cache.promise){
        console.log("DB connecting")
        cache.promise = connect(monogodbUrl).then((c) => c.connection)
    }
    try {
        console.log("new DB connection")
        cache.conn = await cache.promise
    } catch (error) {
        throw error
    }
}

export default connectDb