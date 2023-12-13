import React from 'react';
import {Text, View} from 'react-native';

const Gasto = ({gasto}) => {
  return (
    <View>
      <Text>{gasto.nombre}</Text>
    </View>
  );
};

export default Gasto;
