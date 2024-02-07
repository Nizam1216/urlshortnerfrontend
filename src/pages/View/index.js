import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";

const View = () => {
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const { shortId } = useParams();
  const toast = useRef(null); // Create a ref for the Toast component

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mernurlshortner.onrender.com/api/url/${shortId}`
        );
        setOriginalUrl(response.data.url.originalUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [shortId]);

  const handleUpdate = async () => {
    try {
      await axios.patch(`https://mernurlshortner.onrender.com/api/${shortId}`, {
        originalUrl: originalUrl,
      });
      // Show success toast message using the ref
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "URL updated successfully!",
        life: 3000,
      });
    } catch (error) {
      // Show error toast message using the ref
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update URL. Please try again.",
        life: 3000,
      });
      console.error("Error updating URL:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://mernurlshortner.onrender.com/api/${shortId}`);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "URL deleted successfully!",
        life: 3000,
      });
      // Navigate to /dashboard after successful deletion
      navigate("/dashboard");
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete URL. Please try again.",
        life: 3000,
      });
      console.error("Error deleting URL:", error);
    }
  };
  return (
    <>
      <h1>ANCHORS.IN</h1>
      <div className="w-full flex justify-content-center">
        <div className="card w-5">
          <Card title="Only Original Url Can Be Modified...">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <InputTextarea
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)} // Update originalUrl state on change
                className="w-full"
                placeholder="Original URL"
                rows={10}
                cols={30}
              />
            )}
            <div className="w-full flex justify-content-end pt-2">
              <Button onClick={handleUpdate} className="mx-2">
                Update
              </Button>
              <Button onClick={handleDelete}>Delete</Button>
            </div>
          </Card>
        </div>
      </div>
      <Toast ref={toast} /> {/* Pass the ref to the Toast component */}
    </>
  );
};

export default View;
