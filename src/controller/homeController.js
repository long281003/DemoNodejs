import pool from "../configs/connectDB"
import multer from "multer";

let gethomepage = async (req, res) => {
  
      const [rows, fields] = await pool.execute('SELECT * FROM users');

      return res.render('index.ejs', { dataUser: rows})
    
}

const getDetailPage = async (req, res) => {
  let id = req.params.id
  let user = await pool.execute(`Select * from users where id = ?`, [id])
  
  return res.send(JSON.stringify(user[0]))
}

const createNewUser = async (req, res) =>{
  console.log('>>> check req: ', req.body)
  let {firstName, lastName, email, address} = req.body;
  await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address])
  return res.redirect('/')
}

let getDeleteUser = async (req, res) => {
  let userid = req.body.UserId
  await pool.execute('delete from users where id = ?', [userid])
  return res.redirect('/')
}

let EditUser = async (req, res) =>{
  let id = req.params.id
  let [user] = await pool.execute('select * from users where id = ?', [id])
  return res.render('Update.ejs', {dataUser: user[0]})
}

let UpdateUser = async (req, res) => {
  let {firstName, lastName, email, address, id} = req.body;
  await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', 
  [firstName, lastName, email, address, id])
  return res.redirect('/')
}

let getUploadFile = async (req, res) => {
  return res.render('uploadfile.ejs')
}


let handleUploadFile = async (req, res) =>{ 
  console.log('>>>check file: ', req.file)

    
      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }

      // Display uploaded image for user validation
      res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
  // });
}

let handleUploadMultipleFile = async (req, res) =>{
 

    if (req.fileValidationError) {
      
      return res.send(req.fileValidationError);
  }
  else if (!req.files) {
      return res.send('Please select an image to upload');
  }


    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    console.log('>>>check files: ', files)
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);

}

module.exports = {
    gethomepage,getDetailPage,createNewUser,getDeleteUser,EditUser,UpdateUser,
    getUploadFile,handleUploadFile,handleUploadMultipleFile

}