import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import PatientTable from '../../components/Table/PatientTable';
import { PagesContext } from '../../pagesContextProvider';

export default function Consulta() {
  const [register, setRegister] = useContext(PagesContext);
  console.log(register);

  return (
    <Container className="mt-5">
      <PatientTable
        title={['Nome', 'Idade', 'Horário', 'Status']}
        patients={register}
        setPatients={setRegister}
        start={8}
        end={12.5}
        jump={0.5}
      />
    </Container>
  );
}
