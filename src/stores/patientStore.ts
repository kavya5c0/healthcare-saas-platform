import { create } from 'zustand';
import { type Patient } from '../lib/validations';

interface PatientState {
  patients: Patient[];
  viewMode: 'grid' | 'list';
  isLoading: boolean;
  error: string | null;
  setPatients: (patients: Patient[]) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  removePatient: (id: string) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  viewMode: 'grid',
  isLoading: false,
  error: null,
  setPatients: (patients) => set({ patients }),
  setViewMode: (viewMode) => set({ viewMode }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  addPatient: (patient) => set((state) => ({ patients: [...state.patients, patient] })),
  updatePatient: (id, updatedPatient) =>
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === id ? { ...patient, ...updatedPatient } : patient
      ),
    })),
  removePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((patient) => patient.id !== id),
    })),
}));
