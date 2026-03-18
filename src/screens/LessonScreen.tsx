import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getLessonById, Lesson } from '../firebase/firestoreService';
import { markLessonCompleted, setLastLessonId } from '../services/progressService';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

export default function LessonScreen({ route }: Props) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const lessonId = route.params?.lessonId ?? 'lesson-1-1';
        const data = await getLessonById(lessonId);
        setLesson(data);
        await setLastLessonId(lessonId);
      } catch (error) {
        console.warn('Erro ao carregar lição:', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [route.params]);

  const handleSubmit = async () => {
    if (!selected) {
      Alert.alert('Selecione uma opção', 'Escolha uma resposta antes de continuar.');
      return;
    }

    if (!lesson) return;

    setAnswered(true);
    const isCorrect = selected === lesson.question.correct;

    if (isCorrect) {
      await markLessonCompleted(lesson.id);
    }

    Alert.alert(isCorrect ? 'Correto!' : 'Ops...', lesson.question.explanation);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2E86AB" />
        <Text style={styles.loadingText}>Carregando lição...</Text>
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lição não encontrada</Text>
        <Text style={styles.note}>Verifique se a lição existe no Firestore ou se a configuração do Firebase está correta.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.question}>{lesson.question.text}</Text>
      {lesson.question.code ? (
        <View style={styles.codeBlock}>
          <Text style={styles.code}>{lesson.question.code}</Text>
        </View>
      ) : null}

      {lesson.question.options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            selected === option.id ? styles.optionSelected : undefined,
          ]}
          onPress={() => setSelected(option.id)}
          disabled={answered}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={answered}>
        <Text style={styles.submitText}>{answered ? 'Respondido' : 'Confirmar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#f4f4f6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#2c3e50',
  },
  option: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginBottom: 10,
  },
  optionSelected: {
    borderColor: '#2E86AB',
    backgroundColor: '#eaf4ff',
  },
  optionText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#2E86AB',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  note: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
});

