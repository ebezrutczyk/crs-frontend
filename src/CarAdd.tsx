import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, FuelType, BodyType, FuelTypeMap, BodyTypeMap } from './Models/Car';
import axios from 'axios';

const FuelTypeReverseMap: Record<FuelType, number> = {
  [FuelType.Petrol]: 0,
  [FuelType.Diesel]: 1,
  [FuelType.LPG]: 2,
  [FuelType.Hybrid]: 3,
};

const BodyTypeReverseMap: Record<BodyType, number> = {
  [BodyType.Sedan]: 0,
  [BodyType.Hatchback]: 1,
  [BodyType.Kombi]: 2,
  [BodyType.SUV]: 3,
  [BodyType.Roadster]: 4,
};

export default function CarAdd() {
  const navigate = useNavigate();

  const [car, setCar] = useState<Car>({
    id: "",
    brand: "",
    model: "",
    doorsNumber: 0,
    luggageCapacity: 0,
    engineCapacity: 0,
    fuelType: FuelType.Petrol,
    productionDate: new Date().toISOString(),
    carFuelConsumption: 0,
    bodyType: BodyType.Sedan,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue: any = value;

    if (
      [
        "doorsNumber",
        "luggageCapacity",
        "engineCapacity",
        "carFuelConsumption",
      ].includes(name)
    ) {
      newValue = value === "" ? 0 : Number(value);
    }

    setCar((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const carToSave = {
      brand: car.brand,
      model: car.model,
      doorsNumber: car.doorsNumber,
      luggageCapacity: car.luggageCapacity,
      engineCapacity: car.engineCapacity,
      fuelType: FuelTypeReverseMap[car.fuelType],
      bodyType: BodyTypeReverseMap[car.bodyType],
      productionDate: car.productionDate,
      carFuelConsumption: car.carFuelConsumption,
    };

    try {
      await axios.post("https://localhost:7135/api/Cars", carToSave);
      navigate("/");
    } catch (err) {
      alert("Error adding car");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "20px",
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
          {Object.values(FuelType).map((fuel) => (
            <option key={fuel} value={fuel}>
              {fuel}
            </option>
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
          {Object.values(BodyType).map((body) => (
            <option key={body} value={body}>
              {body}
            </option>
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
          width: "120px",
        }}
      >
        Add
      </button>
    </form>
  );
}






