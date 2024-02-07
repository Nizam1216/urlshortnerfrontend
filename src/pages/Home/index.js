import React, { useRef, useState } from "react";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast"; // Import Toast component
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const navigate = useNavigate();
  const domainName = window.location.origin;
  const toast = useRef(null); // Ref for toast component
  const userString = localStorage.getItem("user");
  const UserName = userString ? JSON.parse(userString) : null;
  const isValidURL = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const convertUrl = async () => {
    try {
      if (!isValidURL(value)) {
        // Show toast for invalid URL
        toast.current.show({
          severity: "error",
          summary: "Invalid URL",
          life: 3000,
        });
        return; // Don't proceed if URL is invalid
      }

      const token = localStorage.getItem("token");
      const userId = JSON.parse(token);
      const response = await axios.post(
        "https://mernurlshortner.onrender.com/api/shorten",
        {
          originalUrl: value,
          userId: userId,
        }
      );

      console.log(response.data);
      setShortUrl(response.data.shortId);
    } catch (error) {
      console.error("Error converting URL:", error);
    }
  };

  return (
    <>
      <div className="flex justify-content-between">
        <h1>ANCHORS.IN</h1>
        <Button
          className="m-3"
          style={{
            height: "50px",
          }}
          onClick={() => {
            navigate("/");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </Button>
      </div>
      <div className="w-full flex justify-content-center">
        <div className="card w-5">
          <Card title={`Hello ${UserName?.fullname}`}>
            <InputTextarea
              value={value}
              className="w-full"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter Your Url Here..."
              rows={6}
              cols={30}
            />
            <div className="w-full flex justify-content-end pt-2">
              <Button className="mx-2" onClick={() => navigate("/dashboard")}>
                View Dashboard
              </Button>
              <Button onClick={convertUrl}>Convert</Button>
            </div>
          </Card>
          {shortUrl && (
            <Card title="Shortened Equivalent of your Url" className="mt-5">
              <Link
                to={`https://urlshortnerfrontend-nizam.vercel.app/${shortUrl}`}
                style={{
                  textDecoration: "none",
                  color: "green",
                  fontSize: "20px",
                }}
              >{`https://urlshortnerfrontend-nizam.vercel.app/${shortUrl}`}</Link>
            </Card>
          )}
        </div>
      </div>
      <Toast ref={toast} /> {/* Toast component */}
    </>
  );
};

export default Home;
