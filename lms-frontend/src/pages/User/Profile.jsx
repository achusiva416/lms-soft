import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const StudentProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <div className="mb-3 mx-auto" style={{ width: '150px', height: '150px' }}>
                <FaUserCircle className="text-secondary" style={{ fontSize: '150px' }} />
              </div>
              <h4 className="mb-2">{user?.name || 'Student Name'}</h4>
              <p className="text-muted mb-3">{user?.email || 'user@example.com'}</p>

              <button className="btn btn-outline-danger mt-3" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
