import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Validate from '../../../context/RegisterValidate.js';
import { useNavigate } from 'react-router-dom';

import {
  ContainerPrincipal,
  ImagemPrincipal,
  Container,
  LogoBiteFit,
  FraseUm,
  Titulo,
  ContainerLogin,
  FraseTres,
  LoginButton,
  Error,
} from './NutricionistRegister.styles.js';

import ilustracaoNutricionistRegister from '../../../imagens/ilustração/ilustracaoNutricionistRegister.svg';
import logoBiteFit from '../../../imagens/logoBiteFit/logoBiteFit.svg';

import { EmailInput, PasswordInput, TextInput } from '../../Input/index.jsx';
import { Button } from '../../Button/LongButton/index';

const NutricionistRegister = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    crn: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = Validate(formData);
    setErrors(formErrors);

    try {
      const response = await axios.post(
        'http://localhost:8800/nutricionist/nutricionistRegister',
        formData,
      );
      toast.success('Nutricionista registrado com sucesso!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error(
        'Erro ao registrar:',
        error.response ? error.response.data : error.message,
      );
      toast.error(error.response ? error.response.data : 'Erro ao registrar');
    }
  };

  return (
    <ContainerPrincipal>
      <ImagemPrincipal src={ilustracaoNutricionistRegister} alt="Logo" />
      <Container>
        <FraseUm>Que bom ver você! Seja bem-vindo!</FraseUm>
        <Titulo>Cadastre-se</Titulo>
        <LogoBiteFit src={logoBiteFit} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Nome Completo:"
            placeholder="Fulano de Tal"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <TextInput
            label="CRN:"
            placeholder="0000-00"
            name="crn"
            value={formData.crn}
            onChange={handleChange}
          />
          <EmailInput
            label="Email:"
            placeholder="exemplo@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <Error>{errors.email}</Error>}
          <PasswordInput
            label="Senha:"
            placeholder="* * * * * *"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />
          {errors.senha && <Error>{errors.senha}</Error>}
          <PasswordInput
            label="Confirmar Senha:"
            placeholder="* * * * * *"
            name="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
          />
          {errors.confirmarSenha && <Error>{errors.confirmarSenha}</Error>}
          <Button type="submit" label="Registre-se" />{' '}
        </form>
        <ContainerLogin>
          <FraseTres>Já é cadastrado?</FraseTres>
          <LoginButton href="/login">Login</LoginButton>
        </ContainerLogin>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />{' '}
    </ContainerPrincipal>
  );
};

export default NutricionistRegister;
