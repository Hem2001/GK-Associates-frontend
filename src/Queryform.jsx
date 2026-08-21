import { useState } from "react";
import QueryForm from "./QueryForm";

function QueryForm({
  selectedService,
}) {
  const [name, setName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [query, setQuery] =
    useState("");

  const submitQuery = async () => {
    const response = await fetch(
      "http://localhost:5000/api/query",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          mobile,
          query,
          service: selectedService,
        }),
      }
    );

    const data =
      await response.json();

    alert(data.message);
  };

  return (
    <>
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
    </>
  );
}

export default QueryForm;