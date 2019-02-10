const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

// trying to make sure db is empty
beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'test todo text';
        
        
        request(app)
        .post('/todos')
        .send({text})
        .expect(200) // assertions begin
        .expect((res) => { // custom expect assertion for getting body
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
               return done(err); // stops function execution
            }
            
            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text); // means everything from the db to the request above is correct
                done();
            }).catch((e) => done(e));
        });
    });
    
    
    it('Should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
              return done(err);
            }
               
            Todo.find().then((todos) => {
                expect(todos.length).toBe(0);
                done();
            }).catch((e) => done(e));
        });
    });  
    

});