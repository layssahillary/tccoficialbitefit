import React, { useState, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  ContainerPrincipal,
  ImagemPrincipal,
  Container,
  LogoBiteFit,
  ContainerRadio,
  FraseUm,
  Titulo,
  FraseDois,
  ContainerRegister,
  FraseTres,
  CadastreSe,
  FormContainer,
} from './LoginPage.styles';
import { EmailInput, PasswordInput, RadioButton } from '../../components/Input';
import { Button } from '../../components/Button/LongButton/index';
import ilustracaoLogin from '../../imagens/ilustração/ilustracaoLogin.svg';
import logoBiteFit from '../../imagens/logoBiteFit/logoBiteFit.svg';

const Login = () => {
  const [userType, setUserType] = useState('nutricionista');
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const [user, setUser] = useState(null);
  const token = useMemo(() => user?.token, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/login', {
        email: formData.email,
        senha: formData.senha,
      });

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Login realizado com sucesso!');
        setTimeout(() => {
          navigate('/initalPage');
        }, 1500);
      } else {
        toast.error('Email ou senha inválidos!');
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error('Email ou senha inválidos!');
      } else {
        toast.error('Preencha os campos!');
      }
    }
  };

  return (
    <ContainerPrincipal>
      <ImagemPrincipal src={ilustracaoLogin} alt="Logo" />
      <Container>
        <FraseUm>Que bom ver você! Seja bem-vindo!</FraseUm>
        <Titulo>Login</Titulo>
        <FraseDois>------------- O que você é? ------------- </FraseDois>
        <LogoBiteFit src={logoBiteFit} alt="Logo" />
        <FormContainer action="" onSubmit={handleSubmit}>
          <ContainerRadio>
            <RadioButton
              label="Nutricionista"
              value="nutricionista"
              selectedValue={userType}
              onChange={handleUserTypeChange}
            />
            <RadioButton
              label="Paciente"
              value="paciente"
              selectedValue={userType}
              onChange={handleUserTypeChange}
            />
          </ContainerRadio>
          <EmailInput
            label="Email:"
            placeholder="exemplo@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <PasswordInput
            label="Senha:"
            placeholder="* * * * * *"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />
          <Button type="submit" label="Login" />
        </FormContainer>
        {userType === 'nutricionista' && (
          <ContainerRegister>
            <FraseTres>Não é cadastrado?</FraseTres>
            <CadastreSe href="/nutricionistRegister">Cadastre-se</CadastreSe>
          </ContainerRegister>
        )}
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </ContainerPrincipal>
  );
};

export default Login;
