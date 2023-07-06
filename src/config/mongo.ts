import "dotenv/config";
import { connect } from "mongoose";

async function dbConnect(): Promise<void> {
    // const DB_URI = <string>process.env.DB_URI;
    const DB_URI = `mongodb+srv://dummyuser:dummyuser123@cluster0.ukadaya.mongodb.net/api-rest-ts?retryWrites=true&w=majority`;
    await connect(DB_URI);
}

export default dbConnect;
