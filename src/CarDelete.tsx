import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function CarDelete() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7135/api/Cars/${id}`);
      navigate("/");
    } catch {
      alert("Error deleting car");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}
    >
      <h2>Are you sure you want to delete the car?</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <button
          onClick={handleDelete}
          style={{
            padding: "10px",
            background: "red",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100px"
          }}
        >
          Delete
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px",
            background: "gray",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100px"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

