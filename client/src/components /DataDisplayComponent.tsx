import React, { useState, useEffect } from "react";
import axios from "axios";

const DataDisplayComponent = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.example.com/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Data Display Component</h2>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          <h3>Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default DataDisplayComponent;
