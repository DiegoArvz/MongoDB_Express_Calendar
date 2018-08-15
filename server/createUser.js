var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/calendar";


insertarRegistro = function(db, callback){
  let coleccion = db.collection("users");

  coleccion.insertMany(
      [
        {
          usuario: "Test",
          contrasena: "NextU"
        },
      ], (error, result) =>{
        console.log("Resultado de insert"+result.toString())
      }
  )

  let coleccion_event = db.collection("events");
  coleccion_event.insertMany(
      [
        {
          usuario: "Test",
          title: "Vacaciones",
          start: "2018-12-05",
          allDay: false,
          end: "2018-12-05",
          start_hour: "7:00",
          end_hour:"13:00"
        },
        {
          usuario: "Test",
          title: "Trabajo",
          start: "2018-12-20",
          allDay: true,
          end: "",
          start_hour: "",
          end_hour:""
        }
      ], (error, result) =>{
        console.log("Resultado de insert"+result.toString())
      }
  )
}


MongoClient.connect(url, function(err, db){
  if(err)console.log(err);
  console.log("Conexión establecida con la base de datos");
  insertarRegistro(db, (error, result)=>{
    if(error)console.log("Error insertando en los registros: "+err);
 })
})
