import { useEffect, useState } from "react";
import { Car, FuelTypeMap, BodyTypeMap } from "./Models/Car";
import axios from "axios";
import { useParams } from "react-router-dom";
import api from "./api";


export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCarById = async () => {
      try {
        const response = await api.get(`/Cars/${id}`);
        const data = response.data;

        setCar({
          ...data,
          fuelType: FuelTypeMap[data.fuelType],
          bodyType: BodyTypeMap[data.bodyType],
        });
      } catch (err) {
        setError("Error fetching cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCarById();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Car Details</h1>

      {car && (
        <table
          style={{
            borderCollapse: "collapse",
            width: "400px",
            marginTop: "20px",
            marginLeft: "20px",
          }}
        >
          <tbody>

            <tr>
              <td style={{ border: "1px solid black", padding: "8px", fontWeight: "bold" }}>Brand</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{car.brand}</td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", padding: "8px", fontWeight: "bold" }}>Model</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{car.model}</td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", padding: "8px", fontWeight: "bold" }}>Production Date</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {new Date(car.productionDate).toLocaleDateString("pl-PL")}
              </td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", padding: "8px", fontWeight: "bold" }}>Doors</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{car.doorsNumber}</td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", padding: "8px", fontWeight: "bold" }}>Luggage Capacity</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{car.luggageCapacity}</td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", padding: "8px", fontWeight: "bold" }}>Engine Capacity</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{car.engineCapacity}</td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", padding: "8px", fontWeight: "bold" }}>Fuel Type</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{car.fuelType}</td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", padding: "8px", fontWeight: "bold" }}>Body Type</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{car.bodyType}</td>
            </tr>

            <tr>
              <td style={{ border: "1px solid black", padding: "8px", fontWeight: "bold" }}>Fuel Consumption</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{car.carFuelConsumption}</td>
            </tr>

          </tbody>
        </table>
      )}
    </div>
  );
}

