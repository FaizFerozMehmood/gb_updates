import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdatesDetailById() {
  const [responseData, setResponsedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log("id===>", id);
  const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  useEffect(() => {
    const fetchDetailById = async () => {
      try {
        setLoading(true);
        const response = await API.get(`updates/${id}`);
        setResponsedata(response.data.data);
      } catch (error) {
        setLoading(false);
      }finally{
        setLoading(false)
      }
    };
    if (id) {
      fetchDetailById();
    }
  }, [id]);
  console.log("RESPONSEDATA", responseData);
  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h3>{responseData.location}</h3>
          <p>Status: **{responseData.status}**</p>
          <p>{responseData.description}</p>
          <img
            src={responseData.photoUrl ? responseData.photoUrl : "empty"}
            alt={responseData.description}
          />
          <p>{responseData.createdAt}</p>
          <p>{responseData.verified? "✅" : "❎"}</p>
        </div>
      )}
    </div>
  );
}

export default UpdatesDetailById;
