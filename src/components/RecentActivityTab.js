import React, { useEffect, useState } from 'react';
import './RecentActivityTab.css';
import { fetchMedications } from '../api/api';

const RecentActivityTab = ({ token }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const res = await fetchMedications(token);
        const data = res.data;
        console.log(data)

        const formatted = data
          .map((med) => {
            const dateObj = new Date(`${med.date}T${med.time}`);
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            const formattedDate = dateObj.toLocaleDateString('en-US', options);
            const formattedTime = med.taken
              ? `Taken at ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : 'Medication missed';

            return {
              date: formattedDate,
              time: formattedTime,
              status: med.taken ? 'Completed' : 'Missed',
              type: med.photo_path ? 'photo' : null,
              statusColor: med.taken ? 'green' : 'red',
              timestamp: dateObj.getTime()
            };
          })
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 5);

        setActivities(formatted);
      } catch (err) {
        console.error('Error loading activities:', err);
      }
    };

    if (token) loadActivities();
  }, [token]);

  return (
    <div className="recent-activity-tab">
      <h2 className="section-title">Recent Medication Activity</h2>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-card">
            <div className="activity-info">
              <div className={`icon-circle ${activity.statusColor}`}>
                {activity.status === 'Missed' ? '⚠️' : '✔️'}
              </div>
              <div>
                <p className="activity-date">{activity.date}</p>
                <p className="activity-time">{activity.time}</p>
              </div>
            </div>
            <div className="activity-tags">
              {activity.type === 'photo' && (
                <span className="tag icon-tag">📸 Photo</span>
              )}
              <span className={`tag status-tag ${activity.statusColor}`}>
                {activity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityTab;
