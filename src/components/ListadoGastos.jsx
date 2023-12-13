import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Gasto from './Gasto';

const ListadoGastos = ({gastos}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>
      {gastos.length === 0 ? (
        <Text style={styles.noGasto}>No hay Gastos</Text>
      ) : (
        gastos.map(gasto => {
          <Gasto gasto={gasto} key={gasto.id} />;
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 70,
  },
  titulo: {
    color: '#64748B',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
  },
  noGasto: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ListadoGastos;
