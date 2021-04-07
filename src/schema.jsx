import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().trim().required('Campo obrigatório'),
  email: Yup.string().email().required(),
});
