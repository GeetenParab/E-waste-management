import React, { useState } from 'react';
import useEform from '../Hooks/useEForm';

const EForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    weight: '',
    location: '',
    pickupDate: '',
    PhoneNumber: '',
    photo: null
  });

  const { loading, Eform } = useEform();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] }); // Handling file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await Eform(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-0 py-12 bg-gray-100">
      <form
        className="border-gray-400 p-8 rounded-lg shadow-xl w-full max-w-6xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">E-Waste Disposal</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Enter Item Name"
              required
            />
          </div>

          <div>
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
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EForm;
