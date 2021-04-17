import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { getDate, getMonth, getYear } from 'date-fns';
import PatientTable from '../../components/Table/PatientTable';
import { PagesContext } from '../../pagesContextProvider';

export default function Consulta() {
  let patientsSort = [];
  const [register, setRegister] = useContext(PagesContext);
  const selectDate = `${getDate(new Date()) + 1}-${getMonth(new Date()) + 1}-${getYear(new Date())}`;

  // pega a lista de pacientes do dia especifico e cancela a busca
  for (let i = 0; i < register.length; i += 1) {
    if (register[i].id === selectDate) {
      patientsSort = [...register[i].patients];
      break;
    }
  }
  // Ordena lista de pacientes para visualização na tabela usando os dados de horas e minutos
  patientsSort.sort((a, b) => {
    if (a.hour < b.hour) { return a.hour - b.hour; }
    if (a.hour === b.hour && a.minutes < b.minutes) { return a.minutes - b.minutes; }
    return 0;
  });

  const titles = [
    {
      name: 'schedule',
      value: 'Horário',
      width: '10%',
    },
    {
      name: 'name',
      value: 'Nome',
      width: '40%',
    },
    {
      name: 'age',
      value: 'Idade',
      width: '10%',
    },
    {
      name: 'status',
      value: 'Status',
      width: '30%',
    },
    {
      name: 'report',
      value: 'Relatório',
      width: '10%',
    },
  ];

  return (
    <Container className="mt-5">
      <PatientTable
        titles={titles}
        patients={patientsSort}
        date={selectDate}
        size={20}
        register={register}
        setRegister={setRegister}
      />
    </Container>
  );
}
