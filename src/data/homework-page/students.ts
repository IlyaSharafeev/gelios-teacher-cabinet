export interface Student {
    id: number;
    name: string;
    direction: string;
    task: string;
    date: string;
    completed: boolean;
    isUpcoming?: boolean;
}

export const students: Student[] = [
    { id: 1, name: 'Всі учні', direction: 'Всі напрямки', task: '', date: '', completed: false, isUpcoming: true },
    { id: 2, name: 'Іван Петров', direction: 'Швидкочитання', task: 'Прочитати текст', date: '2024-09-30T12:30:00', completed: false, isUpcoming: true },
    { id: 3, name: 'Марія Сидорова', direction: 'IT', task: 'Написати код', date: '2024-12-04T14:00:00', completed: true, isUpcoming: true },
    { id: 4, name: 'Олег Коваль', direction: 'Ментальна арифметика', task: 'Виконати 50 вправ', date: '2024-10-15T10:00:00', completed: false },
    { id: 5, name: 'Софія Левицька', direction: 'Швидкочитання', task: 'Тренування швидкості', date: '2024-09-25T09:30:00', completed: true },
    { id: 6, name: 'Дмитро Шевченко', direction: 'IT', task: 'Створити API', date: '2024-10-10T11:45:00', completed: true },
    { id: 7, name: 'Юлія Кравець', direction: 'Ментальна арифметика', task: 'Розв’язати задачі', date: '2024-12-01T15:20:00', completed: false },
    { id: 8, name: 'Катерина Ткачук', direction: 'Швидкочитання', task: 'Читати 5 сторінок', date: '2024-10-20T14:30:00', completed: false },
    { id: 9, name: 'Артем Гончар', direction: 'IT', task: 'Розробити UI', date: '2024-11-15T09:00:00', completed: true },
    { id: 10, name: 'Олена Мельник', direction: 'Ментальна арифметика', task: 'Тренування обчислень', date: '2024-09-28T11:00:00', completed: false },
    { id: 11, name: 'Наталія Козак', direction: 'Швидкочитання', task: 'Практика сканування', date: '2024-10-05T10:30:00', completed: false },
    { id: 12, name: 'Роман Дубовий', direction: 'IT', task: 'Тестування коду', date: '2024-11-25T15:45:00', completed: true },
    { id: 13, name: 'Вікторія Лозова', direction: 'Ментальна арифметика', task: '50 прикладів', date: '2024-09-15T13:20:00', completed: false },
    { id: 14, name: 'Тетяна Скрипник', direction: 'Швидкочитання', task: 'Читати книгу', date: '2024-10-12T09:15:00', completed: false },
    { id: 15, name: 'Богдан Литвин', direction: 'IT', task: 'Оптимізувати код', date: '2024-11-30T16:30:00', completed: true },
    { id: 16, name: 'Ірина Савчук', direction: 'Ментальна арифметика', task: 'Практика таблиць', date: '2024-09-20T12:45:00', completed: false },
    { id: 17, name: 'Оксана Марчук', direction: 'Швидкочитання', task: 'Скорочитання', date: '2024-10-25T11:30:00', completed: false },
    { id: 18, name: 'Сергій Підлісецький', direction: 'IT', task: 'Написати скрипт', date: '2024-11-10T13:00:00', completed: true },
    { id: 19, name: 'Людмила Гордієнко', direction: 'Ментальна арифметика', task: 'Обчислення в умі', date: '2024-09-30T14:15:00', completed: false },
    { id: 20, name: 'Аліна Руденко', direction: 'Швидкочитання', task: 'Тренування пам’яті', date: '2024-10-30T09:45:00', completed: false },
    { id: 21, name: 'Євген Кравчук', direction: 'IT', task: 'Створити базу даних', date: '2024-11-20T12:30:00', completed: true },
    { id: 22, name: 'Дарина Поліщук', direction: 'Ментальна арифметика', task: '50 задач', date: '2024-10-08T10:00:00', completed: false },
    { id: 23, name: 'Марта Клименко', direction: 'Швидкочитання', task: 'Читати статтю', date: '2024-11-05T11:15:00', completed: false },
    { id: 24, name: 'Олександр Шаповал', direction: 'IT', task: 'Розробити додаток', date: '2024-12-15T13:30:00', completed: true },
    { id: 25, name: 'Яна Гнатів', direction: 'Ментальна арифметика', task: 'Тренування швидкості', date: '2024-10-18T12:00:00', completed: false },
    { id: 26, name: 'Христина Сеньків', direction: 'Швидкочитання', task: 'Практика текстів', date: '2024-11-12T10:30:00', completed: false },
    { id: 27, name: 'Ігор Федорчук', direction: 'IT', task: 'Тестувати API', date: '2024-12-20T14:00:00', completed: true },
    { id: 28, name: 'Світлана Мазур', direction: 'Ментальна арифметика', task: 'Розв’язати рівняння', date: '2024-10-22T11:45:00', completed: false },
    { id: 29, name: 'Зоряна Шевчук', direction: 'Швидкочитання', task: 'Читати 10 сторінок', date: '2024-11-18T09:00:00', completed: false },
    { id: 30, name: 'Ростислав Довгань', direction: 'IT', task: 'Створити форму', date: '2024-12-25T13:15:00', completed: true },
    { id: 31, name: 'Лілія Яремчук', direction: 'Ментальна арифметика', task: 'Практика множення', date: '2024-10-28T10:45:00', completed: false },
    { id: 32, name: 'Емілія Садовська', direction: 'Швидкочитання', task: 'Сканувати текст', date: '2024-11-22T12:00:00', completed: false },
    { id: 33, name: 'Лев Данилюк', direction: 'IT', task: 'Написати модуль', date: '2024-12-30T15:00:00', completed: true },
    { id: 34, name: 'Марина Ковальчук', direction: 'Ментальна арифметика', task: 'Тренування додавання', date: '2024-11-01T11:30:00', completed: false },
    { id: 35, name: 'Ольга Семенюк', direction: 'Швидкочитання', task: 'Читати журнал', date: '2024-11-28T10:15:00', completed: false },
    { id: 36, name: 'Ярослав Ткач', direction: 'IT', task: 'Розробити сайт', date: '2025-01-02T12:00:00', completed: true },
    { id: 37, name: 'Вероніка Гринишин', direction: 'Ментальна арифметика', task: '50 обчислень', date: '2024-11-10T14:00:00', completed: false },
    { id: 38, name: 'Інна Білецька', direction: 'Швидкочитання', task: 'Тренування очей', date: '2024-12-05T09:45:00', completed: false },
    { id: 39, name: 'Вадим Сеньків', direction: 'IT', task: 'Створити гру', date: '2025-01-08T13:15:00', completed: true },
    { id: 40, name: 'Каріна Литвиненко', direction: 'Ментальна арифметика', task: 'Практика ділення', date: '2024-11-15T12:30:00', completed: false },
    { id: 41, name: 'Тамара Гаврилюк', direction: 'Швидкочитання', task: 'Читати поезію', date: '2024-12-10T11:00:00', completed: false },
    { id: 42, name: 'Єгор Сенько', direction: 'IT', task: 'Оптимізувати сайт', date: '2025-01-12T14:45:00', completed: true },
    { id: 43, name: 'Ангеліна Бойчук', direction: 'Ментальна арифметика', task: 'Тренування пам’яті', date: '2024-11-20T13:15:00', completed: false },
    { id: 44, name: 'Надія Шевчук', direction: 'Швидкочитання', task: 'Читати роман', date: '2024-12-15T09:30:00', completed: false },
    { id: 45, name: 'Макар Гринишин', direction: 'IT', task: 'Створити анімацію', date: '2025-01-15T15:00:00', completed: true },
    { id: 46, name: 'Віра Мельник', direction: 'Ментальна арифметика', task: '50 прикладів', date: '2024-11-25T10:45:00', completed: false },
    { id: 47, name: 'Мирослава Садовська', direction: 'Швидкочитання', task: 'Практика швидкості', date: '2024-12-20T12:00:00', completed: false },
    { id: 48, name: 'Кирило Ткачук', direction: 'IT', task: 'Розробити плагін', date: '2025-01-20T13:30:00', completed: true },
    { id: 49, name: 'Олеся Данилюк', direction: 'Ментальна арифметика', task: 'Тренування обчислень', date: '2024-12-01T14:00:00', completed: false },
    { id: 50, name: 'Лариса Бондар', direction: 'Швидкочитання', task: 'Читати есе', date: '2024-12-25T11:45:00', completed: false },
    { id: 51, name: 'Матвій Сеньків', direction: 'IT', task: 'Створити чат', date: '2025-01-25T12:15:00', completed: true },
    { id: 52, name: 'Діана Поліщук', direction: 'Ментальна арифметика', task: 'Практика віднімання', date: '2024-12-05T13:00:00', completed: false },
    { id: 53, name: 'Єлизавета Руденко', direction: 'Швидкочитання', task: 'Тренування текстів', date: '2024-12-30T10:30:00', completed: false },
    { id: 54, name: 'Тимофій Степаненко', direction: 'IT', task: 'Розробити гру', date: '2025-01-30T15:15:00', completed: true },
    { id: 55, name: 'Ксенія Гордієнко', direction: 'Ментальна арифметика', task: '50 рівнянь', date: '2024-12-10T11:30:00', completed: false },
    { id: 56, name: 'Уляна Вовк', direction: 'Швидкочитання', task: 'Читати наукову статтю', date: '2025-01-05T09:15:00', completed: false },
    { id: 57, name: 'Ілля Савчук', direction: 'IT', task: 'Створити API', date: '2025-02-01T13:00:00', completed: true },
    { id: 58, name: 'Соломія Литвин', direction: 'Ментальна арифметика', task: 'Тренування множення', date: '2024-12-15T14:30:00', completed: false },
    { id: 59, name: 'Евеліна Пономаренко', direction: 'Швидкочитання', task: 'Читати 15 сторінок', date: '2025-01-10T12:15:00', completed: false },
    { id: 60, name: 'Юрій Мазур', direction: 'IT', task: 'Тестувати додаток', date: '2025-02-05T14:45:00', completed: true },
    { id: 61, name: 'Аріна Федорчук', direction: 'Ментальна арифметика', task: 'Практика задач', date: '2024-12-20T10:30:00', completed: false },
    { id: 62, name: 'Злата Клименко', direction: 'Швидкочитання', task: 'Тренування пам’яті', date: '2025-01-15T11:45:00', completed: false },
    { id: 63, name: 'Давид Поліщук', direction: 'IT', task: 'Розробити форму', date: '2025-02-10T12:00:00', completed: true },
    { id: 64, name: 'Мілана Остапчук', direction: 'Ментальна арифметика', task: '50 обчислень', date: '2024-12-25T13:15:00', completed: false },
    { id: 65, name: 'Стефанія Гринишин', direction: 'Швидкочитання', task: 'Читати оповідання', date: '2025-01-20T10:00:00', completed: false },
    { id: 66, name: 'Лука Ткач', direction: 'IT', task: 'Створити сайт', date: '2025-02-15T15:30:00', completed: true },
    { id: 67, name: 'Ельміра Семенюк', direction: 'Ментальна арифметика', task: 'Тренування швидкості', date: '2024-12-30T11:45:00', completed: false },
    { id: 68, name: 'Валерія Ковальчук', direction: 'Швидкочитання', task: 'Практика сканування', date: '2025-01-25T09:30:00', completed: false },
    { id: 69, name: 'Тихон Садовський', direction: 'IT', task: 'Оптимізувати код', date: '2025-02-20T13:00:00', completed: true },
    { id: 70, name: 'Мая Яремчук', direction: 'Ментальна арифметика', task: 'Практика додавання', date: '2025-01-01T14:15:00', completed: false },
    { id: 71, name: 'Орися Шевчук', direction: 'Швидкочитання', task: 'Читати книгу', date: '2025-01-30T12:45:00', completed: false },
    { id: 72, name: 'Гордій Мельник', direction: 'IT', task: 'Створити базу даних', date: '2025-02-25T14:30:00', completed: true },
    { id: 73, name: 'Таїсія Гнатів', direction: 'Ментальна арифметика', task: '50 прикладів', date: '2025-01-05T10:30:00', completed: false },
    { id: 74, name: 'Лія Бойчук', direction: 'Швидкочитання', task: 'Тренування швидкості', date: '2025-02-01T11:30:00', completed: false },
    { id: 75, name: 'Роман Сенько', direction: 'IT', task: 'Розробити додаток', date: '2025-03-01T15:00:00', completed: true },
    { id: 76, name: 'Естер Гаврилюк', direction: 'Ментальна арифметика', task: 'Практика множення', date: '2025-01-10T12:00:00', completed: false },
];