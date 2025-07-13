import React from 'react';
import { MdDashboard, MdLibraryBooks } from 'react-icons/md'; // Material Icons via react-icons
import { Link, useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  return (
    <div className="container mt-3">
      <div className="row g-4">
        
        <div className="col-sm-6 col-md-4">
          <Link className="card shadow-sm" style={{textDecoration:'none'}}>
            <div className="card-body d-flex align-items-center">
              <MdDashboard size={40} className="text-primary me-3" />
              <div>
                <h5 className="card-title mb-0">Dashboard</h5>
                <p className="text-muted small mb-0">Overview & Stats</p>
              </div>
            </div>
          </Link>
        </div>

        
        <div className="col-sm-6 col-md-4">
          <Link className="card shadow-sm" to="/admin/courses" style={{textDecoration:'none'}}>
            <div className="card-body d-flex align-items-center">
              <MdLibraryBooks size={40} className="text-success me-3" />
              <div>
                <h5 className="card-title mb-0">Course Management</h5>
                <p className="text-muted small mb-0">Add / Edit / Delete Courses</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
