import mongoose, { connection } from "mongoose";



export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = await mongoose.connection;
        connection.on('connected',()=>{
            console.log('Mongodb connected succesfully');
        })
        connection.on('error',(err)=>{
            console.log('MOngodb connection error , please make sure db is running'+ err);
            process.exit()
            
        })
        
    } catch (error) {
        console.log('Unable to connect with db',error);
        
        
    }
}