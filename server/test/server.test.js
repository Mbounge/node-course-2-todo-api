const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// dummy variables
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

// trying to make sure db is empty
beforeEach((done) => {
    Todo.remove({}).then(() => {
       return Todo.insertMany(todos)
    }).then(() => done());
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
            
            Todo.find({text}).then((todos) => {
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
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });  
});

describe('Get /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });
    
    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString(); // can express this string in the url
        
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    
    it('should return 404 for non-valid ids', (done) => {
        
        request(app)
        .get(`/todos/123abc`)
        .expect(404)
        .end(done);  
    });
    
});


describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId =  todos[1]._id.toHexString();
        
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => { // want to assert that the data will come back as the request body
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if (err) {
               return done(err);
            }
            
            Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist;
                done();
            }).catch((e) => done(e));
        });
    });
    
    
    it('Should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    
    
    it('should return 404 if object id is invalid', (done) => {
        request(app)
        .delete(`/todos/123abc`)
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'This is the text for testing';
        
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            text,
            completed: true  
            })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            // toBeA is no longer a thing, so do this instead 
            expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);   
    });
    
    it('Should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'This is the text for testing!!!!';
        
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            text,
            completed: false  
            })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            // toBeA is no longer a thing, so do this instead 
            expect(res.body.todo.completedAt).toNotExist;
        })
        .end(done);   
    });
});



