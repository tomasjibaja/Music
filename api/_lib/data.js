// Datos fijos del juego (el servidor no confía en lo que diga el navegador)
module.exports = {
  GAMES: { ritmo: { cap: 200, levels: 4 }, cambio: { cap: 300, levels: 4 } }, // cap = máximo de puntos por nivel
  TOPICS: { t1: 6, t2: 6, t3: 6, t4: 6, t5: 4, t6: 5 },                          // temas y cantidad de diapositivas
  AVATARS: 12,
  FINISH_BONUS: 50,
  MIN_LEVEL_SECONDS: 12,
  RESET_HOURS: 24,
};
