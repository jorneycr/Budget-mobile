import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import globalStyles from './../styles/index';
import {formatearCantidad} from './../helpers/index';
import CircularProgress from 'react-native-circular-progress-indicator';

const ControlPresupuesto = ({presupuesto, gastos, resetearApp}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0,
    );

    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={porcentaje}
          duration={1000}
          radius={150}
          valueSuffix="%"
          title="Gastado"
          inActiveStrokeColor="#F5F5F5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3B82F6"
          activeStrokeWidth={20}
          titleStyle={{fontWeight: 'bold', fontSize: 20}}
          titleColor="#64748b"
        />
      </View>
      <View style={styles.contenedorTexto}>
        <Pressable onLongPress={resetearApp} style={styles.boton}>
          <Text style={styles.botonTexto}>Reiniciar App</Text>
        </Pressable>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(presupuesto)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          {formatearCantidad(disponible)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: 'center',
  },
  boton: {
    borderRadius: 10,
    backgroundColor: '#DB2777',
    padding: 10,
    marginBottom: 40,
  },
  botonTexto: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  imagen: {
    width: 250,
    height: 250,
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3B82F6',
  },
});

export default ControlPresupuesto;
