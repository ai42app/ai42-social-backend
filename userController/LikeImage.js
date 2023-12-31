const connection = require("../database/database");
var tableName1 = "user_images";
const tableName2 = "like_image";


exports.userLiked = async (req, res) => {
    const { id } = req.params;
    const { Like_user } = req.body;
    const { createdAt } = req.body;
    try {
        const getLikedLength = `SELECT * FROM ${tableName2} WHERE image_id = ? `;  // check how many liked id
        const likedCountvalue = [id]
        if (!Like_user && !id) {
            res.status(404).json({ status: false, message: "userId require" })
        } else {
            connection.query(getLikedLength, likedCountvalue, (checkLikedError, LikedResultCount) => {  // get Liked user length

                if (checkLikedError) {
                    console.error("Error during SELECT operation:", checkLikedError);
                    return res.status(500).json({
                        error: "Failed to check like",
                        dbError: checkLikedError.message,
                    });
                }

                if (LikedResultCount.length === 0) {

                 if(!id){
                    res.status(404).json({ status: false, message: "userId require" })
                 }else{
                       // if user liked update length with likes
                       const query = `UPDATE ${tableName1} SET Likes=${LikedResultCount.length + 1} WHERE id=${id}`;
                       const values = [id];
   
                       connection.query(query, values, (error, UpdateResults) => {
                           // console.log(UpdateResults, "UpdateResults")
                           if (error) {
                               console.error("Error updating image like:", error);
                               return res
                                   .status(500)
                                   .json({ error: "Failed to update image", dbError: error.message });
                           }
   
                           if (UpdateResults.affectedRows === 0) {
                               return res.status(404).json({ error: "Image not found" });
                           }
   
                         
                           if (UpdateResults) {
                               const getAllUserData = `SELECT * FROM ${tableName1} WHERE id = ?`;
                               const checkLikeValues = [id];
                               connection.query(getAllUserData, checkLikeValues, (checkLikeError, checkUserResults) => {
   
                                   if (checkLikeError) {
                                       console.error("Error during SELECT operation:", checkLikeError);
                                       return res.status(500).json({
                                           error: "Failed to check like",
                                           dbError: checkLikeError.message,
                                       });
                                   }
                                   let userData = checkUserResults[0]
   
                                   // If the user hasn't liked the item yet, add the like (set is_liked to true)
                                   const insertQuery = `INSERT INTO ${tableName2} (image_id, image_link, creator, keyword, is_liked, Like_user,createdAt) VALUES (?,?,?,?,?,?,?)`;
                                   const insertValues = [userData.id, userData.link_to_image, userData.creator, userData.keywords, true, Like_user, createdAt];
   
                                   connection.query(insertQuery, insertValues, (insertError, insertResults) => {
                                       if (insertError) {
                                           console.error("Error during inserting like:", insertError);
                                           return res.status(500).json({
                                               error: "Failed to like",
                                               dbError: insertError.message,
                                           });
                                       }
   
                                       res.status(200).json({ success: true, message: "Liked the image" });
                                   });
                               })
   
   
                           }
                       });
                 }

                } else {
                    const checkLikedUser = `SELECT * FROM ${tableName2} WHERE image_id = ? AND Like_user = ?`;
                    const checkLikedUserValue = [id, Like_user]
                    connection.query(checkLikedUser, checkLikedUserValue, (error, LikedUser) => {

                        if (LikedUser.length) {
                            // User has already liked the item, so perform unlike functionality
                            const deleteLikeQuery = `DELETE FROM ${tableName2} WHERE image_id = ? AND Like_user = ?`;
                            const deleteLikeValues = [id, Like_user];

                            connection.query(deleteLikeQuery, deleteLikeValues, (deleteLikeError, deleteLikeResult) => {
                                if (deleteLikeError) {
                                    console.error("Error during deleting like:", deleteLikeError);
                                    return res.status(500).json({
                                        error: "Failed to unlike",
                                        dbError: deleteLikeError.message,
                                    });
                                }

                                // Update the like count in tableName1 by decrementing 1
                                const updateLikeCountQuery = `UPDATE ${tableName1} SET Likes = Likes - 1 WHERE id = ?`;
                                const updateLikeCountValues = [id];

                                connection.query(updateLikeCountQuery, updateLikeCountValues, (updateLikeError, updateLikeResult) => {
                                    if (updateLikeError) {
                                        console.error("Error updating image like count:", updateLikeError);
                                        return res.status(500).json({
                                            error: "Failed to update image",
                                            dbError: updateLikeError.message,
                                        });
                                    }

                                    res.status(200).json({ success: true, message: "Unliked the image" });
                                });
                            });
                        } else {
                            const query = `UPDATE ${tableName1} SET Likes=${LikedResultCount.length + 1}    WHERE id=${id}`;
                            const values = [id];

                            connection.query(query, values, (error, UpdateResults) => {
                                // console.log(UpdateResults, "UpdateResults")
                                if (error) {
                                    console.error("Error updating image like:", error);
                                    return res
                                        .status(500)
                                        .json({ error: "Failed to update image", dbError: error.message });
                                }

                                if (UpdateResults.affectedRows === 0) {
                                    return res.status(404).json({ error: "Image not found" });
                                }

                                // console.log("Image updated successfully");
                                // res.status(200).json({ success: true, message: "Like added successfully" });
                                if (UpdateResults) {
                                    const getAllUserData = `SELECT * FROM ${tableName1} WHERE id = ?`;
                                    const checkLikeValues = [id];
                                    connection.query(getAllUserData, checkLikeValues, (checkLikeError, checkUserResults) => {

                                        if (checkLikeError) {
                                            console.error("Error during SELECT operation:", checkLikeError);
                                            return res.status(500).json({
                                                error: "Failed to check like",
                                                dbError: checkLikeError.message,
                                            });
                                        }
                                        let userData = checkUserResults[0]

                                        // If the user hasn't liked the item yet, add the like (set is_liked to true)
                                        const insertQuery = `INSERT INTO ${tableName2} (image_id, image_link, creator, keyword, is_liked, Like_user) VALUES (?,?,?,?,?,?)`;
                                        const insertValues = [userData.id, userData.link_to_image, userData.creator, userData.keywords, true, Like_user];

                                        connection.query(insertQuery, insertValues, (insertError, insertResults) => {
                                            if (insertError) {
                                                console.error("Error during inserting like:", insertError);
                                                return res.status(500).json({
                                                    error: "Failed to like",
                                                    dbError: insertError.message,
                                                });
                                            }

                                            res.status(200).json({ success: true, message: "Liked the image" });
                                        });
                                    })


                                }
                            });
                        }
                    })

                }


            })
        }




    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};


exports.getUserLikedImage = (req, res) => {
    const { Like_user } = req.params
    const getUserLikedQuery = `SELECT * FROM ${tableName2} WHERE Like_user=?`;
    const getUserLikedValues = [Like_user];

    connection.query(getUserLikedQuery, getUserLikedValues, (error, results) => {
        if (error) {
            console.error("data not found", error);
            return res
                .status(500)
                .json({ error: "Failed get image", dbError: error.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Image not found" });
        }

        let allImages = results
        console.log(allImages, "ppp")

        res.status(200).json({ success: true, message: "get image successfully", results });
    });

}



