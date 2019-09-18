const express = require('express');
const app = express();
const path = require('path');
const { User } = require('./db').models;

module.exports = app;
app.use(express.json())
app.use('/build', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next)=> {
  User.findAll()
    .then( users=> res.send(users))
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next)=> {
  User.findByPk(req.params.id)
    .then( user => user.destroy())
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.put('/api/users/:id', (req,res,next)=> {
  User.findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then((user)=> res.send(user))
    .catch(next)
})
