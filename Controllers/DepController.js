const db=require('../models')
const {ValidationError}=require('sequelize/dist');
const EmployeeModel=require('../models').Employee
const RoleModel=require('../models').Department
const DepartmentModel= ('../models').Project
const bcrypt=require('bcrypt');





module.exports.read = function(req, res, next){
    db.Department.findAll().then( (result) => {
        res.status(200).json({data:result})
    }).catch(error=>{
        res.status(500).json({
            message:'Something WentWrong'
        })
    })
}


module.exports.showOne=function(req,res,next){
    const id=req.params.id
    db.Department.findOne({
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
    db.Department.destroy({
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


module.exports.add_department= async (req,res)=>{
    const newDepartment={
        name:req.body.name,
        location:req.body.location        
    };
    try{
        const new_dep= await db.Department.create(newDepartment);
        res.status(200).json(new_dep);
    } catch(error){
        console.log(error);
        res.status(400).send("Department not Created")

    }
    res.status(400).send("Department Render Here");
};

module.exports.update= function(req,res){
    const {name,location}=req.body

    const oldDepartment= db.Department.findOne({
        where:{name:req.body.name},
    });
    if(!oldDepartment){
        return res.send(404).send("Department Not Found");
    }
    else{
        db.Department.update({
            name:name,
            location:location
        },
        {where:{name:name}}
        ).then(update=>{
            return res.send({
                name:name,
                location:location
            });
        }).catch(error=>{
            console.log("error",error)
        })
    }
}



