import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.headerTexto}>Planificador de Gastos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTexto: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: 20,
  },
});

export default Header;
