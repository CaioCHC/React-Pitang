import React from 'react';
import { Card } from 'react-bootstrap';

export default function index({ title, children }) {
  return (
    <Card>
      <div className="d-flex flex-row">
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          <Card.Body>
            <Card.Text style={{ width: '10rem' }}>
              <i>Pessoas com pelo menos 60 anos possuem prioridade no agendamento.</i>
            </Card.Text>
          </Card.Body>
        </Card.Header>
        <Card.Body>
          {children}
        </Card.Body>
      </div>
    </Card>
  );
}
