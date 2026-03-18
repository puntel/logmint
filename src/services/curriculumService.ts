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

export function getUnitById(unitId: string) {
  for (const level of curriculum.levels) {
    const unit = level.units.find(u => u.id === unitId);
    if (unit) return unit;
  }
  return null;
}
