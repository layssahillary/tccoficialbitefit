import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ContainerSection,
  ContainerIntro,
  ContainerInfos,
  Name,
  Data,
  Information,
  ContainerGoal,
  Divider,
  ContainerBlocks,
  ContainerTitleImg,
  ContainerGrid,
  ImgBlock,
  ImgProfile
} from './ProfileContainer.styles';

import pacienteIcon from '../../../../../imagens/profile/patient.jpg';
import iconealergias from '../../../../../imagens/icones/iconesPatienteProfileView/iconsProfile/alergias.png';
import iconebancoSangue from '../../../../../imagens/icones/iconesPatienteProfileView/iconsProfile/banco-de-sangue.png';
import iconebodyBuilding from '../../../../../imagens/icones/iconesPatienteProfileView/iconsProfile/body-building.png';
import iconechecar from '../../../../../imagens/icones/iconesPatienteProfileView/iconsProfile/checar.png';
import iconecomprimidos from '../../../../../imagens/icones/iconesPatienteProfileView/iconsProfile/comprimidos.png';
import iconefamilia from '../../../../../imagens/icones/iconesPatienteProfileView/iconsProfile/familia.png';
import iconenutricao from '../../../../../imagens/icones/iconesPatienteProfileView/iconsProfile/nutricao.png';
import iconerestricao from '../../../../../imagens/icones/iconesPatienteProfileView/iconsProfile/restricao.png';

const ProfileContainer = (patient) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [hasConsultation, setHasConsultation] = useState(false); // Estado para armazenar se o paciente tem consulta agendada
  const user = JSON.parse(localStorage.getItem('user'));
  const pacienteId = user.id;

  const fetchImage = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/paciente/${pacienteId}/imagem`);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Erro ao recuperar a imagem do paciente:', error);
    }
  };

  const checkConsultations = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/consultation/getConsultasByPacienteId/${pacienteId}`);
      if (response.data.length > 0) {
        setHasConsultation(true);
      } else {
        setHasConsultation(false);
      }
    } catch (error) {
      console.error('Erro ao verificar consultas do paciente:', error);
    }
  };

  useEffect(() => {
    fetchImage();
    checkConsultations(); // Verifica se o paciente tem consultas agendadas
  }, []); // Execute apenas uma vez ao montar o componente

  // const upload = async () => {
  //   if (!file) {
  //     console.log('Nenhum arquivo selecionado.');
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('pacienteId', pacienteId);
  
  //   try {
  //     const response = await axios.post('http://localhost:3001/upload', formData);
  //     console.log('Upload bem sucedido:', response);
  //     fetchImage(); // Atualiza a imagem após o upload
  //   } catch (error) {
  //     console.error('Erro ao fazer upload da imagem:', error);
  //   }
  // };

  return (
    <ContainerSection>
      {patient && (
        <>
          <ContainerIntro>
            <ImgProfile src={pacienteIcon} alt="paciente perfil" ></ImgProfile>
          {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={upload}>Upload</button> */}
            <ContainerInfos>
              <Name>
                <h2>Nome Completo</h2>
                <h1>{patient.nome}</h1>
              </Name>
              <Data>
                <Information>
                  <h2>Anivesário:</h2>
                  <p>{patient.dataNascimento}</p>
                  <p>20 anos</p>
                </Information>
                <Information>
                  <h2>Email:</h2>
                  <p>{patient.email}</p>
                </Information>
                <Information>
                  <h2>Telefone:</h2>
                  <p>{patient.telefone}</p>
                </Information>
                {hasConsultation ? (
              <p>O paciente tem consultas agendadas.</p>
            ) : (
              <p>O paciente não tem consultas agendadas.</p>
            )}
              </Data>
            </ContainerInfos>
          </ContainerIntro>

          <Divider />
          <ContainerGoal>
            <h2>Objetivo:</h2>
            <p>{patient.observacao}</p>
          </ContainerGoal>
          <ContainerGrid>
           
            <ContainerBlocks>
              <ContainerTitleImg>
                <h2>Histórico Familiar de Doenças</h2>

                <ImgBlock
                  src={iconefamilia}
                  alt="Icone historico familiar de doencas"
                ></ImgBlock>
              </ContainerTitleImg>
              <p>{patient.historico_familiar_doencas}</p>
            </ContainerBlocks>
            <ContainerBlocks>
              <ContainerTitleImg>
                <h2>Doenças Crônicas:</h2>
                <ImgBlock src={iconechecar} alt="Doenças Crônicas"></ImgBlock>
              </ContainerTitleImg>
              <p>{patient.doencas_cronicas}</p>
            </ContainerBlocks>
            <ContainerBlocks>
              <ContainerTitleImg>
                <h2>Medicamentos em Uso:</h2>
                <ImgBlock
                  src={iconecomprimidos}
                  alt="Icone medicamentos em uso"
                ></ImgBlock>
              </ContainerTitleImg>
              <p>{patient.medicamentos_em_uso}</p>
            </ContainerBlocks>
            <ContainerBlocks>
              <ContainerTitleImg>
                <h2>Alergias:</h2>
                <ImgBlock src={iconealergias} alt="Icone alergias"></ImgBlock>
              </ContainerTitleImg>
              <p>{patient.alergia}</p>
            </ContainerBlocks>
            <ContainerBlocks>
              <ContainerTitleImg>
                <h2>Hábitos Alimentares:</h2>
                <ImgBlock
                  src={iconenutricao}
                  alt="Icone Hábitos Alimentares"
                ></ImgBlock>
              </ContainerTitleImg>
              <p>{patient.habitos_alimentares}</p>
            </ContainerBlocks>
            <ContainerBlocks>
              <ContainerTitleImg>
                <h2>Exames de Sangue:</h2>
                <ImgBlock
                  src={iconebancoSangue}
                  alt="Icone bancoSangue"
                ></ImgBlock>
              </ContainerTitleImg>
              <p>{patient.exames_de_sangue_relevantes}</p>
            </ContainerBlocks>
            <ContainerBlocks>
              <ContainerTitleImg>
                <h2>Quantidade exercícios semanal :</h2>
                <ImgBlock
                  src={iconebodyBuilding}
                  alt="Icone bodyBuilding"
                ></ImgBlock>
              </ContainerTitleImg>
              <p>{patient.frequencia_exercicio_semanal} vezes por semana</p>
            </ContainerBlocks>
            <ContainerBlocks>
              <ContainerTitleImg>
                <h2>Restrição alimentar:</h2>
                <ImgBlock
                  src={iconerestricao}
                  alt="Icone restricao alimentar"
                ></ImgBlock>
              </ContainerTitleImg>
              <p>{patient.restricao_alimentar}</p>
            </ContainerBlocks>
          </ContainerGrid>
        </>
      )}
    </ContainerSection>
  );
};

export default ProfileContainer;
