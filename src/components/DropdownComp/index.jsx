/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import axios from '../../utils/api';
import './Dropdown.css';

export default function Index({
  patientsSort = [],
  index,
  date,
  titleName,
  register,
  setRegister,
}) {
  const [variant, setVariant] = useState('');
  const currentVariant = () => {
    if (patientsSort[index].status === 'Aguardando') {
      setVariant('secondary');
    } else if (patientsSort[index].status === 'Atendido') {
      setVariant('success');
    } else {
      setVariant('danger');
    }
  };
  const statusSelect = async (event) => {
    if (patientsSort[index].status !== event) {
      patientsSort[index] = { ...patientsSort[index], status: event };
      const updatedPatients = register.map((day) => {
        if (day.id === date) {
          return {
            id: day.id,
            patients: patientsSort,
          };
        }
        return {
          id: day.id,
          patients: day.patients,
        };
      });
      setRegister(updatedPatients);
      if (event === 'Aguardando') {
        setVariant('secondary');
      } else if (event === 'Atendido') {
        setVariant('success');
      } else {
        setVariant('danger');
      }
      try {
        await axios.put(`/register/${date}`, {
          id: date,
          patients: patientsSort,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    currentVariant();
  }, []);
  return (
    <Dropdown as={ButtonGroup} onSelect={statusSelect}>
      <Button className="buttonFixSize" variant={variant}>
        {patientsSort[index][titleName]}
      </Button>
      <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item eventKey="Aguardando">Aguardando</Dropdown.Item>
        <Dropdown.Item eventKey="Atendido">Atendido</Dropdown.Item>
        <Dropdown.Item eventKey="Não atendido">Não atendido</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
