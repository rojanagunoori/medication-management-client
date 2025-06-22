import React, { useState, useRef } from 'react';
import './TodayMedicationCard.css';
import { uploadProofPhoto } from '../api/api';


export default function TodayMedicationCard({ medications = [], onMarkTaken,token }) {
  const [taken, setTaken] = useState(false);
  const [photo, setPhoto] = useState({});
  const fileInputRef = useRef(null);

  const handleMarkAsTaken = async(id) => {
    try {
      await onMarkTaken(id, token);  // Backend call
      if (onMarkTaken) onMarkTaken(id);  // Optionally trigger parent update
    } catch (err) {
      console.error('Error marking medication as taken:', err);
    }
   };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange  = (medId) => async (event) => {
    const file = event.target.files[0];
    if (file) {
    //  setPhoto(URL.createObjectURL(file));
    setPhoto((prev) => ({
      ...prev,
      [medId]: URL.createObjectURL(file)
    }));
    
    }
    try {
      const response = await uploadProofPhoto(medId, file, token);
      
      // optionally mark as taken:
      await onMarkTaken(medId, token);
    } catch (err) {
      console.error('Upload error:', err);
    }
  };
 
  const today = new Date().toISOString().split('T')[0]; // e.g., '2025-06-20'

const todayMeds = medications.filter(
  (med) => med.date === today
);

  
  

//const todayMeds = medications.filter((med) => !med.taken); 
//const allTaken = todayMeds.every((med) => takenMeds[med.id]);
const allTaken = todayMeds.length > 0 && todayMeds.every(m => m.taken);

const formatTime12Hour = (time24) => {
  const [hour, minute] = time24.split(':');
  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(minute, 10));

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};



  return (
    <div className="today-card">
      <div className="card">
        
        <div className="card-header">
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon calendar"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
            Today's Medication
          </h3>
        </div>

        <div className="card-body">
          {todayMeds.length !== 0 || !taken ? (
            <>
             {!allTaken && todayMeds.map((med) => (
              <div key={med.id}>
              <div className="medication-block">
                <div className="left">
                  <div className="circle1">{med.id}</div>
                  <div className="left-fn">
                  <h4>{med.name}</h4>
                  <p>{med.dosage} - {med.frequency}</p>
                  </div>
                </div>
                <div className="right green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon small"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {formatTime12Hour(med.time)}
                </div>
              </div>
              <div className="photo-upload">
                <div className="centered">
                  {!photo[med.id] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon large"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  ) : (
                    <img src={photo[med.id]} alt="Proof" className="photo-preview" />
                  )}
                  <h3>{photo[med.id] ? 'Photo Added' : 'Add Proof Photo (Optional)'}</h3>
                  <p>Take a photo of your medication or pill organizer as confirmation</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange(med.id)}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <button className="upload-button" onClick={handlePhotoClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon small"
                    >
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                    {photo[med.id] ? 'Change Photo' : 'Take Photo'}
                  </button>
                </div>
              </div>

              <button className="taken-button" onClick={()=>handleMarkAsTaken(med.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon small"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Mark as Taken
              </button>
              </div>))}

              
            </>
          ) : (
            <div className="success-message">
              <div className="success-box">
                <div className="check-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon white"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3>Medication Completed!</h3>
                <p>Great job! You've taken your medication for June 20, 2025.</p>
              </div>

              <div className="medication-block completed">
                <div className="left">
                  <div className="circle green">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-green">Daily Medication Set</h4>
                    <p className="text-green-light">Complete set of daily tablets</p>
                  </div>
                </div>
                <div className="right green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon small"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  8:00 AM
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
