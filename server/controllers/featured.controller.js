const Featured = require('../models/featured.model');

module.exports.createFeatured = (request, response) => {
  const { title, type, duration, year, genre, imageName, smallImage, description } = request.body;
  Featured.create({ title, type, duration, year, genre, imageName, smallImage, description })
      .then(person => response.json(person))
      .catch(err => response.json(err));
} 

module.exports.getAllFeatured = (request, response) => {
  Featured.find({})
      .then(featured => response.json(featured))
      .catch(err => response.json(err))
}

module.exports.getFeatured = (request, response) => {
  Featured.findOne({_id:request.params.id})
      .then(Featured => response.json(Featured))
      .catch(err => response.json(err))
}

module.exports.updateFeatured = (request, response) => {
  Featured.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
      .then(updatedFeatured => response.json(updatedFeatured))
      .catch(err => response.json(err))
}

module.exports.deleteFeatured = (request, response) => {
  Featured.deleteOne({ _id: request.params.id })
      .then(deleteConfirmation => response.json(deleteConfirmation))
      .catch(err => response.json(err))
}

module.exports.getTypeFeatured = (request, response) => {
  if ((request.params.type === "main"))
    Featured.find({title:"Queen of the South"}).then(featured => response.json(featured)).catch(err => response.json(err))
  else if (request.params.type === "movies")
    Featured.find({title:"Real Steel"}).then(featured => response.json(featured)).catch(err => response.json(err))
  else if ((request.params.type === "series"))
    Featured.find({title:"Beyond Evil"}).then(featured => response.json(featured)).catch(err => response.json(err))
  else if ((request.params.type === "new"))
    Featured.find({title:"American Assasin"}).then(featured => response.json(featured)).catch(err => response.json(err))
  else if ((request.params.type === "kids"))
    Featured.find({title:"CoComelon"}).then(featured => response.json(featured)).catch(err => response.json(err))
}