import React from 'react';
import './OverviewTab.css';

const OverviewTab = ({ onAction, medications, adherence }) => {
  const today = new Date().toISOString().split('T')[0];

  const todayMeds = medications.filter(med => med.date === today);
  const nextMed = todayMeds[0] || null;

  const takenDays = medications.filter(med => med.taken === 1).length;
  const missedDays = medications.filter(med => med.taken === 0 && med.date < today).length;
  const remainingDays = medications.filter(med => med.date >= today && med.taken === 0).length;

  return (
    <div className="overview-tab" role="tabpanel" tabIndex="0">
      <div className="grid-container">
        {/* Today's Status */}
        <div className="card full-width">
          <div className="card-header">
            <h3 className="card-title">
              <svg className="icon blue" viewBox="0 0 24 24">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              Today's Status
            </h3>
          </div>
          <div className="card-body">
          {nextMed ? (
            <div className="status-row">
              <div>
                <h4 className="status-title">{nextMed.name}</h4>
                <p className="status-time">{nextMed.time}</p>
              </div>
              <div className={`status-pill ${nextMed.taken ? 'done' : 'pending'}`}>{nextMed.taken ? 'Taken' : 'Pending'}</div>
            </div>
             ) : (
              <p>No medication scheduled for today.</p>
            )}
          </div>
          
        </div>

        {/* Quick Actions */}
        <div className="card full-width">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="card-body space-y">
            <button className="action-button">
              <svg className="icon small" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              Send Reminder Email
            </button>
            <button className="action-button">
              <svg className="icon small" viewBox="0 0 24 24">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              Configure Notifications
            </button>
            <button className="action-button">
              <svg className="icon small" viewBox="0 0 24 24">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              View Full Calendar
            </button>
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="card full-width">
          <div className="card-header">
            <h3 className="card-title">Monthly Adherence Progress</h3>
          </div>
          <div className="card-body">
            <div className="progress-header">
              <span>Overall Progress</span>
              <span>{adherence ?? 0}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${adherence ?? 0}%` }}></div>
            </div>
            <div className="progress-stats">
              <div>
                <div className="stat green">{takenDays} days</div>
                <div className="stat-label">Taken</div>
              </div>
              <div>
                <div className="stat red">{missedDays} days</div>
                <div className="stat-label">Missed</div>
              </div>
              <div>
                <div className="stat blue">{remainingDays} days</div>
                <div className="stat-label">Remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
