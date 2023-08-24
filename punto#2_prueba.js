class Agente {
    getAritmetica(listaDeNumeros) {
      if (listaDeNumeros.length === 0) {
        return 0;
      }
      const suma = listaDeNumeros.reduce((acumulador, numero) => acumulador + numero, 0);
      return suma / listaDeNumeros.length;
    }

    getEspecial(listaDeNumeros) {
      if (listaDeNumeros.length === 0) {
        return 0;
      }
      const sumaReciprocos = listaDeNumeros.reduce((acumulador, numero) => acumulador + (1 / numero), 0);
      return listaDeNumeros.length / sumaReciprocos;
    }

    getMediana(listaDeNumeros) {
      if (listaDeNumeros.length === 0) {
        return 0;
      }
      const sortedNumbers = listaDeNumeros.slice().sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedNumbers.length / 2);

      if (sortedNumbers.length % 2 === 0) {
        return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
      } else {
        return sortedNumbers[middleIndex];
      }
    }
}

// ESCALERA
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

  getStaircase_() {
    let staircase = '';
    for (let i = this.n; i >= 1; i--) {
      const spaces = ' '.repeat(this.n - i);
      const hashes = '#'.repeat(i);
      staircase += spaces + hashes + '\n';
    }
    return staircase;
  }

  getDiamond() {
    let diamond = '';
    for (let i = 1; i <= this.n; i++) {
      const spaces = ' '.repeat(this.n - i);
      const hashes = '#'.repeat(2 * i - 1);
      diamond += spaces + hashes + '\n';
    }
    for (let i = this.n - 1; i >= 1; i--) {
      const spaces = ' '.repeat(this.n - i);
      const hashes = '#'.repeat(2 * i - 1);
      diamond += spaces + hashes + '\n';
    }
    return diamond;
  }
}

  const agente = new Agente();
  const listaDeNumeros = [1, 2, 3, 4, 5];

  console.log('Media A:', agente.getAritmetica(listaDeNumeros));
  console.log('Media B:', agente.getEspecial(listaDeNumeros));
  console.log('Media C:', agente.getMediana(listaDeNumeros));


const escalera = new Escalera(13);

console.log('Escalera A:\n', escalera.getStaircase());
console.log('Escalera A:\n', escalera.getStaircase_());
console.log('Escalera Diamante:\n', escalera.getDiamond());
