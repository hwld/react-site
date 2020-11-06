import { Category } from '../services/categories';
import { Note, NotesSortOrder } from '../services/notes';

const isDate = (arg: string | Date): arg is Date => {
  return arg != null && typeof arg !== 'string';
};

// sortOrderを受け取って、比較関数を返す.
// note[sortOrder.targetField]がDate型のときにはgetTime()で比較し、
// note[sortOrder.targetField]がstring型のときには直接比較する.
export const notesCompareFunction = (sortOrder: NotesSortOrder) => {
  return (NoteA: Note, NoteB: Note) => {
    let BisBigger: boolean;
    let AisBigger: boolean;
    const targetObjA = NoteA[sortOrder.targetField];
    const targetObjB = NoteB[sortOrder.targetField];

    if (isDate(targetObjA) && isDate(targetObjB)) {
      AisBigger = targetObjA.getTime() > targetObjB.getTime();
      BisBigger = targetObjA.getTime() < targetObjB.getTime();
    } else {
      AisBigger = targetObjA > targetObjB;
      BisBigger = targetObjA < targetObjB;
    }

    if (AisBigger) {
      if (sortOrder.order === 'asc') {
        return 1;
      }

      return -1;
    }
    if (BisBigger) {
      if (sortOrder.order === 'asc') {
        return -1;
      }

      return 1;
    }

    return 0;
  };
};

// 同じ親を持つcategoryを作成順に並び替える.
// そのうち並び順を指定できるようにするかも.
export const categoriesCompareFunction = () => {
  return (categoryA: Category, categoryB: Category) => {
    if (categoryA.createdAt.getTime() > categoryB.createdAt.getTime()) {
      return 1;
    }
    if (categoryA.createdAt.getTime() < categoryB.createdAt.getTime()) {
      return -1;
    }

    return 0;
  };
};
