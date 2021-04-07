import React from 'react';
import { Card } from 'react-bootstrap';

export default function index({ title, children }) {
  return (
    <Card>
      <div className="d-flex flex-row">
        <Card.Header className="d-flex flex-row">
          <Card.Title>{title}</Card.Title>
        </Card.Header>
        <Card.Body>
          {children}
        </Card.Body>
      </div>
    </Card>
  );
}
