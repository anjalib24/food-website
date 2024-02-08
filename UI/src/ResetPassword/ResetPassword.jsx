import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios'; // You may need to install axios using npm or yarn

const ResetPassword = () => {
  const { userId, token } = useParams(); // Extract userId and token from the URL params
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/users/reset-password', {
        userId,
        token,
        password
      });
      setSuccess(true);
      setError('');
    } catch (error) {
      setError('Error resetting password. Please try again.');
    }
  };

  if (success) {
    return <div>Password reset successfully!</div>;
  }

  return (
 
     
<form autocomplete="off" id="form_submit" class="row g-3 mx-auto p-2" style={{ width: "650px" }} onsubmit={handleResetPassword}>
  <div class="container border border-1 p-4" style={{ marginTop: "100px" }}>
    <div class="row">
      <div class="col-md-10">
        <h1 id="h1" class="text-center">Password</h1>
      </div>
      <div class="col-md-10">
        <label for="inputPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="inputPassword" name="inputPassword" required />
      </div>
      <div class="col-md-10">
        <label for="inputConfirmPassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="inputConfirmPassword" name="inputConfirmPassword" required />
      </div>
      <div class="col-10 mt-5 form_action--button">
        <button type="submit" class="btn btn-primary">submit</button>
      </div>
    </div>
  </div>
</form>


  );
};

export default ResetPassword; 