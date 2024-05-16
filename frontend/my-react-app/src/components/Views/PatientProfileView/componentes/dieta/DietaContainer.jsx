import React, { useState } from 'react';
import {
  ContainerSection,
  DietIcon,
  ContainerMain,
  ContainerStart,
  DateContainerFull,
  DateContainer,
  RefeicaoButton,
  ContainerButtons,
  ContainerRefeicaoBloco,
  ContainerMainRefeicao,
  IconButtonClose,
  CloseIcon,
  ContainerCloseButton,
  ContainerAddButton,
  IconButtonAdd,
  AddIcon,
  ContainerHourRefeicao,
  ContainerMainIcon,
  ContainerAlimentos,
} from './DietaContainer.styles';
import axios from 'axios';
import { Button } from '../../../../Button/LongButton/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  DietasPaciente  from '../../../../Views/DietaByPacienteView/DietaByPacienteView.jsx';

import iconeCooking from '../../../../../imagens/ilustração/cooking.png';
import iconeCafe from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDiet/cafe.png';
import iconeFrutas from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDiet/frutas.png';
import iconeIorgute from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDiet/iogurte.png';
import iconeLua from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDiet/lua.png';
import iconeRestaurante from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDiet/restaurante.png';
import iconeSalada from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDiet/salada.png';
import closeButton from '../../../../../imagens/icones/closeButton.svg';
import addButton from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDiet/AddButton.svg';
import clockIcon from '../../../../../imagens/icones/iconesPatienteProfileView/iconsDiet/clock.svg';

const DietaContainer = (patient) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const paciente_id = patient.paciente_id;
  const [data_inicio, setDataInicio] = useState('');
  const [data_termino, setDataTermino] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [observacao, setObservacao] = useState('');
  const [refeicoes, setRefeicoes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/dieta/dietaRegister', {
        paciente_id,
        data_inicio,
        data_termino,
        objetivo,
        observacao,
        refeicoes,
      });
      toast.success('Nutricionista registrado com sucesso!');

      setDataInicio('');
      setDataTermino('');
      setObjetivo('');
      setObservacao('');
      setRefeicoes([]);
    } catch (error) {
      return toast.warn('Preencha todos os campos corretamente!');
    }
  };

  const updateRefeicao = (refeicaoIndex, field, value) => {
    setRefeicoes((prevState) =>
      prevState.map((refeicao, index) =>
        index === refeicaoIndex ? { ...refeicao, [field]: value } : refeicao,
      ),
    );
  };

  const updateAlimento = (refeicaoIndex, alimentoIndex, field, value) => {
    setRefeicoes((prevState) =>
      prevState.map((refeicao, rIndex) =>
        rIndex === refeicaoIndex
          ? {
              ...refeicao,
              alimentos: refeicao.alimentos.map((alimento, aIndex) =>
                aIndex === alimentoIndex
                  ? { ...alimento, [field]: value }
                  : alimento,
              ),
            }
          : refeicao,
      ),
    );
  };

  const handleChangeRefeicao = (e, refeicaoIndex, field) => {
    updateRefeicao(refeicaoIndex, field, e.target.value);
  };

  const handleChangeAlimento = (e, refeicaoIndex, alimentoIndex, field) => {
    updateAlimento(refeicaoIndex, alimentoIndex, field, e.target.value);
  };

  const handleAddRefeicao = (tipo_refeicao) => {
    setRefeicoes([...refeicoes, { tipo_refeicao, horario: '', alimentos: [] }]);
  };

  const handleRemoveRefeicao = (index) => {
    const updatedRefeicoes = [...refeicoes];
    updatedRefeicoes.splice(index, 1);
    setRefeicoes(updatedRefeicoes);
  };

  const handleAddAlimento = (refeicaoIndex) => {
    const updatedRefeicoes = [...refeicoes];
    updatedRefeicoes[refeicaoIndex].alimentos.push({
      nome: '',
      grupo_alimentar: '',
      calorias: '',
      nutrientes: '',
      quantidade: '',
    });
    setRefeicoes(updatedRefeicoes);
  };

  const handleRemoveAlimento = (refeicaoIndex, alimentoIndex) => {
    const updatedRefeicoes = [...refeicoes];
    updatedRefeicoes[refeicaoIndex].alimentos.splice(alimentoIndex, 1);
    setRefeicoes(updatedRefeicoes);
  };

  return (
    <ContainerSection>
      {patient && (
        <>
          {user.tipo === 'paciente' ? (
            <DietasPaciente />
          ) : (
            <form onSubmit={handleSubmit}>
              <ContainerMain>
                <ContainerStart>
                  <h1>
                    Registre uma nova dieta para {patient.nome.split(' ')[0]}!
                  </h1>
                  <p>Personalize a dieta do seu paciente e promova a saúde!</p>
                  <DateContainerFull>
                    <p>Selecione o periodo da dieta:</p>
                    <DateContainer>
                      <label>
                        Data Início:
                        <input
                          type="date"
                          value={data_inicio}
                          onChange={(e) => setDataInicio(e.target.value)}
                        />
                      </label>
                      <label>
                        Data Término:
                        <input
                          type="date"
                          value={data_termino}
                          onChange={(e) => setDataTermino(e.target.value)}
                        />
                      </label>
                    </DateContainer>
                  </DateContainerFull>
                  <label>
                    Objetivo:
                    <input
                      type="text"
                      value={objetivo}
                      onChange={(e) => setObjetivo(e.target.value)}
                    />
                  </label>
                  <label>
                    Observação:
                    <input
                      type="text"
                      value={observacao}
                      onChange={(e) => setObservacao(e.target.value)}
                    />
                  </label>
                </ContainerStart>
                <DietIcon src={iconeCooking} alt="Icone dieta"></DietIcon>
              </ContainerMain>
              <ContainerButtons>
                <RefeicaoButton
                  onClick={() => handleAddRefeicao('Café da manhã')}
                >
                  <img src={iconeCafe} alt="Ícone Café da Manhã" />
                  Café da manhã
                </RefeicaoButton>
                <RefeicaoButton
                  onClick={() => handleAddRefeicao('Lanche da manhã')}
                >
                  <img src={iconeIorgute} alt="Ícone Café da Manhã" />
                  Lanche da manhã
                </RefeicaoButton>
                <RefeicaoButton onClick={() => handleAddRefeicao('Almoço')}>
                  <img src={iconeSalada} alt="Ícone Café da Manhã" />
                  Almoço
                </RefeicaoButton>
                <RefeicaoButton
                  onClick={() => handleAddRefeicao('Lanche da tarde')}
                >
                  <img src={iconeFrutas} alt="Ícone Café da Manhã" />
                  Lanche da tarde
                </RefeicaoButton>
                <RefeicaoButton onClick={() => handleAddRefeicao('Jantar')}>
                  <img src={iconeRestaurante} alt="Ícone Café da Manhã" />
                  Jantar
                </RefeicaoButton>
                <RefeicaoButton onClick={() => handleAddRefeicao('Ceia')}>
                  <img src={iconeLua} alt="Ícone Café da Manhã" />
                  Ceia
                </RefeicaoButton>
              </ContainerButtons>
              {refeicoes.map((refeicao, refeicaoIndex) => (
                <ContainerRefeicaoBloco key={refeicaoIndex}>
                  <ContainerCloseButton>
                    <IconButtonClose
                      onClick={() => handleRemoveRefeicao(refeicaoIndex)}
                    >
                      <CloseIcon src={closeButton} alt="Close button" />
                      Excluir refeição
                    </IconButtonClose>
                  </ContainerCloseButton>
                  <ContainerMainRefeicao>
                    <ContainerMainIcon>
                      <img src={clockIcon} alt="Clock Icon" />
                      <h2>
                        Selecione o horário que seu paciente irá consumir o
                        alimento:
                      </h2>
                    </ContainerMainIcon>
                    <ContainerHourRefeicao>
                      <p>
                        Tipo de Refeição:{' '}
                        <span style={{ fontWeight: 'bold', color: '#554EE0' }}>
                          {refeicao.tipo_refeicao}
                        </span>
                      </p>

                      <label>
                        Horário:
                        <input
                          type="time"
                          value={refeicao.horario}
                          onChange={(e) =>
                            handleChangeRefeicao(e, refeicaoIndex, 'horario')
                          }
                        />
                      </label>
                    </ContainerHourRefeicao>
                  </ContainerMainRefeicao>
                  <ContainerAddButton>
                    <IconButtonAdd
                      type="button"
                      onClick={() => handleAddAlimento(refeicaoIndex)}
                    >
                      <AddIcon src={addButton} alt="Close button" />
                      Adicionar Alimento
                    </IconButtonAdd>
                  </ContainerAddButton>

                  {refeicao.alimentos.map((alimento, alimentoIndex) => (
                    <ContainerAlimentos key={alimentoIndex}>
                      <label>
                        Nome do Alimento:
                        <input
                          placeholder="ex: Brócolis"
                          type="text"
                          value={alimento.nome}
                          onChange={(e) =>
                            handleChangeAlimento(
                              e,
                              refeicaoIndex,
                              alimentoIndex,
                              'nome',
                            )
                          }
                        />
                      </label>
                      <label>
                        Grupo Alimentar:
                        <input
                          placeholder="ex: Verdura"
                          type="text"
                          value={alimento.grupo_alimentar}
                          onChange={(e) =>
                            handleChangeAlimento(
                              e,
                              refeicaoIndex,
                              alimentoIndex,
                              'grupo_alimentar',
                            )
                          }
                        />
                      </label>
                      <label>
                        Calorias:
                        <input
                          type="text"
                          placeholder="35"
                          value={alimento.calorias}
                          onChange={(e) =>
                            handleChangeAlimento(
                              e,
                              refeicaoIndex,
                              alimentoIndex,
                              'calorias',
                            )
                          }
                        />
                      </label>
                      <label>
                        Nutrientes:
                        <input
                          type="text"
                          placeholder="Vitamina C"
                          value={alimento.nutrientes}
                          onChange={(e) =>
                            handleChangeAlimento(
                              e,
                              refeicaoIndex,
                              alimentoIndex,
                              'nutrientes',
                            )
                          }
                        />
                      </label>
                      <label>
                        Quantidade:
                        <input
                          placeholder="100g"
                          type="text"
                          value={alimento.quantidade}
                          onChange={(e) =>
                            handleChangeAlimento(
                              e,
                              refeicaoIndex,
                              alimentoIndex,
                              'quantidade',
                            )
                          }
                        />
                      </label>
                      <ContainerCloseButton>
                        <IconButtonClose
                          type="button"
                          onClick={() =>
                            handleRemoveAlimento(refeicaoIndex, alimentoIndex)
                          }
                        >
                          <CloseIcon src={closeButton} alt="Close button" />
                        </IconButtonClose>
                      </ContainerCloseButton>
                    </ContainerAlimentos>
                  ))}
                </ContainerRefeicaoBloco>
              ))}
              <Button type="submit" label="Registrar Dieta"></Button>
            </form>
          )}
        </>
      )}
      <ToastContainer autoClose={3000} position="bottom-left" />{' '}
    </ContainerSection>
  );
};

export default DietaContainer;
