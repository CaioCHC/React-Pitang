import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { getDate, getMonth, getYear } from 'date-fns';
import PatientTable from '../../components/Table/PatientTable';
import { PagesContext } from '../../pagesContextProvider';

export default function Consulta() {
  let patientsSort = [];
  const [register] = useContext(PagesContext);
  const selectDate = `${getDate(new Date()) + 1}-${getMonth(new Date()) + 1}-${getYear(new Date())}`;

  // pega a lista de pacientes do dia especifico e cancela a busca
  for (let i = 0; i < register.length; i += 1) {
    if (register[i].id === selectDate) {
      patientsSort = [...register[i].patients];
      break;
    }
  }
  // Ordena lista de pacientes para visualização na tabela
  patientsSort.sort((a, b) => {
    if (a.hour < b.hour) { return a.hour - b.hour; }
    if (a.hour === b.hour && a.minutes < b.minutes) { return a.minutes - b.minutes; }
    return 0;
  });

  const titles = [
    {
      name: 'hour',
      value: 'Horário',
    },
    {
      name: 'name',
      value: 'Nome',
    },
    {
      name: 'age',
      value: 'Idade',
    },
    {
      name: 'status',
      value: 'Status',
    },
  ];

  return (
    <Container className="mt-5">
      <PatientTable
        titles={titles}
        patients={patientsSort}
        size={20}
      />
    </Container>
  );
}
