import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';

function App() {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);

  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor', 'OK');
    }
  };
  return (
    <View style={styles.container}>
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
        <Pressable>
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
  },
  imagen: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 120,
    right: 20,
  },
});

export default App;
