import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function GetUpdates() {
  const [updates, setUpdates] = useState([]);
  const navigate = useNavigate();

  const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await API.get("/updates");
        setUpdates(response.data);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchUpdates();
  }, []);

  const handleDeatailsByID = (id) => [
    // console.log("clicked",id)
    navigate(`/updates/${id}`),
  ];
  
  console.log(updates);
  return (
    <div>
      <h2>All Updates</h2>
      {updates.length > 0 ? (
        <ul>
          {updates.map((item, index) => (
            <li key={index}>
              <strong>{item.location}</strong> — {item.status}
              <br />
              {item.description}
              <img
               style={{
                height:"100px"
               }}

                src={item.photoUrl ? item.photoUrl : "empty"}
                alt={item.description}
              />
              <button onClick={() => handleDeatailsByID(item._id)}>
                see details
              </button>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No updates found.</p>
      )}
    </div>
  );
}

export default GetUpdates;
