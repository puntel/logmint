import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getLessonById, Lesson } from '../firebase/firestoreService';
import { markLessonCompleted, setLastLessonId, getCompletedLessons } from '../services/progressService';
import { getAllLessonsInOrder, getNextLessonId, getLessonFromCurriculum } from '../services/curriculumService';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

export default function LessonScreen({ navigation, route }: Props) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [orderingSelection, setOrderingSelection] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<
    | { type: 'success' | 'error'; title: string; message: string }
    | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const lessonId = route.params?.lessonId ?? 'lesson-1-1';

        // Reseta o estado de resposta sempre que a lição muda
        setSelected(null);
        setOrderingSelection([]);
        setAnswered(false);
        setFeedback(null);

        // Carrega o conteúdo local imediatamente para reduzir a espera
        const local = getLessonFromCurriculum(lessonId);
        if (local) {
          setLesson(local);
          setLoading(false);
        }

        const completed = await getCompletedLessons();
        const lessons = getAllLessonsInOrder();
        const index = lessons.findIndex(l => l.id === lessonId);
        const isUnlocked =
          index === 0 ||
          (index > 0 && completed.has(lessons[index - 1].id));

        setUnlocked(isUnlocked);

        if (isUnlocked) {
          await setLastLessonId(lessonId);
        }

        // Tentativa assíncrona de atualizar com dados do Firestore, se disponíveis.
        const remote = await getLessonById(lessonId);
        if (remote) {
          setLesson(remote);
        }

        if (!local) {
          // Se não havia lição local, só então paramos de carregar após o fetch remoto
          setLoading(false);
        }
      } catch (error) {
        console.warn('Erro ao carregar lição:', error);
        setLoading(false);
      }
    };

    load();
  }, [route.params]);

  const getCorrectAnswerText = (question: Lesson['question']) => {
    if (question.type === 'ordering') {
      return question.correct
        .split(',')
        .map(id => question.options.find(o => o.id === id)?.label ?? id)
        .join(' → ');
    }

    const correctOption = question.options.find(o => o.id === question.correct);
    return correctOption ? correctOption.label : question.correct;
  };

  const handleSubmit = async () => {
    if (!lesson) return;

    if (!unlocked) {
      Alert.alert('Lição bloqueada', 'Você precisa completar a lição anterior para liberar esta.');
      return;
    }

    const { question } = lesson;
    const { type, correct, options } = question;

    if (type === 'ordering') {
      if (orderingSelection.length !== options.length) {
        Alert.alert(
          'Complete a ordem',
          'Selecione todos os passos na ordem correta antes de enviar.'
        );
        return;
      }
    } else {
      if (!selected) {
        Alert.alert('Selecione uma opção', 'Escolha uma resposta antes de continuar.');
        return;
      }
    }

    const userAnswer =
      type === 'ordering' ? orderingSelection.join(',') : selected;

    const isCorrect = userAnswer === correct;
    const nextLessonId = getNextLessonId(lesson.id);

    if (isCorrect) {
      setAnswered(true);
      setFeedback({
        type: 'success',
        title: 'Correto!',
        message: question.explanation,
      });
      await markLessonCompleted(lesson.id);
      if (nextLessonId) {
        await setLastLessonId(nextLessonId);
      }
    } else {
      const correctAnswerText = getCorrectAnswerText(question);
      setFeedback({
        type: 'error',
        title: 'Ops...',
        message: `Resposta correta: ${correctAnswerText}\n\n${question.explanation}`,
      });
    }
  };

  const handleNextLesson = () => {
    if (!lesson) return;
    const nextLessonId = getNextLessonId(lesson.id);
    if (nextLessonId) {
      navigation.replace('Lesson', { lessonId: nextLessonId });
    }
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

  if (!unlocked) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lição bloqueada</Text>
        <Text style={styles.note}>Você precisa completar a lição anterior para liberar esta.</Text>
      </View>
    );
  }

  const nextLessonId = lesson ? getNextLessonId(lesson.id) : null;
  const getLabelById = (id: string) =>
    lesson?.question.options.find(o => o.id === id)?.label ?? id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>
      {lesson.description ? <Text style={styles.description}>{lesson.description}</Text> : null}
      <Text style={styles.question}>{lesson.question.text}</Text>
      {lesson.question.code ? (
        <View style={styles.codeBlock}>
          <Text style={styles.code}>{lesson.question.code}</Text>
        </View>
      ) : null}

      {lesson.question.type === 'ordering' ? (
        <View style={styles.orderingContainer}>
          <Text style={styles.note}>Toque nos passos na ordem correta.</Text>
          {orderingSelection.length > 0 ? (
            <Text style={styles.note}>
              Sua ordem: {orderingSelection
                .map(id => lesson.question.options.find(o => o.id === id)?.label ?? id)
                .join(' → ')}
            </Text>
          ) : null}
          {orderingSelection.length > 0 && !answered ? (
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setOrderingSelection([])}
            >
              <Text style={styles.resetButtonText}>Limpar</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}

      {lesson.question.options.map(option => {
        const isSelected =
          lesson.question.type === 'ordering'
            ? orderingSelection.includes(option.id)
            : selected === option.id;

        const isCorrectOption =
          feedback != null && option.id === lesson.question.correct;
        const isIncorrectOption =
          feedback?.type === 'error' &&
          lesson.question.type !== 'ordering' &&
          selected === option.id;

        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              isSelected ? styles.optionSelected : undefined,
              isCorrectOption ? styles.optionCorrect : undefined,
              isIncorrectOption ? styles.optionIncorrect : undefined,
            ]}
            onPress={() => {
              if (lesson.question.type === 'ordering') {
                if (answered) return;
                setOrderingSelection(previous => {
                  if (previous.includes(option.id)) {
                    return previous.filter(id => id !== option.id);
                  }
                  return [...previous, option.id];
                });
              } else {
                setSelected(option.id);
              }
            }}
            disabled={answered}
          >
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={answered}>
        <Text style={styles.submitText}>{answered ? 'Respondido' : 'Confirmar'}</Text>
      </TouchableOpacity>

      {feedback ? (
        <View
          style={[
            styles.feedback,
            feedback.type === 'success' ? styles.feedbackSuccess : styles.feedbackError,
          ]}
        >
          <Text style={styles.feedbackTitle}>{feedback.title}</Text>
          <Text style={styles.feedbackMessage}>{feedback.message}</Text>

          {feedback.type === 'success' && nextLessonId ? (
            <TouchableOpacity style={styles.nextButton} onPress={handleNextLesson}>
              <Text style={styles.nextButtonText}>Próxima lição</Text>
            </TouchableOpacity>
          ) : null}

        </View>
      ) : null}
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
  description: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 12,
    color: '#333',
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
  optionCorrect: {
    borderColor: '#22c55e',
    backgroundColor: '#dcfce7',
  },
  optionIncorrect: {
    borderColor: '#ef4444',
    backgroundColor: '#fee2e2',
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
  feedback: {
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  feedbackSuccess: {
    backgroundColor: '#e6ffed',
    borderColor: '#22c55e',
    borderWidth: 1,
  },
  feedbackError: {
    backgroundColor: '#fff1f2',
    borderColor: '#ef4444',
    borderWidth: 1,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  feedbackMessage: {
    fontSize: 15,
    marginBottom: 10,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#2E86AB',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  orderingContainer: {
    marginBottom: 14,
  },
  resetButton: {
    backgroundColor: '#e0e7ff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#1e40af',
    fontWeight: '700',
  },
  note: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
});

