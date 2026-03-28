import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Initialize Highcharts
Highcharts.setOptions({
  colors: ['#3b82f6', '#10b981', '#ef4444', '#eab308', '#8b5cf6', '#06b6d4']
});

const AnalyticsPage: React.FC = () => {
  // Patient Growth Chart Configuration
  const patientGrowthOptions = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      height: 250
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          color: '#6b7280'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Patients',
        style: {
          color: '#6b7280'
        }
      },
      labels: {
        style: {
          color: '#6b7280'
        }
      }
    },
    plotOptions: {
      column: {
        borderRadius: 4,
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'New Patients',
      data: [120, 150, 170, 200, 180, 190],
      color: '#3b82f6'
    }],
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    }
  };

  // Revenue Overview Chart Configuration
  const revenueOptions = {
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      height: 250
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          color: '#6b7280'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Revenue ($)',
        style: {
          color: '#6b7280'
        }
      },
      labels: {
        style: {
          color: '#6b7280'
        }
      }
    },
    plotOptions: {
      line: {
        marker: {
          enabled: true,
          radius: 4
        },
        lineWidth: 2
      }
    },
    series: [{
      name: 'Revenue',
      data: [35000, 38000, 40000, 42000, 44000, 45678],
      color: '#10b981'
    }],
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    }
  };

  // Appointment Statistics Chart Configuration
  const appointmentOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 200
    },
    title: {
      text: null
    },
    plotOptions: {
      pie: {
        innerSize: '40%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Appointments',
      data: [
        { name: 'Completed', y: 234, color: '#10b981' },
        { name: 'Scheduled', y: 156, color: '#3b82f6' },
        { name: 'Cancelled', y: 23, color: '#ef4444' },
        { name: 'No-show', y: 12, color: '#eab308' }
      ]
    }],
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemStyle: {
        color: '#6b7280'
      }
    },
    credits: {
      enabled: false
    }
  };
  return (
    <div>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Growth</h2>
              <HighchartsReact
                highcharts={Highcharts}
                options={patientGrowthOptions}
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">+12%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Overview</h2>
              <HighchartsReact
                highcharts={Highcharts}
                options={revenueOptions}
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-2xl font-bold text-green-600">$45,678</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Previous Month</p>
                  <p className="text-2xl font-bold text-gray-900">$42,345</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Appointment Statistics</h2>
              <HighchartsReact
                highcharts={Highcharts}
                options={appointmentOptions}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Department Performance</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Cardiology</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Neurology</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Orthopedics</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Pediatrics</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      2024-03-28
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      New Patient Registration
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      General
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      2024-03-28
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Lab Report Generated
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Laboratory
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Processing
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      2024-03-27
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Insurance Claim Filed
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Billing
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
