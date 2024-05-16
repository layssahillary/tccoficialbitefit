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
  ButtonContainer,
} from './DashboardContainer.styles';

import {
  calcularIdade,
  calcularTMB,
} from '../../../../utils/calculos/calculos.js';

import { EditButton } from '../../../../Button/EditButtton/EditButton';
import DashboardEditContainer from '../dashboard/dashboardEdit/DashboardEditContainer.jsx';

import iconAltura from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconAltura.png';
import iconBalanca from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconBalanca.png';
import iconCalorias from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconCalorias.png';
import iconGorduraCorporal from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconGorduraCorporal.png';
import iconPeso from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconPeso.png';
import iconPesoInicial from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconPesoInicial.png';
import iconResultado from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconResultado.png';
import iconCircunferencia from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/circunferencias.png';

const DashboardContainer = (patient) => {
  const [isEditing, setIsEditing] = useState(false);

  const idade = calcularIdade(patient.dataNascimento);
  const tmb = calcularTMB(patient.peso, patient.altura, idade, patient.genero);

  return (
    <>
      {patient && !isEditing && (
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
                <p>{patient.altura}</p>
                <p>cm</p>
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
                {' '}
                <p>{patient.peso}</p>
                <p>Kg</p>
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
                <p>{tmb}</p>
                <p>Kcal</p>
              </DataContainer>
            </FirstRowBlocks>
          </FirstRowContainer>
          <SecondRowContainer>
            <SecondRowBlocks>
              <ContainerSecondRowTitleImg>
                <ImgBlock
                  src={iconPesoInicial}
                  alt="Icone historico familiar de doencas"
                ></ImgBlock>
                <h2>Evolucao de peso</h2>
              </ContainerSecondRowTitleImg>
              <DataContainer>
                <p>{patient.altura}</p>
                <p>Kg / peso inicial</p>
              </DataContainer>
            </SecondRowBlocks>
            <SecondRowBlocks>
              <ContainerSecondRowTitleImg>
                <ImgBlock
                  src={iconGorduraCorporal}
                  alt="Icone historico familiar de doencas"
                ></ImgBlock>
                <h2>Evolucao gordura corporal</h2>
              </ContainerSecondRowTitleImg>
              <DataContainer>
                <p>{patient.altura}</p>
                <p>% / gordura corporal</p>
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
                <p>{patient.altura}</p>
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
                <p>{patient.altura}</p>
                <p>Ana silva esta com IMC NORMAL</p>
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
                <p>
                  {patient.circunferencia_bracos}{' '}
                  <span style={{ color: '#a1a1a1', fontWeight: '400' }}>
                    cm
                  </span>
                </p>
                <p>
                  {patient.circunferencia_cintura}{' '}
                  <span style={{ color: '#a1a1a1', fontWeight: '400' }}>
                    cm
                  </span>
                </p>
                <p>
                  {patient.circunferencia_quadril}{' '}
                  <span style={{ color: '#a1a1a1', fontWeight: '400' }}>
                    cm
                  </span>
                </p>
                <p>
                  {patient.circunferencia_pernas}{' '}
                  <span style={{ color: '#a1a1a1', fontWeight: '400' }}>
                    cm
                  </span>
                </p>
              </PContainer>
            </ImgPContainer>
          </FourthRowContainer>
          <ButtonContainer>
            <EditButton
              label="Edit"
              onClick={() => {
                console.log('Clicou no botão de editar');
                setIsEditing(true);
              }}
            ></EditButton>
          </ButtonContainer>
        </ContainerSection>
      )}
      {isEditing && <DashboardEditContainer />}
    </>
  );
};

export default DashboardContainer;
