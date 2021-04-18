/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import axios from '../../utils/api';
import './Dropdown.css';

export default function Index({
  patientsSort = [], index, date, titleName, register, setRegister,
}) {
  const statusSelect = async (event) => {
    patientsSort[index] = { ...patientsSort[index], status: event };
    const updatedPatients = register.map((day) => {
      if (day.id === date) {
        return {
          id: day.id, patients: patientsSort,
        };
      }
      return {
        id: day.id, patients: day.patients,
      };
    });
    setRegister(updatedPatients);
    await axios.put(`/register/${date}`, { id: date, patients: patientsSort });
  };
  return (
    <Dropdown as={ButtonGroup} onSelect={(event) => statusSelect(event)}>
      <Button className="buttonFixSize" variant="success">{patientsSort[index][titleName]}</Button>
      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item eventKey="Aguardando">Aguardando</Dropdown.Item>
        <Dropdown.Item eventKey="Atendido">Atendido</Dropdown.Item>
        <Dropdown.Item eventKey="Não atendido">Não atendido</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
