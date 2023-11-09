const connection = require("../database/database");
const tableName1 = "user_images"; // Update with your actual table name
const tableName2 = "like_image"; // Update with your actual table name

const database = () => {
    try {
        connection.connect();
        console.log("Connected to the database!");
    } catch (error) {
        console.log("Database connection failed:", error);
        process.exit(1); // Terminate the application if the database connection fails
    }
};
database();

exports.userLiked = (req, res) => {
    const { id } = req.params;
    const { Like_user } = req.body;

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

        let userData = checkUserResults[0];

        const checkUserExistsQuery = `SELECT * FROM ${tableName2}`;
        const checkUserExistsValues = [];

        connection.query(checkUserExistsQuery, checkUserExistsValues, (checkUserExistsError, checkUserExistsResults) => {
// console.log(checkUserExistsResults,"kkk"),
 console.log(checkLikeError)
            if (checkUserExistsError) {
                console.error("Error during SELECT operation:", checkUserExistsError);
                return res.status(500).json({
                    error: "Failed to check user in tableName2",
                    dbError: checkUserExistsError.message,
                });
            }

            if (checkUserExistsResults.length) {
                const existingCreator = checkUserExistsResults[0].user_id;
             
                if (existingCreator == id) {
                    return res.status(200).json({ success: true, liked: true, message: "User already exists in tableName2 with creator" });
                }
                else {
                    // If the user hasn't liked the item yet, add the like (set is_liked to true)
                    const insertQuery = `INSERT INTO ${tableName2} (user_id, image_link, creator, keyword, is_liked, Like_user) VALUES (?,?,?,?,?,?)`;
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
                }
            } else {
                const insertQuery = `INSERT INTO ${tableName2} (user_id, image_link, creator, keyword, is_liked, Like_user) VALUES (?,?,?,?,?,?)`;
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
            }


        });
    });
};



exports.userUnLiked = (req, res) => {
    const { id } = req.params;
    const query = `UPDATE ${tableName2} SET is_liked=false WHERE id=${id}`;
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

        console.log("Image unliked successfully");
        res.status(200).json({ success: true, message: "unliked successfully" });
    });

}



exports.getUserLikedImage = (req, res) => {
    const getUserLikedQuery = `SELECT * FROM ${tableName2}`;
    const getUserLikedValues = [];

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



