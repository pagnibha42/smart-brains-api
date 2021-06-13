import express, { json } from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@xyz.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Ogni',
            password: 'bananas',
            email: 'ogni@xyz.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            login: '987',
            hash: '',
            email: 'john@xyz.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users)
})

/*SIGNIN ROUTE*/

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password)
        res.json('success');
    else {
        res.status(400).json('error logging in')
    }
})

/*REGISTER ROUTE*/

app.post('/register', (req, res) => {
    const { email, name, password} = req.body;

    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)})
        
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

/*PROFILE ROUTE*/

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }        
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

/*IMAGE ROUTE*/

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }        
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash)
// });
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('app is running on port 3000');
});