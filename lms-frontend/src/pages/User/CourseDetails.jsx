import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { IMAGE_URL } from '../../constants/constants';
import { useSelector } from 'react-redux';


const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const fetchCourses = async () => {
        try{
            
            const res = await api.get(`course/${id}`);
            console.log(res)
            setCourse(res.data.data)
        }catch(err){
            console.log(err)
        }
        
    }
    fetchCourses();
  }, [id]);

  

  if (!course) return <p className="container mt-4">Loading course...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <img
          src={IMAGE_URL + course.image}
          className="card-img-top"
          alt={course.title}
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h4 className="card-title">{course.title}</h4>
          <p className="text-muted mb-2">Price: ₹{course.price}</p>
          {user?.is_course_free === 1 ? (
            <p>{course.description}</p>
          ) : (
            <div className="mb-4 alert alert-warning border border-warning">
                <p className="mb-0">
                <strong>Note:</strong> To view this course content, please purchase it first.
                </p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
