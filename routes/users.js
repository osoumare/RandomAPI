const express =require('express');
const router=express.Router();
const mongoose= require('mongoose');
const userModel= require('../models/user');

// router.get('/', function (req, res){
//   userModel.find({}, (err, user_results)=>{
//     if(err){
//       res.status(500).send({
//         message: 'Server Error',
//         data: []
//       });
//     }
//     else{
//       res.status(200).send({
//         message: 'GET successful',
//         data: user_results
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

  userModel.find(where_query)
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
  const new_user= new userModel({
    name: req.body.name,
    email: req.body.email,
    pendingTasks: req.body.pendingTasks || []
  });
  new_user
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
  userModel.findById(id)
  .exec()
  .then(results=>{
    console.log(results);
    if(results){
      res.status(200).json({ message: "GET succesful", data:results });
    }
    else {
      res.status(404)
         .json({ message: "ID does not exist in database", data: []});
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
  const updated_user= {
    name: req.body.name,
    email: req.body.email,
    pendingTasks: req.body.pendingTasks || []
  }
  const id = req.params.id
  userModel.findByIdAndUpdate({ _id: id }, updated_user)
  .exec()
  .then(results=>{
    console.log(results);
    if(results){
      res.status(201).json({
        message: 'PUT succesful',
        data: results
      });
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

router.delete('/:id', (req, res)=>{
  const id =req.params.id;
  userModel.findByIdAndRemove({_id : id})
  .exec()
  .then(results=>{
    console.log(results);
    if(results){
      res.status(200).json({ message: "DELETE succesful", data:results });
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
