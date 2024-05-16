import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Validate from '../../../context/RegisterValidate';
import 'react-toastify/dist/ReactToastify.css';
import {
  ContainerDatas,
  ContainerTitleMain,
  DataIcon,
  ContainerTitle,
  Phrase,
  Title,
  ContainerInputs,
  ContainerDivFirst,
  ContainerDivSecond,
  ContainerDivThird,
  ContainerDivFourst,
  ContainerInput,
  Label,
  TextInputStyled,
  DateInputStyled,
  SelectInputStyled,
  NumberInputStyled,
  EmailInputStyled,
  PasswordInputStyled,
  ContainerDivTwo,
  ContainerDataIlustration,
  Ilustracao,
  ContainerInputsIlustration,
  ContainerButton,
  SquareImg,
  SquareImg2,
  GradientImgFloor,
  ArrowButton,
  LeftArrowIcon,
  RightArrowIcon,
  SubmitButton,
  ProgressBar,
  Progress,
  DataIconMedidas
} from './PatientRegister.styles';

import ErrorComponente from '../../ErrorMessage/ErrorMessage';

import squareImg from '../../../imagens/decor/ball.svg';
import gradientFloorImg from '../../../imagens/decor/verdeVetor.svg';

import iconeDados from '../../../imagens/icones/iconeDados.svg';
import iconeBiodados from '../../../imagens/icones/iconeBiodados.svg';
import IlustracaoGirlInput from '../../../imagens/ilustração/meninainputs.svg';
import IlustracaoBoyInput from '../../../imagens/ilustração/meninoinputs.svg';
import iconeMedidas from '../../../imagens/icones/medidas.png';

const PatientRegisterView = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmar_senha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!checkRequiredFields(formData)) {
        return toast.warn('Preencha todos os campos obrigatórios!');
      }

      const formErrors = Validate(formData);
      setErrors(formErrors);

      if (Object.keys(formErrors).length > 0) {
        return toast.warn('Preencha todos os campos corretamente!');
      }
    }

    try {
      await axios.post(
        'http://localhost:8800/patient/patientRegister',
        formData,
      );
      toast.success('Paciente registrado com sucesso!');
      setFormData({
        nome: '',
        email: '',
        senha: '',
        confirmar_senha: '',
        genero: '',
        dataNascimento: '',
        peso: '',
        altura: '',
        telefone: '',
        observacao: '',
        historico_familiar_doencas: '',
        doencas_cronicas: '',
        medicamentos_em_uso: '',
        exames_de_sangue_relevantes: '',
        alergia: '',
        restricao_alimentar: '',
        habitos_alimentares: '',
        frequencia_exercicio_semanal: '',
        circunferencia_bracos: '',
        circunferencia_cintura: '',
        circunferencia_quadril: '',
        circunferencia_pernas: '',
      });
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const checkRequiredFields = ({ nome, email, senha, confirmar_senha }) => {
    return !!(
      nome.trim().length > 0 &&
      email.trim().length > 0 &&
      senha.length > 0 &&
      confirmar_senha.length > 0
    );
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setFormData({
        ...formData,
        nutricionista_id: user.id.toString(),
      });
    }
  }, []);
  const [genero, setGenero] = useState('');

  const handleChangeGenero = (event) => {
    setGenero(event.target.value);
    setFormData({
      ...formData,
      genero: event.target.value,
    });
  };

  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
    setProgress(progress + 50); // 33.33 para 3 steps
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
    setProgress(progress - 50);
  };

  const PrevButton = ({ onClick }) => (
    <ArrowButton onClick={onClick}>
      <LeftArrowIcon /> Voltar
    </ArrowButton>
  );

  const NextButton = ({ onClick }) => (
    <ArrowButton onClick={onClick}>
      Próximo <RightArrowIcon />
    </ArrowButton>
  );

  const [progress, setProgress] = useState(0);


  return (
    <>
      <SquareImg src={squareImg} alt="Square Decor" />
      <SquareImg2 src={squareImg} alt="Square Decor" />
      <ProgressBar>
      <Progress progress={progress}></Progress>
    </ProgressBar>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <ContainerDatas>
            <ContainerTitleMain>
              <DataIcon src={iconeDados} alt="Icone dados pessoais"></DataIcon>
              <ContainerTitle>
                <Phrase>Cadastre um paciente e faça parte da mudança!</Phrase>
                <Title>Dados Pessoais</Title>
              </ContainerTitle>
            </ContainerTitleMain>

            <ContainerInputs>
              <ContainerDivFirst>
                <ContainerInput>
                  <Label htmlFor="text">Nome:</Label>
                  <TextInputStyled
                    type="text"
                    placeholder="ex: Ana santos"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </ContainerInput>
                <ContainerInput>
                  <Label htmlFor="dateInput">Data de Nascimento:</Label>
                  <DateInputStyled
                    type="date"
                    placeholder="Data de Nascimento:"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                  />
                </ContainerInput>
                <ContainerInput>
                  <Label htmlFor="genero">Gênero:</Label>
                  <SelectInputStyled
                    id="genero"
                    name="genero"
                    value={genero}
                    onChange={handleChangeGenero}
                  >
                    <option value="">Selecione</option>
                    <option value="F">Feminino</option>
                    <option value="M">Masculino</option>
                  </SelectInputStyled>
                </ContainerInput>
                <ContainerInput>
                  <Label htmlFor="number">Peso</Label>
                  <NumberInputStyled
                    type="number"
                    placeholder="0,00"
                    name="peso"
                    value={formData.peso}
                    onChange={handleChange}
                  />
                </ContainerInput>
                <ContainerInput>
                  <Label htmlFor="number">Altura</Label>
                  <NumberInputStyled
                    type="number"
                    placeholder="0,00"
                    name="altura"
                    value={formData.altura}
                    onChange={handleChange}
                  />
                </ContainerInput>
              </ContainerDivFirst>
              <ContainerDivSecond>
                <ContainerInput>
                  <Label htmlFor="email">Email</Label>
                  <EmailInputStyled
                    type="email"
                    placeholder="email@email.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <ErrorComponente>{errors.email}</ErrorComponente>
                  )}
                </ContainerInput>
                <ContainerInput>
                  <Label htmlFor="text">Telefone:</Label>
                  <TextInputStyled
                    type="text"
                    placeholder="0000-0000"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </ContainerInput>
              </ContainerDivSecond>
              <ContainerDivThird>
                <ContainerInput>
                  <Label htmlFor="password">Senha:</Label>
                  <PasswordInputStyled
                    type="password"
                    placeholder="* * * * *"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                  />
                  {errors.senha && (
                    <ErrorComponente>{errors.senha}</ErrorComponente>
                  )}
                </ContainerInput>
                <ContainerInput>
                  <Label htmlFor="password">Confirmar Senha:</Label>
                  <PasswordInputStyled
                    type="password"
                    placeholder="* * * * *"
                    name="confirmar_senha"
                    value={formData.confirmar_senha}
                    onChange={handleChange}
                  />
                  {errors.confirmar_senha && (
                    <ErrorComponente>{errors.confirmar_senha}</ErrorComponente>
                  )}
                </ContainerInput>
              </ContainerDivThird>
              <ContainerDivFourst>
                <ContainerInput>
                  <Label htmlFor="text">Observacao</Label>
                  <TextInputStyled
                    type="text"
                    placeholder="..."
                    name="observacao"
                    value={formData.observacao}
                    onChange={handleChange}
                  />
                </ContainerInput>
              </ContainerDivFourst>
            </ContainerInputs>
          </ContainerDatas>
        )}
        {step === 2 && (
          <ContainerDatas>
            <ContainerTitleMain>
              <DataIcon src={iconeBiodados} alt="Icon Biodados"></DataIcon>
              <ContainerTitle>
                <Title>Questionário de Anamnese Nutricional</Title>
              </ContainerTitle>
            </ContainerTitleMain>

            <ContainerInputs>
              <ContainerDivTwo>
                <ContainerInput>
                  <Label htmlFor="text">Histórico Familiar de Doenças:</Label>
                  <TextInputStyled
                    type="text"
                    placeholder=" ex: Diabetes e asma"
                    name="historico_familiar_doencas"
                    value={formData.historico_familiar_doencas}
                    onChange={handleChange}
                  />
                </ContainerInput>

                <ContainerInput>
                  <Label htmlFor="text">Doenças Crônicas:</Label>
                  <TextInputStyled
                    type="text"
                    placeholder="ex: Pressão alta"
                    name="doencas_cronicas"
                    value={formData.doencas_cronicas}
                    onChange={handleChange}
                  />
                </ContainerInput>
              </ContainerDivTwo>
              <ContainerDivTwo>
                <ContainerInput>
                  <Label htmlFor="text">Medicamentos em Uso:</Label>
                  <TextInputStyled
                    type="text"
                    placeholder="ex: Anticoncepcional"
                    name="medicamentos_em_uso"
                    value={formData.medicamentos_em_uso}
                    onChange={handleChange}
                  />
                </ContainerInput>
                <ContainerInput>
                  <Label htmlFor="text">Exames de Sangue Relevantes:</Label>
                  <TextInputStyled
                    type="text"
                    placeholder="ex: HDL e LDL altos"
                    name="exames_de_sangue_relevantes"
                    value={formData.exames_de_sangue_relevantes}
                    onChange={handleChange}
                  />
                </ContainerInput>
              </ContainerDivTwo>
              <ContainerDivTwo>
                <ContainerInput>
                  <Label htmlFor="text">Poussui alergia? se sim quais?</Label>
                  <TextInputStyled
                    type="text"
                    placeholder="ex: alergia a amendoin"
                    name="alergia"
                    value={formData.alergia}
                    onChange={handleChange}
                  />
                </ContainerInput>
                <ContainerInput>
                  <Label htmlFor="text">
                    Possui restrição alimentar? se sim quais?
                  </Label>
                  <TextInputStyled
                    type="text"
                    placeholder="ex: Vegetariano e alergico a gluten"
                    name="restricao_alimentar"
                    value={formData.restricao_alimentar}
                    onChange={handleChange}
                  />
                </ContainerInput>
              </ContainerDivTwo>
              <ContainerDivTwo>
                <ContainerInput>
                  <Label htmlFor="text">Hábitos Alimentares:</Label>
                  <TextInputStyled
                    type="text"
                    placeholder="ex: café da manha balanceado, come 2x ao dia, etc..."
                    name="habitos_alimentares"
                    value={formData.habitos_alimentares}
                    onChange={handleChange}
                  />
                </ContainerInput>
                <ContainerInput>
                  <Label htmlFor="text">
                    Quantas vezes faz exercício (semanal):
                  </Label>
                  <TextInputStyled
                    type="text"
                    placeholder="ex: Pratica musculação 3x na semana"
                    name="frequencia_exercicio_semanal"
                    value={formData.frequencia_exercicio_semanal}
                    onChange={handleChange}
                  />
                </ContainerInput>
              </ContainerDivTwo>
            </ContainerInputs>
          </ContainerDatas>
        )}
        {step === 3 && (
          <ContainerDatas>
            <ContainerTitleMain>
              <DataIconMedidas src={iconeMedidas} alt="Icon Biodados"></DataIconMedidas>
              <ContainerTitle>
                <Title>Circunferências Corporais</Title>
              </ContainerTitle>
            </ContainerTitleMain>
            <ContainerDataIlustration>
            <Ilustracao
              src={
                formData.genero === 'M'
                  ? IlustracaoBoyInput
                  : IlustracaoGirlInput
              }
              alt="Ilustracao com inputs de medidas"
            ></Ilustracao>
            <ContainerInputsIlustration>
              <TextInputStyled
                type="text"
                placeholder="Circunferência dos braços"
                name="circunferencia_bracos"
                value={formData.circunferencia_bracos}
                onChange={handleChange}
              />
              <TextInputStyled
                type="text"
                placeholder="Circunferência da cintura"
                name="circunferencia_cintura"
                value={formData.circunferencia_cintura}
                onChange={handleChange}
              />
              <TextInputStyled
                type="text"
                placeholder="Circunferência do quadril"
                name="circunferencia_quadril"
                value={formData.circunferencia_quadril}
                onChange={handleChange}
              />
              <TextInputStyled
                type="text"
                placeholder="Circunferência das pernas"
                name="circunferencia_pernas"
                value={formData.circunferencia_pernas}
                onChange={handleChange}
              />
            </ContainerInputsIlustration>
            <GradientImgFloor src={gradientFloorImg} alt="Gradient decor" />
          </ContainerDataIlustration>
          </ContainerDatas>

        )}
        <ContainerButton>
          {step !== 1 && step !== 4 && <PrevButton onClick={handlePrevStep} />}
          {step !== 3 && <NextButton onClick={handleNextStep} />}
          {step === 3 && (
            <SubmitButton type="submit" onClick={handleSubmit}>
              Registrar Paciente
            </SubmitButton>
          )}
        </ContainerButton>
      </form>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default PatientRegisterView;
