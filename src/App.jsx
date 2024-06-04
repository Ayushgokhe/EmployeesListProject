import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    modeOfContact: { email: false, phone: false },
    maritalStatus: '',
    immediateJoiner: ''
  });
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (storedEmployees) {
      setEmployees(storedEmployees);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEmployee({
        ...employee,
        modeOfContact: { ...employee.modeOfContact, [name]: checked }
      });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeToEdit) {
      const updatedEmployees = employees.map(emp =>
        emp.phoneNumber === employee.phoneNumber ? employee : emp
      );
      setEmployees(updatedEmployees);
      setEmployeeToEdit(null);
    } else {
      setEmployees([...employees, employee]);
    }
    clearForm();
  };

  const clearForm = () => {
    setEmployee({
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      phoneNumber: '',
      modeOfContact: { email: false, phone: false },
      maritalStatus: '',
      immediateJoiner: ''
    });
  };

  const deleteEmployee = (index) => {
    const filteredEmployees = employees.filter((_, i) => i !== index);
    setEmployees(filteredEmployees);
  };

  const editEmployee = (index) => {
    const employeeToEdit = employees[index];
    setEmployee(employeeToEdit);
    setEmployeeToEdit(employeeToEdit);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="middleName">Middle Name</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={employee.middleName}
            onChange={handleChange}
            placeholder="Middle Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={employee.gender === 'male'}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={employee.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="others"
                checked={employee.gender === 'others'}
                onChange={handleChange}
              />
              Others
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={employee.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="form-group">
          <label>Mode of Contact</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="email"
                checked={employee.modeOfContact.email}
                onChange={handleChange}
              />
              Email
            </label>
            <label>
              <input
                type="checkbox"
                name="phone"
                checked={employee.modeOfContact.phone}
                onChange={handleChange}
              />
              Phone
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="maritalStatus">Marital Status</label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={employee.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Marital Status</option>
            <option value="married">Married</option>
            <option value="single">Single</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Immediate Joiner</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="immediateJoiner"
                value="yes"
                checked={employee.immediateJoiner === 'yes'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="immediateJoiner"
                value="no"
                checked={employee.immediateJoiner === 'no'}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>
        <button type="submit">{employeeToEdit ? 'Update' : 'Submit'}</button>
        <button type="button" onClick={clearForm}>Clear</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Mode of Contact</th>
            <th>Marital Status</th>
            <th>Immediate Joiner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.middleName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.gender}</td>
              <td>{employee.phoneNumber}</td>
              <td>{Object.keys(employee.modeOfContact).filter(key => employee.modeOfContact[key]).join(', ')}</td>
              <td>{employee.maritalStatus}</td>
              <td>{employee.immediateJoiner}</td>
              <td>
                <button className="edit-button" onClick={() => editEmployee(index)}>Edit</button>
                <button className="delete-button" onClick={() => deleteEmployee(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
