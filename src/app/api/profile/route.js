import mongoose from "mongoose"
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';
import { User } from "../models/User";
import { Console } from "console";

export async function PUT(req){
  
    mongoose.connect(process.env.MONGO_URL);

    const data = await req.json();
    console.log(data)
    const session = await getServerSession(authOptions);
    //console.log(session)
    const email = session.user.email;

//    const user = await User.findOne({email});

    if('name' in data){


     await User.updateOne({email}, {name:data.name})
     
       //Console.log({email,update:{name:data.name}})

    }

    return Response.json(true);
}