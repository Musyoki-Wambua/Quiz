import React, { useEffect, useState }from 'react';
import axios from 'axios';

const AddEmployee = () => {

    const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://locakhost:3000/auth/category')
    .then(result => {
      //console.log(result)
      if(result.data.Result){
        setCategory()
      }else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" >
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
            />
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 EastLands Nairobi"
              autoComplete="off"
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
              {category.map((cat) => {
                return <option value={cat.id}>{cat.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmployee
