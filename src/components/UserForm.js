import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

const degrees = [
  "Bachelor of Science",
  "Master of Science",
  "Bachelor of Arts",
  "Master of Arts",
  "Bachelor of Technology",
  "Master of Technology",
  "PhD",
];

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Apple",
  "Facebook",
  "Netflix",
  "Tesla",
  "Other",
];

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const sectionStyle = {
  marginBottom: "20px",
  padding: "15px",
  border: "1px solid #eee",
  borderRadius: "4px",
};

const buttonStyle = {
  padding: "8px 16px",
  backgroundColor: "#4a90e2",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const submitStyle = {
  ...buttonStyle,
  backgroundColor: "#28a745",
};

const addButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const removeButtonStyle = {
  backgroundColor: "#f44336",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "10px",
};

const validateForm = (formData) => {
  const errors = {};
  if (!formData.firstName.trim()) errors.firstName = "First name is required";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required";
  if (!formData.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    errors.email = "Invalid email format";
  if (!formData.phone.trim()) errors.phone = "Phone is required";
  else if (!/^\+?[\d\s-]+$/.test(formData.phone))
    errors.phone = "Invalid phone format";
  if (!formData.dob) errors.dob = "Date of birth is required";
  if (!formData.address.trim()) errors.address = "Address is required";
  return errors;
};

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const existingUser = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  const [formData, setFormData] = useState(
    existingUser || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      address: "",
      education: [
        {
          degree: "",
          college: "",
          startYear: "",
          endYear: "",
        },
      ],
      experience: [
        {
          companyName: "",
          startMonthYear: "",
          endMonthYear: "",
        },
      ],
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEducationChange = (index, e) => {
    const updated = [...formData.education];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, education: updated });
  };

  const handleExperienceChange = (index, e) => {
    const updated = [...formData.experience];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, experience: updated });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: "", college: "", startYear: "", endYear: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const updated = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updated });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { companyName: "", startMonthYear: "", endMonthYear: "" },
      ],
    });
  };

  const removeExperience = (index) => {
    const updated = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      if (id) {
        dispatch(editUser(id, formData));
      } else {
        dispatch(addUser(formData));
      }
      navigate("/");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", padding: "10px" }}>
        <button type="button" onClick={() => navigate("/")} style={buttonStyle}>
          Back to List
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <h2 style={{ textAlign: "center" }}>{id ? "Edit User" : "Add User"}</h2>

        <div style={sectionStyle}>
          <input
            style={{
              ...inputStyle,
              borderColor: errors.firstName ? "red" : "#ccc",
            }}
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <div style={{ color: "red", fontSize: "0.8em" }}>
              {errors.firstName}
            </div>
          )}
          <input
            style={{
              ...inputStyle,
              borderColor: errors.lastName ? "red" : "#ccc",
            }}
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <div style={{ color: "red", fontSize: "0.8em" }}>
              {errors.lastName}
            </div>
          )}
          <input
            style={{
              ...inputStyle,
              borderColor: errors.email ? "red" : "#ccc",
            }}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div style={{ color: "red", fontSize: "0.8em" }}>
              {errors.email}
            </div>
          )}
          <input
            style={{
              ...inputStyle,
              borderColor: errors.phone ? "red" : "#ccc",
            }}
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <div style={{ color: "red", fontSize: "0.8em" }}>
              {errors.phone}
            </div>
          )}
          <input
            style={{
              ...inputStyle,
              borderColor: errors.dob ? "red" : "#ccc",
            }}
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && (
            <div style={{ color: "red", fontSize: "0.8em" }}>{errors.dob}</div>
          )}
          <textarea
            style={{
              ...inputStyle,
              borderColor: errors.address ? "red" : "#ccc",
            }}
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <div style={{ color: "red", fontSize: "0.8em" }}>
              {errors.address}
            </div>
          )}
        </div>

        {/* Education Section */}
        <div style={sectionStyle}>
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <select
                style={inputStyle}
                name="degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
              >
                <option value="">Select Degree</option>
                {degrees.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree}
                  </option>
                ))}
              </select>
              <input
                style={inputStyle}
                name="college"
                placeholder="College"
                value={edu.college}
                onChange={(e) => handleEducationChange(index, e)}
              />
              <input
                style={inputStyle}
                type="month"
                name="startYear"
                placeholder="Start Year"
                value={edu.startYear}
                onChange={(e) => handleEducationChange(index, e)}
              />
              <input
                style={inputStyle}
                type="month"
                name="endYear"
                placeholder="End Year"
                value={edu.endYear}
                onChange={(e) => handleEducationChange(index, e)}
              />
              <button
                type="button"
                onClick={() => removeEducation(index)}
                style={removeButtonStyle}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addEducation} style={addButtonStyle}>
            Add More Education
          </button>
        </div>

        {/* Experience Section */}
        <div style={sectionStyle}>
          <h3>Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <select
                style={inputStyle}
                name="companyName"
                value={exp.companyName}
                onChange={(e) => handleExperienceChange(index, e)}
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
              <input
                style={inputStyle}
                type="month"
                name="startMonthYear"
                value={exp.startMonthYear}
                onChange={(e) => handleExperienceChange(index, e)}
              />
              <input
                style={inputStyle}
                type="month"
                name="endMonthYear"
                value={exp.endMonthYear}
                onChange={(e) => handleExperienceChange(index, e)}
              />
              <button
                type="button"
                onClick={() => removeExperience(index)}
                style={removeButtonStyle}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addExperience} style={addButtonStyle}>
            Add More Experience
          </button>
        </div>

        <div style={{ textAlign: "center" }}>
          <button type="submit" style={submitStyle}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
