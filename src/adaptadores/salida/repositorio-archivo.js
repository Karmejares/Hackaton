/**
 * ADAPTADOR DE SALIDA · repositorio en un archivo JSON                     (ETAPA 2 · tu trabajo)
 *
 * Cumple EL MISMO puerto que el de memoria, pero guarda las evaluaciones en un archivo: un arreglo JSON.
 * Así los datos sobreviven a un reinicio del servidor (y, en la Etapa 6, a un contenedor nuevo).
 *
 *   crearRepositorioArchivo('/ruta/evaluaciones.json')
 *
 * Detalles que las pruebas comprueban:
 *   · si el archivo todavía no existe, `listar()` devuelve [] (no es un error);
 *   · al guardar por primera vez se crea el archivo… y también su carpeta, si hace falta (mira mkdirSync con { recursive: true });
 *   · otra instancia apuntando al mismo archivo ve lo que guardó la primera;
 *   · las mismas reglas del contrato que el de memoria (ids, copias, orden).
 *
 * Usa node:fs en su versión síncrona (readFileSync, writeFileSync, existsSync, mkdirSync) y node:path.
 *
 * Comprueba con:   npm run verificar -- 2
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export function crearRepositorioArchivo(ruta) {
  function leer() {
    if (!existsSync(ruta)) return [];
    return JSON.parse(readFileSync(ruta, 'utf8'));
  }

  function escribir(lista) {
    mkdirSync(dirname(ruta), { recursive: true });
    writeFileSync(ruta, JSON.stringify(lista));
  }

  return {
    listar() {
      return leer().map((e) => ({ ...e }));
    },
    obtener(id) {
      const e = leer().find((e) => e.id === id);
      return e ? { ...e } : undefined;
    },
    guardar(evaluacion) {
      const lista = leer();
      if (evaluacion.id === undefined || evaluacion.id === null) {
        const nuevoId = lista.length ? Math.max(...lista.map((e) => e.id)) + 1 : 1;
        const nueva = { ...evaluacion, id: nuevoId };
        lista.push(nueva);
        escribir(lista);
        return { ...nueva };
      }
      const i = lista.findIndex((e) => e.id === evaluacion.id);
      const copia = { ...evaluacion };
      if (i === -1) lista.push(copia);
      else lista[i] = copia;
      escribir(lista);
      return { ...copia };
    },
    eliminar(id) {
      const lista = leer();
      const i = lista.findIndex((e) => e.id === id);
      if (i === -1) return false;
      lista.splice(i, 1);
      escribir(lista);
      return true;
    },
  };
}
