import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { FaSpinner, FaCheck, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    status: 'active',
    image: null,
  });
  const [originalImage, setOriginalImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/course/${id}`);
        const course = response.data.data;
        console.log(response)
        
        setFormData({
          title: course.title,
          description: course.description,
          price: course.price,
          status: course.status === 1 ? 'active' : 'inactive',
        });
        
        if (course.image_url) {
          setOriginalImage(course.image_url);
          setImagePreview(course.image_url);
        }
        
      } catch (err) {
        console.error('Error fetching course:', err);
        setErrors({
          general: err.response?.data?.message || 'Failed to load course details'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      
    
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(originalImage);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      newErrors.image = 'Image size should be less than 2MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('_method', 'PUT'); 
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      } else if (!originalImage) {
        
        formDataToSend.append('remove_image', 'true');
      }

      const response = await api.post(`/course/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/admin/courses');
      }, 1500);
      
    } catch (err) {
      console.error('Error updating course:', err);
      
      
      let errorMessage = 'Failed to update course. Please try again.';
      
      if (err.response) {
        
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data?.errors) {
          setErrors(err.response.data.errors);
          return;
        }
      }

      setErrors({
        ...errors,
        general: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  if (isLoading) {
    return (
      <div className="container mt-4 text-center py-5">
        <FaSpinner className="fa-spin me-2" size={24} />
        <span>Loading course details...</span>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h4 className="mb-0 text-primary">Edit Course</h4>
        </div>
        <div className="card-body">
          {errors.general && (
            <div className="alert alert-danger d-flex align-items-center">
              <FaExclamationTriangle className="me-2" />
              {errors.general}
            </div>
          )}

          {submitSuccess && (
            <div className="alert alert-success d-flex align-items-center">
              <FaCheck className="me-2" />
              Course updated successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Title*</label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Description*</label>
              <textarea
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Price (₹)*</label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input
                    type="number"
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                  {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Course Image</label>
              <input
                type="file"
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              {errors.image && <div className="invalid-feedback">{errors.image}</div>}
              <small className="text-muted">Recommended size: 800x450px (Max 2MB)</small>
              
              {(imagePreview || originalImage) && (
                <div className="mt-3 position-relative" style={{ width: 'fit-content' }}>
                  <img
                    src={imagePreview || originalImage}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxWidth: '300px', maxHeight: '200px' }}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                    onClick={removeImage}
                    title="Remove image"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate('/admin/courses')}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || submitSuccess}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="fa-spin me-2" />
                    Updating...
                  </>
                ) : 'Update Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;