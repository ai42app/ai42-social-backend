
const connection = require("../database/database");
var tableName = "user_images";
var tableName2 = "like_image";

exports.pagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;
  const userId = req.query.userId; // user email

  const checkUserLikesQuery = `SELECT * FROM ${tableName}`;

  try {
    connection.query(checkUserLikesQuery, (err, allUserData) => {
      if (err) {
        console.error("Error during SELECT operation:", err);
        return res.status(500).json({
          error: "Failed to check user in tableName2",
          dbError: err.message,
        });
      }

// get user liked and exist user id test@gmail.com
      const checkUserQuery = `SELECT * FROM ${tableName2} WHERE like_user=?`;
      const checkValue = [userId];

      connection.query(checkUserQuery, checkValue, async (err, likedUserData) => {
        if (err) {
          console.error("Error during SELECT operation:", err);
          return res.status(500).json({
            error: "Failed to check user in tableName2",
            dbError: err.message,
          });
        }

        const likedUserIds = await likedUserData.map((like) => like.image_id);
       
        const usersWithLikes = allUserData.map((user) => ({
          ...user,
          is_Liked: likedUserIds.includes(user.id.toString()),
        }));
        // const usersWithLikes = allUserData.map((user) => {({...user,is_Liked: likedUserIds.includes(user.id)})});

        let totalLength = usersWithLikes.length;
        let startIndex = (page - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        let currentPageData = usersWithLikes.slice(startIndex, endIndex);

        if (currentPageData) {
          res.status(201).json({
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