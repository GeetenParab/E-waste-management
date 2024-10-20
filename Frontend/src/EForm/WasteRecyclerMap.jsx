import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for missing default marker icons in Leaflet
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Custom icon configuration for recycling centers
const centerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom icon for current location (green marker)
const myLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', 
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Helper function to calculate distance using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const MapWithSidebar = () => {
  const [myLocation, setMyLocation] = useState([19.0760, 72.8777]); // Default to Mumbai
  const [hoveredCenter, setHoveredCenter] = useState(null);

  // Fetch user's location using geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  // Recycling centers data, expanded with more dummy Thane, Navi Mumbai, and Mumbai data
  const centers = [
    {
      name: "Ecotech Recycling",
      position: [19.0625, 72.8297],
      capacity: 75,
      address: "301, 3rd Floor, Bldg. No. 11, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051",
      contact: "09004547542",
      time: "9:30 AM - 6:30 PM",
    },
    {
      name: "E Waste Recycling India",
      position: [19.1985, 72.8567],
      capacity: 70,
      address: "Madina Manzil, KedarMal Rd, Malad, Mumbai, Maharashtra 400097",
      contact: "09769077008",
      time: "8:00 AM - 8:00 PM",
    },
    {
      name: "Green Recycling Solutions",
      position: [18.9388, 72.8354],
      capacity: 100,
      address: "Bldg 5, Nariman Point, Mumbai, Maharashtra 400021",
      contact: "08291100983",
      time: "10:00 AM - 6:00 PM",
    },
    {
      name: "Urban Waste Solutions",
      position: [19.1551, 72.8492],
      capacity: 50,
      address: "25th Floor, Oberoi Mall, Goregaon East, Mumbai, Maharashtra 400063",
      contact: "09123234567",
      time: "9:00 AM - 5:00 PM",
    },
    {
      name: "Navi Green Recycling",
      position: [19.0330, 73.0297],
      capacity: 80,
      address: "Sector 17, Vashi, Navi Mumbai, Maharashtra 400703",
      contact: "09123456789",
      time: "8:00 AM - 6:00 PM",
    },
    {
      name: "Eco Navi Solutions",
      position: [19.1035, 73.0124],
      capacity: 65,
      address: "Plot No. 15, MIDC Industrial Area, Navi Mumbai, Maharashtra 410210",
      contact: "09876543211",
      time: "7:00 AM - 5:00 PM",
    },
    {
      name: "Zero Waste Navi Mumbai",
      position: [19.0484, 73.0189],
      capacity: 100,
      address: "CIDCO Complex, Navi Mumbai, Maharashtra 400614",
      contact: "09812345678",
      time: "10:00 AM - 5:00 PM",
    },
    // Additional places in Thane
    {
      name: "Thane Recycling Center",
      position: [19.2183, 72.9781],
      capacity: 80,
      address: "Thane West, Thane, Maharashtra 400601",
      contact: "09004547542",
      time: "8:00 AM - 6:00 PM",
    },
    {
      name: "Green Thane Solutions",
      position: [19.2094, 72.9618],
      capacity: 90,
      address: "Eastern Express Highway, Thane West, Maharashtra 400604",
      contact: "09998887766",
      time: "9:00 AM - 5:00 PM",
    },
    {
      name: "Recycle Thane Waste",
      position: [19.1726, 72.9580],
      capacity: 75,
      address: "Ghodbunder Road, Thane West, Maharashtra 400615",
      contact: "09876543211",
      time: "7:00 AM - 5:00 PM",
    },
    {
      name: "Kalyan Recycling Hub",
      position: [19.2437, 73.1350],
      capacity: 85,
      address: "Shahad, Kalyan, Maharashtra 421301",
      contact: "08123456789",
      time: "10:00 AM - 6:00 PM",
    },
    {
      name: "Ulhasnagar Waste Solutions",
      position: [19.2162, 73.1582],
      capacity: 60,
      address: "Camp No 4, Ulhasnagar, Maharashtra 421002",
      contact: "09123456789",
      time: "8:00 AM - 5:00 PM",
    },
    {
      name: "Vikroli E-Waste Center",
      position: [19.1126, 72.9309],
      capacity: 100,
      address: "Vikhroli East, Mumbai, Maharashtra 400083",
      contact: "08234567890",
      time: "9:00 AM - 6:00 PM",
    },
    {
      name: "Waste Management Solutions",
      position: [19.1203, 72.8910],
      capacity: 90,
      address: "Andheri East, Mumbai, Maharashtra 400069",
      contact: "09345678901",
      time: "7:00 AM - 7:00 PM",
    },
  ];

  // Hover effect for recycling centers
  const handleMouseEnter = (center) => {
    setHoveredCenter(center);
  };

  const handleMouseLeave = () => {
    setHoveredCenter(null);
  };

  return (
    <div className="flex">
      {/* Sidebar section */}
      <div className="w-1/3 h-screen overflow-y-auto p-4 bg-gray-50">
        {centers.map((center, index) => (
          <div
            key={index}
            className="mb-6 p-4 shadow-md bg-white rounded-lg"
            onMouseEnter={() => handleMouseEnter(center)}
            onMouseLeave={handleMouseLeave}
          >
            <h2 className="text-xl font-bold mb-2">{center.name}</h2>
            <p><strong>Capacity:</strong> {center.capacity}</p>
            <p><strong>Address:</strong> {center.address}</p>
            <p><strong>Contact:</strong> {center.contact}</p>
            <p><strong>Time:</strong> {center.time}</p>
            <p>
              <strong>Distance:</strong>{' '}
              {calculateDistance(myLocation[0], myLocation[1], center.position[0], center.position[1]).toFixed(2)} KM
            </p>
            <div className="mt-3 flex">
              <button className="bg-orange-500 text-white py-1 px-3 rounded mr-2">Get Directions</button>
            </div>
          </div>
        ))}
      </div>

      {/* Map section */}
      <div className="w-2/3 h-screen">
        <MapContainer center={myLocation} zoom={12} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Marker for user's current location with custom green icon */}
          <Marker position={myLocation} icon={myLocationIcon}>
            <Popup>Your current location</Popup>
          </Marker>

          {/* Markers for recycling centers */}
          {centers.map((center, index) => (
            <Marker key={index} position={center.position} icon={centerIcon}>
              <Popup>
                <div>
                  <strong>{center.name}</strong><br />
                  Capacity: {center.capacity}<br />
                  Address: {center.address}<br />
                  Contact: {center.contact}<br />
                  Time: {center.time}<br />
                  Distance: {calculateDistance(myLocation[0], myLocation[1], center.position[0], center.position[1]).toFixed(2)} KM
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapWithSidebar;
