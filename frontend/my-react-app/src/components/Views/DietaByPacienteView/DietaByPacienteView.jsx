import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PDFDownloadLink,
} from '@react-pdf/renderer';
import {
  ContainerSection,
  DietasPacienteWrapper,
  DietaItem,
  RefeicaoItem,
  ContainerTitle,
  ContainerImg,
  ContainerInfo,
  Img,
  ContainerMain,
  ContainerInfos,
  ContainerImg2,
  Icon,
  ContainerTitleRefeicao,
  ContainerNSEI,
  IlustrationFood,
  ButtonOpenClone,
  StyledTable,
  StyledTableContainer,
  IconCloseOpen,
  ButtonPDF,
  ContainerButtonOpenPDF,
  ContainerAvisoPDF,
} from './DietaByPacienteView.styles';

import DietasPdf from '../../utils/pdf/DietasPdf';

import iconeSalad from '../../../imagens/ilustração/salad.png';
import iconeAlvo from '../../../imagens/icones/DietaByPacienteView/alvo.png';
import iconeInformacoes from '../../../imagens/icones/DietaByPacienteView/informacoes.png';
import iconeCalendario from '../../../imagens/icones/DietaByPacienteView/calendario.png';
import iconeCalendario2 from '../../../imagens/icones/DietaByPacienteView/calendario2.png';
import iconeAbrir from '../../../imagens/icones/abrir.png';
import iconeFechar from '../../../imagens/icones/fechar.png';

import ilustrationBreakfast from '../../../imagens/icones/DietaByPacienteView/cafe-da-manha.png';
import ilustrationAlmoco from '../../../imagens/icones/DietaByPacienteView/almoco.png';
import ilustrationCeia from '../../../imagens/icones/DietaByPacienteView/ceia.png';
import ilustrationJantar from '../../../imagens/icones/DietaByPacienteView/jantar.png';
import ilustrationLancheManha from '../../../imagens/icones/DietaByPacienteView/lanche-manha.png';
import ilustrationLancheTarde from '../../../imagens/icones/DietaByPacienteView/lanche-tardee.png';

const DietasPaciente = () => {
  const [dietas, setDietas] = useState([]);
  const [ultimaDietaAberta, setUltimaDietaAberta] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const pacienteId = user.id;

  useEffect(() => {
    const fetchDietas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/dieta/getDietaByPacienteId/${pacienteId}`,
        );
        setDietas(response.data);
        setUltimaDietaAberta(response.data[0]?.dieta_id || null);
      } catch (error) {
        if (error.response) {
          console.error(
            'Erro ao buscar as dietas:',
            error.response.status,
            error.response.data,
          );
        } else if (error.request) {
          console.error(
            'Erro ao aguardar resposta do servidor:',
            error.request,
          );
        } else {
          console.error('Erro ao configurar requisição:', error.message);
        }
      }
    };

    if (pacienteId) {
      fetchDietas();
    }
  }, [pacienteId]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDietaToggle = (dietaId) => {
    setUltimaDietaAberta((prevDietaId) =>
      prevDietaId === dietaId ? null : dietaId,
    );
  };

  const dietasAgrupadas = dietas
    .map((dieta) => {
      const refeicoesAgrupadas = Object.values(
        dieta.refeicoes.reduce((acc, refeicao) => {
          if (!acc[refeicao.tipo_refeicao]) {
            acc[refeicao.tipo_refeicao] = { ...refeicao, alimentos: [] };
          }
          acc[refeicao.tipo_refeicao].alimentos.push(...refeicao.alimentos);
          return acc;
        }, {}),
      );

      return { ...dieta, refeicoes: refeicoesAgrupadas };
    })
    .reverse();
  const tipoRefeicaoCores = {
    'Café da manhã': {
      cor: '#FFA500',
      imagem: ilustrationBreakfast,
    },
    'Lanche da manhã': {
      cor: '#FFD700',
      imagem: ilustrationLancheManha,
    },
    Almoço: {
      cor: '#32CD32',
      imagem: ilustrationAlmoco,
    },
    'Lanche da tarde': {
      cor: '#FF4500',
      imagem: ilustrationLancheTarde,
    },
    Jantar: {
      cor: '#800080',
      imagem: ilustrationJantar,
    },
    Ceia: {
      cor: '#0000FF',
      imagem: ilustrationCeia,
    },
  };

  const renderAlimentos = (alimentos, tipoRefeicao) => {
    return (
      <StyledTableContainer>
        <StyledTable cor={tipoRefeicaoCores[tipoRefeicao]?.cor || 'black'}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Grupo Alimentar</th>
              <th>Calorias</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {alimentos.map((alimento) => (
              <tr key={`${alimento.alimento_id}-${alimento.refeicao_id}`}>
                <td>{alimento.nome}</td>
                <td>{alimento.grupo_alimentar || 'N/A'}</td>
                <td>{alimento.calorias || 'N/A'}</td>
                <td>{alimento.quantidade || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </StyledTableContainer>
    );
  };
  return (
    <ContainerSection>
      <DietasPacienteWrapper>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Suas dietas personalizadas!
        </h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {dietasAgrupadas.map((dieta) => (
            <DietaItem key={dieta.dieta_id}>
              <ContainerTitle>
                <ContainerImg>
                  <Img src={iconeSalad} alt="Icone perfil"></Img>
                </ContainerImg>
                <ContainerInfo>
                  <h2>Seu plano alimentar.</h2>
                  <p>
                    Aproveite seu plano da melhor maneira para atingir uma vida
                    equilibrada!
                  </p>
                </ContainerInfo>
              </ContainerTitle>
              <ContainerMain>
                <ContainerInfos>
                  <ContainerImg2>
                    <Icon src={iconeAlvo} alt="Icone perfil"></Icon>
                    <h3>Objetivo:</h3>
                    <p>{dieta.objetivo || 'N/A'}</p>
                  </ContainerImg2>
                  <ContainerImg2>
                    <Icon src={iconeInformacoes} alt="Icone perfil"></Icon>
                    <h3>Observação:</h3>
                    <p>{dieta.observacao || 'N/A'}</p>
                  </ContainerImg2>
                </ContainerInfos>
                <ContainerInfos
                  style={{
                    border: '1px solid green',
                    padding: '15px',
                    borderRadius: '20px',
                    gap: '10px',
                  }}
                >
                  <ContainerImg2>
                    <Icon src={iconeCalendario} alt="Icone perfil"></Icon>
                    <h3>Inicio:</h3>
                    <p>{formatDate(dieta.data_inicio)}</p>
                  </ContainerImg2>
                  <ContainerImg2>
                    <Icon src={iconeCalendario2} alt="Icone perfil"></Icon>
                    <h3>Final:</h3>
                    <p>{formatDate(dieta.data_termino)}</p>
                  </ContainerImg2>
                </ContainerInfos>
              </ContainerMain>
              <ContainerAvisoPDF><p>Baixe sua Deita:</p></ContainerAvisoPDF>
              
              <ContainerButtonOpenPDF>
                <ButtonOpenClone
                  onClick={() => handleDietaToggle(dieta.dieta_id)}
                >
                  {ultimaDietaAberta === dieta.dieta_id ? (
                    <IconCloseOpen
                      src={iconeFechar}
                      alt="Icone perfil"
                    ></IconCloseOpen>
                  ) : (
                    <IconCloseOpen
                      src={iconeAbrir}
                      alt="Icone perfil"
                    ></IconCloseOpen>
                  )}
                </ButtonOpenClone>
                <PDFDownloadLink
                  document={<DietasPdf dietas={[dieta]} />}
                  fileName={`dieta-${dieta.dieta_id}.pdf`}
                  linkProps={{
                    style: { textDecoration: 'none' },
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      'Carregando PDF...'
                    ) : (
                      <ButtonPDF>
                        <svg
                          className="svgIcon"
                          viewBox="0 0 384 512"
                          height="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                        </svg>
                        <span className="icon2"></span>
                        <span className="tooltip">3KB</span>
                      </ButtonPDF>
                    )
                  }
                </PDFDownloadLink>
              </ContainerButtonOpenPDF>
              {ultimaDietaAberta === dieta.dieta_id && (
                <ul>
                  {dieta.refeicoes.map((refeicao) => (
                    <RefeicaoItem
                      key={`${refeicao.refeicao_id}-${dieta.dieta_id}`}
                      cor={
                        tipoRefeicaoCores[refeicao.tipo_refeicao]?.cor ||
                        'black'
                      }
                    >
                      <ContainerTitleRefeicao
                        cor={
                          tipoRefeicaoCores[refeicao.tipo_refeicao]?.cor ||
                          'black'
                        }
                      >
                        <h2>{refeicao.tipo_refeicao}</h2>
                        <p>Horário: {refeicao.horario}</p>
                      </ContainerTitleRefeicao>
                      <ContainerNSEI>
                        <IlustrationFood
                          src={tipoRefeicaoCores[refeicao.tipo_refeicao].imagem}
                          alt="Ícone refeição"
                        ></IlustrationFood>
                        {renderAlimentos(
                          refeicao.alimentos,
                          refeicao.tipo_refeicao,
                        )}
                      </ContainerNSEI>
                    </RefeicaoItem>
                  ))}
                </ul>
              )}
            </DietaItem>
          ))}
        </ul>
      </DietasPacienteWrapper>
    </ContainerSection>
  );
};

export default DietasPaciente;
