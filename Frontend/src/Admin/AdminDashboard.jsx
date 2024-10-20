import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  // Fetch all pickup requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching pickup requests", error);
      }
    };
    fetchRequests();
  }, []);

  // Function to change the status of a request
  const handleChangeStatus = async (id, newStatus) => {
    try {
        // console.log(id);
        // console.log(newStatus);
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/admin/update-status/${id}`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // After successful update, refetch the data to update UI
      const updatedRequests = requests.map(request =>
        request._id === id ? { ...request, status: newStatus } : request
      );
      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  // Sort requests by status: pending at top, accepted in middle, rejected at bottom
  const sortedRequests = requests.sort((a, b) => {
    const statusOrder = { pending: 1, accepted: 2, rejected: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  // Group requests by status
  const pendingRequests = sortedRequests.filter(request => request.status === 'pending');
  const acceptedRequests = sortedRequests.filter(request => request.status === 'accepted');
  const rejectedRequests = sortedRequests.filter(request => request.status === 'rejected');

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/admin");
  };

  return (
    <div className="flex flex-col items-center py-4 bg-gray-900 min-h-screen text-white">
      <div className="w-full flex justify-between items-center mb-6 px-5">
        <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Pending Requests Section */}
      <div className="w-full max-w-9xl px-5 mb-8">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">Pending Requests</h2>
        {pendingRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pendingRequests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="flex justify-between">
                  <div className="text-gray-300">
                    <h3 className="text-xl font-semibold text-blue-200">{request.itemName}</h3>
                    <p className="text-sm text-blue-200">Weight: <span className="font-bold">{request.weight} kg</span></p>
                    <p className="text-sm text-blue-200">Location: <span className="font-bold">{request.location}</span></p>
                    <p className="text-sm text-blue-200">Pickup Date: <span className="font-bold">{new Date(request.pickupDate).toLocaleDateString()}</span></p>
                    <p className="text-sm font-bold text-blue-200">Phone: {request.PhoneNumber}</p>
                    <p className="text-sm font-bold text-blue-200">Request By: {request.owner.fullName}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <img
                      src={request.photo}
                      alt={request.itemName}
                      className="w-24 h-24 object-cover rounded-lg mb-2 border-2 border-gray-600"
                    />
                    <button
                      onClick={() => window.open(request.photo, '_blank')}
                      className="text-xs text-blue-400 underline hover:text-blue-600 transition-colors"
                    >
                      View Image
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="py-1 px-2 rounded-full font-bold uppercase border-2 border-yellow-500">
                  <span className=" text-yellow-500">Pending</span>
                  </div>
                  <select
                    value={request.status}
                    onChange={(e) => handleChangeStatus(request._id, e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-400">No pending requests.</p>}
      </div>

      <hr className="border-gray-700 w-full max-w-9xl my-8" />

      {/* Accepted Requests Section */}
      <div className="w-full max-w-9xl px-5 mb-8">
        <h2 className="text-xl font-bold text-green-400 mb-4">Accepted Requests</h2>
        {acceptedRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {acceptedRequests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="flex justify-between">
                  <div className="text-gray-300">
                    <h3 className="text-xl font-semibold text-blue-200">{request.itemName}</h3>
                    <p className="text-sm text-blue-200">Weight: <span className="font-bold">{request.weight} kg</span></p>
                    <p className="text-sm text-blue-200">Location: <span className="font-bold">{request.location}</span></p>
                    <p className="text-sm text-blue-200">Pickup Date: <span className="font-bold">{new Date(request.pickupDate).toLocaleDateString()}</span></p>
                    <p className="text-sm font-bold text-blue-200">Phone: {request.PhoneNumber}</p>
                    <p className="text-sm font-bold text-blue-200">Request By: {request.owner.fullName}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <img
                      src={request.photo}
                      alt={request.itemName}
                      className="w-24 h-24 object-cover rounded-lg mb-2 border-2 border-gray-600"
                    />
                    <button
                      onClick={() => window.open(request.photo, '_blank')}
                      className="text-xs text-blue-400 underline hover:text-blue-600 transition-colors"
                    >
                      View Image
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="py-1 px-2 rounded-full font-bold uppercase border-2 border-green-500">
                    <span className=" text-green-500">Accepted</span>
                  </div>
                  <select
                    value={request.status}
                    onChange={(e) => handleChangeStatus(request._id, e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-400">No accepted requests.</p>}
      </div>

      <hr className="border-gray-700 w-full max-w-9xl my-8" />

      {/* Rejected Requests Section */}
      <div className="w-full max-w-9xl px-5">
        <h2 className="text-xl font-bold text-red-400 mb-4">Rejected Requests</h2>
        {rejectedRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rejectedRequests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="flex justify-between">
                  <div className="text-gray-300">
                    <h3 className="text-xl font-semibold text-blue-200">{request.itemName}</h3>
                    <p className="text-sm text-blue-200">Weight: <span className="font-bold">{request.weight} kg</span></p>
                    <p className="text-sm text-blue-200">Location: <span className="font-bold">{request.location}</span></p>
                    <p className="text-sm text-blue-200">Pickup Date: <span className="font-bold">{new Date(request.pickupDate).toLocaleDateString()}</span></p>
                    <p className="text-sm font-bold text-blue-200">Phone: {request.PhoneNumber}</p>
                    <p className="text-sm font-bold text-blue-200">Request By: {request.owner.fullName}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <img
                      src={request.photo}
                      alt={request.itemName}
                      className="w-24 h-24 object-cover rounded-lg mb-2 border-2 border-gray-600"
                    />
                    <button
                      onClick={() => window.open(request.photo, '_blank')}
                      className="text-xs text-blue-400 underline hover:text-blue-600 transition-colors"
                    >
                      View Image
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="py-1 px-2 rounded-full font-bold uppercase border-2 border-red-500">
                    <span className=" text-red-500">Rejected</span>
                  </div>
                  <select
                    value={request.status}
                    onChange={(e) => handleChangeStatus(request._id, e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-400">No rejected requests.</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
