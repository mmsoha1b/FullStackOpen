const User = require('../models/user');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const initialUsers=[
    {
        name: "User",
        username: "UserName",
        password: "password"
    }
]
describe('POST',()=>{

    beforeEach(async()=>{
        await User.deleteMany({});
        let newUser = new User(initialUsers[0]);
        await newUser.save(); 
    },100000);

    test('it does not add user which does not contain password',async()=>{
        const invalidUser={
            name:'aaa',
            username:"aaa"
        }
        const response = await api.post('/api/users').send(invalidUser);
        const users = await User.find({});
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Username and password must be present");
        expect(users.length).toBe(initialUsers.length);
    })
    test('it does not add user which does not contain username',async()=>{
        const invalidUser={
            name:'aaa',
            password:'pass'
        }
        const response = await api.post('/api/users').send(invalidUser);
        const users = await User.find({});
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Username and password must be present");
        expect(users.length).toBe(initialUsers.length);
    })
    test('it does not add user which does not contain valid username',async()=>{
        const invalidUser={
            username:'aa',
            name:'aaa',
            password:'pass'
        }
        const response = await api.post('/api/users').send(invalidUser);
        const users = await User.find({});
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Username must be longer than 3 characters");
        expect(users.length).toBe(initialUsers.length);
    })
    test('it does not add user which does not contain valid password',async()=>{
        const invalidUser={
            username:'aaa',
            name:'aaa',
            password:'pa'
        }
        const response = await api.post('/api/users').send(invalidUser);
        const users = await User.find({});
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Password must be longer than 3 characters");
        expect(users.length).toBe(initialUsers.length);
    })
})