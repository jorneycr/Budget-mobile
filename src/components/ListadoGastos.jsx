import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Gasto from './Gasto';

const ListadoGastos = ({gastos, setModal, setGasto}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>
      {gastos.length === 0 ? (
        <Text style={styles.noGasto}>No hay Gastos</Text>
      ) : (
        gastos.map(gasto => (
          <Gasto
            key={gasto.id}
            gasto={gasto}
            setModal={setModal}
            setGasto={setGasto}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginVertical: 70,
  },
  titulo: {
    color: '#64748B',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
  noGasto: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ListadoGastos;
