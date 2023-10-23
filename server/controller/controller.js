var Userdb = require('../model/model');
const { ObjectId } = require('mongodb');

//create and save new user
exports.create = (req, res) => {
    //validation request
    if (!req.body) {
        res.status(400).send({ MessageChannel: "Content can not be empty!" });
        return;
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating"
            });
        });

}

//retrive and return all users/ retrive and return a single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id" + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id" + id })
            })
    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while find information" })
            })
    }
}

//Update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
}

//Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = new ObjectId(req.param.id);
    //const objectId = new ObjectId(stringId);
    Userdb.find().then(data => {
        if (data) {
          // We were able to connect to the database and retrieve data.
          console.log('Successfully connected to the database and retrieved data.');
        } else {
          // We were unable to connect to the database or retrieve data.
          console.log('Failed to connect to the database or retrieve data.');
        }
      });
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id $(id). Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted succuessfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}