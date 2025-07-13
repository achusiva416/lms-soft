import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { FaEdit, FaTrash, FaSpinner, FaPlus } from 'react-icons/fa';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchCourses = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/course`);
      setCourses(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      setDeleteId(id);
      await api.delete(`/courses/${id}`);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete course');
      console.error('Error deleting course:', err);
    } finally {
      setDeleteId(null);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCourses(page);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">Course Management</h2>
        <Link to="/admin/courses/add" className="btn btn-success">
          <FaPlus className="me-2" />
          Add Course
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <FaSpinner className="fa-spin me-2" />
              Loading courses...
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No courses found</p>
              <Link to="/admin/courses/add" className="btn btn-primary">
                Create Your First Course
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '50px' }}>#</th>
                      <th>Title</th>
                      <th style={{ width: '120px' }}>Price (₹)</th>
                      <th style={{ width: '120px' }}>Status</th>
                      <th style={{ width: '150px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr key={course.id}>
                        <td>{index + 1}</td>
                        <td>
                          <Link to={`/admin/courses/${course.id}`} className="text-decoration-none">
                            {course.title}
                          </Link>
                        </td>
                        <td>₹{course.price.toLocaleString()}</td>
                        <td>
                          <span className={`badge ${course.status === 1 ? 'bg-success' : 'bg-secondary'}`}>
                            {course.status === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link 
                              to={`/admin/courses/${course.id}/edit`} 
                              className="btn btn-sm btn-outline-primary"
                            >
                              Edit
                            </Link>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(course.id)}
                              disabled={deleteId === course.id}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

             
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;