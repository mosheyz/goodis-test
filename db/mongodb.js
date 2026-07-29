import { MongoClient } from "mongodb";
import "dotenv/config"

export async function connectToMongo() {
    
    const client = new MongoClient(process.env.MONGODB_URI)
    console.log("connected to mongo...")

    try {
        const db = client.db("goodis-test-mongo")
        console.log("connected to database...")
        
        const benefits = db.collection("benefits")
        return benefits
    } catch (error) {
        await client.close()
        console.error(error)
    }
}