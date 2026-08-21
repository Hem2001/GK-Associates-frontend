import React, { useState } from "react";

function ClientDashboard({
  goHome,
  logout,
}) {
  const [file, setFile] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [uploadMessage, setUploadMessage] =
    useState("");

  const uploadFile = async () => {
    if (!file) {
      setUploadMessage(
        "Please select a file first."
      );
      return;
    }

    setUploading(true);
    setUploadMessage("");

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    try {
      console.log(
        "Sending file:",
        file.name
      );

      const response =
        await fetch(
          "http://localhost:5000/api/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      console.log(
        "Upload response:",
        data
      );

      if (!response.ok) {
        setUploadMessage(
          data.message ||
            data.error ||
            "Upload failed."
        );

        return;
      }

      setUploadMessage(
        data.message ||
          "File uploaded successfully."
      );

      setFile(null);

      const input =
        document.getElementById(
          "documentFile"
        );

      if (input) {
        input.value = "";
      }
    } catch (error) {
      console.error(
        "Upload error:",
        error
      );

      setUploadMessage(
        "Cannot connect to backend."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      {/* HEADER */}

      <header
        style={{
          background: "#071a3d",
          color: "white",
          padding: "20px 40px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
            }}
          >
            GK ASSOCIATES
          </h1>

          <p
            style={{
              margin:
                "5px 0 0",
            }}
          >
            Client Dashboard
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={goHome}
            style={{
              padding:
                "10px 18px",
              border: "none",
              borderRadius: "7px",
              cursor:
                "pointer",
            }}
          >
            ← Home
          </button>

          <button
            onClick={logout}
            style={{
              padding:
                "10px 18px",
              border: "none",
              borderRadius: "7px",
              cursor:
                "pointer",
              background:
                "#d32f2f",
              color: "white",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* WELCOME */}

      <section
        style={{
          padding:
            "35px 40px 10px",
        }}
      >
        <h2>
          Welcome, Client
        </h2>

        <p>
          Manage your services,
          documents, reports and
          work status from one
          place.
        </p>
      </section>

      {/* STATISTICS */}

      <section
        style={{
          padding:
            "20px 40px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        <div className="card">
          <h2>3</h2>
          <p>
            Active Services
          </p>
        </div>

        <div className="card">
          <h2>2</h2>
          <p>
            Work In Progress
          </p>
        </div>

        <div className="card">
          <h2>5</h2>
          <p>
            Completed Work
          </p>
        </div>

        <div className="card">
          <h2>2</h2>
          <p>
            Pending Documents
          </p>
        </div>
      </section>

      {/* DOCUMENT UPLOAD */}

      <section
        style={{
          padding:
            "30px 40px",
        }}
      >
        <h2>
          📄 My Documents
        </h2>

        <div
          style={{
            background:
              "white",
            padding: "30px",
            borderRadius:
              "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <p>
            Upload documents
            required for your
            services.
          </p>

          <p
            style={{
              color: "#666",
            }}
          >
            PDF, Word, Excel,
            CSV, SQL, images
            and other files
            are supported.
          </p>

          <input
            id="documentFile"
            type="file"
            onChange={(e) => {
              setFile(
                e.target.files[0]
              );

              setUploadMessage(
                ""
              );
            }}
            style={{
              marginBottom:
                "15px",
              display:
                "block",
            }}
          />

          {file && (
            <p>
              Selected file:{" "}
              <strong>
                {file.name}
              </strong>
            </p>
          )}

          <button
            onClick={
              uploadFile
            }
            disabled={
              uploading
            }
            style={{
              padding:
                "12px 25px",
              background:
                "#071a3d",
              color: "white",
              border: "none",
              borderRadius:
                "8px",
              cursor:
                uploading
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {uploading
              ? "Uploading..."
              : "Upload Document"}
          </button>

          {uploadMessage && (
            <p
              style={{
                marginTop:
                  "15px",
                fontWeight:
                  "bold",
              }}
            >
              {uploadMessage}
            </p>
          )}
        </div>
      </section>

      {/* WORK STATUS */}

      <section
        style={{
          padding:
            "30px 40px",
        }}
      >
        <h2>
          My Work Status
        </h2>

        <div
          style={{
            background:
              "white",
            padding: "25px",
            borderRadius:
              "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h3>
            Tax Audit
          </h3>

          <p>
            Status: In Progress
          </p>

          <div
            style={{
              height: "10px",
              background:
                "#ddd",
              borderRadius:
                "10px",
              overflow:
                "hidden",
            }}
          >
            <div
              style={{
                width: "65%",
                height: "100%",
                background:
                  "#071a3d",
              }}
            />
          </div>

          <h3
            style={{
              marginTop:
                "25px",
            }}
          >
            GST Filing
          </h3>

          <p>
            Status: Pending
            Documents
          </p>

          <div
            style={{
              height: "10px",
              background:
                "#ddd",
              borderRadius:
                "10px",
              overflow:
                "hidden",
            }}
          >
            <div
              style={{
                width: "40%",
                height: "100%",
                background:
                  "#f39c12",
              }}
            />
          </div>

          <h3
            style={{
              marginTop:
                "25px",
            }}
          >
            Financial Report
          </h3>

          <p>
            Status: Completed
          </p>

          <div
            style={{
              height: "10px",
              background:
                "#ddd",
              borderRadius:
                "10px",
              overflow:
                "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "#2e7d32",
              }}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          background:
            "#071a3d",
          color: "white",
          textAlign:
            "center",
          padding: "20px",
        }}
      >
        © 2026 GK ASSOCIATES.
        All Rights Reserved.
      </footer>
    </div>
  );
}

export default ClientDashboard;