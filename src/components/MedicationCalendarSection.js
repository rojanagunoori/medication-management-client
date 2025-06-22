import React, { useState ,useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MedicationCalendarSection.css';
import { fetchMedications } from '../api/api';

const mockData = {
  '2025-06-18': 'taken',
  '2025-06-19': 'missed',
  '2025-06-20': 'today',
};

const getStatusColor = (status) => {
  switch (status) {
    case 'taken':
      return 'green';
    case 'missed':
      return 'red';
    case 'today':
      return 'blue';
    default:
      return null;
  }
};

const MedicationCalendarSection = ({ token }) => {
  const [value, setValue] = useState(new Date());
  const [medStatusMap, setMedStatusMap] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchMedications(token);
        const data = res.data;

        const today = new Date().toISOString().split('T')[0];

        const statusMap = {};

        data.forEach((med) => {
          const date = med.date;
          if (!statusMap[date]) statusMap[date] = [];

          statusMap[date].push(med.taken);
        });

        const statusByDate = {};
        for (const date in statusMap) {
          if (date === today) {
            statusByDate[date] = 'today';
          } else if (statusMap[date].every((taken) => taken === 1)) {
            statusByDate[date] = 'taken';
          } else {
            statusByDate[date] = 'missed';
          }
        }

        setMedStatusMap(statusByDate);
      } catch (err) {
        console.error('Failed to load medication data:', err);
      }
    };

    if (token) loadData();
  }, [token]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateKey = date.toISOString().split('T')[0];
     // const status = mockData[dateKey];
     const status = medStatusMap[dateKey];
      if (status) {
        return <div className={`circle ${getStatusColor(status)}`}></div>;
      }
    }
    return null;
  };

  return (
    <div className="calendar-section">
      <div className="calendar-header">
        <h3>Medication Calendar</h3>
      </div>

      <Calendar
        onChange={setValue}
        value={value}
        tileContent={tileContent}
      />

      <div className="legend">
        <div className="legend-row">
          <div className="legend-item">
            <div className="dot green"></div>
            <span>Medication taken</span>
          </div>
          <div className="legend-item">
            <div className="dot red"></div>
            <span>Missed medication</span>
          </div>
          <div className="legend-item">
            <div className="dot blue"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationCalendarSection;
