# Слайдер (версия через class)

Это версия слайдера, сделанная с использованием классов в JavaScript.

## Что есть в проекте

- Слайдер на `class`
- Кнопки (создаются через JS)
- Точки (индикаторы, тоже через JS)
- Автопрокрутка
- Пауза при наведении мышки
- Настройки через config
- Адаптив под разные экраны

## Настройки (config)

Пример:

```js
new Slider(document.getElementById("slider"), {
  autoplay: true,
  interval: 2500,
  showButtons: true,
  showDots: true,
  pauseOnHover: true
});
