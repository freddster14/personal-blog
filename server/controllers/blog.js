exports.getAll = async (req, res, next) => {
  res.send('All blogs')
}

exports.getOne = async (req, res, next) => {
  res.send('One blog')
}

exports.create = async (req, res, next) => {
  res.send('created')
}

exports.delete = async (req, res, next) => {
  res.send('deleted')
}

exports.update = async (req, res, next) => {
  res.send('updated')
}