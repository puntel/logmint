import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getLessonFromCurriculum } from '../services/curriculumService';
import type { Lesson } from '../data/curriculum';

export type { Lesson } from '../data/curriculum';

const lessonsCollection = collection(db, 'lessons');

export async function getLessonById(id: string): Promise<Lesson | null> {
  try {
    const docRef = doc(lessonsCollection, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data() as Omit<Lesson, 'id'>;
      return {
        id: snapshot.id,
        ...data,
      };
    }
  } catch (error) {
    console.warn('Erro ao buscar lição no Firestore:', error);
  }

  // Caso não haja conexão ou não exista no Firestore, usa currículo local.
  return getLessonFromCurriculum(id);
}
