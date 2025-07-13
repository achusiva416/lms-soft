import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout/AdminLayout';
import UserLayout from './components/UserLayout/UserLayout';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import CourseList from './pages/CousrseManagement/CourseList';
import AddCourse from './pages/CousrseManagement/AddCourse';
import EditCourse from './pages/CousrseManagement/EditCourse';
import Course from './pages/User/Course';
import CourseDetail from './pages/User/CourseDetails';
import StudentProfile from './pages/User/Profile';
import PrivateRoute from './hoc/PrivateRoute.jsx';
import PublicRoute from './hoc/PublicRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
         
        
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
            } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>  
            } />
        
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path='/admin/dashboard' element={
            <PrivateRoute>
              <AdminDashboard/>
            </PrivateRoute>
            
            }></Route>
          <Route path='/admin/courses' element={
            <PrivateRoute>
              <CourseList/>
            </PrivateRoute>
            
            }></Route>
          <Route path='/admin/courses/add' element={
            <PrivateRoute>
              <AddCourse/>
            </PrivateRoute>
            }></Route>
          <Route path='/admin/courses/:id/edit' element={
            <PrivateRoute>
              <EditCourse/>
            </PrivateRoute>
            
            }></Route>
        </Route>

        
        <Route path="/" element={<UserLayout />}>
          <Route path='/courses' element={<Course/>}></Route>
          <Route path='/courses/:id' element={
            <PrivateRoute>
              <CourseDetail/>
            </PrivateRoute>
            }></Route>
          <Route path='/' element={<Course/>}></Route>
          <Route path='/profile' element={
            <PrivateRoute>
              <StudentProfile/>
            </PrivateRoute>
            
            }></Route>
        </Route>

        
      </Routes>
    </Router>
  );
}

export default App;
