import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
  ContainerMain,
  Title,
  Table,
  Tr,
  Th,
  Td,
  TrashIcone,
  EditIcone,
  IconsButton,
  InputSearch,
  Thead,
  Tbody,
  ContainerTitleSearch,
  ContainerTitle,
  Phrase,
  SearchIcon,
  ContainerTitleIcon,
  SearchEmpty,
  SearchEmptyP,
} from './patientPageView.styles';

import IconPerfil from '../../../imagens/icones/edit.svg';
import LixoIcone from '../../../imagens/icones/trash.svg';
import SearchPatientIcon from '../../../imagens/icones/searchPatientIcon.png';
import SearchEmptyIcon from '../../../imagens/ilustração/search.gif';

const PatientsPageView = () => {
  const [patients, setPatients] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEmptyList, setIsEmptyList] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const nutricionista_id = user.id.toString();

    axios
      .get(
        'http://localhost:8800/patient/getPatientsByNutricionistaId/' +
          nutricionista_id,
      )
      .then((response) => {
        setPatients(response.data);
        setIsEmptyList(response.data.length === 0);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });

    axios
      .get(
        'http://localhost:8800/consulta/getConsultasByNutricionistaId/' +
          nutricionista_id,
      )
      .then((response) => {
        setConsultas(response.data);
      })
      .catch((error) => {
        console.error('Error fetching consultations:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    await axios
      .delete('http://localhost:8800/patient/deletePatientById/' + id)
      .then(({ data }) => {
        const newArray = patients.filter(
          (patient) => patient.paciente_id !== id,
        );
        setPatients(newArray);
        toast.success('Paciente deletado!');
      })
      .catch(({ data }) => toast.error(data));
  };

  return (
    <ContainerMain>
      <ContainerTitleSearch>
        {' '}
        <ContainerTitleIcon>
          <SearchIcon src={SearchPatientIcon}></SearchIcon>
          <ContainerTitle>
            <Title>Seus Pacientes!</Title>
            <Phrase>
              Encontre seus pacientes, edite ou exclua quando necessário.
            </Phrase>
          </ContainerTitle>
        </ContainerTitleIcon>
        <InputSearch
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={handleSearch}
          src="../../../imagens/icones/lupa-arredondada.png"
        />
      </ContainerTitleSearch>
      {isEmptyList ? (
        <>
          <SearchEmptyP>Não há pacientes cadastrados!</SearchEmptyP>
          <SearchEmpty src={SearchEmptyIcon} />
        </>
      ) : (
        <>
          <Table>
            <Thead>
              <Tr>
                <Th>Icone</Th>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th>Consulta marcada?</Th>
                <Th>Editar</Th>
                <Th>Excluir</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patients.map((patient) => {
                const hasConsultas = consultas.some(
                  (consulta) =>
                    consulta.paciente_id === patient.paciente_id &&
                    consulta.status === 'Agendada',
                );
                return (
                  <tr key={patient.paciente_id}>
                    <Td>img</Td>
                    <Td>{patient.nome}</Td>
                    <Td>{patient.email}</Td>
                    <Td>{patient.telefone}</Td>
                    <Td>{hasConsultas ? 'YES' : 'NO'}</Td>
                    <Td
                      style={{
                        width: '50px',
                        textAlign: 'center',
                        paddingRight: '40px',
                      }}
                    >
                      <Link to={`/perfilPaciente/${patient.paciente_id}`}>
                        <IconsButton>
                          <EditIcone src={IconPerfil} />
                        </IconsButton>
                      </Link>
                    </Td>
                    <Td style={{ width: '50px', textAlign: 'center' }}>
                      <IconsButton>
                        <TrashIcone
                          src={LixoIcone}
                          onClick={() => handleDelete(patient.paciente_id)}
                        />
                      </IconsButton>
                    </Td>
                  </tr>
                );
              })}
            </Tbody>
          </Table>
          <ToastContainer autoClose={3000} position="bottom-left" />
        </>
      )}
    </ContainerMain>
  );
};

export default PatientsPageView;
