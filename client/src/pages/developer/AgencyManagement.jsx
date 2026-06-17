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

import agencyService from "../../services/agencyService";

import {
  agencyStart,
  agencySuccess,
  agencyFailure,
} from "../../redux/agencySlice";

import {
  FiPlus,
  FiMapPin,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

const AgencyManagement = () => {
  const dispatch = useDispatch();

  const { agencies, loading } = useSelector(
    (state) => state.agency
  );

  const [showModal, setShowModal] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  const [formData, setFormData] =
    useState({
      agencyCode: "",
      agencyName: "",
      ownerName: "",
      mobileNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
    });

  const loadAgencies = useCallback(
    async () => {
      try {
        dispatch(agencyStart());

        const data =
          await agencyService.getAgencies();

        dispatch(
          agencySuccess(
            data.agencies
          )
        );
      } catch (error) {
        dispatch(
          agencyFailure(
            error.message
          )
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    loadAgencies();
  }, [loadAgencies]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      agencyCode: "",
      agencyName: "",
      ownerName: "",
      mobileNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await agencyService.createAgency(
        formData
      );

      alert(
        "Agency Created Successfully"
      );

      setShowModal(false);
      resetForm();
      loadAgencies();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          error.message
      );
    }
  };

  const filteredAgencies = (
    agencies || []
  ).filter((agency) =>
    agency.agencyName
      .toLowerCase()
      .includes(
        searchValue.toLowerCase()
      ) ||
    agency.agencyCode
      .toLowerCase()
      .includes(
        searchValue.toLowerCase()
      ) ||
    agency.ownerName
      .toLowerCase()
      .includes(
        searchValue.toLowerCase()
      )
  );

  const tableColumns = [
    {
      key: "agencyCode",
      label: "Agency Code",
      width: "15%",
      render: (value) => (
        <span className="font-semibold text-blue-600">
          {value}
        </span>
      ),
    },
    {
      key: "agencyName",
      label: "Agency Name",
      width: "25%",
    },
    {
      key: "ownerName",
      label: "Owner Name",
      width: "20%",
    },
    {
      key: "city",
      label: "City",
      width: "15%",
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
      key: "state",
      label: "State",
      width: "15%",
    },
    {
      key: "_id",
      label: "Details",
      width: "10%",
      render: () => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition">
            View
          </button>
        </div>
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
              <FaBuilding
                size={36}
                className="text-blue-600"
              />
              Agencies
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and oversee all
              agencies
            </p>
          </div>

          <Button
            variant="primary"
            icon={FiPlus}
            onClick={() =>
              setShowModal(true)
            }
          >
            Create Agency
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
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
          placeholder="Search agencies by name, code, or owner..."
        />
      </div>

      {/* Agencies Table */}
      <Card>
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : filteredAgencies.length ===
            0 ? (
          <EmptyState
            icon={FaBuilding}
            title={
              searchValue
                ? "No agencies found"
                : "No agencies yet"
            }
            description={
              searchValue
                ? "Try searching with different keywords"
                : "Create your first agency to get started"
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
                  Create Agency
                </Button>
              ) : null
            }
          />
        ) : (
          <Table
            columns={tableColumns}
            data={filteredAgencies}
            emptyState={
              <EmptyState
                title="No data"
              />
            }
          />
        )}
      </Card>

      {/* Create Agency Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title="Create New Agency"
        size="lg"
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
              Create Agency
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
            {/* Agency Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agency Code
              </label>
              <input
                type="text"
                name="agencyCode"
                placeholder="e.g., DNA001"
                value={
                  formData.agencyCode
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Agency Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agency Name
              </label>
              <input
                type="text"
                name="agencyName"
                placeholder="e.g., Dream Homes"
                value={
                  formData.agencyName
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Owner Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                placeholder="Full name"
                value={
                  formData.ownerName
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                placeholder="10-digit mobile"
                value={
                  formData.mobileNumber
                }
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
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
                value={formData.city}
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                placeholder="e.g., Maharashtra"
                value={formData.state}
                onChange={
                  handleChange
                }
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                placeholder="Full address"
                value={
                  formData.address
                }
                onChange={
                  handleChange
                }
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default AgencyManagement;