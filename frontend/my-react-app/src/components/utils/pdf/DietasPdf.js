import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const DietasPdf = ({ dietas }) => (
  <Document>
    {dietas.map((dieta) => (
      <Page key={dieta.dieta_id} style={styles.page}>
        <View style={styles.dieta}>
          <View style={styles.div}>
            <Text>Data Início: {formatDate(dieta.data_inicio)}</Text>
            <Text>Data Término: {formatDate(dieta.data_termino)}</Text>
          </View>
          <Text>Objetivo: {dieta.objetivo || 'N/A'}</Text>
          <Text>Observação: {dieta.observacao || 'N/A'}</Text>
          {dieta.refeicoes.map((refeicao) => (
            <View key={refeicao.refeicao_id} style={styles.refeicao}>
              <Text style={styles.subtitle}>
                Tipo Refeição: {refeicao.tipo_refeicao}
              </Text>
              <Text>Horário: {refeicao.horario}</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={[styles.cell, styles.headerCell]}>
                    Nome Alimento
                  </Text>
                  <Text style={[styles.cell, styles.headerCell]}>
                    Grupo Alimentar
                  </Text>
                  <Text style={[styles.cell, styles.headerCell]}>Calorias</Text>
                  <Text style={[styles.cell, styles.headerCell]}>
                    Quantidade
                  </Text>
                </View>
                {refeicao.alimentos.map((alimento) => (
                  <View key={alimento.alimento_id} style={styles.tableRow}>
                    <Text style={styles.cell}>{alimento.nome}</Text>
                    <Text style={styles.cell}>
                      {alimento.grupo_alimentar || 'N/A'}
                    </Text>
                    <Text style={styles.cell}>
                      {alimento.calorias || 'N/A'}
                    </Text>
                    <Text style={styles.cell}>
                      {alimento.quantidade || 'N/A'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    ))}
  </Document>
);

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const styles = StyleSheet.create({
  page: { padding: 20 },
  dieta: { marginBottom: 10 },
  title: { fontSize: 16, marginBottom: 5, color: 'blue' },
  subtitle: { fontSize: 14, marginBottom: 3, color: 'green' },
  refeicao: { marginBottom: 5 },
  table: { marginTop: 10, borderWidth: 1, borderColor: '#000' },
  tableRow: { flexDirection: 'row' },
  cell: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
    fontSize: 14,
  },
  headerCell: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: 14,
    color: ' #FB9B44',
  },
  div: { display: 'flex', justifyContent: 'space-between' }
});

export default DietasPdf;
