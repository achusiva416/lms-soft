import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaBookOpen, FaUserCircle, FaHome } from 'react-icons/fa';
import './style/style.css';
function UserLayout() {
  const location = useLocation();

  // Helper to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navbar - Light with purple accents */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="text-purple fw-bold fs-4">🎓 LMS</span>
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              
              <li className="nav-item mx-2">
                <Link 
                  to="/courses" 
                  className={`nav-link d-flex align-items-center ${isActive('/courses') ? 'active-link' : ''}`}
                >
                  <FaBookOpen className="me-2 text-purple" />
                  Courses
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link 
                  to="/profile" 
                  className={`nav-link d-flex align-items-center ${isActive('/profile') ? 'active-link' : ''}`}
                >
                  <FaUserCircle className="me-2 text-purple" />
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
      <main className="flex-grow-1 bg-light-purple">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white py-3 border-top">
        <div className="container text-center text-muted">
          <small>© {new Date().getFullYear()} Learning Management System</small>
        </div>
      </footer>
    </div>
  );
}

export default UserLayout;

