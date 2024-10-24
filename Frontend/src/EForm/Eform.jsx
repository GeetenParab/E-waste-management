import React, { useState, useEffect } from 'react';
import useEform from '../Hooks/useEForm';



const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent">
    </div>
  </div>
);

const EForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    weight: '',
    location: '',
    pickupDate: '',
    PhoneNumber: '',
    photo: null
  });

  const [cost, setCost] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { loading, Eform } = useEform();

  // E-waste categories and their details
  const eWasteCategories = {
    'Refrigerator': {
      averageWeight: '45-85 kg',
      costPerKg: 15
    },
    'Television': {
      averageWeight: '15-30 kg',
      costPerKg: 20
    },
    'Smartphone': {
      averageWeight: '0.1-0.2 kg',
      costPerKg: 50
    },
    'Laptop': {
      averageWeight: '2-3.5 kg',
      costPerKg: 30
    },
    'Desktop Computer': {
      averageWeight: '8-15 kg',
      costPerKg: 25
    },
    'Printer': {
      averageWeight: '5-10 kg',
      costPerKg: 20
    },
    'Microwave': {
      averageWeight: '12-18 kg',
      costPerKg: 15
    },
    'Other': {
      averageWeight: 'Variable',
      costPerKg: 20
    }
  };

  const calculateCost = (weight, itemType) => {
    const category = eWasteCategories[itemType] || eWasteCategories['Other'];
    return weight * category.costPerKg;
  };

  useEffect(() => {
    if (formData.weight && formData.itemName) {
      const newCost = calculateCost(Number(formData.weight), formData.itemName);
      setCost(newCost);
    }
  }, [formData.weight, formData.itemName]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Eform(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-0 py-12 bg-gray-100">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">E-Waste Weight Guidelines</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(eWasteCategories).map(([item, details]) => (
                <div key={item} className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item}</span>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        Average Weight: {details.averageWeight}
                      </div>
                      <div className="text-sm text-gray-600">
                        Cost per kg: ₹{details.costPerKg}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form className="border-gray-400 p-8 rounded-lg shadow-xl w-full max-w-6xl bg-white" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">E-Waste Disposal</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Item Name
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="ml-2 inline-flex items-center text-gray-500 hover:text-gray-700"
              >
                ℹ️
              </button>
            </label>
            <select
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            >
              <option value="">Select Item Type</option>
              {Object.keys(eWasteCategories).map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter Weight"
              required
            />
            {formData.weight && formData.itemName && (
              <div className="mt-2 text-sm text-gray-600">
                Estimated Cost: ₹{cost.toFixed(2)}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter Location"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Pickup Date</label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              accept="image/*"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter Phone Number"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-orange-600 text-white py-1 rounded-lg hover:bg-orange-800 transition duration-300"
          disabled={loading}
        >
          {loading ? <LoadingSpinner/>: 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default EForm;