import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Card from '../../components/Card';
import SchedulingForm from '../../components/Forms/SchedulingForm';

export default function index() {
  const [pacientes, setPacientes] = useState([]);

  return (
    <Container className="mt-5">
      <Card title="Agendamento">
        <SchedulingForm pacientes={pacientes} setPacientes={setPacientes} />
      </Card>
    </Container>
  );
}
