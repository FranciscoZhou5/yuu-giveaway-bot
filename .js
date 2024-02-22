// Lista de nomes ponderada
var nomesPonderados = [
  { nome: "João", peso: 2 }, // João tem peso 2, então tem o dobro de chance de ser sorteado
  { nome: "Maria", peso: 2 },
  { nome: "José", peso: 1 },
  { nome: "Ana", peso: 1 },
  { nome: "Pedro", peso: 1 },
];

// Função para sortear um nome aleatório ponderado da lista
function sortearNomePonderado() {
  // Calcular o total de pesos
  var totalPesos = nomesPonderados.reduce((acc, nome) => acc + nome.peso, 0);

  // Gerar um número aleatório entre 0 e o total de pesos
  var numeroAleatorio = Math.random() * totalPesos;

  // Iterar sobre a lista de nomes ponderados para determinar qual nome corresponde ao número aleatório gerado
  for (var i = 0; i < nomesPonderados.length; i++) {
    // Subtrair o peso do nome atual do número aleatório
    numeroAleatorio -= nomesPonderados[i].peso;

    // Se o número aleatório for menor que 0, retornar o nome correspondente
    if (numeroAleatorio < 0) {
      return nomesPonderados[i].nome;
    }
  }
}

const names = [...Array.from({ length: 100 }).map(() => sortearNomePonderado())];

const count = {};

names.forEach((item) => {
  count[item] = (count[item] || 0) + 1;
});

// console.log(count);

const dateString = "29/02/2024 21:30";

const [datePart, hourPart] = dateString.split(" ");
const [day, month, year] = datePart.split("/");
const [hour, minute] = hourPart.split(":");

const data = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);

// Obter timestamp em milissegundos
const timestamp = data.getTime();

// Converter para timestamp do Discord (em milissegundos)
const discordTimestamp = timestamp * 1000000;

console.log(discordTimestamp);

// Exemplo de uso: sorteando um nome ponderado e exibindo no console
// console.log("O nome sorteado é: " + sortearNomePonderado());
