const db=require('../models')
const {ValidationError}=require('sequelize');
const DepartmentModel= ('../models').Project





module.exports.read = function(req, res, next){
    db.Project.findAll().then( (result) => {
        res.status(200).json({data:result})
    }).catch(error=>{
        res.status(500).json({
            message:'Something WentWrong'
        })
    })
}


module.exports.showOne=function(req,res,next){
    const id=req.params.id
    db.Project.findOne({
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
    db.Project.destroy({
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


module.exports.add_Project= async (req,res)=>{
    const newProject={
        name:req.body.name,
        projectteam:req.body.projectteam,
        location:req.body.location        
    };
    try{
        const new_Project= await db.Project.create(newProject);
        res.status(200).json(new_Project);
    } catch(error){
        console.log(error);
        res.status(400).send("Project not Created")

    }
    res.status(400).send("Project Render Here");
};


module.exports.update= function(req,res){
    const {name,projectteam,location}=req.body

    const oldProject= db.Project.findOne({
        where:{name:req.body.name},
    });
    if(!oldProject){
        return res.send(404).send("Project Not Found");
    }
    else{
        db.Project.update({
            name:name,
            projectteam:projectteam,
            location:location
        },
        {where:{name:name}}
        ).then(update=>{
            return res.send({
                name:name,
                projectteam:projectteam,
                location:location
            });
        }).catch(error=>{
            console.log("error",error)
        })
    }
}


