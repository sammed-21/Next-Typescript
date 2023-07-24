import mongoose from 'mongoose';
 

export async function connectToDB() {
  try {
      console.log('htis is one')
      mongoose.connect(process.env.MONGO_URI!)
        .then(() => {
        
          console.log(' connected successfully');
        }).catch(err=>console.log(err));
        
        

         

   } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}