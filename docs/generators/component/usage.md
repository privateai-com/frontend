### Component

```bash
yarn run new
component
```

Создает компонент и storybook

Storybook необходим для визуализации компонентов. 
С его помощью показываем различные состояния компонента (какие пропсы он принимает).
Хороший пример src/stories/Button.stories.tsx 
У кнопки можно выбрать размер: size="small | middle | large", тип отображения type="primary | secondary" и т.д.
Это даёт возможность другим разработчикам посмотреть какие компоненты уже готовы и как их использовать.

<details>
  <summary>Структура добавляемых файлов</summary>

  ```bash
  my-project
  |-- src
  |   |-- components
  |   |   |-- название компонента
  |   |        |-- index.tsx
  |   |        |-- styles.module.css
  |   |        |-- название компонента.stories.tsx
  |   |   |-- index.ts
  ```
</details>