import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ContainerSection,
  ContainerTitleImg,
  ImgBlock,
  FirstRowContainer,
  FirstRowBlocks,
  DataContainer,
  SecondRowContainer,
  SecondRowBlocks,
  ContainerSecondRowTitleImg,
  ThirdRowContainer,
  ThirdRowBlocks,
  FourthRowContainer,
  FourthImgBlock,
  PContainer,
  ImgPContainer,
  InputField,
  ContainerButton,
} from './DashboardContainer.styles';

import WeightChart from './ChartPeso.jsx';
import BodyFatChart from './ChartGordura.jsx';
import {
  calcularIdade,
  calcularTMB,
} from '../../../../utils/calculos/calculos.js';

import iconAltura from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconAltura.png';
import iconBalanca from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconBalanca.png';
import iconCalorias from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconCalorias.png';
import iconGorduraCorporal from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconGorduraCorporal.png';
import iconPeso from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconPeso.png';
import iconPesoInicial from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconPesoInicial.png';
import iconResultado from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconResultado.png';
import iconCircunferencia from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/circunferencias.png';
import { EditButton } from '../../../../Button/EditButtton/EditButton.jsx';
import { SaveButton } from '../../../../Button/SaveButton/SaveButton.jsx';
import { CancelButton } from '../../../../Button/CancelButton/CancelButton.jsx';
const DashboardContainer = (patient) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState(patient || {});
  const [patientHistory, setPatientHistory] = useState([]);

  useEffect(() => {
    const fetchPatientHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:8800/patient/getPatientEvolutionHistory/${patient.paciente_id}`,
        );
        if (response.ok) {
          const data = await response.json();
          setPatientHistory(data);
        } else {
          toast.error('Erro ao buscar histórico do paciente');
        }
      } catch (error) {
        toast.error('Erro ao fazer a requisição');
      }
    };

    if (patient) {
      fetchPatientHistory();
    }
  }, [patient]);

  const idade = patient ? calcularIdade(patient.dataNascimento) : '';
  const tmb = patient
    ? calcularTMB(patient.peso, patient.altura, idade, patient.genero)
    : '';

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditedData({ ...patient });
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8800/patient/updatePatientById/${patient.paciente_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedData),
        },
      );
      if (response.ok) {
        const updatedPatient = await response.json();
        toast.success('Dados atualizados com sucesso!');
        setEditMode(false);
        setEditedData(updatedPatient);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error('Erro ao atualizar os dados');
      }
    } catch (error) {
      toast.error('Erro ao fazer a requisição');
    }
  };

  return (
    <>
      {patient && (
        <ContainerSection>
          <h2>Estátisticas de Saude</h2>

          <FirstRowContainer>
            <FirstRowBlocks>
              <ContainerTitleImg>
                <ImgBlock src={iconAltura} alt="Altura" />
                <h2>Altura</h2>
              </ContainerTitleImg>
              <DataContainer>
                {editMode ? (
                  <InputField
                    type="text"
                    name="altura"
                    value={editedData.altura}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    <p>{patient.altura}</p>
                    <p>cm</p>
                  </>
                )}
              </DataContainer>
            </FirstRowBlocks>

            <FirstRowBlocks>
              <ContainerTitleImg>
                <ImgBlock src={iconPeso} alt="Peso" />
                <h2>Peso</h2>
              </ContainerTitleImg>
              <DataContainer>
                {editMode ? (
                  <InputField
                    type="text"
                    name="peso"
                    value={editedData.peso}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    <p>{patient.peso}</p>
                    <p>Kg</p>
                  </>
                )}
              </DataContainer>
            </FirstRowBlocks>

            <FirstRowBlocks>
              <ContainerTitleImg>
                <ImgBlock src={iconCalorias} alt="Taxa Metabólica" />
                <h2>Taxa Metabólica</h2>
              </ContainerTitleImg>
              <DataContainer>
                <>
                  <p>{tmb}</p>
                  <p>Kcal</p>
                </>
              </DataContainer>
            </FirstRowBlocks>
          </FirstRowContainer>
          <SecondRowContainer>
            <SecondRowBlocks>
              <ContainerSecondRowTitleImg>
                <ImgBlock
                  src={iconGorduraCorporal}
                  alt="Ícone gordura corporal"
                />
                <h2>% Gordura corporal</h2>
              </ContainerSecondRowTitleImg>
              <DataContainer>
                {editMode ? (
                  <InputField
                    type="text"
                    name="gordura_corporal"
                    value={editedData.gordura_corporal}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    <BodyFatChart historyData={patientHistory} />
                  </>
                )}
              </DataContainer>
            </SecondRowBlocks>

            <SecondRowBlocks>
              <ContainerSecondRowTitleImg>
                <ImgBlock src={iconPesoInicial} alt="Ícone evolução de peso" />
                <h2>Evolução de peso</h2>
              </ContainerSecondRowTitleImg>
              <DataContainer>
                {editMode ? (
                  <p>Não é possivel editar o grafico.</p>
                ) : (
                  <>
                    <WeightChart historyData={patientHistory} />
                  </>
                )}
              </DataContainer>
            </SecondRowBlocks>
          </SecondRowContainer>
          <ThirdRowContainer>
            <ThirdRowBlocks>
              <ContainerTitleImg>
                <ImgBlock
                  src={iconBalanca}
                  alt="Icone historico familiar de doencas"
                ></ImgBlock>
                <h2>IMC</h2>
              </ContainerTitleImg>
              <DataContainer>
                <p>28.67</p>
                <p>%</p>
              </DataContainer>
            </ThirdRowBlocks>
            <ThirdRowBlocks>
              <ContainerTitleImg green>
                <ImgBlock
                  src={iconResultado}
                  alt="Icone historico familiar de doencas"
                ></ImgBlock>
                <h2 style={{ color: 'green' }}>Resultado IMC</h2>
              </ContainerTitleImg>
              <DataContainer>
                <p>{patient.nome} esta com IMC NORMAL</p>
              </DataContainer>
            </ThirdRowBlocks>
          </ThirdRowContainer>
          <FourthRowContainer>
            <h2>Medidas Corporais</h2>
            <ImgPContainer>
              <FourthImgBlock
                src={iconCircunferencia}
                alt="Icone historico familiar de doencas"
              ></FourthImgBlock>
              <PContainer>
                {' '}
                {editMode ? (
                  <InputField
                    type="text"
                    name="nome"
                    value={patient.circunferencia_bracos}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    {' '}
                    <p>
                      {patient.circunferencia_bracos}{' '}
                      <span style={{ color: '#a1a1a1', fontWeight: '400' }}>
                        cm
                      </span>
                    </p>
                  </>
                )}
                {editMode ? (
                  <InputField
                    type="text"
                    name="nome"
                    value={patient.circunferencia_cintura}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    {' '}
                    <p>
                      {patient.circunferencia_cintura}{' '}
                      <span style={{ color: '#a1a1a1', fontWeight: '400' }}>
                        cm
                      </span>
                    </p>
                  </>
                )}
                {editMode ? (
                  <InputField
                    type="text"
                    name="nome"
                    value={patient.circunferencia_quadril}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    {' '}
                    <p>
                      {patient.circunferencia_quadril}{' '}
                      <span style={{ color: '#a1a1a1', fontWeight: '400' }}>
                        cm
                      </span>
                    </p>
                  </>
                )}
                {editMode ? (
                  <InputField
                    type="text"
                    name="nome"
                    value={patient.circunferencia_pernas}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    {' '}
                    <p>
                      {patient.circunferencia_pernas}{' '}
                      <span style={{ color: '#a1a1a1', fontWeight: '400' }}>
                        cm
                      </span>
                    </p>
                  </>
                )}
              </PContainer>
            </ImgPContainer>
          </FourthRowContainer>
          {editMode ? (
            <ContainerButton>
              <CancelButton handleCancel={handleCancel} />
              <SaveButton handleSave={handleSave} />{' '}
            </ContainerButton>
          ) : (
            <ContainerButton>
              <EditButton handleEdit={handleEdit} />
            </ContainerButton>
          )}
        </ContainerSection>
      )}
    </>
  );
};

export default DashboardContainer;
