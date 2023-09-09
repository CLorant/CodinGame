/*
Rock (R)
Paper (P)
sCissors (C)
Lizard (L)
Spock (S)

Scissors: Paper, Lizard
Paper: Rock, Spock
Rock: Lizard, Scissors
Lizard: Spock, Paper
Spock: Scissors, Rock
*/

// key: sign that wins
// value: array of signs that lose
const combinations = {
  "C": ["P", "L"],
  "P": ["R", "S"],
  "R": ["L", "C"],
  "L": ["S", "P"],
  "S": ["C", "R"],
};

function playGame(player1, player2) {
  // add player1 to the opponents of player2 and vice versa
  player1.opponents.push(player2.number);
  player2.opponents.push(player1.number);

  // if the signs are the same, return the player with the smaller number
  if (player1.sign === player2.sign) {
      return player1.number < player2.number ? player1 : player2;
  }
  
  // check if player1 wins
  if (combinations[player1.sign].includes(player2.sign)) {
      return player1;
  }

  // return player2 because player1 lost 
  return player2;
}

function findWinner(bracket) {
  // return the overall winner
  if (bracket.length === 1) {
      return bracket[0];
  }
  
  const nextBracket = [];
  for (let i = 0; i < bracket.length; i += 2) {
      // pick the winner and add them to the next bracket
      const winner = playGame(bracket[i], bracket[i + 1]);
      nextBracket.push(winner);
  }
  
  // repeat until bracket contains only 1 player
  return findWinner(nextBracket);
}

let N = parseInt(readline());
const players = [];

for (let i = 0; i < N; i++) {
  let inputs = readline().split(" ");
  players.push({
      number: parseInt(inputs[0]),
      sign: inputs[1],
      opponents: []
  });
}

const winner = findWinner(players);
console.log(winner.number);
console.log(winner.opponents.join(" "));