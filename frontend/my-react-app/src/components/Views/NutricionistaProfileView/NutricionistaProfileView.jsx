import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
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
    const newValue =
      name === 'dataNascimento' ? format(new Date(value), 'dd-MM-yyyy') : value;
    setEditedData({ ...editedData, [name]: newValue });
  };

  const handleSave = () => {
    const formattedDataNascimento = format(
      new Date(editedData.dataNascimento),
      'dd-MM-yyyy',
    );
    const dataToSave = {
      ...editedData,
      dataNascimento: formattedDataNascimento,
      diasSemanas: selectedDays.join(','), // Converter array de dias em string separada por vírgula
    };

    axios
      .put(
        'http://localhost:8800/nutricionist/updateNutricionist/' +
          nutricionista.nutricionista_id,
        dataToSave,
      )
      .then(() => {
        setNutricionista(dataToSave);
        setEditMode(false);
      })
      .catch((error) => {
        console.error('Error updating nutricionista:', error);
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
                      type="text"
                      name="dataNascimento"
                      value={editedData.dataNascimento}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{nutricionista.dataNascimento}</p>
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
                      isWorkingDay={nutricionista.diasSemanas.includes(day)}
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
                  <img src={iconeInstagram} alt="Dias de atendimento:"></img>
                  {editMode ? (
                    <InputField
                      type="text"
                      name="instagram"
                      value={editedData.instagram}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{nutricionista.instagram}</p>
                  )}
                </ContainerLinks>
                <ContainerLinks>
                  <img src={iconeLinkedin} alt="Dias de atendimento:"></img>
                  {editMode ? (
                    <InputField
                      type="text"
                      name="linkedin"
                      value={editedData.linkedin}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{nutricionista.linkedin}</p>
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
    </ContainerSection>
  );
};

export default ProfileContainer;
