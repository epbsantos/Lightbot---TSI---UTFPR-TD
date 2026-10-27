export const LIGHTBOT_TRANSLATIONS_PT_BR = {
  "controls": {
    "run": "Rodar!",
    "stop": "Parar"
  },
  "welcomeScreen": {
    "start": "Começar o jogo",
    "toggleAudio": "Ligar/desligar o som",
    "help": "Ajuda",
    "achievements": "Conquistas",
    "language": "Idioma"
  },
  "levelSelectScreen": {
    "title": "Escolha a fase",
    "mainMenu": "Menu principal"
  },
  "achievementsScreen": {
    "title": "Conquistas",
    "mainMenu": "Menu principal"
  },
  "achievements": {
    "completeLevel": {
      "title": "Mandou bem jovem!",
      "message": "Complete uma fase."
    },
    "earnGoldMedal": {
      "title": "Tá afiado no jogo, continue assim",
      "message": "Conquiste uma medalha de ouro."
    },
    "completeLevels5": {
      "title": "Tá com vontade!",
      "message": "Complete 5 fases."
    },
    "completeLevels10": {
      "title": "Dedicado",
      "message": "Complete 10 fases."
    },
    "completeLevels15": {
      "title": "Viciado no jogo",
      "message": "Complete 15 fases."
    },
    "completeLevelsBronze": {
      "title": "Nerd de carteirinha",
      "message": "Conquiste medalhas de bronze em todas as fases."
    },
    "completeLevelsSilver": {
      "title": "Elite",
      "message": "Conquiste medalhas de prata em todas as fases."
    },
    "completeLevelsGold": {
      "title": "H4X0R",
      "message": "Conquiste medalhas de ouro em todas as fases."
    }
  },
  "helpScreen": {
    "mainMenu": "Menu principal",
    "goal": {
      "title": "Qual é a missão?",
      "content": "Pra zerar o jogo, você precisa dar os comandos certos pro robô acender todas as peças de luz da fase. Só que tem um detalhe: você não controla o robô diretamente! Você precisa montar um programa com instruções que ele vai executar."
    },
    "howTo": {
      "title": "Como jogar",
      "content": "Pra montar seu programa, arraste os comandos da lista de instruções e solte-os no espaço do programa. Eles vão ser adicionados automaticamente ao final do bloco destacado.\nQuando estiver tudo pronto, clique em Bora! pra executar o programa. Se quiser interromper a execução, é só clicar em Parar. Isso vai fazer o robô voltar pra posição inicial."
    },
    "objects": {
      "title": "Conhecendo o jogo",
      "content": "Cada fase é formada por peças cinzas com alturas diferentes. Pelo cenário, você vai encontrar peças especiais de luz. Elas podem estar azuis, quando ainda estão apagadas, ou amarelas, quando já estão acesas. Se todas as peças de luz estiverem acesas ao mesmo tempo, fase concluída!"
    },
    "walkForward": {
      "title": "Comando: andar pra frente",
      "content": "Esse comando faz o robô andar uma casa na direção em que está olhando. Mas fica ligado: ele só consegue andar se a próxima casa estiver na mesma altura da atual. Se a altura for diferente, ele fica parado."
    },
    "turnRight": {
      "title": "Comando: virar à direita",
      "content": "O robô fica no mesmo lugar e gira 90 graus pra direita, no sentido horário. É como dar um quarto de volta."
    },
    "turnLeft": {
      "title": "Comando: virar à esquerda",
      "content": "O robô fica no mesmo lugar e gira 90 graus pra esquerda, no sentido anti-horário. É só um quarto de volta pro outro lado."
    },
    "jump": {
      "title": "Comando: pular",
      "content": "O pulo faz o robô avançar uma casa e mudar de altura. Ele sempre pula na direção em que está olhando.\nPra subir, a próxima casa precisa ser exatamente um nível mais alta. Se for mais alta que isso, o pulo não funciona e ele fica no lugar.\nPra descer, o robô pode pular de qualquer altura, desde que a próxima casa esteja pelo menos um nível abaixo."
    },
    "light": {
      "title": "Comando: acender luz",
      "content": "Esse comando serve pra ligar ou desligar as peças de luz. Se o robô estiver em uma peça apagada, ele vai acendê-la. Mas, se ela já estiver acesa, o comando vai apagá-la. Se o robô estiver em uma peça comum, não acontece nada."
    },
    "repeat": {
      "title": "Comando: repetir",
      "content": "Esse comando é uma mão na roda pra repetir instruções várias vezes sem precisar colocar tudo de novo no programa. É só arrastar os comandos que você quer repetir pra dentro do bloco de repetição e escolher quantas vezes eles devem ser executados.\nE tem mais: dá pra colocar uma repetição dentro de outra! Isso ajuda a criar programas menores e mais eficientes."
    },
    "medals": {
      "title": "Medalhas",
      "content": "Você ganha medalhas ao completar as fases usando poucas instruções. Só que tem uma pegadinha: um programa curtinho pode fazer o robô executar vários comandos desnecessários, gastando mais tempo.\nNa programação, o melhor programa não é necessariamente o que tem menos instruções, mas sim aquele que faz o robô executar menos comandos no total."
    },
    "video": {
      "play": "reproduzir"
    }
  },
  "gameScreen": {
    "back": "Voltar",
    "toggleAudio": "Ligar/desligar o som",
    "clear": "Limpar",
    "run": "Executar",
    "speed": "Velocidade:"
  },
  "instructions": {
    "title": "Comandos",
    "walk": "Andar pra frente",
    "turnRight": "Virar à direita",
    "turnLeft": "Virar à esquerda",
    "jump": "Pular",
    "light": "Acender luz",
    "repeat": {
      "label": "Repetir",
      "times": "vezes"
    },
    "placeholder": "Solte seus comandos aqui"
  },
  "program": {
    "title": "Seu programa"
  },
  "dialogs": {
    "levelComplete": {
      "title": "Fase concluída!",
      "message": "Boa! Você completou essa fase usando {{count}} instruções!",
      "bronzeMedalHint": "Complete a fase usando {{count}} instruções ou menos pra ganhar a medalha de bronze.",
      "silverMedalHint": "Complete a fase usando {{count}} instruções ou menos pra ganhar a medalha de prata.",
      "goldMedalHint": "Complete a fase usando {{count}} instruções ou menos pra ganhar a medalha de ouro."
    },
    "achievement": {
      "title": "Conquista desbloqueada!"
    }
  }
};
