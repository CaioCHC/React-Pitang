/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Table, Dropdown, Button, ButtonGroup,
} from 'react-bootstrap';
import axios from '../../../utils/api';

export default function Index({
  titles = [], patients, date, size, register, setRegister,
}) {
  const handleSelect = async (event, index, patient) => {
    patients[index] = { ...patient, status: event };
    const updatedPatients = register.map((day) => {
      if (day.id === date) {
        return {
          id: day.id, patients,
        };
      }
      return {
        id: day.id, patients: day.patients,
      };
    });
    setRegister(updatedPatients);
    await axios.put(`/register/${date}`, { id: date, patients });
  };
  return (
    <div>
      <Table striped bordered hover size="sm" variant="success" responsive>
        <thead>
          <tr>
            <th>
              #
            </th>
            {titles.map((title) => (
              <th key={title.value} width={title.width}>
                {title.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {titles.map((title) => (
                  <td key={title.name}>
                    {title.name !== 'status' ? patient[title.name] : (
                      <Dropdown as={ButtonGroup} onSelect={(event) => handleSelect(event, index, patient)}>
                        <Button variant="success">{patient[title.name]}</Button>
                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="Aguardando">Aguardando</Dropdown.Item>
                          <Dropdown.Item eventKey="Atendido">Atendido</Dropdown.Item>
                          <Dropdown.Item eventKey="Não atendido">Não atendido</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {Array.from({ length: (size - patients.length) }).map((_, index) => (
              <tr key={index}>
                <td>{patients.length + index + 1}</td>
                {Array.from({ length: titles.length }).map((_2, index2) => (
                  <td key={index2}>
                    ---
                  </td>
                ))}
              </tr>
            ))}
          </>
        </tbody>
      </Table>
    </div>
  );
}
