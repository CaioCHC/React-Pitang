/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import {
  setHours, setMinutes, addDays, getDate, getYear, getMonth,
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Button } from 'react-bootstrap';
import FormLabel from 'react-bootstrap/FormLabel';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import axios from '../../../utils/api';
import { PagesContext } from '../../../pagesContextProvider';

export default function SchedulingForm({ maxSlots, old }) {
  const [register, setRegister, maxSchedules] = useContext(PagesContext);

  const onSubmit = async (values) => {
    const { name } = values;
    const date = `${values.scheduling.getDate()}-${values.scheduling.getMonth() + 1}-${values.scheduling.getFullYear()}`;
    // Lógica para converter data selecionada em idade.
    const age = getYear(new Date()) - values.birth.getFullYear()
      + (getMonth(new Date()) - values.birth.getMonth() < 0 ? 1
        : (getMonth(new Date()) - values.birth.getMonth()) === 0
          ? (getDate(new Date()) - values.birth.getDate()) >= 0 ? 1 : 0 : 0);

    const patient = {
      name,
      age,
      schedule: `${values.scheduling.getHours()}:${values.scheduling.getMinutes() >= 10 ? values.scheduling.getMinutes()
        : `0${values.scheduling.getMinutes()}`}`,
      hour: values.scheduling.getHours(),
      minutes: values.scheduling.getMinutes(),
      status: 'Aguardando',
      report: '',
    };
    let existingDate = false;
    let dayReference = {};
    let change = false;
    // Verifica se já existe registro da data selecionada; caso sim armazena atualização da lista.
    const updatedPatients = register.map((day) => {
      if (day.id === date) {
        existingDate = true;
        let slotCount = 0;
        let patientPosition = 0;
        let slotPatient = null;

        // checa se há posições disponiveis para o horário e se há possibilidade de troca
        day.patients.forEach((element, index) => {
          if (patient.hour === element.hour && patient.minutes === element.minutes) {
            slotCount += 1;
            if (patient.age >= old && element.age < old && slotPatient === null) {
              patientPosition = index;
              slotPatient = element;
            }
          }
        });
        // Lógica da regra de negocios
        if (slotCount < maxSlots) {
          if (day.patients.length < maxSchedules) {
            dayReference = { id: day.id, patients: [...day.patients, patient] };
            change = true;
            return {
              id: day.id, patients: [...day.patients, patient],
            };
          }console.log('Não há mais vagas nessa data');
        }
        if (patient.age >= old && slotPatient !== null) {
          // eslint-disable-next-line no-param-reassign
          day.patients[patientPosition] = { ...patient };
          dayReference = {
            id: day.id,
            patients:
            [...day.patients],
          };
          change = true;
          return {
            id: day.id, patients: [...day.patients],
          };
        }
        console.log('Não há mais vagas nesse horário');
      }
      return {
        ...day,
      };
    });
    // Se não existe nenhum registro nessa data, cria novo registro com cadastro do paciente.
    if (existingDate === false) {
      const response = await axios.post('/register', { id: date, patients: [patient] });
      setRegister([...register, response.data]);
    } else if (change) { // Se existe registro e houveram mudanças, atualiza a lista.
      await axios.put(`/register/${date}`, dayReference);
      setRegister(updatedPatients);
    }
  };
  // regras de validação do formulário
  const validationSchema = Yup.object({
    name: Yup.string().max(40, 'Nome muito longo. Use abreviações.').trim().required('Campo obrigatório'),
    birth: Yup.date().required('Campo obrigatório').nullable(),
    scheduling: Yup.date().required('Campo obrigatório').nullable(),

  });

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
      }}
      validateOnMount
      initialValues={{
        name: '',
        birth: null,
        scheduling: null,
      }}
    >
      {({ isValid }) => (
        <Form>

          <FormLabel htmlFor="name">Nome</FormLabel>
          <Field name="name" id="name" type="text" />
          <div style={{ color: 'red' }}>
            <ErrorMessage name="name" />
          </div>

          <FormLabel htmlFor="birth">Nascimento</FormLabel>
          <Field name="birth" id="birth">
            {({ form, field }) => {
              const { setFieldValue } = form;
              const { value } = field;
              return (
                <DatePicker
                  {...field}
                  selected={value} // ao reabrir, o campo selecionado anteriormente estará marcado
                  onChange={(val) => setFieldValue('birth', val)} // cada mudança no DatePicker é passada pro field
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  locale={ptBR}
                  showYearDropdown
                  dropdownMode="select"
                />
              );
            }}
          </Field>
          <div style={{ color: 'red' }}>
            <ErrorMessage name="birth" />
          </div>

          <FormLabel htmlFor="scheduling">Agendamento</FormLabel>
          <Field name="scheduling" id="scheduling">
            {({ form, field }) => {
              const { setFieldValue } = form;
              const { value } = field;

              return (
                <DatePicker
                  {...field}
                  selected={value}
                  onChange={(val) => setFieldValue('scheduling', val)}
                  showTimeSelect
                  minDate={addDays(new Date(), 1)}
                  maxDate={addDays(new Date(), 5)}
                  minTime={setHours(setMinutes(new Date(), 0), 8)}
                  maxTime={setHours(setMinutes(new Date(), 30), 12)}
                  dateFormat="dd/MM/yyyy h:mm aa"
                  timeCaption="Horário"
                  locale={ptBR}
                />
              );
            }}
          </Field>
          <div style={{ color: 'red' }}>
            <ErrorMessage name="scheduling" />
          </div>

          <Button className="mt-5" type="submit" variant="success" disabled={!isValid}>Enviar</Button>
        </Form>
      )}
    </Formik>
  );
}
