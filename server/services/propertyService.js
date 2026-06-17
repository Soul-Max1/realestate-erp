const Property = require("../models/Property");

const generatePropertyCode =
  async () => {
    const count =
      await Property.countDocuments();

    return `PROP${String(
      count + 1
    ).padStart(4, "0")}`;
  };

module.exports = {
  generatePropertyCode,
};