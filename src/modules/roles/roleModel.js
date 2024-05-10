const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: { type: String, require: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

const RoleModel = mongoose.model('role', roleSchema);

module.exports = RoleModel;