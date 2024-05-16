import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ContainerSection,
  ContainerIntro,
  Img,
  ContainerInfos,
  Name,
  Data,
  Information,
  Divider,
  ContainerBlocks,
  ContainerBlocksFirst,
  ContainerTitleImg,
  ContainerGrid,
  ImgBlock,
  FirstBlock,
  SecondBlock,
  ContainerTitleImgDaily,
  ContainerWeek,
  ContainerHour,
  ContainerEmail,
  ContainerNascimento,
  ContainerEnd,
  ContainerEspecialidade,
  ContainerTwo,
  ContainerLinks,
} from './NutricionistaProfileView.styles';

import iconeCalendarioRoxo from '../../../imagens/icones/NutricionistProfileView/calendarioRoxo.png';
import iconeDistintivo from '../../../imagens/icones/NutricionistProfileView/distintivo.png';
import iconePerfil from '../../../imagens/icones/NutricionistProfileView/perfil.png';
import iconeInstagram from '../../../imagens/icones/NutricionistProfileView/instagram.png';
import iconeLinkedin from '../../../imagens/icones/NutricionistProfileView/linkedin.png';

const ProfileContainer = () => {
  const [nutricionista, setNutricionista] = useState(null);
  const [patients, setPatients] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('>>>user', user)

    if (user.tipo === 'paciente') {
      axios
        .get('http://localhost:8800/patient/getPatientById/' + user.id)
        .then((response) => {
          
          setPatients(response.data);
          const nutricionistaId = response.data[0].nutricionista_id;

          axios
            .get(
              'http://localhost:8800/nutricionist/getNutricionistById/' +
                nutricionistaId,
            )
            .then((nutricionistResponse) => {
              setNutricionista(nutricionistResponse.data[0]);
            })
            .catch((error) => {
              console.error('Error fetching nutricionista:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching patients:', error);
        });
    } else if (user.tipo === 'nutricionista') {
      axios
        .get(
          'http://localhost:8800/nutricionist/getNutricionistById/' + user.id,
        )
        .then((response) => {
          setNutricionista(response.data[0]);
        })
        .catch((error) => {
          console.error('Error fetching nutricionista:', error);
        });
    }
  }, []);
  return (
    <ContainerSection>
      {nutricionista && (
        <>
          <ContainerIntro>
            <Img></Img>
            <ContainerInfos>
              <Name>
                <h2>Nome:</h2>
                <h1>Maria Silva Oliveira</h1>
              </Name>

              <Data>
                <Information>
                  <h2>CRN:</h2>
                  <p>{nutricionista.crn}</p>
                </Information>

                <Information>
                  <h2>Telefone:</h2>
                  <p>{nutricionista.celular}</p>
                </Information>
              </Data>
            </ContainerInfos>
          </ContainerIntro>

          <Divider />
          <ContainerGrid>
            <ContainerBlocksFirst>
              <ContainerTitleImg>
                <ImgBlock src={iconePerfil} alt="Icone perfil"></ImgBlock>
                <h2 style={{ color: '#5DBBFC' }}>Dados Pessoais</h2>
              </ContainerTitleImg>
              <ContainerTwo>
                <ContainerEmail>
                  <h3>Email:</h3>
                  <p>mariasilva@hotmail.com</p>
                </ContainerEmail>
                <ContainerNascimento>
                  <h3>Data Nascimento:</h3>
                  <p>08-07-1994</p>
                </ContainerNascimento>
              </ContainerTwo>
              <ContainerEnd>
                <h3>Endereco:</h3>
                <p>Rua Ali Perto 819 - Bairro Feliz , Sao Paulo/SP</p>
              </ContainerEnd>
              <ContainerEspecialidade>
                <ContainerTitleImg>
                  <ImgBlock
                    src={iconeDistintivo}
                    alt="Icone especialidades"
                  ></ImgBlock>
                  <h2>Especialidades</h2>
                </ContainerTitleImg>
                <p>Clinica, esportiva e saude da mulher </p>
              </ContainerEspecialidade>
            </ContainerBlocksFirst>
            <ContainerBlocks>
              <FirstBlock>
                <ContainerTitleImgDaily>
                  <ImgBlock
                    src={iconeCalendarioRoxo}
                    alt="Dias de atendimento:"
                  ></ImgBlock>
                  <p>Dias de atendimento::</p>
                </ContainerTitleImgDaily>
                <ContainerWeek>
                  <p>SEG</p>
                  <p>TER</p>
                  <p>QUA</p>
                  <p>QUI</p>
                  <p>SEX</p>
                  <p>SAB</p>
                </ContainerWeek>
                <ContainerHour>
                  <h3>Hora Inicio:</h3>
                  <p>8:00h</p>
                </ContainerHour>
                <ContainerHour>
                  <h3>Hora Fim:</h3>
                  <p>18:00h</p>
                </ContainerHour>
                <p>{nutricionista.doencas_cronicas}</p>
              </FirstBlock>
              <SecondBlock>
                <ContainerLinks>
                  <img src={iconeInstagram} alt="Dias de atendimento:"></img>
                  <p>@MariaSilva</p>
                </ContainerLinks>
                <ContainerLinks>
                  <img src={iconeLinkedin} alt="Dias de atendimento:"></img>
                  <p>MariaSilva</p>
                </ContainerLinks>
              </SecondBlock>
            </ContainerBlocks>
          </ContainerGrid>
        </>
      )}
    </ContainerSection>
  );
};

export default ProfileContainer;
