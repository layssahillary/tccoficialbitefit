import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ContainerMain,
  FormContainer,
  SelectContainer,
  DateContainer,
  HourContainer,
  ObservationContainer,
  ContainerTitleIcon,
  SearchIcon,
  ContainerTitle,
  Title,
  Phrase,
  TitleDateContainer,
  CalendarioIconStyle,
  RowTwoContainer,
  SelectInput,
  Table,
  Th,
  Tr,
  Td,
  ButtonGreen,
  Select,
  ContainerButtonSubmit,
  ContainerTitleAndSearch,
  BookIcon,
  LixeiraIcon,
  ButtonDelete,
} from './consultationView.styles';
import CardComponent from '../../ModalDelete/ModalDelete.jsx';
import { InputSearch } from '../PatientsPageView/patientPageView.styles';
import consultaCalendario from '../../../imagens/icones/consultationView/consultaCalendario.png';
import calendarioIcon from '../../../imagens/icones/consultationView/calendario.png';
import comentarioIcon from '../../../imagens/icones/consultationView/comentario.png';
import cadernoIcon from '../../../imagens/icones/consultationView/caderno.png';
import relogioIcon from '../../../imagens/icones/consultationView/relogio.png';

import closeButton from '../../../imagens/icones/closeButton.svg';
const ConsultationForm = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    paciente_id: '',
    dataConsulta: '',
    horaConsulta: '',
    observacao: '',
    nutricionista_id: '',
  });
  const [consultations, setConsultations] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const nutricionista_id = user.id.toString();
    setFormData({
      ...formData,
      nutricionista_id,
    });

    axios
      .get(
        'http://localhost:8800/consultation/getConsultasByNutricionistaId/' +
          nutricionista_id,
      )
      .then((response) => {
        setConsultations(response.data);
        console.log('>>>', response.data);
      })
      .catch((error) => {
        console.error('Error fetching consultations:', error);
      });

    axios
      .get(
        'http://localhost:8800/patient/getPatientsByNutricionistaId/' +
          nutricionista_id,
      )
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);
  const handleDeleteConsulta = async (consultaId) => {
    try {
      await axios.delete(
        `http://localhost:8800/consultation/deleteConsultaById/${consultaId}`,
      );
      toast.success('Consulta excluida com sucesso!');
      // Atualize a lista de consultas após a exclusão bem-sucedida
      setConsultations(
        consultations.filter((consulta) => consulta.consulta_id !== consultaId),
      );
      // Ocultar o modal de confirmação após a exclusão
      setShowDeleteConfirmation(false);
    } catch (error) {
      return toast.warn('Ocorreu um erro ao excluir a consulta.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'paciente_id') {
      setSelectedPatientId(value);
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleHourClick = (hour) => {
    setFormData({
      ...formData,
      horaConsulta: hour,
    });
    console.log('/>>', hour);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verifica se algum campo obrigatório não foi preenchido
    if (!formData.paciente_id || !formData.dataConsulta || !formData.horaConsulta ) {
      return toast.error('Por favor, preencha todos os campos obrigatórios.');
    }
  
    const formattedDate = formData.dataConsulta.toISOString().split('T')[0];
  
    try {
      await axios.post(
        'http://localhost:8800/consultation/scheduleConsultation',
        {
          ...formData,
          dataConsulta: formattedDate,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      toast.success('Consulta agendada com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      return toast.warn('Ocorreu um erro ao agendar a consulta.');
    }
  };
  
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [consultaIdToDelete, setConsultaIdToDelete] = useState(null);

  // Função para abrir o modal de confirmação de exclusão
  const handleOpenDeleteConfirmation = (consultaId) => {
    setConsultaIdToDelete(consultaId);
    setShowDeleteConfirmation(true);
  };

  // Função para fechar o modal de confirmação de exclusão
  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };
  return (
    <ContainerMain>
      <ContainerTitleIcon>
        <SearchIcon src={consultaCalendario}></SearchIcon>
        <ContainerTitle>
          <Title>Consultas!</Title>
          <Phrase>Agende e visualize suas consultas.</Phrase>
        </ContainerTitle>
      </ContainerTitleIcon>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <SelectContainer>
            <label htmlFor="paciente_id">Nome do paciente:</label>
            <SelectInput
              id="paciente_id"
              name="paciente_id"
              value={selectedPatientId}
              onChange={handleChange}
            >
              <option value="">Selecione um paciente</option>
              {patients.map((patient) => (
                <option key={patient.paciente_id} value={patient.paciente_id}>
                  {patient.nome}
                </option>
              ))}
            </SelectInput>
          </SelectContainer>
          <RowTwoContainer>
            <DateContainer>
              <TitleDateContainer>
                <CalendarioIconStyle src={calendarioIcon}></CalendarioIconStyle>
                <label>Data da Consulta:</label>
              </TitleDateContainer>
              <div className="datepicker-container">
                <DatePicker
                  selected={formData.dataConsulta}
                  onChange={(date) =>
                    setFormData({ ...formData, dataConsulta: date })
                  }
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecione a data da consulta"
                  inline // Adicionando a propriedade inline aqui
                />
              </div>
            </DateContainer>
            <HourContainer>
              <TitleDateContainer>
                <CalendarioIconStyle src={relogioIcon}></CalendarioIconStyle>
                <label>Horário da Consulta:</label>
              </TitleDateContainer>

              <div className="hour-tags">
                {[...Array(12).keys()].map((hour) => {
                  const formattedHour = `${hour + 8}:00`;
                  return (
                    <ButtonGreen
                      key={formattedHour}
                      className={
                        formData.horaConsulta === formattedHour
                          ? 'selected'
                          : ''
                      }
                      onClick={() => handleHourClick(formattedHour)}
                      type="button"
                    >
                      {formattedHour}
                    </ButtonGreen>
                  );
                })}
              </div>
            </HourContainer>

            <ObservationContainer>
              <TitleDateContainer>
                <CalendarioIconStyle src={comentarioIcon}></CalendarioIconStyle>
                <label htmlFor="observacao">Observação:</label>
              </TitleDateContainer>

              <textarea
                id="observacao"
                name="observacao"
                value={formData.observacao}
                onChange={handleChange}
                placeholder="Digite sua observação aqui..."
              ></textarea>
            </ObservationContainer>
          </RowTwoContainer>
        </FormContainer>
        <ContainerButtonSubmit>
          <ButtonGreen type="submit">Agendar Consulta</ButtonGreen>
        </ContainerButtonSubmit>
      </form>
      <ContainerTitleAndSearch>
        <ContainerTitleIcon>
          <BookIcon src={cadernoIcon}></BookIcon>
          <ContainerTitle>
            <Title>Suas Consultas:</Title>
          </ContainerTitle>
        </ContainerTitleIcon>
        <InputSearch
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={handleSearch}
          src="../../../../imagens/icones/lupa-arredondada.png"
        />
      </ContainerTitleAndSearch>
      <Table>
        <thead>
          <Tr>
            <Th>Paciente</Th>
            <Th>Data</Th>
            <Th>Horário</Th>
            <Th>Status</Th>
            <Th style={{ display: 'flex', justifyContent: 'center' }}>
              Cancelar Consulta
            </Th>
          </Tr>
        </thead>
        <tbody>
          {consultations
            .filter((consulta) => {
              const paciente = patients.find(
                (patient) => patient.paciente_id === consulta.paciente_id,
              );
              return (
                paciente &&
                paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
              );
            })
            .map((consulta) => {
              const paciente = patients.find(
                (patient) => patient.paciente_id === consulta.paciente_id,
              );
              return (
                <Tr key={consulta.consulta_id}>
                  <Td>
                    {paciente ? paciente.nome : 'Paciente não encontrado'}
                  </Td>
                  <Td>
                    {new Date(consulta.dataConsulta).toLocaleDateString()}
                  </Td>
                  <Td>{consulta.horaConsulta.substring(0, 5)}</Td>
                  <Td>
                    <Select>
                      <option value="agendada">Agendada</option>
                      <option value="realizada">Realizada</option>
                    </Select>
                  </Td>
                  <Td style={{ display: 'flex', justifyContent: 'center' }}>
                    <ButtonDelete
                      onClick={() =>
                        handleOpenDeleteConfirmation(consulta.consulta_id)
                      }
                    >
                      <LixeiraIcon src={closeButton} alt="" />
                    </ButtonDelete>
                  </Td>
                </Tr>
              );
            })}
        </tbody>
        {showDeleteConfirmation && (
          <CardComponent
            heading="Confirmação de exclusão"
            description="Tem certeza de que deseja excluir esta consulta?"
            cancelText="Cancelar"
            deleteText="Excluir"
            onCancel={handleCloseDeleteConfirmation}
            onDelete={() => handleDeleteConsulta(consultaIdToDelete)}
            show={showDeleteConfirmation} // Passa a variável showDeleteConfirmation como prop
          />
        )}
      </Table>
      <ToastContainer autoClose={3000} position="bottom-left" />{' '}
    </ContainerMain>
  );
};

export default ConsultationForm;
