/*
 * Connect all of your endpoints together here.
 */
 const userRoute = require('./users');
 const taskRoute = require('./tasks');

module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));

    app.use('/api/users', userRoute);

    app.use('/api/tasks', taskRoute);

    app.use((req, res, next)=>{
      const error = new Error('Not Found');
      error.status =404;
      next(error);
    })
    app.use((error, req, res, next)=>{
      res.status(error.status || 500);
      res.json({
        error: {
          message: error.message
        }
      });
    });


};
