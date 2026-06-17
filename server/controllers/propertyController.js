const Property = require("../models/Property");
const Agency = require("../models/Agency");
const {
  generatePropertyCode,
} = require("../services/propertyService");

// Create Property
const createProperty = async (req, res) => {
  try {
    const {
      agencyId,
      propertyType,
      listingType,
      occupancyType,
      title,
      description,
      city,
      locality,
      price,
    } = req.body;

    const agency = await Agency.findById(
      agencyId
    );

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: "Agency Not Found",
      });
    }

    const propertyCode =
      await generatePropertyCode();

    const property =
      await Property.create({
        propertyCode,
        agencyId,
        propertyType,
        listingType,
        occupancyType,
        title,
        description,
        city,
        locality,
        price,
      });

    res.status(201).json({
      success: true,
      message:
        "Property Created Successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Properties
const getProperties = async (
  req,
  res
) => {
  try {
    const properties =
      await Property.find()
        .populate(
          "agencyId",
          "agencyName agencyCode"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Property By ID
const getPropertyById = async (
  req,
  res
) => {
  try {
    const property =
      await Property.findById(
        req.params.id
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Property
const updateProperty = async (
  req,
  res
) => {
  try {
    const property =
      await Property.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Property Updated Successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Property
const deleteProperty = async (
  req,
  res
) => {
  try {
    const property =
      await Property.findById(
        req.params.id
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Property Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};