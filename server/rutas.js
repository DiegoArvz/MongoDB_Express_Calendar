const Router = require('express').Router();
const Users = require('./model.js')
const Events = require('./event_model.js')

var sess = {
  user : ""
};
//Obtener todos los usuarios
Router.get('/events/all', function(req, res) {

  Events.find({ usuario: sess.user}).exec(function(err, docs) {
      if (err) {
          res.status(500)
          res.json(err)
      }
      if(docs.length > 0){
        var the_events = [];
        for (var i = 0; i < docs.length; i++) {
          var temp_event = {
            'id':docs[i]._id,
            'title':docs[i].title,
            'start':docs[i].start,
            'end':docs[i].end,
            'allDay':docs[i].allDay
          }
          the_events.push(temp_event);
        }
        res.send(the_events);
      }
  })

})

//Checar login
Router.post('/login', function(req, res) {

    var _usuario = req.body.usuario;
    var ob = {
        usuario: req.body.usuario,
        contrasena: req.body.contrasena
    }
    Users.find({ usuario: req.body.usuario,contrasena:req.body.contrasena}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        if(docs.length > 0){

            sess.user = _usuario;
            res.send("Validado");
        }
    })
})

// Obtener un usuario por su id
Router.post('/events/update', function(req, res) {
    let id = req.body.id
    Events.update({_id: id},
      {
        start: req.body.start,
        end: req.body.end
      }
  ).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.json(err)
        }

        res.json("Evento actualizado")
    })
})

Router.post('/events/new', function(req, res) {
    let events = new Events({
        usuario: sess.user,
        title: req.body.title,
        start: req.body.start,
        end: req.body.end
    })
    events.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})

// Eliminar un usuario por su id
Router.post('/events/delete', function(req, res) {
  let uid = req.body.id
  Events.remove({_id: uid}, function(error) {
      if(error) {
          res.status(500)
          res.json(error)
      }
      res.send("Registro eliminado")
  })
})
/*
// Inactivar un usuario por su id
Router.post('/inactive/:id', function(req, res) {

})

// Activar un usuario por su id
Router.post('/active/:id', function(req, res) {

})*/

module.exports = Router
