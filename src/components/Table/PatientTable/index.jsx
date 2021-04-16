/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Table } from 'react-bootstrap';

export default function Index({
  titles = [], patients, size,
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
              <th key={title.value}>
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
                    {patient[title.name]}
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
