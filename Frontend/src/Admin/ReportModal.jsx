import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js for the chart component

const ReportModal = ({ reportData, onClose }) => {
  if (!reportData) return null;

  // Prepare data for Bar charts
  const dailyRequests = Object.keys(reportData.requestsPerTimeFrame.daily).map(date => ({
    date,
    count: reportData.requestsPerTimeFrame.daily[date],
  }));

  const monthlyRequests = Object.keys(reportData.requestsPerTimeFrame.monthly).map(month => ({
    month,
    count: reportData.requestsPerTimeFrame.monthly[month],
  }));

  const yearlyRequests = Object.keys(reportData.requestsPerTimeFrame.yearly).map(year => ({
    year,
    count: reportData.requestsPerTimeFrame.yearly[year],
  }));

  // Chart data for daily requests
  const dailyChartData = {
    labels: dailyRequests.map(req => req.date),
    datasets: [
      {
        label: 'Daily Requests',
        backgroundColor: '#facc15',
        borderColor: '#e5e7eb',
        data: dailyRequests.map(req => req.count),
      },
    ],
  };

  // Chart data for monthly requests
  const monthlyChartData = {
    labels: monthlyRequests.map(req => req.month),
    datasets: [
      {
        label: 'Monthly Requests',
        backgroundColor: '#4ade80',
        borderColor: '#e5e7eb',
        data: monthlyRequests.map(req => req.count),
      },
    ],
  };

  // Chart data for yearly requests
  const yearlyChartData = {
    labels: yearlyRequests.map(req => req.year),
    datasets: [
      {
        label: 'Yearly Requests',
        backgroundColor: '#60a5fa',
        borderColor: '#e5e7eb',
        data: yearlyRequests.map(req => req.count),
      },
    ],
  };

  // Calculate carbon footprint savings
  const totalAcceptedWeight = reportData.totalAcceptedWeight;
  const carbonFootprint = reportData.carbonFootprint;
  const equivalentDistance = (carbonFootprint / 0.454) || 0;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg max-w-4xl w-full text-gray-300 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">E-Waste Report</h2>
        
        {/* Report Details */}
        <div className="mb-4">
          <p className="text-lg">
            Collected a total of <span className="font-semibold text-yellow-400">{totalAcceptedWeight} kg</span> of e-waste.
          </p>
          <p className="text-lg">
            Correctly recycled, this saves up to <span className="font-semibold text-green-400">{carbonFootprint} kg</span> CO₂ equivalent.
          </p>
          <p className="text-lg">
            CO₂ savings equal a <span className="font-semibold text-blue-400">{equivalentDistance.toFixed(2)} km</span> drive.
          </p>
          <p className="text-lg">
            Most Requested Location: <span className="font-semibold text-purple-400">{reportData.mostRequestedLocation}</span>
          </p>
        </div>

        {/* Daily Requests Chart */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Daily Requests</h3>
          <Bar data={dailyChartData} />
        </div>

        {/* Monthly Requests Chart */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Monthly Requests</h3>
          <Bar data={monthlyChartData} />
        </div>

        {/* Yearly Requests Chart */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Yearly Requests</h3>
          <Bar data={yearlyChartData} />
        </div>

        {/* Note on Methodology */}
        <p className="text-sm text-gray-400 mt-4">
          <em>
            Note: The savings in terms of CO₂ emissions have been calculated using the Life Cycle Thinking method approach. The calculation of the environmental impacts, reported in equivalent CO₂ emissions, has been implemented considering the recycling processes of the different materials. The methodology used and the data are derived from various EU funded projects like InnoWEEE, PREMANUS, WEEE Forum, and Sofies, EPA greenhouse gases equivalents, and Ecoinvent dataset.
          </em>
        </p>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-red-400 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
