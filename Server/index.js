import express, { request, response } from 'express';
import mongoose from 'mongoose';
import { Student } from './StudentModel.js';
import { DELETED_SUCCESS, ERROR_MESSAGE, INSERT_SUCCESS, STUDENT_NOT_FOUND } from './constants.js';
import { StatusCodes } from 'http-status-codes';
import  cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const connectDb=async()=>{
  try 
  {
   await mongoose.connect('mongodb://127.0.0.1:27017/Technical'); 
   console.log("Database connection created !") 
  } catch (error) 
  {
  console.log(error)  
  }
}

//sending data
app.post("/student",async(request,response)=>{
  try 
  {
    const reqData=request.body;
    const student=new Student(reqData);
    await student.save();
   response.status(StatusCodes.CREATED).send({message:INSERT_SUCCESS})
  } catch (error) 
  {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:ERROR_MESSAGE})
   
  }
});

//fetching data
app.get("/student",async(request,response)=>{
  try 
  {
   const students= await Student.find();
   response.send({students:students});
  } catch (error) 
  {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:ERROR_MESSAGE})
  }
});


//fetching  only one data
app.get("/student/:roll",async(request,response)=>{
  try 
  {
   const student= await Student.findOne({roll:request.params.roll});

   if(student==null)
   {
    response.status(StatusCodes.NOT_FOUND).send({message:STUDENT_NOT_FOUND});
   }
   else{
    response.send({students:student});
   }
   
  } catch (error) 
  {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:ERROR_MESSAGE})
  }
});


//for delete the data
app.delete("/student/:roll",async(request,response)=>{
  try 
  {
    await Student.deleteOne({roll:request.params.roll})
   response.send({message:DELETED_SUCCESS});
  } catch (error) 
  {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:ERROR_MESSAGE})
  }
});


//for updating the data

app.put("/student/:roll",async(request,response)=>{
  try 
  {
    await Student.updateOne({roll:request.params.roll},request.body);
   response.send({message:'Student updated'});
  } catch (error) 
  {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:ERROR_MESSAGE})
  }
});


app.listen(4900,()=>{
  console.log("server has started on 4900")
  connectDb();
})