import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function RecordScreen() {
  const [recording, setRecording] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [pace, setPace] = useState(0);

  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => {
        setTime(t => t + 1);
        setDistance(d => d + 0.01);
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [recording]);

  useEffect(() => {
    if (time > 0 && distance > 0) {
      setPace((time / 60) / distance);
    }
  }, [time, distance]);

  const toggleRecording = () => setRecording(r => !r);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Distância: {distance.toFixed(2)} km</Text>
      <Text>Tempo: {time}s</Text>
      <Text>Ritmo: {pace.toFixed(2)} min/km</Text>
      <Button title={recording ? 'Parar' : 'Iniciar'} onPress={toggleRecording} />
    </View>
  );
}
