# Задание для live-coding / Frontend Relines.

## Реализация страницы товара для интернет-магазина

Необходимо реализовать простую страницу товара в интернет-магазине с некоторыми интерактивными элементами, с которыми может взаимодействовать пользователь.
Данные, необходимые для работы страницы, получаются от API бэкенда. API изменять нельзя.

### Функционал
На странице товара должны отображаться:
- Данные товара (название, цена) – карточка товара
- Связанные товары
- Карточки товаров, выбранных пользователем для сравнения

![Карточка товара и связанные товары](/product-page.png)

Пользователь может добавлять связанные товары в список сравнения с текущим и просматривать их карточки в модальном окне

![Карточки товара в списке сравнения в ряд](/comparing-products-row.png)

![Данные о товаре в модальном окне](/product-page-with-modal.png)

### Требования бизнес-логики:

#### Связанные товары
- Связанные товары являются *аналогами*, если находятся в той же категории, что и просматриваемый товар
- Связанные товары являются *сопутствующими*, если находятся в другой известной категории
- Если требования выше не выполняются – товар не имеет никаких прочих признаков

#### Действия со связанными товарами
- При клике на кнопку с названием товара-*аналога*, его карточка добавляется в список для сравнения, который отображается рядом с данными о текущем товаре.
- При клике на кнопку с названием любого другого товара, его карточка отображаются в модальном окне.

### Требования к реализации
- Код должен быть написан в соответствии с парадигмами чистой архитектуры или DDD.

### Интерфейс
- Карточка просматриваемого товара занимает половину ширины видимой области страницы
- Список товаров для сравнения – оставшуюся половину в один ряд (при ширине экрана, не позволяющей отобразить карточки в один ряд, происходит перенос на новую строку (см. скриншоты))

![Карточки товара в списке сравнения в ряд](/comparing-products-row.png)

![Карточки товара в списке сравнения в столбец](/comparing-products-column.png)

### Допущения
- Реализацию удаления товара из списка сравнения можно не делать
- Ограничение на добавление товара в список сравнения только единожды можно не реализовывать

## Предоставленная структура проекта
Общая структура проекта предоставлена утилитой create-react-app.
Дополнительно структура декомпозирована на следующие модули:
```
src
  - gateways            # Модуль с данными
    - models            # Модели, возвращаемые "API"
      api.ts            # Статические данные
      product-page.ts   # Реализация интерфейса репозитория данных, эмулирует запросы на бэкенд
  - models
      index.ts          # Типы базовых сущностей/моделей, с которыми необходимо работать в проекте
  - services
    - products
      interfaces.ts     # Интерфейс репозитория данных
  - store               # Шаблоны некоторых actions, reducers и selectors redux (созданы для удобства, чтобы не тратить время на рутину)
    ...
    index.ts            # Сконфигурированное хранилище redux (чтобы не тратить время на рутину, использование опционально)
  - view
    - components
      - common
        modal.tsx       # Готовый компонент модального окна
      - product-page
        index.tsx       # Шаблон компонента страницы товара
      - root
        index.tsx       # Готовая разводящая страница со ссылками на страницы товаров
````

Для удобства и чтобы сократить лишнюю рутину в проект добавлены некоторые элементы:
- Настроен роутинг и добавлена разводящая страница root `src/view/components/root/index.tsx` со ссылками на страницы товаров.
- Описан интерфейс источника данных и Mock-класс, реализующий этот интерфейс, эмулирующий запросы на бэкенд.
- Добавлен компонент модального окна, который можно использовать в своём коде
- Библиотеки для работы со state-менеджером redux и шаблоны сущностей для работы (в папке `src/store/`). (Возможность использовать любой другой state-менеджер или вообще отказаться от его использования остаётся за исполнителем).


## Бонус-трек
- На мобильном разрешении экрана (например, <450px по ширине окна) по кнопке "назад" в браузере закрывается только открытое модальное окно (не происходит перехода на предыдущую страницу)
- Для удобства реализации в коде присутствует хук `useLessThenMediaQuery` и `useMoreThenMediaQuery` в файле `src/view/hooks/media-query.ts`
