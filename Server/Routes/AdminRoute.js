import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'

const router = express.Router();

router.post('/adminlogin', (req, res) => {
    // console.log(req.body)
    const sql = "SELECT * from admin Where email = ? and password = ? "
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({loginStatus: false, Error: "Query Error"})
        if(result.length > 0){
            const email = result[0].email;
            const token = jwt.sign({role: "admin", email: email}, "jwt_secret_key", {expiresIn: '1d'});
            res.cookie('token', token)
            return res.json({loginStatus:true});
        }else {
            return res.json({ loginStatus: false, Error: "Wrong e,ail or password" })
        }
    })    
})

router.get('/category', (req, res) => {
    const sql = "INSERT INTO category ('name') VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err){
            return res.json({Status: false, Error: "Query Error"})
        }else 
        return res.json({Status: true, Result: result})
    });
});

router.post('add_category', (req, res)=> {
    const sql = "INSERT INTO category ('name') VALUES (?)"
    con.query(sql, [res.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

//Upload an Image 
const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
        cb(null, 'Public/Images')
    }, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee (name, email, address, salary. image, categoty_id) VALUES (?)";
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name, 
            req.body.email,
            hash,
            req.body.address, 
            req.body.salary, 
            req.file.filename, 
            req.body.category_id,
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true})
        })
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee ('name') VALUES (?)"
    con.query(sql, [req.body.employee], (err, result) => {
        if(err){
            return res.json({Status: false, Error: "Query Error"})
        }else 
        return res.json({Status: true, Result: result})
    });
});

router.get('/employee' + id, (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?"
    con.query(sql, [id], (err, result) => {
        if(err){
            return res.json({Status: false, Error: "Query Error"})
        }else 
        return res.json({Status: true, Result: result})
    });
});

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id
    const sql = "UPDATE employee set name= ?, email= ?, salary= ?, category_id= ?, address= ?, image= ? WHERE id = ? "
    const values = [
        req.body.name, 
        req.body.email,
        req.body.salary,
        req.body.category_id,
        req.body.address, 
        req.file.filename,       
    ]
    con.query(sql, [...values, id], (err, result) => {
        if(err){
            return res.json({Status: false, Error: "Query Error" + err})
        }else 
        return res.json({Status: true, Result: result})
    });
})

router.delete('/delete_employee/:id', (res, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
export {router as adminRouter }; 