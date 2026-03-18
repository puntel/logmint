import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>XP Total</Text>
        <Text style={styles.statValue}>0</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Streak</Text>
        <Text style={styles.statValue}>0 dias</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Conquistas</Text>
        <Text style={styles.statValue}>Nenhuma ainda</Text>
      </View>
      <Text style={styles.note}>
        Esta tela será expandida para incluir estatísticas, personalização de avatar e histórico de lições.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 14,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8,
  },
  note: {
    marginTop: 18,
    fontSize: 14,
    color: '#666',
  },
});
