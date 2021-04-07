/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Container } from 'react-bootstrap';
import Card from '../../components/Card';
import SchedulingForm from '../../components/Forms/SchedulingForm';

export default function index() {
  return (
    <Container className="mt-5">
      <Card title="Agendamento">
        <SchedulingForm />
      </Card>
    </Container>
  );
}
