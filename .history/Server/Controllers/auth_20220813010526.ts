import express from 'express';

//need passport functionally
import passport from 'passport';

//need to include the Use model for authentication functions
import User from '../Models/user';

//need to import the JWT Utility Function
import { GenerateToken } from '../Util';

//Processing Functions
export function ProcessLoginPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    passport.authenticate('local', function(err, user, info)
    {
        // are there server errors?
        if(err)
        {
            console.error(err)
            res.end(err);
        }

        //are there login errors?
        if(!user)
        {
            return res.json({success: false, msg: 'ERROR: Authentication Failed'});
        }

        //no problems - we have a good username and password
        req.logIn(user, function(err)
        {
            //are there db error?
            if(err)
            {
                console.error(err);
                res.end(err);
            }

            const authToken = GenerateToken(user);

            return res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                DisplayName: user.DisplayName,
                username: user.username,
                EmailAddress: user.EmailAddress
            }, token: authToken});
        });

        return;
    })(req, res, next);
}

export function ProcessRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    // instantiate a new user object
    let newUser = new User
    ({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });

    User.register(newUser, req.body.password, function(err)
    {
        if(err)
        {
            if(err.name == "UserExistsError")
            {
                console.error('ERROR: User Already Exists!');
            }
            else
            {
                console.error(err.name); // other error
            }
            return res.json({success: false, msg: 'ERROR: Registration Failed!'});
        }

        //everything is ok - user has been registered

        return res.json({success: true, msg: 'User Registered Successfully!'}); 

    });
}

export function ProcessLogoutPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    req.logOut(function(err)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        console.log("User Logged Out");
    });

    res.json({success: true, msg: 'User Lodged Out Successfully!'});
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let newUser = new User
    ({
        DisplayName: String,
    username: String,
    EmailAddress: String,DisplayName: String,
    username: String,
    EmailAddress: String,
        responseId : req.body.responseId,
        surveyId : req.body.surveyId,
        question1_ans : req.body.question1_ans,
        question2_ans : req.body.question2_ans

    })

    //Insert the new Response object into the database (response collection)
    Response.create(newResponse, function(err: CallbackError)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

            });
    let id = req.params.id;

    let updateSurveys = new Survey
    ({
      "_id": id,
    });

    Survey.updateOne({_id: id}, {$inc: {responses: 1 }}, function(err: CallbackError)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //edit was successful -> go to the survey page
        res.json({success: true, msg: 'Successfully Edited Survey', survey: updateSurveys});
    });
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    User.find(function(err, usersCollection)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        res.json({success: true, msg: 'Users Displayed Successfully', users: usersCollection, user:req.user});

    })
}

