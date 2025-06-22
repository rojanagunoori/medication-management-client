// client/src/components/MedicationForm.js
import { useState } from 'react';
import './MedicationForm.css'; 

export default function MedicationForm({ onAdd }) {
  const [formData, setFormData] = useState({ name: '', dosage: '', frequency: '',date: '',
    time: '', });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', dosage: '', frequency: '' });
  };

  return (
    <form className="medication-form" onSubmit={handleSubmit}>
    <h2>Add Medication</h2>
    <input
      name="name"
      placeholder="Medication Name"
      value={formData.name}
      onChange={handleChange}
      required
    />
    <input
      name="dosage"
      placeholder="Dosage (e.g., 10mg)"
      value={formData.dosage}
      onChange={handleChange}
      required
    />
    <input
      name="frequency"
      placeholder="Frequency (e.g., Once daily)"
      value={formData.frequency}
      onChange={handleChange}
      required
    />
    <input
  type="date"
  name="date"
  placeholder="Date"
  onChange={handleChange}
/>
<input
  type="time"
  name="time"
  placeholder="Time"
  onChange={handleChange}
/>

    <button type="submit">Add Medication</button>
  </form>
  );
}
