import React, { useRef, useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast"; // Import Toast component
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toast = useRef(null); // Ref for toast component

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API
      const response = await axios.post(
        "https://mernurlshortner.onrender.com/api/auth/login",
        formData
      );

      // Store user details in localStorage upon successful login
      localStorage.setItem("token", JSON.stringify(response.data.user._id));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.current.show({
        severity: "success",
        summary: "Login Successful",
        life: 3000,
      });

      // Redirect to the home page or another page after successful login
      // Move the navigation inside the try block after localStorage is updated
      navigate("/home");
      window.location.reload();
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Login failed", error.response.data);

      // Show error toast
      toast.current.show({
        severity: "error",
        summary: "Login Failed",
        life: 3000,
      });
    }
  };

  return (
    <>
      <h1>ANCHORS.IN</h1>
      <div className="w-full flex justify-content-center">
        <div className="card w-5">
          <Card title="Login to Url-Shortner">
            <form className="w-full" onSubmit={handleLogin}>
              <div className="flex flex-column gap-2 mb-2">
                <label htmlFor="email">Email</label>
                <InputText
                  id="email"
                  type="email"
                  aria-describedby="email-help"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-column gap-2">
                <label htmlFor="password">Password</label>
                <Password
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleChange({
                      target: { id: "password", value: e.target.value },
                    })
                  }
                  inputId="in_value"
                  name="value"
                  feedback={false}
                  style={{ width: "100%" }} // Set width to 100%
                />
              </div>
              <Button label="Login" type="submit" className="mt-2 w-full" />
              <div className="mt-3">
                <a href="/sign-up">New User? Signup</a>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <Toast ref={toast} /> {/* Toast component */}
    </>
  );
};

export default Login;
