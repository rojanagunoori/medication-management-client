// client/src/pages/PatientDashboard.js
import { useEffect, useState } from 'react';
import { getAdherence,fetchMedications, addMedication, markAsTaken } from '../api/api';
import MedicationForm from '../components/MedicationForm';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import TodayMedicationCard from '../components/TodayMedicationCard';
import MedicationCalendarSection from '../components/MedicationCalendarSection';
import CaretakerDashboard from "./CaretakerDashboard"



export default function PatientDashboard({ token }) {
  const [medications, setMedications] = useState([]);
  const [viewMode, setViewMode] = useState('patient');
  const [stats, setStats] = useState({
    adherence: 0,
    streak: 0,
    missed: 0,
    taken: 0,
  });

  const loadMedications = async () => {
    const res = await fetchMedications(token);  // ✅ CORRECT function
    setMedications(res.data);
  };
  

  const toggleView = () => {
    setViewMode((prev) => (prev === 'patient' ? 'caretaker' : 'patient'));
  };

 // const medications = [
  //  { id: 1, name: 'Medicine A', dosage: '10mg', frequency: 'Once daily' },
    // Add more meds
 /// ];

  const handleMarkTaken = (id) => {
    console.log(`Marked ${id} as taken`);
  };

  const loadStats = async () => {
    try {
      const res = await getAdherence(token); // make sure this function exists
      setStats(res.data);
    } catch (e) {
      console.error('Failed to load adherence stats', e);
    }
  };

  useEffect(() => {
    if (token) {
      loadMedications();
      loadStats(); 
    }
  }, [token]);
  

  const handleAdd = async (med) => {
    await addMedication(med, token);
    loadMedications();
  };

  const handleTaken = async (id) => {
    let re=await markAsTaken(id, token);
 
    loadMedications();
  };

  return (
    <div>
      <Header viewMode={viewMode} toggleView={toggleView} />
      
      <Dashboard viewMode={viewMode} medications={medications} onMarkTaken={handleMarkTaken}  stats={stats} />
      <MedicationForm onAdd={handleAdd} />
      {viewMode === 'patient' ? <>
       
      <TodayMedicationCard  medications={medications} onMarkTaken={handleTaken} token={token}/>
       <MedicationCalendarSection token={token}/></>:
       <CaretakerDashboard token={token}/> }
    </div>
  );
}
