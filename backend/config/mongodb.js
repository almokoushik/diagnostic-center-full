import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))

    const baseUri = process.env.MONGODB_URI
    if (!baseUri) {
        throw new Error("MONGODB_URI is not set")
    }

    // If URI already includes a database path, use as-is; otherwise append default db name
    const hasDbPath = /\/[^/?]+(\?|$)/.test(new URL(baseUri).pathname)
    const uriToUse = hasDbPath ? baseUri : `${baseUri.replace(/\/$/, '')}/prescripto`

    await mongoose.connect(uriToUse)

}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.