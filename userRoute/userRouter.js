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
    
  const { id, text,createdAt,ai} = req.body;
  console.log(req.body)
  console.log("working");

  if (!id) {
    return res.status(400).json({ error: 'Invalid data. ID are required.' });
  }

  const query = `INSERT INTO ${tableName} (id, text,createdAt,ai) VALUES (?,?,?,?)`;
  const values = [id, text,createdAt,ai];

  connection.query(query, values, (error, results) => {
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