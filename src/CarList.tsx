import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Car, FuelTypeMap } from './Models/Car';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    const buttonStyle = {
    margin: '5px',
    backgroundColor: '#e0e0e0',
    color: 'black',
    borderRadius: '8px',
    padding: '6px 14px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
  };

  useEffect(() => {
    setLoading(true); 
    
    axios.get<Car[]>('https://localhost:7135/api/Cars/')
        .then((response) => {
            setCars(response.data);
        })
        .catch(() => {
            setError('Error fetching cars');
        })
        .finally(() => {
            setLoading(false);
        });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div>
      <h1>Car List - Brand, Model, Year of Production</h1>
      <ul>
      {cars.map(car => (
        <li key={car.id}>
          <h2>
            {car.brand} {car.model} {car.productionDate.substring(0, 4)}
            <Button as={NavLink} to={`/cars/${car.id}`} style={buttonStyle}>
              Details
            </Button>
            <Button as={NavLink} to={`/edit/${car.id}`} style={buttonStyle}>
              Edit
            </Button>
            <Button as={NavLink} to={`/delete/${car.id}`} style={buttonStyle}>
              Delete
            </Button>
          </h2>
        </li>
      ))}
    </ul>

    </div>
  );
}