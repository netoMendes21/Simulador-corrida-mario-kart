const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Peach",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0,
};

// const player3 = {
//   NOME: "Yoshi",
//   VELOCIDADE: 2,
//   MANOBRABILIDADE: 4,
//   PODER: 3,
//   PONTOS: 0,
// };

// const player4 = {
//   NOME: "Bowser",
//   VELOCIDADE: 5,
//   MANOBRABILIDADE: 2,
//   PODER: 5,
//   PONTOS: 0,
// };

// const player5 = {
//   NOME: "Luigi",
//   VELOCIDADE: 3,
//   MANOBRABILIDADE: 4,
//   PODER: 4,
//   PONTOS: 0,
// };

// const player6 = {
//   NOME: "Donkey Kong",
//   VELOCIDADE: 2,
//   MANOBRABILIDADE: 2,
//   PODER: 5,
//   PONTOS: 0,
// };

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }
  return result;
}

async function getRandomAttack() {
  let randomAttack = Math.random();
  let attack;

  switch (true) {
    case randomAttack < 0.5:
      attack = "CASCO";
      break;
    case randomAttack < 0.9:
      attack = "BOMBA";
      break;
    default:
      attack = "CASCO";
      break;
  }
  return attack;
}

async function getRandomItem() {
  const random = Math.random();
  if (random < 0.33) return "ENCONTROU";
  return "PERDEU";
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2, character3, character4) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // teste de habilidades
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
      // totalTestSkill3 = diceResult3 + character3.VELOCIDADE;
      // totalTestSkill4 = diceResult4 + character4.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );

      // await logRollResult(
      //   character3.NOME,
      //   "velocidade",
      //   diceResult2,
      //   character3.VELOCIDADE
      // );

      // await logRollResult(
      //   character4.NOME,
      //   "velocidade",
      //   diceResult2,
      //   character4.VELOCIDADE
      // );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
      // totalTestSkill3 = diceResult3 + character3.MANOBRABILIDADE;
      // totalTestSkill4 = diceResult4 + character4.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );

      // await logRollResult(
      //   character3.NOME,
      //   "manobrabilidade",
      //   diceResult1,
      //   character3.MANOBRABILIDADE
      // );

      // await logRollResult(
      //   character4.NOME,
      //   "manobrabilidade",
      //   diceResult1,
      //   character4.MANOBRABILIDADE
      // );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;
      // let powerResult3 = diceResult3 + character3.PODER;
      // let powerResult4 = diceResult4 + character4.PODER;

      //sortear attack do confronto
      let resultAttack = await getRandomAttack();

      let giveItem = await getRandomItem();

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      // await logRollResult(
      //   character3.NOME,
      //   "poder",
      //   diceResult2,
      //   character3.PODER
      // );

      // await logRollResult(
      //   character4.NOME,
      //   "poder",
      //   diceResult2,
      //   character4.PODER
      // );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(`\n${character1.NOME} venceu o confronto! 🌟`);
        console.log(`${character2.NOME} foi atacado por ${resultAttack}!`);
        console.log(`${character1.NOME} está procurando o item especial...`);

        if (giveItem === "ENCONTROU") {
          console.log(`${character1.NOME} encontrou o item especial! 🎁`);
          console.log(`${character1.NOME} item turbo, ganhou 1 ponto!`);
          character1.PONTOS++;
        } else {
          console.log(`${character1.NOME} não encontrou o item especial!`);
        }

        if (resultAttack === "CASCO") {
          console.log(`${character2.NOME} perdeu 1 ponto 🐢 `);
          character2.PONTOS--;
        } else if (resultAttack === "BOMBA" && character2.PONTOS <= 2) {
          console.log(`💣 ${character2.NOME} perdeu todos os pontos 💣`);
          character2.PONTOS -= 2;
        } else {
          console.log(`💣 ${character2.NOME} perdeu 2 pontos 💣`);
          character2.PONTOS -= 2;
        }
        character2.PONTOS = Math.max(character2.PONTOS, 0);
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(`\n${character2.NOME} venceu o confronto! 🌟`);
        console.log(`${character1.NOME} foi atacado por ${resultAttack}!`);
        console.log(`${character2.NOME} está procurando o item especial...`);

        if (giveItem === "ENCONTROU") {
          console.log(`${character2.NOME} encontrou o item especial! 🎁`);
          console.log(`${character2.NOME} item turbo, ganhou 1 ponto!`);
          character2.PONTOS++;
        } else {
          console.log(
            `${character2.NOME} não conseguiu encontrar o item especial!`
          );
        }

        if (resultAttack === "CASCO") {
          console.log(`${character1.NOME} perdeu 1 ponto 🐢 `);
          character1.PONTOS--;
        } else if (resultAttack === "BOMBA" && character1.PONTOS <= 2) {
          console.log(`💣 ${character1.NOME} perdeu todos os pontos 💣`);
          character1.PONTOS = 0;
        } else {
          console.log(`💣 ${character1.NOME} perdeu 2 pontos 💣`);
          character1.PONTOS -= 2;
        }
        character1.PONTOS = Math.max(character1.PONTOS, 0);
      }

      console.log(
        powerResult1 === powerResult2
          ? "Confronto empatado! Nenhum ponto perdido! 🙌"
          : ""
      );
    }

    //verificando o vencedor
    if (block !== "CONFRONTO") {
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${character1.NOME} marcou 1 ponto!`);
        character1.PONTOS++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${character2.NOME} marcou 1 ponto!`);
        character2.PONTOS++;
      } else {
        console.log(`${character1.NOME} e ${character2.NOME} empataram!`);
      }
    }
    console.log("-------------------------------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} pontos(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} pontos(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆 `);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆 `);
  else console.log("A corrida terminou em empate");
}

(async function main() {
  console.log(
    `🏁 🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...`
  );

  await playRaceEngine(player1, player2);

  await declareWinner(player1, player2);
})();
