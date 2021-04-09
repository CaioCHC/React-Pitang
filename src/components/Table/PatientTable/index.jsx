/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Table } from 'react-bootstrap';

export default function index({ title, line }) {
  return (
    <Table striped bordered hover size="sm" variant="success" responsive>
      <thead>
        <tr>
          <th>#</th>
          {Array.from({ length: title.length }).map((_, i) => (
            <th key={i}>{title[i]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: line }).map((_, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            {Array.from({ length: title.length }).map((_j, j) => (
              <td key={j}>
                Table cell
                {' '}
                {j}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
