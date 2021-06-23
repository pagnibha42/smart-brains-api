import express, { json, response } from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex';
import handleRegister from './controllers/register.js'
import handleSignIn from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import handleImage from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'agnibha',
        password: 'agnibha',
        database: 'smart-brains'
    }
})

// db.select('*').from('users')
//     .then(data => {
//         console.log(data);
//     });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('success')
})

/*SIGNIN ROUTE*/

app.post('/signin', handleSignIn(db, bcrypt)) //one way

/*REGISTER ROUTE*/

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)}) //another way

/*PROFILE ROUTE*/

app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)})

/*IMAGE ROUTE*/

app.put('/image', (req, res) => {handleImage(req, res, db)});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});