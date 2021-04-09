/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes, addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';
import FormLabel from 'react-bootstrap/FormLabel';
import './SchedulingForm.css';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';

export default function index({ pacientes = [], setPacientes }) {
  const onSubmit = (values) => setPacientes([...pacientes, values.name]);

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Campo obrigatório'),
    birth: Yup.date().required().nullable('Campo obrigatório'),
    agendamento: Yup.date().required().nullable('Campo obrigatório'),
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
        agendamento: null,
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
          <Field name="birth" id="birth" field>
            {({ form, field }) => {
              const { setFieldValue } = form;
              const { value } = field;
              return (
                <DatePicker
                  {...field}
                  selected={value} // ao reabir, o campo selecionado anteriormente estará marcado
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

          <FormLabel htmlFor="agendamento">Agendamento</FormLabel>
          <Field name="agendamento" id="agendamento">
            {({ form, field = {} }) => {
              const { setFieldValue } = form;
              const { value } = field;

              return (
                <DatePicker
                  {...field}
                  selected={value}
                  onChange={(val) => setFieldValue('agendamento', val)}
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
            <ErrorMessage name="agendamento" />
          </div>

          <Button className="mt-5" type="submit" variant="success" disabled={!isValid}>Enviar</Button>
        </Form>
      )}
    </Formik>
  );
}
