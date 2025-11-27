import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Car, FuelType, BodyType, FuelTypeMap, BodyTypeMap } from './Models/Car';
import axios from 'axios';

const FuelTypeReverseMap: Record<FuelType, number> = {
  Petrol: 0,
  Hybrid: 1,
  Diesel: 2,
  LPG: 3
};

const BodyTypeReverseMap: Record<BodyType, number> = {
  Hatchback: 0,
  Sedan: 1,
  Kombi: 2,
  SUV: 3,
  Roadster: 4
};

export default function CarEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarById = async () => {
      try {
        const response = await axios.get(`https://localhost:7135/api/Cars/${id}`);
        const carData = response.data;

        setCar({
          ...carData,
          fuelType: FuelTypeMap[carData.fuelType],
          bodyType: BodyTypeMap[carData.bodyType],
        });

      } catch {
        setError('Error fetching car');
      } finally {
        setLoading(false);
      }
    };
    fetchCarById();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (car) {
      const { name, value } = e.target;

      let newValue: any = value;

      if (["doorsNumber", "luggageCapacity", "engineCapacity", "carFuelConsumption"].includes(name)) {
        newValue = value === "" ? 0 : Number(value);
      }

      setCar({ ...car, [name]: newValue });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (car) {
      try {
        const carToSave = {
          ...car,
          fuelType: FuelTypeReverseMap[car.fuelType],
          bodyType: BodyTypeReverseMap[car.bodyType]
        };

        await axios.put(`https://localhost:7135/api/Cars/${id}`, carToSave);
        navigate('/');

      } catch {
        alert("Error saving changes");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return car ? (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "20px"
      }}
    >

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={car.brand}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #aaa" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={car.model}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #aaa" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Doors Number:</label>
        <input
          type="number"
          name="doorsNumber"
          value={car.doorsNumber === 0 ? "" : car.doorsNumber}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #aaa" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Luggage Capacity:</label>
        <input
          type="number"
          name="luggageCapacity"
          value={car.luggageCapacity === 0 ? "" : car.luggageCapacity}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #aaa" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Engine Capacity:</label>
        <input
          type="number"
          name="engineCapacity"
          value={car.engineCapacity === 0 ? "" : car.engineCapacity}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #aaa" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Fuel Type:</label>
        <select
          name="fuelType"
          value={car.fuelType}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #aaa" }}
        >
          {Object.values(FuelType).map(fuel => (
            <option key={fuel} value={fuel}>{fuel}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Production Date:</label>
        <input
          type="date"
          name="productionDate"
          value={car.productionDate.slice(0, 10)}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #aaa" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Fuel Consumption:</label>
        <input
          type="number"
          name="carFuelConsumption"
          value={car.carFuelConsumption === 0 ? "" : car.carFuelConsumption}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #aaa" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Body Type:</label>
        <select
          name="bodyType"
          value={car.bodyType}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #aaa" }}
        >
          {Object.values(BodyType).map(body => (
            <option key={body} value={body}>{body}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        style={{
          padding: "10px",
          background: "black",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          width: "120px"
        }}
      >
        Save
      </button>

    </form>
  ) : null;
}



