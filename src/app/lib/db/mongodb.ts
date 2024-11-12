import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://RSSteam:dRjeq13VtjnQUNCs@clusterecipes.gqajc.mongodb.net/data";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("connect to mongo");
    } catch (error) {
        console.log("error: ", error);
        throw new Error("connect to mongo error: " + error)
    }
}

export default connectToDatabase;
