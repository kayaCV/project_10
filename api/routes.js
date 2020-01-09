'use strict';

const express = require('express');
const bcryptjs = require('bcryptjs');
const {models} = require('./db');
const {User, Course} = models;
const { check, validationResult } = require('express-validator');
const auth = require('basic-auth');




const authenticateUser = async(req, res, next) => {
    let message = null;

    const users = await User.findAll();
 
    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);
  
    // If the user's credentials are available...
    if (credentials) {
      // Attempt to retrieve the user from the data store by email
      const user = users.find(u => u.emailAddress === credentials.name);
  
      // If a user was successfully retrieved from the data store...
      if (user) {
        //  compare password (from the Authorization header) to  password from the data store.
        const authenticated = bcryptjs
          .compareSync(credentials.pass, user.password);
        
          console.log(credentials.pass)
          console.log(user.password)
          console.log(authenticated)
        // If the passwords match...
        if (authenticated) {
          console.log(`Authentication successful for username: ${user.emailAddress}`);

          req.currentUser = user;
        } else {
          message = `Authentication failure for username: ${user.emailAddress}`;
        }
      } else {
        message = `User not found for username: ${credentials.name}`;
      }
    } else {
      message = 'Auth header not found';
    }
  
    // If user authentication failed...
    if (message) {
      console.warn(message);
  
      // Return a response with a 401 Unauthorized HTTP status code.
      res.status(401).json({ message: 'Access Denied' });
    } else {
      next();
    }
  };

  // Construct a router instance.
const router = express.Router();

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next);
        
      } catch(error){
         res.status(500).send(error);
      }
    }
}






////////////////////////////////////////////////////////

// Route that returns the currently authenticated user.
router.get('/users', authenticateUser, (req, res) => {     
    const user = req.currentUser;
  
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password
    });
});
  

// // Route that creates a new user
router.post('/users', [
    check('firstName')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "firstName"'),
    check('lastName')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "lastName"'),
    check('emailAddress')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "emailAddress"')
      .isEmail()
      .withMessage('Please provide a valid email address for "emailAddress"')
      .custom( async (value, {req}) => {
          if(value) {
            const user = await User.findOne({
                where: {emailAddress: value}
                });
              if(user) {
                  throw new Error('Email address already in use!');
              }
          }

          return true;
      }),
    check('password')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a value for "password"'),
  
  ], async (req, res) => {
    // Attempt to get the validation result from the Request object.
const errors = validationResult(req);

// If there are validation errors...
if (!errors.isEmpty()) {
  const errorMessages = errors.array().map(error => error.msg);

  // Return the validation errors to the client.
  return res.status(400).json({ errors: errorMessages });
}

  try{
      console.log('trying to create user');
      // Get the user from the request body and add to the database
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: bcryptjs.hashSync(req.body.password)
    });

      res.location('/');
;
      // Set the status to 201 Created and end the response. 
      res.status(201).end();

  } catch(error) {
      res.json({message: error.message});
  }
});


// GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
router.get('/courses', asyncHandler(async (req, res)=>{
    const courses = await Course.findAll({
        include: [
          {
            model: User,
            as: 'user', // alias
          },
        ],
      });
    console.log("worked");
    res.status(200).json(courses);
   
}));

// GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID
router.get('/courses/:id', asyncHandler(async (req, res)=>{
    const course = await Course.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'user', // alias
          },
        ],
      });
    if(course){
        res.status(200).json(course);
    } else {
        res.status(404).json({message: "Course not found."});
    }
}));

// POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/courses', [
    check('title')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "title"'),
  check('description')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "description"'),
], authenticateUser, async (req, res) => {
         // Attempt to get the validation result from the Request object.
  const errors = validationResult(req);

  // If there are validation errors...
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);

    return res.status(400).json({ errors: errorMessages });
  }
    try{
        // Get the course from the request body and add to db.
        const course = await Course.create({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded
        });

        // set the Location header to the URI for the course,
        res.location('/courses/' + course.id);
        res.status(201).end();
        
    } catch(error) {
        res.json({message: error.message});
    }
});

// // PUT /api/courses/:id 204 - Updates a course and returns no content
router.put('/courses/:id', [
    check('title')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "title"'),
  check('description')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "description"'),
], authenticateUser, asyncHandler(async(req,res) => {
         // Attempt to get the validation result from the Request object.
    const errors = validationResult(req);

    // If there are validation errors...
    if (!errors.isEmpty()) {
        // Use the Array `map()` method to get a list of error messages.
        const errorMessages = errors.array().map(error => error.msg);

        // Return the validation errors to the client.
        return res.status(400).json({ errors: errorMessages });
    }

    try{
        const course = await Course.findByPk(req.params.id);
        await course.update(req.body);
            res.status(204).end();    
    } catch(error) {
        res.json({message: error.message});   
    }
}));

// DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete("/courses/:id", authenticateUser, asyncHandler(async(req,res, next) => { // authenticateUser, 
    const course = await Course.findByPk(req.params.id);
    if(course) {
        await course.destroy();
        res.status(204).end();
    } else {
        res.status(404).json({message: "Course not found."});
    }
}));




module.exports = router;

////////////////////////////////////////////////////////