import React from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import globalStyles from './../styles/index';

const FormularioGasto = ({setModal}) => {
  return (
    <SafeAreaView style={styles.contenedor}>
      <View>
        <Pressable
          onLongPress={() => setModal(false)}
          style={[styles.btn, styles.btnCancelar]}>
          <Text style={styles.btnCancelarTexto}>Cancelar</Text>
        </Pressable>
      </View>
      <View style={styles.formulario}>
        <Text style={styles.titulo}>Nuevo Gasto</Text>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput style={styles.input} placeholder="Nombre del gasto" />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad del gasto"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Caegoria Gasto</Text>
          <Picker>
            <Picker.Item label="-- Seleccione --" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Salud" value="salud" />
          </Picker>
        </View>
        <Pressable style={styles.btnSubmit}>
          <Text style={styles.btnSubmitTexto}>Agregar Gasto</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  formulario: {
    ...globalStyles.contenedor,
  },
  btnCancelar: {
    backgroundColor: '#DB2777',
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    marginVertical: 30,
    color: '#64748B',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  btnSubmit: {
    backgroundColor: '#3B82F6',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  btnSubmitTexto: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default FormularioGasto;
