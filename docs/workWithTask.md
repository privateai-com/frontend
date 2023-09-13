# Шпаргалка по порядку работы с тасками

## Оглавление

[[_TOC_]]

## Работа в статусах

### To Do

Берём только таски из колонки `To Do` передвигая их в колонку `In Progress`.


### In Progress 

1. Создаём ветку `task/#<номер-таски>`, например, `task/#1`.
2. Создаём MR с префиксом [Draft](https://docs.gitlab.com/ee/user/project/merge_requests/drafts.html) и ставим себя в этом MR исполнителем.
3. Переименовываем MR в `task/#<номер-таски> - <краткое-описание>`, например `task/#50 - add address to signUpSaga`.
4. В конце дня трекаем в gitlab время с помощью команды [spend](https://docs.gitlab.com/ee/user/project/time_tracking.html#how-to-enter-data).
5. Когда задача выполнена, снимаем с MR префикс [Draft](https://docs.gitlab.com/ee/user/project/merge_requests/drafts.html), в `Reviewers` добавляем ревьюера, таску двигаем в колонку `Review`.
6. В задаче каждый день должны появляться коммиты, либо отчёт, иногда и то и то, не забываем про это, подробнее в [доке](https://git.sfxdx.ru/arrow-dex/arrow-dex-microservices/-/wikis/%D0%9F%D0%BE%D1%80%D1%8F%D0%B4%D0%BE%D0%BA-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B-%D1%81-%D1%82%D0%B0%D1%81%D0%BA%D0%B0%D0%BC%D0%B8#in-progress).

### Fixing After Testing

1. Убираем следы предыдущей ветки bugfix:
   - `git remote prune origin --dry-run`;
   - `git remote prune origin`;
   - `git branch -D bugfix/<фамилия>`.

2. Создаём новую ветку `bugfix/<фамилия>`.
3. Создаём MR с префиксом [Draft](https://docs.gitlab.com/ee/user/project/merge_requests/drafts.html).
4. По очереди заходим в таски и исправляем замечания.
5. Имя MR должно выглядеть так: `fix for #1, #2, #3`.
6. В таске `<фамилия>: fixing after review/testing` должен быть такой коммент (время для тасок общее, но для каждого раздела своё):

   ```
   - fixing after testing: !29 - 2h.
   - fixing after review: ...
   ```

7. Таски в `Review` двигаются только всем пулом, по готовности всего MR.

### Fixing After Review

1. Вносим правки в соответствии с замечаниями.
2. В таске `<фамилия>: fixing after review/testing` должен быть такой коммент (время для тасок общее, но для каждого раздела своё):

   ```
   - fixing after testing: ...
   - fixing after review: !29, !27 - 2h.
   ```

3. Двигаем таск(и) обратно в колонку `Review`.

## Отчёт в канале

Отчёт в канале должен выглядеть так:

```
Отчёт 15.04:
  - Фиксы после ревью и тестирования: #40 (ссылкой);
  - Подключение эндпоинта с токенами на дашборде: #44 (ссылкой).
```