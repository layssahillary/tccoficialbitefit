import React from 'react';
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
} from '../DashboardContainer.styles';

import { TextInput } from './TextInput/TextInput';

import  {BackButton}  from '../../../../../Button/BackButton/BackButton';

import iconAltura from '../../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconAltura.png';
import iconBalanca from '../../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconBalanca.png';
import iconCalorias from '../../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconCalorias.png';
import iconGorduraCorporal from '../../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconGorduraCorporal.png';
import iconPeso from '../../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconPeso.png';
import iconPesoInicial from '../../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconPesoInicial.png';
import iconResultado from '../../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/iconResultado.png';
import iconCircunferencia from '../../../../../../imagens/icones/iconesPatienteProfileView/iconsDashboard/circunferencias.png';

const DashboardEditContainer = (patient) => {
  console.log('paciente', patient);

  return (
    <ContainerSection>
      {patient && (
        <>
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
                <TextInput />
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
                <TextInput />
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
                <TextInput />
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
                <TextInput />
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
                <TextInput />
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
                <TextInput />
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
                  <TextInput /> <span style={{ color: '#a1a1a1', fontWeight: '400' }}>cm</span>
                </p>
                <p>
                  <TextInput /> <span style={{ color: '#a1a1a1', fontWeight: '400' }}>cm</span>
                </p>
                <p>
                  <TextInput /> <span style={{ color: '#a1a1a1', fontWeight: '400' }}>cm</span>
                </p>
                <p>
                  <TextInput /> <span style={{ color: '#a1a1a1', fontWeight: '400' }}>cm</span>
                </p>
              </PContainer>
            </ImgPContainer>
          </FourthRowContainer>
          <BackButton/>
        </>
      )}
    </ContainerSection>
  );
};

export default DashboardEditContainer;
