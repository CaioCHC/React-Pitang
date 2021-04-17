import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  addDays,
} from 'date-fns';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import PatientTable from '../../components/Table/PatientTable';
import { PagesContext } from '../../pagesContextProvider';
import './data.css';

export default function Consulta() {
  const [startDate, setStartDate] = useState(addDays(new Date(), 1));
  const selectDate = `${startDate.getDate()}-${startDate.getMonth() + 1}-${startDate.getFullYear()}`;
  const [register, setRegister, maxSchedules] = useContext(PagesContext);
  let patientsSort = [];
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
      width: '50%',
    },
    {
      name: 'age',
      value: 'Idade',
      width: '10%',
    },
    {
      name: 'status',
      value: 'Status',
      width: '20%',
    },
    {
      name: 'report',
      value: 'Relatório',
      width: '10%',
    },
  ];

  return (
    <Container className="mt-5">
      <DatePicker
        className="data"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        locale={ptBR}

      />
      <PatientTable
        titles={titles}
        patients={patientsSort}
        date={selectDate}
        size={maxSchedules}
        register={register}
        setRegister={setRegister}
      />
    </Container>
  );
}
