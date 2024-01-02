import React, { useState } from 'react'
import "./Yourprofile.css"

const Yourprofile = () => {
  const [selectedOption, setSelectedOption] = useState('profileInfo');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  }

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
                            <input type="text" className="form-control" value="Rebecca" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-2 col-sm-3 col-xs-12 control-label">First Name</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input type="text" className="form-control" value="Rebecca" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-2 col-sm-3 col-xs-12 control-label">Last Name</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input type="text" className="form-control" value="Sanders" />
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="fieldset">
                        <h3 className="fieldset-title">Contact Info</h3>
                        <div className="form-group">
                          <label className="col-md-2  col-sm-3 col-xs-12 control-label">Email</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input type="email" className="form-control" value="Rebecca@website.com" />
                            <p className="help-block">This is the email </p>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-2  col-sm-3 col-xs-12 control-label">Twitter</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input type="text" className="form-control" value="SpeedyBecky" />
                            <p className="help-block">Your twitter username</p>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-2  col-sm-3 col-xs-12 control-label">Linkedin</label>
                          <div className="col-md-10 col-sm-9 col-xs-12">
                            <input type="url" className="form-control" value="https://www.linkedin.com/in/lorem" />
                            <p className="help-block">eg. https://www.linkedin.com/in/yourname</p>
                          </div>
                        </div>
                      </fieldset>
                      <hr />
                      <div className="form-group">
                        <div className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                          <input className="btn btn-primary" type="submit" value="Update Profile" />
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





