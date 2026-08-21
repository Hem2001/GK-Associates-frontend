import { useState } from "react";

function ClientLogin({ goHome }) {
  const [selectedFile, setSelectedFile] =
    useState(null);

  const loginWithPassword = () => {
    const mobile =
      document.getElementById("mobile").value;

    const password =
      document.getElementById("password")
        .value;

    if (
      mobile === "9876543210" &&
      password === "dfghjk"
    ) {
      alert("Login successful");
    } else {
      alert(
        "Invalid mobile number or password"
      );
    }
  };

  const loginWithGoogle = () => {
    alert(
      "Google login will be connected after deployment."
    );
  };

  const forgotPassword = () => {
    const mobile =
      document.getElementById("mobile").value;

    if (!mobile) {
      alert(
        "Please enter your mobile number first."
      );

      return;
    }

    alert("OTP sent to " + mobile);
  };

  const submitQuery = () => {
    alert("Query submitted successfully.");
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      alert("Please select a file.");

      return;
    }

    const formData = new FormData();

    formData.append(
      "file",
      selectedFile
    );

    try {
      const response = await fetch(
        "http://localhost:5000/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

      alert(data.message);
    } catch (error) {
      alert("File upload failed.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "50px",
        }}
      >
        <div
          style={{
            width: "400px",
            background: "white",
            padding: "40px",
            borderRadius: "15px",
            boxShadow:
              "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
            }}
          >
            Client Login
          </h1>

          <input
            id="mobile"
            type="text"
            placeholder="Registered Mobile Number"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={loginWithPassword}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
            }}
          >
            Login
          </button>

          <button
            onClick={loginWithGoogle}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
            }}
          >
            Continue with Google
          </button>

          <button
            onClick={forgotPassword}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
            }}
          >
            Forgot Password (OTP)
          </button>

          <button
            onClick={goHome}
            style={{
              width: "100%",
              padding: "12px",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>

      <section
        style={{
          background: "white",
          padding: "40px",
          margin: "20px",
          borderRadius: "15px",
        }}
      >
        <h2>DOCUMENT UPLOAD</h2>

        <input
          type="file"
          onChange={(e) =>
            setSelectedFile(
              e.target.files[0]
            )
          }
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={uploadFile}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "30px",
          }}
        >
          Upload Document
        </button>

        <h2>QUERY SUBMISSION</h2>

        <input
          type="text"
          placeholder="Your Name"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        <textarea
          placeholder="Enter your query"
          style={{
            width: "100%",
            padding: "12px",
            height: "100px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={submitQuery}
          style={{
            width: "100%",
            padding: "12px",
          }}
        >
          Submit Query
        </button>
      </section>

      <footer
        style={{
          background: "#071a3d",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        © 2026 GK ASSOCIATES | 8892018898 |
        Bangalore
      </footer>
    </div>
  );
}

export default ClientLogin;