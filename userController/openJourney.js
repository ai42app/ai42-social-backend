const connection=require('../database/database');
var tableName = 'user_images';



const database = () => {
    try {
      connection.connect();
      console.log('Connected to the database!');
    } catch (error) {
      console.log('Database connection failed:', error);
      process.exit(1); // Terminate the application if the database connection fails
    }
};
database();

exports.saveImages=(req,res)=>{

    const { link_to_image,creator,keywords,date,likes } = req.body;
    
    
 
    const query = `INSERT INTO ${tableName} (link_to_image,creator,keywords,date,likes) VALUES (?,?,?,?,?)`;

    const values =[link_to_image, creator, keywords, date,likes]
    
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error("Error during inserting  Image:", error);
        return res
          .status(500)
          .json({ error: "Failed to insert Image", dbError: error.message });
      }
  
      res
        .status(200)
        .json({ success: true, message: "Image Saved...",id: results.insertId});
    });
   
}

exports.likeImage=(req,res)=>{
    const { id } = req.params;
    
    const query = `UPDATE ${tableName} SET likes=likes +1     WHERE id=${id}`;
    const values = [id];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error("Error updating image like:", error);
        return res
          .status(500)
          .json({ error: "Failed to update image", dbError: error.message });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Image not found" });
      }
  
      console.log("Image updated successfully");
      res.status(200).json({success: true,message: "Like added successfully"});
    });
}




exports.getImage=(req,res)=>{
    const { id } = req.params;

    const query = `SELECT * FROM ${tableName} WHERE id = ${id}`;
    const values = [id];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error("Error fetching user:", error);
        return res
          .status(500)
          .json({ error: "Failed to fetch user", dbError: error.message });
      }
  
      if (results.length === 0) {
        return res.status(404).json([]);
      }
  
        console.log("User fetched successfully");
        res.status(200).json([results[0]]);
    });
}

exports.getImages=(req,res)=>{
    const { limit } = req.params;

    const query = `SELECT * FROM ${tableName}`;
    const values = [];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error("Error fetching user:", error);
        return res
          .status(500)
          .json({ error: "Failed to fetch user", dbError: error.message });
      }
  
      if (results.length === 0) {
        return res.status(404).json([]);
      }
  
        console.log("User fetched successfully");
        res.status(200).json(results);
    });
}

