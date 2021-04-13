/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import {
  setHours, setMinutes, addDays, getDate, getYear, getMonth,
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Modal } from 'react-bootstrap';
import FormLabel from 'react-bootstrap/FormLabel';
import './SchedulingForm.css';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import axios from '../../../utils/api';
import { PagesContext } from '../../../pagesContextProvider';

export default function SchedulingForm() {
  const [show, setShow] = useState(false);
  const [register, setRegister] = useContext(PagesContext);

  const onSubmit = async (values) => {
    const { name } = values;
    const date = `${values.scheduling.getDate()}-${values.scheduling.getMonth()}-${values.scheduling.getFullYear()}`;
    // Lógica para converter data selecionada em idade.
    const age = getYear(new Date()) - values.birth.getFullYear()
      + (getMonth(new Date()) - values.birth.getMonth() < 0 ? 1
        : (getMonth(new Date()) - values.birth.getMonth()) === 0
          ? (getDate(new Date()) - values.birth.getDate()) >= 0 ? 1 : 0 : 0);

    const patient = {
      name,
      age,
      hour: values.scheduling.getHours(),
      minutes: values.scheduling.getMinutes(),
      status: 'Aguardando',
    };
    let existingDate = false;
    let dayReference;
    // Verifica se já existe registro da data selecionada; caso sim armazena atualização da lista.
    const updatedPatients = register.map((day) => {
      if (day.id === date) {
        existingDate = true;
        dayReference = day;
        return {
          id: day.id, patients: [...day.patients, patient],
        };
      }
      return {
        ...day,
      };
    });
    // Se não existe nenhum reistro nessa data, cria novo registro com cadastro do paciente.
    if (existingDate === false) {
      const response = await axios.post('/register', { id: date, patients: [patient] });
      setRegister([...register, response.data]);
    } else { // Se existe, atualiza a lista de pacientes nessa data.
      await axios.put(`/register/${date}`, { ...dayReference, patients: [...dayReference.patients, patient] });
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
    <>
      <Modal>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>

      <Formik
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit(values);
          resetForm();
          setShow(!show);
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
    </>
  );
}
