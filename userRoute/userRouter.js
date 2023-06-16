const express = require('express');
const router = express.Router();

const connection=require('../database/database')


const database = () => {
    try {
      connection.connect();
      console.log('Connected to the database!');
    } catch (error) {
      console.log('Database connection failed:', error);
      process.exit(1); // Terminate the application if the database connection fails
    }
  };
database()

const tableName = 'userresponse';



router.post('/users', (req, res) => {
    
  //const { id, text,createdAt,ai} = req.body;
  console.log(req.body);
  var data = req.body;

  console.log(data);

  var sql = `INSERT INTO ${tableName} (id,text, createdAt,ai) VALUES ?`;
  let Values=[];


  data.forEach(item => {
    Values.push([item.id,item.text,item.createdAt,item.ai]);
  });
  
   connection.query(sql,[Values], (error, results) => {
      if (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ error: 'Failed to insert user', dbError: error.message });
      }
  
      console.log('User inserted successfully');
      res.status(200).json({ success: true, message: "User inserted successfully" });
    });
  
});


router.get('/getusers', (req, res) => {
    
    connection.query(`SELECT * FROM  ${tableName}`, (error, results) => {
      if (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ error: 'Failed to insert user', dbError: error.message });
      }
  
      console.log('User inserted successfully');
      res.status(200).json({ success: true, message: "User inserted successfully" ,results:results});
    });
  });
  

  module.exports = router





// const express = require('express');

// const tableName = 'userresponse';
// const router = express.Router();

// const connection=require('../database/database')
// // Handle the POST request
// router.post('/api/endpoint', (req, res) => {
//   const data = req.body;

//   // Connect to MySQL database
//   const database = () => {
//     try {
//       connection.connect();
//       console.log('Connected to the database!');
//     } catch (error) {
//       console.log('Database connection failed:', error);
//       process.exit(1); // Terminate the application if the database connection fails
//     }
//   };
// database()
//   // Insert each object into the database
//   router.post('/post', (req,res)=>{
//      data.forEach(obj => {
//        connection.query(`INSERT INTO ${tableName}`, obj, (error, results) => {
//         if (error) {
//           // Handle any database errors
//           console.error(error);
//         } else {
//           // Data inserted successfully
//           console.log('Data inserted:', obj);
//         }
//       });
//     });
  
//   // Send a response
//   res.sendStatus(200);
//   })

//   // Close the database connection
//   connection.end();

// });

// module.exports=router
