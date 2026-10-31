/**
 * ADAPTADOR DE SALIDA · repositorio en memoria                             (ETAPA 2 · tu trabajo)
 *
 * Cumple el puerto de ../../aplicacion/puerto-repositorio.js guardando las evaluaciones en un arreglo.
 * Es el adaptador más simple: sirve para las pruebas y para arrancar sin configurar nada.
 *
 * Lo importante es el CONTRATO (lee el puerto): ids que asigna él mismo (mayor + 1), copias en vez de las referencias
 * originales y los cuatro métodos con el significado exacto. Las pruebas de la Etapa 2 son las MISMAS para el
 * adaptador de archivo: si los dos las pasan, son intercambiables y el resto de la aplicación no se entera.
 *
 * Comprueba con:   npm run verificar -- 2
 */

export function crearRepositorioMemoria() {
  const evaluaciones = [];

  return {
    listar() {
      return evaluaciones.map((e) => ({ ...e }));
    },
    obtener(id) {
      const e = evaluaciones.find((e) => e.id === id);
      return e ? { ...e } : undefined;
    },
    guardar(evaluacion) {
      if (evaluacion.id === undefined || evaluacion.id === null) {
        const nuevoId = evaluaciones.length ? Math.max(...evaluaciones.map((e) => e.id)) + 1 : 1;
        const nueva = { ...evaluacion, id: nuevoId };
        evaluaciones.push(nueva);
        return { ...nueva };
      }
      const i = evaluaciones.findIndex((e) => e.id === evaluacion.id);
      const copia = { ...evaluacion };
      if (i === -1) evaluaciones.push(copia);
      else evaluaciones[i] = copia;
      return { ...copia };
    },
    eliminar(id) {
      const i = evaluaciones.findIndex((e) => e.id === id);
      if (i === -1) return false;
      evaluaciones.splice(i, 1);
      return true;
    },
  };
}
