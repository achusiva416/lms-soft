import { Outlet, Link } from 'react-router-dom';
import { FaUserCircle, FaTachometerAlt, FaBookOpen, FaSignOutAlt } from 'react-icons/fa';
import "./style/style.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function AdminLayout() {
  const user = useSelector((state)=> state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('hi')
    dispatch(logoutUser());
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div className="bg-dark text-white p-3" style={{ width: '240px' }}>
        <div className="d-flex align-items-center mb-4 p-2 border-bottom border-secondary">
          <h5 className="text-white mb-0 fw-bold">LMS ADMIN</h5>
        </div>
        
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link 
              to="/admin/dashboard" 
              className="nav-link d-flex align-items-center text-white py-3 rounded hover-bg"
              activeClassName="active-nav-link"
            >
              <FaTachometerAlt className="me-3" />
              <span className="fw-medium">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link 
              to="/admin/courses" 
              className="nav-link d-flex align-items-center text-white py-3 rounded hover-bg"
              activeClassName="active-nav-link"
            >
              <FaBookOpen className="me-3" />
              <span className="fw-medium">Manage Courses</span>
            </Link>
          </li>
        </ul>
        
        <div className="mt-auto pt-3 border-top border-secondary">
          <button className="btn btn-link text-white d-flex align-items-center w-100 py-2" >
            <FaSignOutAlt className="me-3" />
            <span onClick={()=>{handleLogout()}} >Logout</span>
          </button>
        </div>
      </div>

      
      <div className="flex-grow-1 d-flex flex-column bg-light">
        <nav className="navbar navbar-expand navbar-light bg-white shadow-sm px-4">
          <div className="ms-auto d-flex align-items-center">
            <div className="row align-items-center g-2">
                <div className="col-auto">
                  <FaUserCircle size={36} className="text-secondary" />
                </div>
                <div className="col">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">{user?.name || 'User'}</span>
                    <span className="text-muted small">{user?.email || 'email@example.com'}</span>
                  </div>
                </div>
              </div>
            </div>
        </nav>

        
        <div className="p-4 flex-grow-1">  
            <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;



