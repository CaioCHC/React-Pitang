/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Table } from 'react-bootstrap';
import './PatientTable.css';

export default function Index({
  titles = [], patientsSort, maxSchedules,
}) {
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
            {patientsSort.map((patient, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {titles.map((title) => (
                  <td key={title.name} className={title.aligne}>
                    {title.render
                      ? title.render(index, title.name)
                      : patient[title.name]}
                  </td>
                ))}
              </tr>
            ))}

            {Array.from({ length: (maxSchedules - patientsSort.length) }).map((_, index) => (
              <tr key={index}>
                <td>{ patientsSort.length + index + 1}</td>
                {Array.from({ length: titles.length }).map((_2, index2) => (
                  <td key={index2} className="midle">
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
