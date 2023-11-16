
exports.middlewareLike = (req, resp, next) => {
    const { id } = req.params;
    const { Like_user, createdAt } = req.body;
  
    // Check if any of the required parameters are missing
    if (!id || !createdAt || !Like_user) {
      return resp.status(404).json({ status: false, message: "not found" });
    }
  
    // If all required parameters are present, proceed to the next middleware or route handler
    next();
  };

exports.middlewareSaveImage = (req, resp, next) => {
    const {id,ai,createdAt,selected,link_to_image, creator, keywords} = req.body;
  
    // Check if any of the required parameters are missing
    if (!(link_to_image && creator && keywords && id && ai && selected && createdAt )) {
      return resp.status(400).json({ success: false, msg: "Image saved field" });
    }
  
    // If all required parameters are present, proceed to the next middleware or route handler
    next();
  };
  