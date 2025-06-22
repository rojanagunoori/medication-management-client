import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem('selectedRole', role);
    navigate('/login');
  };

  return (
    <div className="homepage-container">
      <h1>Welcome to MediCare Companion</h1>
      <p>Your trusted partner in medication management. Choose your role to get started with personalized features.</p>

      <div className="role-cards">
        <div className="role-card patient" onClick={() => handleRoleSelect('patient')}>
          <div className="patient-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2>I'm a Patient</h2>
          <p>Track your medication schedule and maintain your health records</p>
          <ul>
            <li><div className="patient-circle"></div>Mark medications as taken</li>
            <li><div className="patient-circle"></div>Upload proof photos (optional)</li>
            <li><div className="patient-circle"></div>View your medication calendar</li>
            <li><div className="patient-circle"></div>Large, easy-to-use interface</li>
          </ul>
          <button>Continue as Patient</button>
        </div>

        <div className="role-card caretaker" onClick={() => handleRoleSelect('caretaker')}>
          <div className="caretaker-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h2>I'm a Caretaker</h2>
          <p>Monitor and support your loved one’s medication adherence</p>
          <ul>
            <li><div className="caretaker-circle"></div>Monitor medication compliance</li>
            <li><div className="caretaker-circle"></div>Set up notification preferences</li>
            <li><div className="caretaker-circle"></div>View detailed reports</li>
            <li><div className="caretaker-circle"></div>Receive email alerts</li>
          </ul>
          <button>Continue as Caretaker</button>
        </div>
      </div>

      <p>You can switch between roles anytime after setup</p>
    </div>
  );
}
