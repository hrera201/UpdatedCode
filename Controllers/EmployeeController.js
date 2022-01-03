const db=require('../models')
const {ValidationError}=require('sequelize/dist');
const EmployeeModel=require('../models').Employee
const RoleModel=require('../models').Department
const DepartmentModel= ('../models').Project





module.exports.read = function(req, res, next){
    db.Employee.findAll().then( (result) => {
        res.status(200).json({data:result})
    }).catch(error=>{
        res.status(500).json({
            message:'Something WentWrong'
        })
    })
}


module.exports.showOne=function(req,res,next){
    const id=req.params.id
    db.Employee.findOne({
        where:{id:id}
    }).then(result=>{
        res.status(200).json(result)
    }).catch(error=>{
        res.status(500).json({
            message:'Something Went Wrong'
        })
    })
}

module.exports.delete=function(req,res,next){
    const id=req.params.id
    db.Employee.destroy({
        where:{id:id}
    }).then(result=>{
        res.status(200).json({
            message:'Deleted Succesfully'
        })
    }).catch(error=>{
        res.status(200).json({
            message:'Something Went Wrong'
        })
    })

}


module.exports.add_employee= async (req,res)=>{
    const newEmployee={
        name:req.body.name,
        email:req.body.email,
        pass:req.body.pass,
        company:req.body.company    
    };
    try{
        const new_employe= await db.Employee.create(newEmployee);
        res.status(200).json(new_employe);
    } catch(error){
        console.log(error);
        res.status(400).send("Employee not Created")

    }
    res.status(400).send("Employee Render Here");
};


module.exports.update= function(req,res){
    const {name,email,pass,company}=req.body

    const oldEmployee= db.Employee.findOne({
        where:{email:req.body.email},
    });
    if(!oldEmployee){
        return res.send(404).send("Employee Not Found");
    }
    else{
        db.Employee.update({
            name:name,
            pass:pass,
            company:company
        },
        {where:{email:email}}
        ).then(update=>{
            return res.send({
                name:name,
                email:email,
                pass:pass,
                company:company
            });
        }).catch(error=>{
            console.log("error",error)
        })
    }
}
