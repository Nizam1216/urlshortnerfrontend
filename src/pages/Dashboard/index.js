import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const Dashboard = () => {
  const [nodes, setNodes] = useState([]);
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const User = userString ? JSON.parse(userString) : null;
  const Domainname = window.location.origin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://mernurlshortner.onrender.com/api/all-urls",
          {
            userId: User._id,
          }
        );

        // Assuming response.data.urls contains the array of URLs
        const urls = response.data.urls;
        setNodes(urls);
        // Generate serial numbers based on the length of urls array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [User]);

  const renderVisits = (rowData) => {
    if (rowData.clicks > 0) {
      return rowData.clicks / 1;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <div className="flex justify-content-between">
        <h1>ANCHORS.IN</h1>
        <Button
          className="m-3"
          style={{
            height: "50px",
          }}
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/");
            window.location.reload();
          }}
        >
          Logout
        </Button>
      </div>
      <div className="w-full flex justify-content-center">
        <h1
          className="w-full flex justify-content-center"
          style={{ color: "#FFFF" }}
        >
          Dashboard
        </h1>
      </div>

      <div className="w-full admin_dashboard_main_div flex">
        <div className="w-full admin_dashboard_bigscreen_content">
          <div className="w-full flex justify-content-center mt-6">
            <div className="card w-full">
              <DataTable
                value={nodes}
                paginator
                rows={5}
                rowsPerPageOptions={[8, 15, 25]}
                style={{ minWidth: "50rem" }}
              >
                <Column
                  field="originalUrl"
                  header="Original URL"
                  body={(rowData) => (
                    <span>{rowData.originalUrl.slice(0, 40)}...</span>
                  )}
                ></Column>
                <Column field="shortId" header="Url Id"></Column>
                <Column
                  field="Convertedurl"
                  header="Converted url"
                  body={(rowData) => (
                    <a
                      href={`${Domainname}/${rowData.shortId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`${Domainname}/${rowData.shortId}`}
                    </a>
                  )}
                ></Column>
                <Column
                  field="clicks"
                  header="no of visits"
                  body={renderVisits}
                ></Column>
                <Column
                  header="Edit/Delete"
                  body={(rowData) => (
                    <Link to={`/edit/${rowData.shortId}`}>
                      <Button>View</Button>
                    </Link>
                  )}
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
