
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
  exports.CheckSearchGPTUserId = (req, res, next) => {
    const { user_id,selected} = req.body;
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  
    if (user_id === undefined || user_id === null || user_id.trim() === '') {
      return res.status(400).json({ success: false, msg: "SearchGPT user ID is missing" });
    } else if (!user_id.match(emailFormat)) {
      return res.status(400).json({ success: false, msg: "Invalid email format for user ID" });
    }else if(!selected){
      return res.status(400).json({ success: false, msg: "SELETED NOT FOUND" });
    }
  
    // If all checks pass, proceed to the next middleware or route handler
    next();
  };