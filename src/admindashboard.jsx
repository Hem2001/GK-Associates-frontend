import { useEffect, useState } from "react";

function AdminDashboard({ goHome }) {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQueries() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/queries"
        );

        const data = await response.json();

        console.log("API response:", data);

        setQueries(data);
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadQueries();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        padding: "40px",
      }}
    >
      <h1>Admin Dashboard</h1>

      <h2>Total Queries: {queries.length}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Name
              </th>

              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Mobile
              </th>

              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Service
              </th>

              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Query
              </th>
            </tr>
          </thead>

          <tbody>
            {queries.map((item) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {item.name}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {item.mobile}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {item.service}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {item.query}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={goHome}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default AdminDashboard;