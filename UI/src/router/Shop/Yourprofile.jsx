import React, { useEffect, useState } from 'react'
import "./Yourprofile.css"
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Yourprofile = () => {
  const [selectedOption, setSelectedOption] = useState('profileInfo');
  const [userData, setUserData] = useState({});
  const [isEditable, setIsEditable] = useState(false);


  const handleOptionClick = (option) => {
    setSelectedOption(option);
  }


  const handleInputChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateClick = async () => {
    if (isEditable) {
      const token = localStorage.getItem("token");
      try {

        await axios.put(`http://127.0.0.1:8000/api/v1/users/update-user/${userData._id}`, {
          userData: userData,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    const token = localStorage.getItem("token")

    axios.get('http://127.0.0.1:8000/api/v1/users/get-current', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUserData(response?.data?.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  return (
    <div>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
      <div className="container">
        <div className="view-account">
          <section className="module">
            <div className="module-inner">
              <div className="side-bar">
                <div className="user-info">
                  <img className="img-profile img-circle img-responsive center-block" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                  <ul className="meta list list-unstyled">
                    <li className="name">Rebecca Sanders
                      <label className="label label-info">UX Designer</label>
                    </li>
                  </ul>
                </div>
                <nav className="side-menu">
                  <ul className="nav">
                    <li className={selectedOption === 'profileInfo' ? 'active' : ''} onClick={() => handleOptionClick('profileInfo')}><a href="#/"><span className="fa fa-user"></span> Profile</a></li>
                    <li className={selectedOption === 'orders' ? 'active' : ''} onClick={() => handleOptionClick('orders')}><a href="#/"><span className="fa fa-cog"></span>Your Orders</a></li>
                  </ul>
                </nav>
              </div>
              <div className="content-panel">
                {selectedOption === 'profileInfo' && (
                  <>
                    <h2 className="title">Profile</h2>
                    <form className="form-horizontal">
                      <fieldset className="fieldset">
                        <h3 className="fieldset-title">Personal Info</h3>
                        <div className="form-group">
                          <label className="col-md-2 col-sm-3 col-xs-12 control-label">User Name</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input
                              type="text"
                              className="form-control"
                              name="username"
                              value={userData.username}
                              readOnly={!isEditable}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="fieldset">
                        <h3 className="fieldset-title">Contact Info</h3>
                        <div className="form-group">
                          <label className="col-md-2  col-sm-3 col-xs-12 control-label">Email</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input

                              type="email"
                              className="form-control"
                              name="email"
                              value={userData.email}
                              readOnly={!isEditable}
                              onChange={handleInputChange} />
                            <p className="help-block">This is the email </p>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="fieldset">
                        <h3 className="fieldset-title">Address Info</h3>
                        <div className="form-group">
                          <label className="col-md-2  col-sm-3 col-xs-12 control-label">Address</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              value={userData.address}
                              readOnly={!isEditable}
                              onChange={handleInputChange}

                            />
                            <p className="help-block">This is the address </p>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-2  col-sm-3 col-xs-12 control-label">Country</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input
                              type="text"
                              className="form-control"
                              name="country"
                              value={userData.country}
                              readOnly={!isEditable}
                              onChange={handleInputChange}
                            />
                            <p className="help-block"></p>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-2  col-sm-3 col-xs-12 control-label">City</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input
                              type="text"
                              className="form-control"
                              name="city"
                              readOnly={!isEditable}
                              onChange={handleInputChange}
                              value={userData.city}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-2  col-sm-3 col-xs-12 control-label">State</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input type="text" className="form-control" value={userData.state} readOnly={!isEditable} name="state" onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-2  col-sm-3 col-xs-12 control-label">Zip code</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input type="text" className="form-control" value={userData.zipcode} readOnly={!isEditable}
                              onChange={handleInputChange}
                              name="zipcode"
                            />
                          </div>
                        </div>
                      </fieldset>
                      <div className="form-group">
                        <div className="col-md-10 col-sm-9 col-xs-12">
                          <button type="button" className="btn btn-primary" onClick={handleUpdateClick}>
                            {isEditable ? 'Update' : 'Edit'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
                {selectedOption === 'orders' && (
                  <div><>





                  </>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Yourprofile





