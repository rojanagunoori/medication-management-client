import React, { useState ,useEffect} from 'react';
import './CaretakerDashboard.css';
import OverviewTab from '../components/OverviewTab';
import MedicationCalendarSection from '../components/MedicationCalendarSection';
import NotificationsTab from '../components/NotificationsTab';
import RecentActivityTab from '../components/RecentActivityTab';
import {
  fetchMedications,
  getAdherence,
} from '../api/api';


const tabs = ['Overview', 'Recent Activity', 'Calendar View', 'Notifications'];

const CaretakerDashboard = ({token}) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const [message, setMessage] = useState('');

  // Medication & adherence state
  const [medications, setMedications] = useState([]);
  const [adherence, setAdherence] = useState(null);

  useEffect(() => {
    if (token) {
      fetchMedications(token).then(res => {
        setMedications(res.data);
      });
      getAdherence(token).then(res => {
        setAdherence(res.data.adherence);
      });
    }
  }, [token]);

  const handleAction = (action) => {
    if (action === 'reminder') {
      setMessage('Reminder email sent to Eleanor Thompson.');
      // Optionally hide message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } else if (action === 'notifications') {
      setActiveTab('Notifications');
    } else if (action === 'calendar') {
      setActiveTab('Calendar View');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab onAction={handleAction}  medications={medications}
        adherence={adherence}/>
      case 'Recent Activity':
        return <RecentActivityTab token={token}/>;
      case 'Calendar View':
        return <MedicationCalendarSection token={token}/>
      case 'Notifications':
        return <NotificationsTab token={token}/>;
      default:
        return null;
    }
  };

  return (
    <div className="caretaker-dashboard">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {message && <div className="alert-message">{message}</div>}
      {renderContent()}
    </div>
  );
};

export default CaretakerDashboard;
