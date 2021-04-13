import React from 'react';
import { Container } from 'react-bootstrap';
import Card from '../../components/Card';
import SchedulingForm from '../../components/Forms/SchedulingForm';

export default function Agendamento() {
  return (
    <Container className="mt-5">
      <Card title="Agendamento">
        <SchedulingForm />
      </Card>
    </Container>
  );
}
