import React from 'react';
import { View, Text, FlatList } from 'react-native';

const mockActivities = [
  { id: '1', user: 'Ana', distance: 5.2 },
  { id: '2', user: 'João', distance: 10.1 }
];

export default function FeedScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={mockActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{`${item.user} correu ${item.distance} km`}</Text>
        )}
      />
    </View>
  );
}
