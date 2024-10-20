import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../SignIn/AuthContext';
import avatar from './avatar.jpg';
import axios from 'axios';

const Profile = () => {
  const { authUser } = useAuthContext();
  const [requests, setRequests] = useState([]);

  // Fetch all pickup requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/waste/allRequest'); // Adjust the endpoint accordingly
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching pickup requests", error);
      }
    };
    fetchRequests();
  }, []);

  // Function to determine border color based on status
  const getStatusBorderColor = (status) => {
    if (status === 'pending') return 'yellow';
    if (status === 'rejected') return 'red';
    if (status === 'accepted') return 'green';
    return 'gray';
  };

  // Group requests by status
  const pendingRequests = requests.filter(request => request.status === 'pending');
  const acceptedRequests = requests.filter(request => request.status === 'accepted');
  const rejectedRequests = requests.filter(request => request.status === 'rejected');

  return (
    <div className="flex flex-col items-center py-4 bg-gray-900 min-h-screen text-white">
      {/* Profile Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 mb-6">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="h-24 w-24 rounded-full border-4 border-orange-500 flex items-center justify-center">
            <img
              src={avatar}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
        {/* Username */}
        <h2 className="text-xl text-center font-bold mb-2">{authUser.username}</h2>
        {/* User Details */}
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex justify-between">
            <span>Email:</span>
            <span className="font-medium">{authUser.email}</span>
          </li>
          <li className="flex justify-between">
            <span>Full Name:</span>
            <span className="font-medium">{authUser.fullName}</span>
          </li>
          <li className="flex justify-between">
            <span>Phone:</span>
            <span className="font-medium">{authUser.phoneNumber}</span>
          </li>
        </ul>
      </div>

      {/* Pickup Requests - Status Divisions */}
      <div className="w-full max-w-9xl px-5 space-y-10">

        {/* Pending Requests */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Pending Requests</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pendingRequests.length > 0 ? pendingRequests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between">
                  <div className="text-gray-300">
                    <h3 className="text-xl font-semibold">{request.itemName}</h3>
                    <p className="text-sm">Weight: {request.weight} kg</p>
                    <p className="text-sm">Location: {request.location}</p>
                    <p className="text-sm">
                      Pickup Date: {new Date(request.pickupDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">Phone: {request.PhoneNumber}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <img
                      src={request.photo}
                      alt={request.itemName}
                      className="w-24 h-24 object-cover rounded-lg mb-2"
                    />
                    <button
                      onClick={() => window.open(request.photo, '_blank')}
                      className="text-xs text-blue-400 underline"
                    >
                      View Image
                    </button>
                  </div>
                </div>
                <div
                  className={`mt-4 text-center py-1 px-2 rounded-full font-bold uppercase border-2 
                    border-yellow-400   text-${getStatusBorderColor(request.status)}-400`}
                >
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </div>
              </div>
            )) : <p className="text-gray-400">No pending requests</p>}
          </div>
        </div>

        {/* Accepted Requests */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-green-400">Accepted Requests</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {acceptedRequests.length > 0 ? acceptedRequests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between">
                  <div className="text-gray-300">
                    <h3 className="text-xl font-semibold">{request.itemName}</h3>
                    <p className="text-sm">Weight: {request.weight} kg</p>
                    <p className="text-sm">Location: {request.location}</p>
                    <p className="text-sm">
                      Pickup Date: {new Date(request.pickupDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">Phone: {request.PhoneNumber}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <img
                      src={request.photo}
                      alt={request.itemName}
                      className="w-24 h-24 object-cover rounded-lg mb-2"
                    />
                    <button
                      onClick={() => window.open(request.photo, '_blank')}
                      className="text-xs text-blue-400 underline"
                    >
                      View Image
                    </button>
                  </div>
                </div>
             <div
            className={`mt-4 text-center py-1 px-2 rounded-full font-bold uppercase border-2 
                border-green-400   text-${getStatusBorderColor(request.status)}-400`}
            >
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </div>

              </div>
            )) : <p className="text-gray-400">No accepted requests</p>}
          </div>
        </div>

        {/* Rejected Requests */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-red-400">Rejected Requests</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rejectedRequests.length > 0 ? rejectedRequests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between">
                  <div className="text-gray-300">
                    <h3 className="text-xl font-semibold">{request.itemName}</h3>
                    <p className="text-sm">Weight: {request.weight} kg</p>
                    <p className="text-sm">Location: {request.location}</p>
                    <p className="text-sm">
                      Pickup Date: {new Date(request.pickupDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">Phone: {request.PhoneNumber}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <img
                      src={request.photo}
                      alt={request.itemName}
                      className="w-24 h-24 object-cover rounded-lg mb-2"
                    />
                    <button
                      onClick={() => window.open(request.photo, '_blank')}
                      className="text-xs text-blue-400 underline"
                    >
                      View Image
                    </button>
                  </div>
                </div>
                <div
                  className={`mt-4 text-center py-1 px-2 rounded-full font-bold uppercase border-2
                      border-red-400   text-${getStatusBorderColor(request.status)}-400`}
                >
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </div>
              </div>
            )) : <p className="text-gray-400">No rejected requests</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
