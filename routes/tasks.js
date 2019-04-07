const express =require('express');
const router=express.Router();
const mongoose= require('mongoose');
const taskModel= require('../models/task');

// router.get('/', function (req, res){
//   taskModel.find({}, (err, task_results)=>{
//     if(err){
//       res.status(500).send({
//         message: 'Server Error',
//         data: []
//       });
//     }
//     else{
//       res.status(200).send({
//         message: 'GET successful',
//         data: task_results
//       });
//     }
//   })
// });

router.get('/', (req, res)=>{
  var where_query, sort_query, select_query,
      skip_query, limit_query=null;
  var count_query=false;

  if(req.query.where){
    where_query=JSON.parse(req.query.where);
  }
  if(req.query.sort){
    sort_query=JSON.parse(req.query.sort);
  }
  if(req.query.select){
    select_query=JSON.parse(req.query.select);
  }
  if(req.query.skip){
    skip_query=JSON.parse(req.query.skip);
  }
  if(req.query.limit){
    limit_query=JSON.parse(req.query.limit);
  }
  if(req.query.count){
    count_query=JSON.parse(req.query.count);
  }


  taskModel.find(where_query)
  .sort(sort_query).select(select_query).skip(skip_query).limit(limit_query)
  .exec()
  .then(results=>{
    console.log(results);
    if(count_query==true){
      var data_res=results.length
    }
    else{
      var data_res=results
    }
    res.status(200).json({message: "GET succesful", data: data_res});
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.post('/', (req, res)=>{
  const new_task= new taskModel({
    name: req.body.name,
    description: req.body.description,
    deadline: req.body.deadline,
    completed: req.body.completed,
    assignedUser: req.body.assignedUser,
    assignedUserName: req.body.assignedUserName
  });
  new_task
  .save()
  .then(results=>{
    console.log(results);
    res.status(201).json({
      message: 'POST succesful',
      data: results
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.get('/:id', (req, res)=>{
  const id =req.params.id;
  taskModel.findById(id)
  .exec()
  .then(results=>{
    console.log(results);
    if(results){
      res.status(200).json({ message: "GET succesful", data:results });
    }
    else {
      res.status(404)
         .json({ message: "ID does not exist in database", data:[] });
    }
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.put('/:id', (req, res)=>{
  const updated_task= {
    name: req.body.name,
	  description: req.body.description,
	  deadline: req.body.deadline,
	  completed: req.body.completed,
	  assignedUser: req.body.assignedUser,
	  assignedUserName: req.body.assignedUserName
  }
  const id = req.params.id
  taskModel.findByIdAndUpdate({ _id: id }, updated_task )
  .exec()
  .then(results=>{
    console.log(results);
    if(results){
      res.status(201).json({
        message: 'PUT request succesful',
        data: results
      });
    }
    else {
      res.status(404)
         .json({ message: "ID does not exist in database", data:[], });
    }
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.delete('/:id', (req, res)=>{
  const id =req.params.id;
  taskModel.findByIdAndRemove({_id : id})
  .exec()
  .then(results=>{
    console.log(results);
    if(results){
      res.status(200).json({ message: "DELETE succesful", data: results });
    }
    else {
      res.status(404)
         .json({ message: "ID does not exist in database", data: [] });
    }
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

});



module.exports = router;
