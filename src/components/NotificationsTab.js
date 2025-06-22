import React, { useState ,useEffect} from 'react'
import './NotificationsTab.css'
import { getAdherence, fetchMedications } from '../api/api'; // adjust path


const NotificationsTab = ({token}) => {
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [missedAlertEnabled, setMissedAlertEnabled] = useState(true);
    const [adherence, setAdherence] = useState(0);
    const [streak, setStreak] = useState(0);

    const toggleEmail = () => {
        setEmailEnabled((prev) => !prev);
      };
    

     

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: adherenceData } = await getAdherence(token);
            const { data: meds } = await fetchMedications(token);
    
            setAdherence(adherenceData.adherence);
    
            // Optional: calculate streak (simple version)
            const sorted = [...meds].sort((a, b) => new Date(b.date) - new Date(a.date));
            let count = 0;
            for (let m of sorted) {
              if (m.taken) count++;
              else break;
            }
            setStreak(count);
          } catch (err) {
            console.error('Error loading adherence info', err);
          }
        };
        fetchData();
      }, [token]);
    

  return (
    <div className="tab-panel">
      <div className="section-card">
        <h3 className="section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell w-5 h-5 text-blue-600 icon"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg> Notification Preferences
        </h3>
        <div className="space-y-4">
      {/* Toggle Row */}
     
     
    </div>

       

        <div className="space-y-4">
      {/* Email Notifications Section */}
      <div className="toggle-row">
        <div className="toggle-labels">
          <label className="label-title">Email Notifications</label>
          <p className="label-sub">Receive medication alerts via email</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={emailEnabled}
          data-state={emailEnabled ? 'checked' : 'unchecked'}
          className={`toggle-switch ${emailEnabled ? 'checked' : 'unchecked'}`}
          onClick={() => setEmailEnabled(!emailEnabled)}
        >
          <span className="toggle-thumb" />
        </button>
      </div>

      {emailEnabled && (
        <div className="input-group">
          <label className="input-label" htmlFor="email">Email Address</label>
          <input
            className="input"
            type="email"
            id="email"
            defaultValue="caretaker@example.com"
          />
        </div>
      )}

      <hr style={{ margin: '1.5rem 0', borderColor: '#eee' }} />

      {/* Missed Medication Alerts Section */}
      <div className="toggle-row">
        <div className="toggle-labels">
          <label className="label-title">Missed Medication Alerts</label>
          <p className="label-sub">Get notified when medication is not taken on time</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={missedAlertEnabled}
          data-state={missedAlertEnabled ? 'checked' : 'unchecked'}
          className={`toggle-switch ${missedAlertEnabled ? 'checked' : 'unchecked'}`}
          onClick={() => setMissedAlertEnabled(!missedAlertEnabled)}
        >
          <span className="toggle-thumb" />
        </button>
      </div>

      {missedAlertEnabled && (
        <div className="input-group">
          <label className="input-label">Alert me if medication isn't taken within</label>
          <select className="input">
            <option>2 hours</option>
            <option>4 hours</option>
            <option>8 hours</option>
          </select>

          <label className="input-label">Daily reminder time</label>
          <input type="time" className="input" defaultValue="20:00" />
          <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            Time to check if today's medication was taken
          </p>
        </div>
      )}
    </div>



      </div>

      <div className="section-card">
        <h3 className="section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-5 h-5 text-green-600"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg> Email Preview
        </h3>
        <div className="email-preview">
          <p><strong>Subject:</strong> Medication Alert - Eleanor Thompson</p>
          <p>Hello,</p>
          <p>This is a reminder that Eleanor Thompson has not taken her medication today.</p>
          <p>Please check with her to ensure she takes her prescribed medication.</p>
          <p>Current adherence rate: {adherence}% ({streak}-day streak)</p>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button className="button-save">Save Notification Settings</button>
      </div>
    </div>
  )
}

export default NotificationsTab
