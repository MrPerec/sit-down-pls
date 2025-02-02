# sit-down-pls

## О проекте

SitDownPls — это учебный проект, созданный в рамках курса по продвинутой веб-вёрстке. Проект представляет собой интернет-магазин мебели с адаптивным дизайном, обеспечивающий комфортное взаимодействие пользователей на любых устройствах, выполненный по макету [Figma](https://www.figma.com/design/ZPj1HpZoklEXl7hKmYPGd2/sdp.ru).

## Функциональность

Проект включает следующие ключевые страницы:

1. **Главная страница**:

   - Hero-блок с основным предложением компании.
   - Блоки с популярными категориями товаров и специальными предложениями.
   - Информационные секции с рейтингами и полезными статьями.

2. **Каталог**:

   - Фильтрация и сортировка товаров.
   - Отображение товаров с их описанием и ценами.

3. **Карточка товара**:

   - Подробная информация о выбранном товаре.
   - Блок "Похожие товары" для удобной навигации.

4. **Сотрудничество**:

   - Информация для работы с постащиками.

## Технологии

Для реализации проекта использованы следующие инструменты и технологии:

- **HTML5 и CSS3** для семантической и адаптивной вёрстки.
- **JavaScript** для валидации форм.
- **swiperjs** для реализации свайпера карточек на странице "Каталога".
- **php** для реализации логики отправки данных формы обратной связи.
- **Sass/SCSS** для удобного написания стилей.
- **Gulp** — сборщик для автоматизации задач.
- **SVG** для иконок и графических элементов.
- **Линтеры и валидаторы** для проверки кода на соответствие стандартам.

## Особенности

- **Кроссбраузерность**: проект протестирован в браузерах Chrome, Firefox, Safari, Opera, Edge.
- **Доступность**: все интерактивные элементы снабжены ховер-эффектами и видимой индикацией состояния.
- **Анимации**: плавные переходы для улучшения пользовательского опыта.
- **Адаптивность**: корректное отображение на экранах любых размеров.
- **Общий Header и Footer**: реализованный при помощи gulp-file-include. Единный файл Header и Footer который подключается на все страницы.
- **Карточки товара из JSON**: карточки товара генерируются из внешнего файла JSON что эмулирует получение информации от backend.

## Как запустить проект

1. Склонируйте репозиторий:

   ```bash
   git clone https://github.com/your-username/sitdownpls.git
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Запустите проект в режиме разработки:

   ```bash
   npm run dev
   ```

4. Для сборки проекта выполните:

   ```bash
   npm run build
   ```

## Скриншоты

<p align="center">
   <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWUwYmg1eHFtMHpoaXA2dm5ia2t2d2tnNTFjcWN1aTZrYnRncWYxbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lOPx7iJ49IwN7j4tXg/giphy.gif" width="80%">
</p>

## Ссылки

- [Опубликованная версия проекта](http://b91276hv.beget.tech/)
- [Репозиторий на GitHub](https://github.com/MrPerec/sit-down-pls)

## Авторы

Проект создан в рамках учебного курса. Основной разработчик: [MrPerec](https://github.com/MrPerec).

## Лицензия

Этот проект доступен под лицензией MIT.
