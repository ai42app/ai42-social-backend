// const connection = require("../database/database");
// var tableName = "user_images";
// var tableName2 = "like_image";
// exports.pagination = async (req, res) => {
//   const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//   const pageSize = parseInt(req.query.limit) || 10; // Number of items per page
//   const checkUserLikesQuery = `SELECT * FROM ${tableName}`;

//   try {
//     connection.query(checkUserLikesQuery, (err, allUserData) => {
//       if (err) {
//         console.error("Error during SELECT operation:", err);
//         return res.status(500).json({
//           error: "Failed to check user in tableName2",
//           dbError: err.message,
//         });
//       }

//       const checkUserLikesQuery = `SELECT * FROM ${tableName2}`;

//       connection.query(checkUserLikesQuery, (err, dataResult) => {
//         if (err) {
//           console.error("Error during SELECT operation:", err);
//           return res.status(500).json({
//             error: "Failed to check user in tableName2",
//             dbError: err.message,
//           });
//         }
//         console.log(dataResult, "dataResult")
//       })
//       let totalLength = allUserData?.length // total length of table

//       // Calculate the starting and ending indices for the current page
//       let startIndex = (page - 1) * pageSize;

//       let endIndex = startIndex + pageSize;

//       let currentPageData = allUserData?.slice(startIndex, endIndex);
//       if (currentPageData) {
//         res.status(201).json({ status: true, totalLength: totalLength, currentPageData: currentPageData })
//       } else {
//         res.status(404).json({ status: false, message: "data not found" })
//       }




//     })
//   } catch (error) {
//     console.error("Error executing the query:", err);
//     res.status(500).json({ error: "An error occurred" });
//   }

// };


const connection = require("../database/database");
var tableName = "user_images";
var tableName2 = "like_image";

exports.pagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.limit) || 10; // Number of items per page
  const userId = "satnamsingh85611@gmail.com" || 10; 
  const checkUserLikesQuery = `SELECT * FROM ${tableName}`;

  try {
    connection.query(checkUserLikesQuery, async (err, allUserData) => {
      if (err) {
        console.error("Error during SELECT operation:", err);
        return res.status(500).json({
          error: "Failed to retrieve data from tableName",
          dbError: err.message,
        });
      }

      const checkUserLikesQuery2 = `SELECT * FROM ${tableName2} WHERE Like_user = ${userId}`;

      connection.query(checkUserLikesQuery2, (err, dataResult) => {
        if (err) {
          console.error("Error during SELECT operation:", err);
          return res.status(500).json({
            error: "Failed to retrieve data from tableName2",
            dbError: err.message,
          });
        }

        // Extract IDs from the result of tableName2 query
        dataResult.forEach((ele)=>{
console.log(ele,"ele")
        });

        // Update allUserData to include 'is_liked' property based on comparison
        allUserData.forEach((item) => {

          item.is_liked = []

        });
// console.log(allUserData,"ll")
        let totalLength = allUserData.length; // total length of table

        // Calculate the starting and ending indices for the current page
        let startIndex = (page - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        let currentPageData = allUserData.slice(startIndex, endIndex);

        if (currentPageData.length > 0) {
          res.status(200).json({
            status: true,
            totalLength: totalLength,
            currentPageData: currentPageData,
          });
        } else {
          res.status(404).json({ status: false, message: "Data not found" });
        }
      });
    });
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

