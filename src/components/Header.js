import React from 'react';
import './Header.css';

const Header = ({ viewMode, toggleView }) => {
  const isPatient = viewMode === 'patient';

  return (
    <header className="header">
      <div className="container">
        <div className="logo-section">
          <div className="logo-box">
            <span className="logo-text">M</span>
          </div>
          <div>
            <h1 className="title">MediCare Companion</h1>
            <p className="subtitle">{isPatient ? 'Patient View' : 'Caretaker View'}</p>
          </div>
        </div>

        <button className="switch-button" onClick={toggleView}>
          {isPatient ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users w-4 h-4 icon"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Switch to Caretaker
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user w-4 h-4 icon"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Switch to Patient
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
