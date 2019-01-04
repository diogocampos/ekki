/**
 * Converts a MongoDB document into a Plain Old JavaScript Object
 */
exports.pojo = mongoDoc => {
  return JSON.parse(JSON.stringify(mongoDoc.toObject()))
}
