import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Header from "@/router/Shop/Header";
import { Footer } from "@/router/Shop/Footer";
import Alert from "@/router/Shop/Alert";
const initialValues = {
  email: "",
  password: "",
};

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('http://62.72.1.123:8000/api/v1/users/login', {
          userData: {
            email: values.email,
            password: values.password,
          },
        });
        const authToken = response.data.data;
        localStorage.setItem('token', authToken);
        const decodedToken = jwtDecode(authToken);
        const userType = decodedToken.role;
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (cart && cart.length > 0) {
          const data = cart.map(item => ({
            productId: item._id,
            quantity: item.quantity || 1,

          }));
          const token = localStorage.getItem('token');
          const response = await axios.post('http://62.72.1.123:8000/api/v1/products/add-to-cart', 
            data
          , {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          localStorage.removeItem('cart');
        } else {
          console.log('No items in cart.');
        }

        if (userType === 'user') {
                  showAlert("sucess", "Login sucessfully");
          history.push('/shop');
        } else if (userType === 'admin') {
          history.push('/admin');
        } else {
          console.error('Invalid user type:', userType);
        }

      } catch (error) {
        console.error("Error submitting the form:", error);
        showAlert("danger", error.response.data.error);
      } finally {
        setSubmitting(false);
      }

    },
  });

  return (
    <>
      <div>
      {alert && <Alert type={alert.type} message={alert.message} />}
        <Header hidebutton={true} />
        <section className="p-5 w-100" style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}>
          <div className="row">
            <div className="col-12">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mt-4">Logins</p>
                      <form onSubmit={handleSubmit}>
                        <div className="row mt-3">
                          <div className="col text-left">
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                            <input
                              id="email"
                              name="email"
                              className="form-control"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? (
                              <small className="text-danger mt-1">
                                {errors.email}
                              </small>
                            ) : null}
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col text-left">
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <input
                              id="password"
                              name="password"
                              className="form-control"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="password"
                            />
                            {errors.password && touched.password ? (
                              <small className="text-danger mt-1">
                                {errors.password}
                              </small>
                            ) : null}
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col text-right actionButtons">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={resetForm}
                              disabled={loading}
                            >
                              Clear
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={handleSubmit}
                              disabled={loading}
                            >
                              {loading ? 'Logging in...' : 'Login'}
                            </Button>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <br />
                          <div className="col text-right">
                            Create your account? <Link to="/register">Sign up</Link>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
export default Login;
