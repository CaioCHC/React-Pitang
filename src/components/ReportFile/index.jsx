/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import {
  Button, Modal, FormControl,
} from 'react-bootstrap';
import axios from '../../utils/api';

export default function Index({
  patientsSort,
  index,
  date,
  register,
  setRegister,
}) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState(patientsSort[index].report);
  const handleClose = () => {
    setText(patientsSort[index].report);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const onChangeText = (event) => setText(event.target.value);
  const saveText = async () => {
    patientsSort[index] = { ...patientsSort[index], report: text };
    const updatedPatients = register.map((day) => {
      if (day.id === date) {
        return {
          id: day.id, patients: patientsSort,
        };
      }
      return {
        id: day.id, patients: day.patients,
      };
    });
    setRegister(updatedPatients);
    await axios.put(`/register/${date}`, { id: date, patients: patientsSort });
    setShow(false);
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <FaFileAlt />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Relatório</Modal.Title>
        </Modal.Header>
        <FormControl
          as="textarea"
          value={text}
          onChange={onChangeText}
        />
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={saveText}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
