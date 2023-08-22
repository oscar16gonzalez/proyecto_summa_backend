
// calcula la media aritmética o promedio de una lista de números reales.
class AgenteA {
    getMedia(listaDeNumeros) {
      if (listaDeNumeros.length === 0) {
        return 0;
      }
  
      const suma = listaDeNumeros.reduce((acumulador, numero) => acumulador + numero, 0);
      return suma / listaDeNumeros.length;
    }
  }
  
  class AgenteB {
    getMedia(listaDeNumeros) {
      if (listaDeNumeros.length === 0) {
        return 0;
      }
  
      const sumaReciprocos = listaDeNumeros.reduce((acumulador, numero) => acumulador + (1 / numero), 0);
      return listaDeNumeros.length / sumaReciprocos;
    }
  }
  
  class AgenteC {
    getMedia(listaDeNumeros) {
      if (listaDeNumeros.length === 0) {
        return 0;
      }
  
      const sortedNumbers = listaDeNumeros.sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedNumbers.length / 2);
  
      if (sortedNumbers.length % 2 === 0) {
        return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
      } else {
        return sortedNumbers[middleIndex];
      }
    }
  }
  
  class Escalera {
    constructor(n) {
      this.n = n;
    }
  
    getStaircase() {
      let staircase = '';
      for (let i = 1; i <= this.n; i++) {
        const spaces = ' '.repeat(this.n - i);
        const hashes = '#'.repeat(i);
        staircase += spaces + hashes + '\n';
      }
      return staircase;
    }
  
    getStaircas2() {
      let staircase = '';
      for (let i = 1; i >= this.n; i++) {
        const spaces = ' '.repeat(this.n + i);
        const hashes = '#'.repeat(i);
        staircase += spaces + hashes + '\n';
      }
      return staircase;
    }
  }
  
  
  const agenteA = new AgenteA();
  const agenteB = new AgenteB();
  const agenteC = new AgenteC();
  
  const listaDeNumeros = [1, 2, 3, 4, 5];
  console.log('Media A:', agenteA.getMedia(listaDeNumeros));
  console.log('Media B:', agenteB.getMedia(listaDeNumeros));
  console.log('Media C:', agenteC.getMedia(listaDeNumeros));
  
  const n = 40;
  const escaleraA = new Escalera(n);
  const escaleraB = new Escalera(n);
  const escaleraC = new Escalera(n);
  
  console.log('Escalera A:\n', escaleraA.getStaircase());
  console.log('Escalera B:\n', escaleraB.getStaircas2());
  console.log('Escalera C:\n', escaleraC.getStaircase());