const client=require('./connection');
const express=require('express');
const empController=require('../Controllers/EmployeeController');
const depController=require('../Controllers/DepController');
const projectController=require('../Controllers/ProjectController');
const app=express();
const empRouter=require('./empRouter');
const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('/', (req, res)=>{
    res.send('hp')
})

app.get('/employee',empController.read);
app.get('/employee/:id',empController.showOne);
app.delete('/employee/:id',empController.delete);
app.post('/employee',empController.add_employee);
app.put('/employee',empController.update);

app.get('/department',depController.read);
app.get('/department/:id',depController.showOne);
app.delete('/department/:id',depController.delete);
app.post('/department',depController.add_department);
app.put('/department',depController.update);


app.get('/project',projectController.read);
app.get('/project/:id',projectController.showOne);
app.delete('/project/:id',projectController.delete);
app.post('/project',projectController.add_Project);
app.put('/project',projectController.update);

app.listen(8000, ()=>{
    console.log("Sever is now listening at port 8000");
})