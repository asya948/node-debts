import express from 'express';
import db from  "./config/db.js";
import cors from 'cors';
const  app = express();
app.user(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users',async (req,res)=>{
    let [row]=await db.query('SELECT * FROM users');
    res.json(row);
})

app.get('/debts/:id',async (req,res)=>{
    let id=req.params.id;
    let [row]=await db.query('SELECT * FROM debts WHERE user_id=?',[id]);
    res.json(row);
})
app.post('/user',async (req,res)=>{
    let {name,email} = req.body;
    let query=await db.query('insert into users (name,email) values (?,?)',[email,email]);

    res.json({
    id:query.insertId,
    name,
    email,
    });
})
app.post('/debt',async (req,res)=>{
    const {user_id,name,price} = req.body;
    if(!user_id || !name || !price){
        return res.json({error:'please enter an integer'});
    }

    const [query]=await db.query('insert into debts (name,user_id,price) values (?,?,?)'[name,user_id,price])
      res.json({
          id:query.insertId,
          name,
          price,
          user_id,
      })

        })

app.delete('/debt/:id',async (req,res)=>{
    let id=req.params.id;
    const  [query]=await db.query('DELETE FROM debts where  id=?',[id]);
res.json({
    message: 'deleted debt from user',
})
})

app.get('/debts',async (req,res)=>{
    const  [query]=await db.query('select * FROM debts');
res.json(query)
})

app.delete('/users/:id',async (req,res)=> {
    let id = req.params.id;
    const [query] = await db.query('DELETE FROM debts where id=?', [id]);
    res.json({message: 'deleted debt from user',})

})














const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})