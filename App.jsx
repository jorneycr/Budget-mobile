import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Alert,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import {generarId} from './src/helpers';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';

function App() {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage =
          (await AsyncStorage.getItem('presupuesto')) ?? 0;

        if (presupuestoStorage > 0) {
          setPresupuesto(presupuestoStorage);
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPresupuestoStorage();
  });

  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('presupuesto', presupuesto);
        } catch (error) {
          console.log(error);
        }
      };
      guardarPresupuestoStorage();
    }
  }, [isValidPresupuesto]);

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = (await AsyncStorage.getItem('gastos')) ?? [];
        setGastos(gastosStorage ? JSON.parse(gastosStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerGastosStorage();
  });

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('gastos', JSON.stringify(gastos));
      } catch (error) {}
    };
    guardarGastosStorage();
  }, [gastos]);

  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor', 'OK');
    }
  };

  const handleGasto = gasto => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState,
      );
      setGastos(gastosActualizados);
    } else {
      //nuevo registro
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setModal(!modal);
  };

  const eliminarGasto = id => {
    Alert.alert('Eliminar Gasto', 'Esta seguro?', [
      {text: 'No', style: 'cancel'},
      {
        text: 'Si, Eliminar',
        onPress: () => {
          const gastosActualizados = gastos.filter(
            gastoState => gastoState.id !== id,
          );
          setGastos(gastosActualizados);
          setModal(!modal);
          setGasto({});
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto gastos={gastos} presupuesto={presupuesto} />
          ) : (
            <NuevoPresupuesto
              setPresupuesto={setPresupuesto}
              presupuesto={presupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          )}
        </View>
        {isValidPresupuesto && (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />
            <ListadoGastos
              gastos={gastos}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              setModal={setModal}
              setGasto={setGasto}
            />
          </>
        )}
      </ScrollView>
      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <FormularioGasto
            handleGasto={handleGasto}
            setModal={setModal}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}
      {isValidPresupuesto && (
        <Pressable style={styles.pressable} onPress={() => setModal(!modal)}>
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  pressable: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});

export default App;
