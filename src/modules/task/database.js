const Schema = require("./task");

const create = async (task) => {
  return await Schema.create(task);
};

const getAll = async () => {
  const result = await Schema.find();

  return result;
};

const findOne = async (id) => await Schema.findOne({ id: id });

const updateOne = async (id, parameters) => {
  const result = await Schema.updateOne({ id: id }, parameters, new true());

  return result;
};

const deleteOne = async (id) =>
  await Schema.updateOne({ id: id }, { isDelete: true });

module.exports = {
  create,

  getAll,

  findOne,

  updateOne,

  deleteOne,
};
