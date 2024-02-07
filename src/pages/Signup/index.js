import React, { useState, useRef } from "react";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const Signup = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (formData.password !== formData.cpassword) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Passwords do not match!",
        life: 3000,
      });
      return;
    }

    try {
      // Make a POST request to the backend API
      const response = await axios.post(
        "https://mernurlshortner.onrender.com/api/auth/register",
        formData
      );

      // Handle the response accordingly (e.g., show a success message)
      console.log("Signup successful", response.data);
      navigate("/");
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Signup failed", error.response.data);
    }
  };

  const header = <div className="font-bold mb-3">Pick a password</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  return (
    <>
      <h1>ANCHORS.IN</h1>
      <div className="w-full flex justify-content-center">
        <div className="card w-5">
          <Card title="Signup to Url-Shortner">
            <form className="w-full" onSubmit={handleSignup}>
              <div className="flex flex-column gap-2 mb-2">
                <label htmlFor="fullname">Full Name</label>
                <InputText
                  id="fullname"
                  type="text"
                  aria-describedby="fullname-help"
                  onChange={handleChange}
                />
              </div>
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
                  value={formData.password}
                  onChange={(e) =>
                    handleChange({
                      target: { id: "password", value: e.target.value },
                    })
                  }
                  header={header}
                  footer={footer}
                />
              </div>
              <div className="flex flex-column gap-2">
                <label htmlFor="cpassword">Re-enter Password</label>
                <Password
                  id="cpassword"
                  value={formData.cpassword}
                  onChange={(e) =>
                    handleChange({
                      target: { id: "cpassword", value: e.target.value },
                    })
                  }
                  className="w-full"
                  inputId="in_value"
                  name="value"
                  rows={5}
                  cols={30}
                  feedback={false}
                />
              </div>
              <Button label="Signup" type="submit" className="mt-2 w-full" />
              <div className="mt-3">
                <a href="/">Already a User? Login</a>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <Toast ref={toast} />
    </>
  );
};

export default Signup;
