import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import globalStyles from './../styles/index';

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  handleNuevoPresupuesto,
}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto"
        style={styles.input}
        value={presupuesto.toString()}
        onChangeText={setPresupuesto}
      />
      <Pressable
        onPress={() => handleNuevoPresupuesto(presupuesto)}
        style={styles.boton}>
        <Text style={styles.botonTexto}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3B82F6',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  boton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#1048A4',
    borderRadius: 10,
  },
  botonTexto: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default NuevoPresupuesto;
