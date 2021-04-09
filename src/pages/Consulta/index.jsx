import React from 'react';
import { Container } from 'react-bootstrap';
import PatientTable from '../../components/Table/PatientTable';

export default function index() {
  return (
    <Container className="mt-5">
      <PatientTable title={['Nome', 'Idade', 'Horário', 'Status']} line={20} />
    </Container>
  );
}
