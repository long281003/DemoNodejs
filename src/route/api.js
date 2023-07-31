import express from 'express';
import APIcontroller from '../controller/APIcontroller';

const router = express.Router();

const iniAPIRout = (app) =>{
    router.get('/users', APIcontroller.getAllUsers);
    router.post('/createUser', APIcontroller.createNewUser)
    router.put('/update-user', APIcontroller.UpdateUser)
    router.delete('/delete-user/:id',APIcontroller.DeleteUser)
      return app.use('/api/v1/', router)
}



export default iniAPIRout;