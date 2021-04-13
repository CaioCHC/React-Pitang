/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Table } from 'react-bootstrap';

export default function index({
  title = [], start, end, jump,
}) {
  const reservations = (((end - start) / jump) + 1);

  return (
    <Table striped bordered hover size="sm" variant="success" responsive>
      <thead>
        <tr>
          <th>#</th>
          {Array.from({ length: title.length }).map((_, i) => (
            <th key={title[i]}>{title[i]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: reservations }).map((_i, i) => (
          <>
            <tr key={i}>
              <td>
                {`
                ${(((start + (i * jump)) * 60) - (((start + (i * jump)) * 60) % 60)) / 60}:${((start + (i * jump)) * 60) % 60}
                `}
              </td>
              {Array.from({ length: title.length }).map((_j, j) => (
                <td key={j}>
                  cel1
                </td>

              ))}
            </tr>

            <tr>
              <td>
                {`
                ${(((start + (i * jump)) * 60) - (((start + (i * jump)) * 60) % 60)) / 60}:${((start + (i * jump)) * 60) % 60}
                `}
              </td>
              {Array.from({ length: title.length }).map((_k, k) => (
                <td key={k + 1}>
                  {k}

                </td>

              ))}

            </tr>
          </>

        ))}
      </tbody>
    </Table>
  );
}
