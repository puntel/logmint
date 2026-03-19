import { curriculum, Lesson } from '../data/curriculum';

const lessonsById: Record<string, Lesson> = {};

curriculum.levels.forEach(level => {
  level.units.forEach(unit => {
    unit.lessons.forEach(lesson => {
      lessonsById[lesson.id] = lesson;
    });
  });
});

export function getLessonFromCurriculum(id: string): Lesson | null {
  return lessonsById[id] ?? null;
}

export function getAllLevels() {
  return curriculum.levels;
}

export function getAllLessonsInOrder() {
  const lessons: Lesson[] = [];
  curriculum.levels.forEach(level => {
    level.units.forEach(unit => {
      unit.lessons.forEach(lesson => lessons.push(lesson));
    });
  });
  return lessons;
}

export function getNextLessonId(currentLessonId: string): string | null {
  const lessons = getAllLessonsInOrder();
  const index = lessons.findIndex(l => l.id === currentLessonId);
  if (index === -1 || index === lessons.length - 1) return null;
  return lessons[index + 1].id;
}

export function getUnitById(unitId: string) {
  for (const level of curriculum.levels) {
    const unit = level.units.find(u => u.id === unitId);
    if (unit) return unit;
  }
  return null;
}
