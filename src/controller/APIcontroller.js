import pool from "../configs/connectDB"

let getAllUsers = async (req, res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        messag: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) =>{
    let {firstName, lastName, email, address} = req.body;
    if(!firstName || !lastName || !email || address){
        return res.status(200).json({
            message: 'khong hien thi du lieu'
        })
    }
  await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address])
    return res.status(200).json({
        message: 'ok'
    })
}

let UpdateUser = async (req,res) =>{
    let {firstName, lastName, email, address, id} = req.body;
    if(!firstName || !lastName || !email || address || !id){
        return res.status(200).json({
            message: 'khong hien thi du lieu'
        })
    }
  await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', 
  [firstName, lastName, email, address, id])
    return res.status(200).json({
        message: 'ok'
    })
}

let DeleteUser = async (req, res) =>{
    let userid = req.params.id
    if(!userid){
        return res.status(200).json({
            message: 'khong hien thi du lieu'
        })
    }
  await pool.execute('delete from users where id = ?', [userid])
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports ={
    getAllUsers, createNewUser,UpdateUser,DeleteUser
}