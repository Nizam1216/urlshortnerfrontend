import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Domain = () => {
  const { shortId } = useParams();

  const fetchUrl = async () => {
    try {
      // Make the HTTP POST request with the authorization header
      const response = await axios.get(
        `https://mernurlshortner.onrender.com/api/${shortId}`
      );

      console.log(response.data);
      window.location.href = response.data.originalUrl;
    } catch (error) {
      console.error("Error converting URL:", error);
    }
  };
  fetchUrl();
  return <div>Redirecting...</div>;
};

export default Domain;
