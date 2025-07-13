import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { IMAGE_URL } from '../../constants/constants';
import { useSelector } from 'react-redux';
import WarningPopUp from '../../components/PopUp/WarningPopUp';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('course-list');
        setCourses(res.data.data || []);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleClick = (course) => {
    if (!user) {
      navigate('/login');
    } else if (user?.is_course_free === 1) {
      navigate(`/courses/${course.id}`);
    } else {
      setSelectedCourse(course);
      setShowWarning(true);
    }
  };

  const handlePurchase = () => {
    if (selectedCourse) {
      // Redirect to payment page with course ID
      navigate(`/checkout/${selectedCourse.id}`);
    }
    setShowWarning(false);
  };

  if (isLoading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-purple" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4">
        <h3 className="mb-4 text-purple">Our Courses</h3>

        {courses.length === 0 ? (
          <div className="alert alert-info">No courses available at the moment.</div>
        ) : (
          <div className="row g-4">
            {courses.map((course) => (
              <div className="col-md-4" key={course.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={course.image ? IMAGE_URL + course.image : '/placeholder-course.jpg'}
                    alt={course.title}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <div className="mt-auto">
                      <p className="text-purple fw-bold mb-2">₹{course.price}</p>
                      {course.status === 0 ? (
                        <button className="btn btn-secondary w-100" disabled>
                          Not Available Now
                        </button>
                      ) : (
                        <button
                          onClick={() => handleClick(course)}
                          className="btn btn-purple w-100"
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showWarning && selectedCourse && (
        <WarningPopUp
          courseTitle={selectedCourse.title}
          coursePrice={selectedCourse.price}
          onPurchase={handlePurchase}
          onClose={() => setShowWarning(false)}
        />
      )}
    </>
  );
};

export default Course;