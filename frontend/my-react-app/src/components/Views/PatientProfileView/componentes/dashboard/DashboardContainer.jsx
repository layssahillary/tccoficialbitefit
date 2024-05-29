import React, { useState } from 'react';
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

import Chart from './ChartPeso.jsx';
import ChartGordura from './ChartGordura.jsx';
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
  const [editedData, setEditedData] = useState(null);

  const idade = calcularIdade(patient.dataNascimento);
  const tmb = calcularTMB(patient.peso, patient.altura, idade, patient.genero);

  const handleEdit = () => {
    setEditMode(true);
    setEditedData(patient);
  };

  const handleCancel = () => {
    setEditedData(null);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    // Aqui você pode implementar a lógica para salvar os dados editados
    console.log('Dados editados:', editedData);

    // Após salvar os dados, você pode desativar o modo de edição
    setEditMode(false);
    setEditedData(null);
  };

  return (
    <>
      {patient && (
        <ContainerSection>
          <h2>Estátisticas de Saude</h2>

          <FirstRowContainer>
            <FirstRowBlocks>
              <ContainerTitleImg>
                <ImgBlock
                  src={iconAltura}
                  alt="Icone historico familiar de doencas"
                ></ImgBlock>
                <h2>Altura</h2>
              </ContainerTitleImg>
              <DataContainer>
                {editMode ? (
                  <InputField
                    type="text"
                    name="nome"
                    value={patient.altura}
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
                <ImgBlock
                  src={iconPeso}
                  alt="Icone historico familiar de doencas"
                ></ImgBlock>
                <h2>Peso</h2>
              </ContainerTitleImg>
              <DataContainer>
                {editMode ? (
                  <InputField
                    type="text"
                    name="nome"
                    value={patient.peso}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    {' '}
                    <p>{patient.peso}</p>
                    <p>Kg</p>
                  </>
                )}
              </DataContainer>
            </FirstRowBlocks>
            <FirstRowBlocks>
              <ContainerTitleImg>
                <ImgBlock
                  src={iconCalorias}
                  alt="Icone historico familiar de doencas"
                ></ImgBlock>
                <h2>Taxa Metabolica</h2>
              </ContainerTitleImg>
              <DataContainer>
                {editMode ? (
                  <InputField
                    type="text"
                    name="nome"
                    value={tmb}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    {' '}
                    <p>{tmb}</p>
                    <p>Kcal</p>
                  </>
                )}
              </DataContainer>
            </FirstRowBlocks>
          </FirstRowContainer>
          <SecondRowContainer>
            <SecondRowBlocks>
              <ContainerSecondRowTitleImg>
                <ImgBlock
                  src={iconGorduraCorporal}
                  alt="Icone historico familiar de doencas"
                ></ImgBlock>
                <h2>% Gordura corporal</h2>
              </ContainerSecondRowTitleImg>
              <DataContainer>
                {editMode ? (
                  <InputField
                    type="text"
                    name="nome"
                    value={patient.altura}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    {' '}
                    <p>
                      <ChartGordura />
                    </p>
                  </>
                )}
              </DataContainer>
            </SecondRowBlocks>

            <SecondRowBlocks>
              <ContainerSecondRowTitleImg>
                <ImgBlock
                  src={iconPesoInicial}
                  alt="Icone historico familiar de doencas"
                ></ImgBlock>
                <h2>Evolução de peso</h2>
              </ContainerSecondRowTitleImg>
              <DataContainer>
                {editMode ? (
                  <InputField
                    type="text"
                    name="nome"
                    value={patient.altura}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    {' '}
                    <p>
                      <Chart />
                    </p>
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
                {editMode ? (
                  <InputField
                    type="text"
                    name="nome"
                    value={patient.altura}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    {' '}
                    <p>28.67</p>
                    <p>%</p>
                  </>
                )}
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
            <>
              <ContainerButton>
                <CancelButton handleCancel={handleCancel} />
                <SaveButton handleSave={handleSave} />
              </ContainerButton>
            </>
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
