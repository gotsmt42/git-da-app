module.exports = checkFile = async (req, res, next) => {
  if (req.file !== undefined && req.file !== null) {
    req.imageUrl = req.file.path;
    req.fileUrl = req.file.path;

    next();
  } else {
    // req.name = req.body.name;
    // req.price = req.body.price;
    // req.description = req.body.description;

    // // req.formData = req.body

    next();
  }
};
