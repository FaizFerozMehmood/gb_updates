import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function ShowAll() {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  useEffect(() => {
    const showUpdates = async () => {
      try {
        const response = await API.get("updates");
        setResponseData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    showUpdates();
  }, []);

  const handleToggleVerify = async (id, verified) => {
    const action = verified ? "unverify" : "verify";

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${action} this update.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action} it!`,
      cancelButtonText: "Cancel",
      confirmButtonColor: verified ? "#d33" : "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        const res = await API.put(`/updates/${id}/verify`);

        // Updatation of UI immediately.....!
        setResponseData((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, verified: res.data.verified } : item
          )
        );

        Swal.fire({
          title: "Success!",
          text: `Update has been ${
            res.data.verified ? "verified" : "unverified"
          }.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error toggling verification:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while updating status.",
          icon: "error",
        });
      }
    }
  };

  const handleDeleteUpdate = async (id) => {
    const response = await API.delete(`updates/${id}`);
    console.log(response, "----respo", id, "id===");

    setResponseData((prev) => prev.filter((item) => item._id !== id));
  };

  console.log(responseData);
  if (loading) return <h2 className="text-center">Loading updates...</h2>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>

      {responseData.length === 0 ? (
        <p>No updates available</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Verified</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((u) => (
              <tr key={u._id}>
                <td className="p-2 border">{u.location}</td>
                <td className="p-2 border">{u.status}</td>
                <td className="p-2 border">
                  {u.verified ? "✅ Yes" : "❌ No"}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleToggleVerify(u._id, u.verified)}
                    className={`px-3 py-1 rounded text-white ${
                      u.verified ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {u.verified ? "Unverify" : "Verify"}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDeleteUpdate(u._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShowAll;
