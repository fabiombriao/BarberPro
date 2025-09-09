import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  const mockUser = { name: 'Usuário Demo', totalDistance: 123.4 };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{mockUser.name}</Text>
      <Text>Distância total: {mockUser.totalDistance} km</Text>
    </View>
  );
}
