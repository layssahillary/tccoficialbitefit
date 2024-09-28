import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  ContainerHour,
  ContainerEmail,
  ContainerNascimento,
  ContainerEnd,
  ContainerEspecialidade,
  ContainerTwo,
  ContainerLinks,
  InputField,
  WeekdayContainer,
  Weekday,
  ContainerButton,
} from './NutricionistaProfileView.styles';

import nutricionistaIcon from '../../../imagens/profile/nutritionist.jpg';
import iconeCalendarioRoxo from '../../../imagens/icones/NutricionistProfileView/calendarioRoxo.png';
import iconeDistintivo from '../../../imagens/icones/NutricionistProfileView/distintivo.png';
import iconePerfil from '../../../imagens/icones/NutricionistProfileView/perfil.png';
import iconeInstagram from '../../../imagens/icones/NutricionistProfileView/instagram.png';
import iconeLinkedin from '../../../imagens/icones/NutricionistProfileView/linkedin.png';
import { EditButton } from '../../Button/EditButtton/EditButton.jsx';
import { SaveButton } from '../../Button/SaveButton/SaveButton.jsx';
import { CancelButton } from '../../Button/CancelButton/CancelButton.jsx';
const ProfileContainer = () => {
  const [nutricionista, setNutricionista] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (user.tipo === 'paciente') {
      axios
        .get('http://localhost:8800/patient/getPatientById/' + user.id)
        .then((response) => {
          const nutricionistaId = response.data[0].nutricionista_id;

          axios
            .get(
              'http://localhost:8800/nutricionist/getNutricionistById/' +
                nutricionistaId,
            )
            .then((nutricionistResponse) => {
              setNutricionista(nutricionistResponse.data[0]);
              setEditedData(nutricionistResponse.data[0]);
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
          setEditedData(response.data[0]);
        })
        .catch((error) => {
          console.error('Error fetching nutricionista:', error);
        });
    }
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditedData(nutricionista);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Verifica se o nome é dataNascimento para formatar corretamente
    const newValue =
      name === 'dataNascimento' ? format(new Date(value), 'yyyy-MM-dd') : value;

    // Verifica se o estado está sendo atualizado corretamente
    console.log(`Atualizando ${name} para:`, newValue);

    setEditedData({ ...editedData, [name]: newValue });
  };

  const handleSave = () => {
    const formattedDataNascimento = format(
      new Date(editedData.dataNascimento),
      'yyyy-MM-dd',
    );

    const instagramUrl = editedData.instagram.startsWith(
      'https://www.instagram.com/in/',
    )
      ? editedData.instagram
      : `https://www.instagram.com/in/${editedData.instagram}`;

    // Verifica e formata o campo do LinkedIn
    const linkedinUrl = editedData.linkedin.startsWith(
      'https://www.linkedin.com/in/',
    )
      ? editedData.linkedin
      : `https://www.linkedin.com/in/${editedData.linkedin}`;

    const dataToSave = {
      ...editedData,
      dataNascimento: formattedDataNascimento,
      linkedin: linkedinUrl,
      instagram: instagramUrl, // Adiciona o link formatado
      diasSemanas: selectedDays.join(','), // Converte os dias selecionados em string
    };

    axios
      .put(
        'http://localhost:8800/nutricionist/updateNutricionistById/' +
          nutricionista.nutricionista_id,
        dataToSave,
      )
      .then(() => {
        setNutricionista(dataToSave);
        setEditMode(false);
        toast.success('Perfil atualizado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao atualizar nutricionista:', error);
      });
  };

  const toggleDay = (day) => {
    const isSelected = selectedDays.includes(day);
    setSelectedDays((prevSelected) =>
      isSelected
        ? prevSelected.filter((selectedDay) => selectedDay !== day)
        : [...prevSelected, day],
    );
  };
  return (
    <ContainerSection>
      {nutricionista && (
        <>
          <ContainerIntro>
            <Img src={nutricionistaIcon} alt="Icone perfil"></Img>
            <ContainerInfos>
              <Name>
                <h2>Nome:</h2>
                {editMode ? (
                  <InputField
                    type="text"
                    name="nome"
                    value={editedData.nome}
                    onChange={handleChange}
                  />
                ) : (
                  <h1>{nutricionista.nome}</h1>
                )}
              </Name>

              <Data>
                <Information>
                  <h2>CRN:</h2>
                  {editMode ? (
                    <InputField
                      type="text"
                      name="crn"
                      value={editedData.crn}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{nutricionista.crn}</p>
                  )}
                </Information>

                <Information>
                  <h2>Telefone:</h2>
                  {editMode ? (
                    <InputField
                      type="text"
                      name="celular"
                      value={editedData.celular}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{nutricionista.celular}</p>
                  )}
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
                  {editMode ? (
                    <InputField
                      type="text"
                      name="email"
                      value={editedData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{nutricionista.email}</p>
                  )}
                </ContainerEmail>
                <ContainerNascimento>
                  <h3>Data Nascimento:</h3>
                  {editMode ? (
                    <InputField
                      type="date"
                      name="dataNascimento"
                      value={format(
                        new Date(editedData.dataNascimento),
                        'yyyy-MM-dd',
                      )} // Formata para yyyy-MM-dd
                      onChange={handleChange}
                    />
                  ) : (
                    <p>
                      {format(
                        new Date(nutricionista.dataNascimento),
                        'yyyy-MM-dd',
                      )}
                    </p> // Formata para yyyy-MM-dd
                  )}
                </ContainerNascimento>
              </ContainerTwo>
              <ContainerEnd>
                <h3>Endereco:</h3>
                {editMode ? (
                  <InputField
                    type="text"
                    name="endereco"
                    value={editedData.endereco}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{nutricionista.endereco}</p>
                )}
              </ContainerEnd>
              <ContainerEspecialidade>
                <ContainerTitleImg>
                  <ImgBlock
                    src={iconeDistintivo}
                    alt="Icone especialidades"
                  ></ImgBlock>
                  <h2>Especialidades</h2>
                </ContainerTitleImg>
                {editMode ? (
                  <InputField
                    type="text"
                    name="especialidade"
                    value={editedData.especialidade}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{nutricionista.especialidade}</p>
                )}
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
                <WeekdayContainer>
                  {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'].map((day) => (
                    <Weekday
                      key={day}
                      isWorkingDay={nutricionista.diasSemanas?.includes(day)} 
                      isSelected={selectedDays.includes(day)}
                      editMode={editMode}
                      onClick={() => {
                        if (editMode) toggleDay(day);
                      }}
                    >
                      {day}
                    </Weekday>
                  ))}
                </WeekdayContainer>

                <ContainerHour>
                  <h3>Hora Inicio:</h3>
                  {editMode ? (
                    <InputField
                      type="text"
                      name="horarioInicio"
                      value={editedData.horarioInicio}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{nutricionista.horarioInicio}</p>
                  )}
                </ContainerHour>
                <ContainerHour>
                  <h3>Hora Fim:</h3>
                  {editMode ? (
                    <InputField
                      type="text"
                      name="horarioFim"
                      value={editedData.horarioFim}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{nutricionista.horarioFim}</p>
                  )}
                </ContainerHour>
              </FirstBlock>
              <SecondBlock>
                <ContainerLinks>
                  <img src={iconeLinkedin} alt="LinkedIn"></img>
                  {editMode ? (
                    <InputField
                      type="text"
                      name="linkedin"
                      value={
                        editedData.linkedin
                          ? editedData.linkedin.split('/').pop()
                          : ''
                      }
                      onChange={handleChange}
                    />
                  ) : (
                    <a
                      href={nutricionista.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {nutricionista.linkedin
                        ? nutricionista.linkedin.split('/').pop()
                        : 'LinkedIn'}
                    </a>
                  )}
                </ContainerLinks>

                <ContainerLinks>
                  <img src={iconeInstagram} alt="Instagram"></img>
                  {editMode ? (
                    <InputField
                      type="text"
                      name="instagram"
                      value={
                        editedData.instagram
                          ? editedData.instagram.split('/').pop()
                          : ''
                      }
                      onChange={handleChange}
                    />
                  ) : (
                    <a
                      href={nutricionista.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {nutricionista.instagram
                        ? nutricionista.instagram.split('/').pop()
                        : 'Instagram'}
                    </a>
                  )}
                </ContainerLinks>
              </SecondBlock>
            </ContainerBlocks>
          </ContainerGrid>

          {editMode ? (
            <>
              <ContainerButton>
                <CancelButton handleCancel={handleCancel} />
                <SaveButton handleSave={handleSave} />
              </ContainerButton>
            </>
          ) : (
            <>
              {user.tipo === 'nutricionista' && !editMode && (
                <ContainerButton>
                  <EditButton handleEdit={handleEdit} />
                </ContainerButton>
              )}
            </>
          )}
        </>
      )}
      <ToastContainer autoClose={3000} position="bottom-left" />
    </ContainerSection>
  );
};

export default ProfileContainer;
