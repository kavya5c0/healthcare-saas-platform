import React, { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, Grid, List } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';
import { usePatientStore } from '../stores/patientStore';
import { type Patient, patientFormSchema } from '../lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const PatientDetailsPage: React.FC = () => {
  const { patients, viewMode, setViewMode, setPatients, isLoading, error, addPatient, updatePatient, removePatient } = usePatientStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  // Form hooks for add patient
  const {
    register: registerAdd,
    handleSubmit: handleAddSubmit,
    formState: { errors: addErrors },
    reset: resetAdd
  } = useForm({
    resolver: zodResolver(patientFormSchema),
  });

  // Form hooks for edit patient
  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
    reset: resetEdit,
    setValue: setEditValue
  } = useForm({
    resolver: zodResolver(patientFormSchema),
  });

  // Handler functions
  const handleAddPatient = (data: any) => {
    const newPatient: Patient = {
      ...data,
      id: Date.now().toString(),
      lastVisit: new Date().toISOString().split('T')[0],
    };
    addPatient(newPatient);
    setShowAddModal(false);
    resetAdd();
  };

  const handleEditPatient = (data: any) => {
    if (selectedPatient) {
      updatePatient(selectedPatient.id, data);
      setShowEditModal(false);
      setSelectedPatient(null);
      resetEdit();
    }
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowViewModal(true);
  };

  const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setEditValue('name', patient.name);
    setEditValue('email', patient.email);
    setEditValue('phone', patient.phone);
    setEditValue('dateOfBirth', patient.dateOfBirth);
    setEditValue('condition', patient.condition);
    setEditValue('status', patient.status);
    setShowEditModal(true);
  };

  const handleDeletePatient = (patient: Patient) => {
    setPatientToDelete(patient);
    setShowDeleteModal(true);
  };

  const confirmDeletePatient = () => {
    if (patientToDelete) {
      removePatient(patientToDelete.id);
      setShowDeleteModal(false);
      setPatientToDelete(null);
    }
  };

  useEffect(() => {
    const mockPatients: Patient[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 234-567-8900',
        dateOfBirth: '1980-01-15',
        condition: 'Hypertension',
        lastVisit: '2024-03-20',
        status: 'active',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+1 234-567-8901',
        dateOfBirth: '1985-05-22',
        condition: 'Diabetes Type 2',
        lastVisit: '2024-03-18',
        status: 'active',
      },
      {
        id: '3',
        name: 'Robert Johnson',
        email: 'robert.johnson@email.com',
        phone: '+1 234-567-8902',
        dateOfBirth: '1975-11-30',
        condition: 'Arthritis',
        lastVisit: '2024-03-15',
        status: 'inactive',
      },
    ];
    setPatients(mockPatients);
  }, [setPatients]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const PatientCard: React.FC<{ patient: Patient }> = ({ patient }) => (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">Email:</span>
          <span className="ml-2">{patient.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">Phone:</span>
          <span className="ml-2">{patient.phone}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">Condition:</span>
          <span className="ml-2">{patient.condition}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">Last Visit:</span>
          <span className="ml-2">{patient.lastVisit}</span>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button 
          onClick={() => handleViewPatient(patient)}
          className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center justify-center"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleEditClick(patient)}
          className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center justify-center"
          title="Edit Patient"
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const PatientListItem: React.FC<{ patient: Patient }> = ({ patient }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
        <div className="text-sm text-gray-500">{patient.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{patient.phone}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{patient.condition}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{patient.lastVisit}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button 
          onClick={() => handleViewPatient(patient)}
          className="text-indigo-600 hover:text-indigo-900 mr-3 p-2 hover:bg-indigo-50 rounded-full transition-colors"
          title="View Patient"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleEditClick(patient)}
          className="text-gray-600 hover:text-gray-900 mr-3 p-2 hover:bg-gray-50 rounded-full transition-colors"
          title="Edit Patient"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleDeletePatient(patient)}
          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
          title="Delete Patient"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <List className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Add Patient
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading patients...</div>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Condition
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <PatientListItem key={patient.id} patient={patient} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">No patients found matching your search.</div>
            </div>
          )}
        </>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Patient</h3>
              <form onSubmit={handleAddSubmit(handleAddPatient)}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name *</label>
                    <input {...registerAdd('name')} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                    {addErrors.name?.message && <p className="text-red-500 text-xs mt-1">{addErrors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email *</label>
                    <input {...registerAdd('email')} type="email" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                    {addErrors.email?.message && <p className="text-red-500 text-xs mt-1">{addErrors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone *</label>
                    <input {...registerAdd('phone')} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                    {addErrors.phone?.message && <p className="text-red-500 text-xs mt-1">{addErrors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                    <input {...registerAdd('dateOfBirth')} type="date" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                    {addErrors.dateOfBirth?.message && <p className="text-red-500 text-xs mt-1">{addErrors.dateOfBirth.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Condition *</label>
                    <input {...registerAdd('condition')} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                    {addErrors.condition?.message && <p className="text-red-500 text-xs mt-1">{addErrors.condition.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status *</label>
                    <select {...registerAdd('status')} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                    {addErrors.status?.message && <p className="text-red-500 text-xs mt-1">{addErrors.status.message}</p>}
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Add Patient
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Patient Modal */}
      {showViewModal && selectedPatient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Details</h3>
              <div className="space-y-3">
                <div>
                  <strong>Name:</strong> {selectedPatient.name}
                </div>
                <div>
                  <strong>Email:</strong> {selectedPatient.email}
                </div>
                <div>
                  <strong>Phone:</strong> {selectedPatient.phone}
                </div>
                <div>
                  <strong>Date of Birth:</strong> {selectedPatient.dateOfBirth}
                </div>
                <div>
                  <strong>Condition:</strong> {selectedPatient.condition}
                </div>
                <div>
                  <strong>Last Visit:</strong> {selectedPatient.lastVisit}
                </div>
                <div>
                  <strong>Status:</strong> <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedPatient.status)}`}>{selectedPatient.status}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => setShowViewModal(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {showEditModal && selectedPatient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Patient</h3>
              <form onSubmit={handleEditSubmit(handleEditPatient)}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name *</label>
                    <input {...registerEdit('name')} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                    {editErrors.name?.message && <p className="text-red-500 text-xs mt-1">{editErrors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email *</label>
                    <input {...registerEdit('email')} type="email" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                    {editErrors.email?.message && <p className="text-red-500 text-xs mt-1">{editErrors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone *</label>
                    <input {...registerEdit('phone')} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                    {editErrors.phone?.message && <p className="text-red-500 text-xs mt-1">{editErrors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                    <input {...registerEdit('dateOfBirth')} type="date" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                    {editErrors.dateOfBirth?.message && <p className="text-red-500 text-xs mt-1">{editErrors.dateOfBirth.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Condition *</label>
                    <input {...registerEdit('condition')} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
                    {editErrors.condition?.message && <p className="text-red-500 text-xs mt-1">{editErrors.condition.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status *</label>
                    <select {...registerEdit('status')} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                    {editErrors.status?.message && <p className="text-red-500 text-xs mt-1">{editErrors.status.message}</p>}
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Update Patient
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeletePatient}
        title="Delete Patient"
        message={`Are you sure you want to delete ${patientToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete Patient"
        cancelText="Cancel"
        type="warning"
      />
    </div>
  );
};

export default PatientDetailsPage;
