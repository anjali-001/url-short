let server = require('../server');
const auth = require('./auth');
let mongoose = require("mongoose");
let User = require('../models/User');

//Chai and middlewares
const should = require('chai').should();
let chaiHttp = require('chai-http');
let chai = require('chai');

chai.use(chaiHttp);

describe('/signup', () => {
    let user;
    
    before((done) => {
        user = new User({
            name: 'Anjali',
            email:'anjali@gmail.com',
            password:'user123'
        })
        
        done()
    })
    it('should register a user to the database', (done) => {
        chai.request(server)
        .post('/api/user/signup')
        .send(user)
        .end((err,res)=>{
            res.body.user.should.have.property('name').eql(user.name);
            res.body.user.should.have.property('email').eql(user.email);
             done();
        })
    })

    it('should return that email already exists', (done) => {
        chai.request(server)
        .post('/api/user/signup')
        .send(user)
        .end((err,res)=>{
            res.body.should.have.property('error').eql('Email already exists! Sign in instead.')
             done();
        })
    })

    after((done)=>{
        chai.request(server)
        .post('/api/user/delete-user')
        .send({email:user.email})
        .end((req,res)=>{
            console.log(`User was successfully deleted with status code ${res.status}`)
            done();
        })
    })
})
