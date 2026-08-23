import "./App.css";
import { useState } from "react";
import ClientLogin from "./ClientLogin";
import ClientDashboard from "./ClientDashboard";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function App() {
  const [page, setPage] = useState("home");
  const [selectedService, setSelectedService] = useState("");

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
  // GO TO SERVICES
  // =========================

  const goToServices = () => {
    setTimeout(() => {
      document
        .getElementById("services")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  // =========================
  // GO TO QUERY
  // =========================

  const goToQuery = () => {
    setTimeout(() => {
      document
        .getElementById("query")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  // =========================
  // SELECT SERVICE
  // =========================

  const handleServiceClick = (service) => {
    setSelectedService(service);
    goToQuery();
  };

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
      setSelectedService("");
    } catch (error) {
      console.error(
        "Query submission error:",
        error
      );

      alert("Cannot connect to backend.");
    }
  };

  // =========================
  // CLIENT LOGIN
  // =========================

  if (page === "client") {
    return (
      <ClientLogin
        goHome={() => setPage("home")}
        login={() =>
          setPage("clientDashboard")
        }
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
        login={() =>
          setPage("adminDashboard")
        }
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
  // HOME PAGE
  // =========================

  return (
    <div>

      {/* ================= HEADER ================= */}

      <header className="navbar">

        <div className="navbar-top">

          <div>

            <div className="logo">
              {"GK ASSOCIATES"
                .split("")
                .map((letter, index) => (
                  <span
                    key={index}
                    className="gk-letter"
                    style={{
                      animationDelay: `${
                        index * 0.2
                      }s`,
                    }}
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

          {/* CONTACT DETAILS */}

          <div className="contact-info">

            <div>
              📧 madhumg556@gmail.com
            </div>

            <div>
              📞 +91 8892018898
            </div>

            <div>
              📞 8904558823
            </div>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="menu">

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Home
          </a>

          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              goToServices();
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
            onClick={(e) => {
              e.preventDefault();
              goToQuery();
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
            WELCOME TO GK ASSOCIATES
          </h3>

          <h1>
            Tax, GST, Audit & Accounting Services
            in Vijayanagar, Bengaluru
          </h1>

          <h2>
            Audit. Tax. Consulting.
          </h2>

          <p>
            GK Associates provides tax audit, GST,
            income tax, accounting, bookkeeping,
            payroll and financial consulting services
            in Vijayanagar, Bengaluru, near Maruthi Mandir.
          </p>

          {/* MAIN BUTTONS */}

          <div className="buttons">

            <button
              type="button"
              onClick={goToServices}
            >
              Our Services
            </button>

            <button
              type="button"
              onClick={() =>
                setPage("client")
              }
            >
              Client Login
            </button>

            <button
              type="button"
              onClick={() =>
                setPage("admin")
              }
            >
              Admin Login
            </button>

          </div>

        </div>

        {/* ================= ROTATING SERVICE WEB ================= */}

        <div className="service-orbit">

          <div className="orbit-ring">

            {services.map(
              (service, index) => (
                <div
                  key={service.title}
                  className={`orbit-service orbit-service-${index}`}
                  onClick={() =>
                    handleServiceClick(
                      service.title
                    )
                  }
                >
                  {service.title}
                </div>
              )
            )}

          </div>

          {/* CENTER */}

          <div className="orbit-center">

            <div className="orbit-center-title">
              GK
            </div>

            <div className="orbit-center-subtitle">
              ASSOCIATES
            </div>

            <div className="orbit-center-line">
              Audit • Tax • Consulting
            </div>

          </div>

        </div>

      </section>

      {/* ================= LOCAL SEO CONTENT ================= */}

      <section
        className="local-business-info"
        style={{
          padding: "35px 20px",
          textAlign: "center",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >

        <h2>
          Tax, GST & Accounting Services in
          Vijayanagar, Bengaluru
        </h2>

        <p>
          GK Associates provides professional
          tax, GST, audit, accounting and financial
          consulting services in Vijayanagar,
          Bengaluru. We serve individuals,
          businesses and clients looking for
          reliable tax and financial assistance
          near Maruthi Mandir and surrounding
          areas.
        </p>

        <p>
          Our services include tax audit, income
          tax planning, GST registration and filing,
          bookkeeping, payroll management,
          financial reports, ESI, EPF and
          professional tax services.
        </p>

      </section>

      {/* ================= SERVICES ================= */}

      <section
        className="services"
        id="services"
      >

        <h2>
          OUR TAX, GST, AUDIT & ACCOUNTING SERVICES
          IN VIJAYANAGAR, BENGALURU
        </h2>

        <div className="service-grid">

          {services.map(
            (service) => (
              <div
                key={service.title}
                className="card"
              >

                {/* SERVICE TITLE */}

                <h3>
                  {service.title}
                </h3>

                {/* SERVICE LIST */}

                <div className="dropdown">

                  {service.items.map(
                    (item) => (
                      <div
                        key={item}
                        className="dropdown-item"
                        onClick={() =>
                          handleServiceClick(
                            item
                          )
                        }
                      >
                        {item}
                      </div>
                    )
                  )}

                </div>

                {/* ASK QUERY BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    handleServiceClick(
                      service.title
                    )
                  }
                >
                  Ask a Query
                </button>

              </div>
            )
          )}

        </div>

        {/* BOTTOM BUTTONS */}

        <div
          className="services-bottom-buttons"
          style={{
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >

          <button
            type="button"
            onClick={goToQuery}
          >
            Submit a Query
          </button>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Back to Home
          </button>

        </div>

      </section>

      {/* ================= QUERY ================= */}

      <section
        className="query"
        id="query"
      >

        <h2>
          CONTACT GK ASSOCIATES
        </h2>

        <p>
          Have a question about tax audit,
          GST filing, income tax, accounting,
          bookkeeping or other financial services
          in Vijayanagar, Bengaluru?
        </p>

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
          type="button"
          onClick={submitQuery}
        >
          Submit Query
        </button>

        {/* QUERY NAVIGATION BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >

          <button
            type="button"
            onClick={goToServices}
          >
            Back to Services
          </button>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Home
          </button>

        </div>

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