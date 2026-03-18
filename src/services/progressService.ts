import AsyncStorage from '@react-native-async-storage/async-storage';

const COMPLETED_LESSONS_KEY = 'logimente:completedLessons';
const LAST_LESSON_KEY = 'logimente:lastLessonId';

export async function getCompletedLessons(): Promise<Set<string>> {
  try {
    const raw = await AsyncStorage.getItem(COMPLETED_LESSONS_KEY);
    if (!raw) return new Set();
    const parsed: string[] = JSON.parse(raw);
    return new Set(parsed);
  } catch (error) {
    console.warn('Não foi possível ler as lições concluídas:', error);
    return new Set();
  }
}

export async function markLessonCompleted(lessonId: string): Promise<void> {
  try {
    const completed = await getCompletedLessons();
    completed.add(lessonId);
    await AsyncStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(Array.from(completed)));
  } catch (error) {
    console.warn('Não foi possível marcar lição como concluída:', error);
  }
}

export async function setLastLessonId(lessonId: string): Promise<void> {
  try {
    await AsyncStorage.setItem(LAST_LESSON_KEY, lessonId);
  } catch (error) {
    console.warn('Não foi possível salvar a última lição:', error);
  }
}

export async function getLastLessonId(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(LAST_LESSON_KEY);
  } catch (error) {
    console.warn('Não foi possível ler a última lição:', error);
    return null;
  }
}
