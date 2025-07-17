// UserForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, editUser } from '../actions/userActions';
import { useParams, useHistory } from 'react-router-dom';

const UserForm = ({ userData = null }) => {
  const [formData, setFormData] = useState(userData || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    education: [],
    experience: [],
  });

  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEducationChange = (index, e) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][e.target.name] = e.target.value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleExperienceChange = (index, e) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][e.target.name] = e.target.value;
    setFormData({ ...formData, experience: updatedExperience });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: '', college: '', startYear: '', endYear: '' },
      ],
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { companyName: '', startMonthYear: '', endMonthYear: '' },
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData) {
      dispatch(editUser(userData.id, formData));
    } else {
      dispatch(addUser(formData));
    }
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>
      <div>
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      {/* Education Section */}
      <div>
        <h3>Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index}>
            <input
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="Degree"
            />
            <input
              type="text"
              name="college"
              value={edu.college}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="College"
            />
            <input
              type="number"
              name="startYear"
              value={edu.startYear}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="Start Year"
            />
            <input
              type="number"
              name="endYear"
              value={edu.endYear}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="End Year"
            />
            <button type="button" onClick={() => removeEducation(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addEducation}>Add More Education</button>
      </div>

      {/* Experience Section */}
      <div>
        <h3>Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              name="companyName"
              value={exp.companyName}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Company Name"
            />
            <input
              type="month"
              name="startMonthYear"
              value={exp.startMonthYear}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Start Date"
            />
            <input
              type="month"
              name="endMonthYear"
              value={exp.endMonthYear}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="End Date"
            />
            <button type="button" onClick={() => removeExperience(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addExperience}>Add More Experience</button>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;

