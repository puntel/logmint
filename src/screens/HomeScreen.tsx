import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getAllLevels } from '../services/curriculumService';
import { getCompletedLessons, getLastLessonId } from '../services/progressService';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const levels = useMemo(() => getAllLevels(), []);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [lastLessonId, setLastLessonId] = useState<string | null>(null);

  useEffect(() => {
    const loadProgress = async () => {
      const completed = await getCompletedLessons();
      const last = await getLastLessonId();
      setCompletedLessons(completed);
      setLastLessonId(last);
    };

    loadProgress();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>LogiMente</Text>
      <Text style={styles.subtitle}>Aprenda Lógica de Programação de forma gamificada</Text>

      {lastLessonId ? (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Lesson', { lessonId: lastLessonId })}
        >
          <Text style={styles.continueButtonText}>Continuar última lição</Text>
        </TouchableOpacity>
      ) : null}

      {levels.map(level => (
        <View key={level.id} style={styles.card}>
          <Text style={styles.cardTitle}>{level.title}</Text>
          <Text style={styles.cardText}>{level.description}</Text>

          {level.units.map(unit => (
            <View key={unit.id} style={styles.unitCard}>
              <Text style={styles.unitTitle}>{unit.title}</Text>
              <Text style={styles.unitText}>{unit.description}</Text>

              {unit.lessons.map(lesson => {
                const completed = completedLessons.has(lesson.id);
                return (
                  <TouchableOpacity
                    key={lesson.id}
                    style={styles.lessonButton}
                    onPress={() => navigation.navigate('Lesson', { lessonId: lesson.id })}
                  >
                    <Text style={styles.lessonButtonText}>
                      {completed ? '✅ ' : ''}
                      {lesson.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      ))}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Perfil</Text>
        <Text style={styles.cardText}>Veja seu progresso, streaks e conquistas.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Ir para Perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#444',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 12,
    color: '#555',
  },
  unitCard: {
    backgroundColor: '#f7f9fc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  unitTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  unitText: {
    fontSize: 13,
    marginBottom: 10,
    color: '#555',
  },
  lessonButton: {
    backgroundColor: '#2E86AB',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: '#1B4F72',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2E86AB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
