import React, { useState, useEffect } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { useNavigate } from "react-router-dom";
const Product = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    // Sample data
    const data = [
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },
      {
        Url: "https://coolors.co/acbdba-cddddd-4f8eed-2e2f2f-051014",
        Urlid: "SH876544NM",
        Convertedurl: "https://coolors.co/acbdba",
        visits: "2",
        status: "Under Review",
      },

      // Add more data objects as needed
    ];

    let files = [];

    for (let i = 0; i < data.length; i++) {
      const shopData = data[i];
      let node = {
        key: i,
        sno: i + 1, // Serial number
        Url: shopData.Url,
        Urlid: shopData.Urlid,
        Convertedurl: shopData.Convertedurl,
        visits: shopData.visits,
        status: shopData.status,
        action: (
          <button
            onClick={() => navigate("/")} // Replace with your action logic
            className="p-button p-button-text"
          >
            view
          </button>
        ),
      };

      files.push(node);
    }

    setNodes(files);
  }, [navigate]);

  return (
    <>
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
                <Column field="sno" header="S.No"></Column>
                <Column
                  field="Url"
                  header="Your Url"
                  body={(rowData) => <span>{rowData.Url.slice(0, 30)}</span>}
                ></Column>

                <Column field="Urlid" header="Url Id"></Column>
                <Column field="Convertedurl" header="Converted url"></Column>
                <Column field="visits" header="no of visits"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="action" header="Action"></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
