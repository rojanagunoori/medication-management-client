import React from 'react';
import './Dashboard.css';

export default function Dashboard({ viewMode, medications, onMarkTaken, stats = {}  }) {
  const isPatient = viewMode === 'patient';

  return (
    <div className="dashboard">
      <div className={`dashboard-header ${isPatient ? 'patient' : 'caretaker'}`}>
        <div className="dashboard-header-top">
          <div className="dashboard-icon-box">
            {isPatient ? (
              <svg className="dashboard-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            ) : (
              <svg className="dashboard-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            )}
          </div>
          <div>
            <h2 className="dashboard-title">
              {isPatient ? 'Good Morning!' : 'Caretaker Dashboard'}
            </h2>
            <p className="dashboard-subtitle">
              {isPatient
                ? 'Ready to stay on track with your medication?'
                : "Monitoring Eleanor Thompson's medication adherence"}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`dashboard-stats ${isPatient ? 'patient-grid' : 'caretaker-grid'}`}>
          {isPatient ? (
            <>
              <div className="stat-card">
                <div className="stat-value">{stats.streak || 0}</div>
                <div className="stat-label">Day Streak</div>
              </div>
              <div className="stat-card">
                <div className="stat-value"> {medications.some(med => med.takenToday) ? '✓' : '○'}</div>
                <div className="stat-label">Today's Status</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.adherence || 0}%</div>
                <div className="stat-label">Monthly Rate</div>
              </div>
            </>
          ) : (
            <>
              <div className="stat-card">
                <div className="stat-value">{stats.adherence || 0}%</div>
                <div className="stat-label">Adherence Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.streak || 0}</div>
                <div className="stat-label">Current Streak</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.missed || 0}</div>
                <div className="stat-label">Missed This Month</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.taken || 0}</div>
                <div className="stat-label">Taken This Week</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Medications 
      <div className="medication-list">
        <h2>Medication List</h2>
        <ul>
          {medications.map((med) => (
            <li key={med.id}>
              {med.name} - {med.dosage} - {med.frequency}
              <button onClick={() => onMarkTaken(med.id)}>Mark Taken</button>
            </li>
          ))}
        </ul>
      </div>*/}
    </div>
  );
}
