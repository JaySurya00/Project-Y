import app from "./app";
import { DBConnection } from "./DB/users_db";

const start= async()=>{
    try{
        await DBConnection();
    }catch(err){
        console.log(err);
    }
}

app.listen(3001, async ()=>{
    await start();
    console.log('Listening on PORT 3001');
})