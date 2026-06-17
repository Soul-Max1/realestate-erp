import {
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import Table from "../../components/common/Table";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StatusBadge from "../../components/StatusBadge";

import propertyService from "../../services/propertyService";
import agencyService from "../../services/agencyService";

import {
  propertyStart,
  propertySuccess,
  propertyFailure,
} from "../../redux/propertySlice";

import {
  FiPlus,
  FiHome,
  FiMapPin,
  FiDollarSign,
} from "react-icons/fi";

const PropertyManagement = () => {
  const dispatch = useDispatch();

  const { properties, loading } =
    useSelector(
      (state) => state.property
    );

  const [agencies, setAgencies] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  const [filterType, setFilterType] =
    useState("All");

  const [formData, setFormData] =
    useState({
      agencyId: "",
      propertyType: "Apartment",
      listingType: "Sale",
      occupancyType: "",
      title: "",
      description: "",
      city: "",
      locality: "",
      price: "",
    });

  const loadProperties =
    useCallback(async () => {
      try {
        dispatch(propertyStart());

        const data =
          await propertyService.getProperties();

        dispatch(
          propertySuccess(
            data.properties
          )
        );
      } catch (error) {
        dispatch(
          propertyFailure(
            error.message
          )
        );
      }
    }, [dispatch]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  useEffect(() => {
    const fetchAgencies =
      async () => {
        try {
          const response =
            await agencyService.getAgencies();

          setAgencies(
            response.agencies || []
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchAgencies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      agencyId: "",
      propertyType: "Apartment",
      listingType: "Sale",
      occupancyType: "",
      title: "",
      description: "",
      city: "",
      locality: "",
      price: "",
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
      };

      if (
        payload.occupancyType ===
        ""
      ) {
        delete payload.occupancyType;
      }

      await propertyService.createProperty(
        payload
      );

      alert(
        "Property Created Successfully"
      );

      resetForm();
      setShowModal(false);
      loadProperties();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          error.message
      );
    }
  };

  const filteredProperties = (
    properties || []
  ).filter((property) => {
    const matchesSearch =
      property.title
        .toLowerCase()
        .includes(
          searchValue.toLowerCase()
        ) ||
      property.propertyCode
        .toLowerCase()
        .includes(
          searchValue.toLowerCase()
        ) ||
      property.city
        .toLowerCase()
        .includes(
          searchValue.toLowerCase()
        ) ||
      property.locality
        .toLowerCase()
        .includes(
          searchValue.toLowerCase()
        );

    const matchesType =
      filterType === "All" ||
      property.listingType ===
        filterType;

    return (
      matchesSearch && matchesType
    );
  });

  const propertyStats = {
    sale: properties?.filter(
      (p) => p.listingType === "Sale"
    ).length || 0,
    rent: properties?.filter(
      (p) => p.listingType === "Rent"
    ).length || 0,
    available: properties?.filter(
      (p) => p.status === "Available"
    ).length || 0,
  };

  const tableColumns = [
    {
      key: "propertyCode",
      label: "Code",
      width: "10%",
      render: (value) => (
        <span className="font-semibold text-blue-600">
          {value}
        </span>
      ),
    },
    {
      key: "title",
      label: "Title",
      width: "20%",
    },
    {
      key: "agencyId",
      label: "Agency",
      width: "15%",
      render: (value) =>
        value?.agencyName || "-",
    },
    {
      key: "propertyType",
      label: "Type",
      width: "12%",
    },
    {
      key: "city",
      label: "City",
      width: "12%",
      render: (value) => (
        <div className="flex items-center gap-2">
          <FiMapPin
            size={16}
            className="text-gray-400"
          />
          {value}
        </div>
      ),
    },
    {
      key: "price",
      label: "Price",
      width: "12%",
      render: (value) => (
        <div className="flex items-center gap-2 font-semibold text-green-600">
          <FiDollarSign size={16} />
          ₹{value}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "12%",
      render: (value) => (
        <StatusBadge status={value} />
      ),
    },
    {
      key: "listingType",
      label: "Type",
      width: "7%",
      render: (value) => (
        <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
          {value}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <FiHome
                size={36}
                className="text-purple-600"
              />
              Properties
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your property
              inventory
            </p>
          </div>

          <Button
            variant="primary"
            icon={FiPlus}
            onClick={() =>
              setShowModal(true)
            }
          >
            List Property
          </Button>
        </div>
      </div>

      {/* Property Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {
              propertyStats.sale
            }
          </div>
          <p className="text-gray-600 text-sm mt-2">
            For Sale
          </p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600">
            {
              propertyStats.rent
            }
          </div>
          <p className="text-gray-600 text-sm mt-2">
            For Rent
          </p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-600">
            {
              propertyStats.available
            }
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Available
          </p>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <SearchBar
          value={searchValue}
          onChange={(e) =>
            setSearchValue(
              e.target.value
            )
          }
          onClear={() =>
            setSearchValue("")
          }
          placeholder="Search properties by title, code, city, or locality..."
        />

        <div className="flex gap-2 flex-wrap">
          {["All", "Sale", "Rent"].map(
            (type) => (
              <button
                key={type}
                onClick={() =>
                  setFilterType(type)
                }
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type}
              </button>
            )
          )}
        </div>
      </div>

      {/* Properties Table */}
      <Card>
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : filteredProperties.length ===
            0 ? (
          <EmptyState
            icon={FiHome}
            title={
              searchValue
                ? "No properties found"
                : "No properties yet"
            }
            description={
              searchValue
                ? "Try searching with different keywords"
                : "Start by listing your first property"
            }
            action={
              !searchValue ? (
                <Button
                  variant="primary"
                  onClick={() =>
                    setShowModal(
                      true
                    )
                  }
                  icon={FiPlus}
                >
                  List Property
                </Button>
              ) : null
            }
          />
        ) : (
          <Table
            columns={tableColumns}
            data={
              filteredProperties
            }
            emptyState={
              <EmptyState
                title="No data"
              />
            }
          />
        )}
      </Card>

      {/* Add Property Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title="List New Property"
        size="xl"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
            >
              List Property
            </Button>
          </>
        }
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Agency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agency
              </label>
              <select
                name="agencyId"
                value={
                  formData.agencyId
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">
                  Select Agency
                </option>

                {agencies.map(
                  (agency) => (
                    <option
                      key={
                        agency._id
                      }
                      value={
                        agency._id
                      }
                    >
                      {
                        agency.agencyName
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., 2BHK Apartment"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="e.g., Mumbai"
                value={
                  formData.city
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Locality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Locality
              </label>
              <input
                type="text"
                name="locality"
                placeholder="e.g., Thane"
                value={
                  formData.locality
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                placeholder="0"
                value={
                  formData.price
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                name="propertyType"
                value={
                  formData.propertyType
                }
                onChange={
                  handleChange
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>
                  Apartment
                </option>
                <option>Villa</option>
                <option>
                  Independent House
                </option>
                <option>Plot</option>
                <option>Office</option>
                <option>Shop</option>
                <option>
                  Warehouse
                </option>
                <option>
                  Co-Living
                </option>
              </select>
            </div>

            {/* Listing Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listing Type
              </label>
              <select
                name="listingType"
                value={
                  formData.listingType
                }
                onChange={
                  handleChange
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Sale</option>
                <option>Rent</option>
                <option>
                  Co-Living
                </option>
              </select>
            </div>

            {/* Occupancy Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occupancy Type
              </label>
              <select
                name="occupancyType"
                value={
                  formData.occupancyType
                }
                onChange={
                  handleChange
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">
                  Select Occupancy
                </option>
                <option value="Single Occupancy">
                  Single Occupancy
                </option>
                <option value="Double Occupancy">
                  Double Occupancy
                </option>
                <option value="Triple Occupancy">
                  Triple Occupancy
                </option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Detailed description of the property..."
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default PropertyManagement;