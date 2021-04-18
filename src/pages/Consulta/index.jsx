import React, { useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import ReportFile from '../../components/ReportFile';
import PatientTable from '../../components/Table/PatientTable';
import DropdownComp from '../../components/DropdownComp';
import { PagesContext } from '../../pagesContextProvider';

import './data.css';

export default function Consulta() {
  const [startDate, setStartDate] = useState(addDays(new Date(), 1));
  const selectDate = `${startDate.getDate()}-${
    startDate.getMonth() + 1
  }-${startDate.getFullYear()}`;

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
    if (a.hour < b.hour) {
      return a.hour - b.hour;
    }
    if (a.hour === b.hour && a.minutes < b.minutes) {
      return a.minutes - b.minutes;
    }
    return 0;
  });

  const titles = [
    {
      name: 'schedule',
      value: 'Horário',
      width: '10%',
      aligne: 'midle',
    },
    {
      name: 'name',
      value: 'Nome',
      width: '50%',
      aligne: 'left',
    },
    {
      name: 'age',
      value: 'Idade',
      width: '10%',
      aligne: 'midle',
    },
    {
      name: 'status',
      value: 'Status',
      width: '20%',
      render: (index, titleName) => (
        <DropdownComp
          patientsSort={patientsSort}
          index={index}
          date={selectDate}
          titleName={titleName}
          register={register}
          setRegister={setRegister}
        />
      ),
      aligne: 'midle',
    },
    {
      name: 'report',
      value: 'Relatório',
      width: '10%',
      render: (index) => (
        <ReportFile
          patientsSort={patientsSort}
          index={index}
          date={selectDate}
          register={register}
          setRegister={setRegister}
        />
      ),
      aligne: 'midle',
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
        date={selectDate}
        maxSchedules={maxSchedules}
        patientsSort={patientsSort}
      />
    </Container>
  );
}
