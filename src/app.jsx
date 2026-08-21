import "./App.css";
import { useState } from "react";
import ClientLogin from "./ClientLogin";
import ClientDashboard from "./ClientDashboard";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function App() {
  const [page, setPage] = useState("home");
  const [selectedService, setSelectedService] = useState("");
  const [openService, setOpenService] = useState(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [query, setQuery] = useState("");

  const services = [
    {
      title: "Tax Audit",
      items: [
        "Internal Audit",
        "Statutory Audit",
        "Tax Audit",
        "Compliance Audit",
      ],
    },
    {
      title: "Tax Planning",
      items: [
        "Income Tax Planning",
        "Corporate Tax",
        "Tax Saving",
        "Tax Consultation",
      ],
    },
    {
      title: "Financial Reports",
      items: [
        "Balance Sheet",
        "Profit & Loss Statement",
        "Cash Flow Statement",
        "Financial Analysis",
      ],
    },
    {
      title: "Payroll Services",
      items: [
        "Salary Processing",
        "Payslip Generation",
        "Payroll Management",
      ],
    },
    {
      title: "Book Keeping",
      items: [
        "Accounts Management",
        "Ledger Maintenance",
        "Bank Reconciliation",
      ],
    },
    {
      title: "GST, ESI, EPF & PT",
      items: [
        "GST Registration",
        "GSTR-1 Filing",
        "GSTR-3B Filing",
        "GST Annual Return",
        "ESI Registration",
        "EPF Registration",
        "Professional Tax",
      ],
    },
    {
      title: "Insurance",
      items: [
        "Life Insurance",
        "Health Insurance",
        "Motor Insurance",
        "Term Insurance",
      ],
    },
  ];

  // =========================
  // CLIENT LOGIN
  // =========================

  if (page === "client") {
    return (
      <ClientLogin
        goHome={() => setPage("home")}
        login={() => setPage("clientDashboard")}
      />
    );
  }

  // =========================
  // CLIENT DASHBOARD
  // =========================

  if (page === "clientDashboard") {
    return (
      <ClientDashboard
        goHome={() => setPage("home")}
        logout={() => setPage("home")}
      />
    );
  }

  // =========================
  // ADMIN LOGIN
  // =========================

  if (page === "admin") {
    return (
      <AdminLogin
        goHome={() => setPage("home")}
        login={() => setPage("adminDashboard")}
      />
    );
  }

  // =========================
  // ADMIN DASHBOARD
  // =========================

  if (page === "adminDashboard") {
    return (
      <AdminDashboard
        goHome={() => setPage("home")}
      />
    );
  }

  // =========================
  // QUERY SUBMISSION
  // =========================

  const submitQuery = async () => {
    if (!name || !mobile || !query) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://gk-associates-backend.onrender.com/api/query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            mobile,
            query,
            service: selectedService,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            data.error ||
            "Failed to submit query."
        );
        return;
      }

      alert(
        data.message ||
          "Query submitted successfully."
      );

      setName("");
      setMobile("");
      setQuery("");
    } catch (error) {
      console.error("Query submission error:", error);

      alert(
        "Cannot connect to backend."
      );
    }
  };

  // =========================
  // HOME PAGE
  // =========================

  return (
    <div>
      {/* ================= HEADER ================= */}

      <header className="navbar">
        <div>
          <div className="logo">
            {"GK ASSOCIATES"
              .split("")
              .map((letter, index) => (
                <span
                  key={index}
                  className="rolling"
                >
                  {letter === " "
                    ? "\u00A0"
                    : letter}
                </span>
              ))}
          </div>

          <p className="tagline">
            Audit. Tax. Consulting.
          </p>
        </div>

        <nav className="menu">
          <a href="#">
            Home
          </a>

          <a
            href="#services"
            onClick={() => {
              document
                .getElementById("services")
                .scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            Services
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage("client");
            }}
          >
            Clients
          </a>

          <a
            href="#query"
            onClick={() => {
              document
                .getElementById("query")
                .scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            Contact Us
          </a>
        </nav>
      </header>

      {/* ================= HERO ================= */}

      <section className="hero">
        <div className="hero-left">
          <h3>
            WELCOME TO
          </h3>

          <h1>
            GK ASSOCIATES
          </h1>

          <h2>
            Audit. Tax. Consulting.
          </h2>

          <p>
            We provide expert financial,
            tax and compliance solutions.
          </p>

          <div className="buttons">
            <button
              onClick={() =>
                document
                  .getElementById("services")
                  .scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Our Services
            </button>

            <button
              onClick={() =>
                setPage("client")
              }
            >
              Client Login
            </button>

            <button
              onClick={() =>
                setPage("admin")
              }
            >
              Admin Login
            </button>
          </div>
        </div>

        <div className="hero-right">
          {services.map((service) => (
            <div
              key={service.title}
              className="feature-box"
            >
              <div
                className="feature"
                onClick={() =>
                  setOpenService(
                    openService === service.title
                      ? null
                      : service.title
                  )
                }
              >
                {service.title}
              </div>

              {openService === service.title && (
                <div className="dropdown">
                  {service.items.map((item) => (
                    <div
                      key={item}
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedService(item);

                        document
                          .getElementById("query")
                          .scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section
        className="services"
        id="services"
      >
        <h2>
          ALL OF OUR SERVICES
        </h2>

        <div className="service-grid">
          {services.map((service) => (
            <div
              key={service.title}
              className="card"
            >
              <h3>
                {service.title}
              </h3>

              <ul>
                {service.items.map((item) => (
                  <li key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ================= QUERY ================= */}

      <section
        className="query"
        id="query"
      >
        <h2>
          QUERY SUBMISSION
        </h2>

        <h3>
          Selected Service:{" "}
          {selectedService ||
            "Not Selected"}
        </h3>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value)
          }
        />

        <textarea
          placeholder="Enter your query"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

        <button
          onClick={submitQuery}
        >
          Submit Query
        </button>
      </section>

      {/* ================= FOOTER ================= */}

      <footer>
        © 2026 GK ASSOCIATES.
        All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;