import axios from "axios";
import { useState } from "react";
// import API from "../api"; // axios instance
import Swal from "sweetalert2";

function AddUpdate() {
    const API = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
      });
  const [formData, setFormData] = useState({
    location: "",
    status: "",
    description: "",
    postedBy: "",
    coordinates: { lat: "", lon: "" },
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nested coordinates handling
    if (name === "lat" || name === "lon") {
      setFormData((prev) => ({
        ...prev,
        coordinates: { ...prev.coordinates, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload file to Cloudinary via backend
  const uploadFile = async () => {
    if (!file) return "";
    setUploading(true);

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await API.post("/updates/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.data.photoUrl; // return uploaded file URL
    } catch (err) {
      console.error("File upload error:", err);
      Swal.fire("Error", "File upload failed!", "error");
      return "";
    } finally {
      setUploading(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let photoUrl = "";
    if (file) {
      photoUrl = await uploadFile();
    }

    try {
      const res = await API.post("/updates", { ...formData, photoUrl });

      Swal.fire({
        title: "Success!",
        text: "New update created!",
        icon: "success",
      });

      // Reset form
      setFormData({
        location: "",
        status: "",
        description: "",
        postedBy: "",
        coordinates: { lat: "", lon: "" },
      });
      setFile(null);
    } catch (err) {
      console.error("Create update error:", err);
      Swal.fire("Error", "Failed to create update", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add Road Update</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Status</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Slow">Slow</option>
          <option value="Warning">Warning</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="postedBy"
          value={formData.postedBy}
          onChange={handleChange}
          placeholder="Posted By"
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-2">
          <input
            type="number"
            name="lat"
            value={formData.coordinates.lat}
            onChange={handleChange}
            placeholder="Latitude"
            className="w-1/2 p-2 border rounded"
            step="any"
          />
          <input
            type="number"
            name="lon"
            value={formData.coordinates.lon}
            onChange={handleChange}
            placeholder="Longitude"
            className="w-1/2 p-2 border rounded"
            step="any"
          />
        </div>

        <input type="file" onChange={handleFileChange} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit Update"}
        </button>
      </form>
    </div>
  );
}

export default AddUpdate;
