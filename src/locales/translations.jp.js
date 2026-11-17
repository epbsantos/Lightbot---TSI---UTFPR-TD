// i18n resource table used by i18next. Keys match `data-i18n` / `data-i18n-title` attributes in `index.html`.
export const LIGHTBOT_TRANSLATIONS_JP = {
  "controls": {
    "run": "実行",
    "stop": "停止"
  },
  "welcomeScreen": {
    "sound": "サウンド",
    "theme": "テーマ",
    "start": "ゲーム開始",
    "toggleAudio": "サウンド切替",
    "help": "ヘルプ",
    "achievements": "実績",
    "language": "言語"
  },
  "levelSelectScreen": {
    "progress": "クリア: {{completed}} / {{total}}",
    "level": "レベル {{number}}",
    "incomplete": "未クリア",
    "completed": "クリア済み",
    "bronze": "銅",
    "silver": "銀",
    "gold": "金",
    "title": "レベル選択",
    "mainMenu": "メインメニュー"
  },
  "achievementsScreen": {
    "progress": "解除した実績",
    "unlocked": "解除済み",
    "locked": "未解除",
    "title": "実績",
    "mainMenu": "メインメニュー"
  },
  "achievements": {
    "completeLevel": {
      "title": "とどめだ！",
      "message": "レベルを1つクリアする。"
    },
    "earnGoldMedal": {
      "title": "ママっ子",
      "message": "金メダルを獲得する。"
    },
    "completeLevels5": {
      "title": "野心家",
      "message": "5つのレベルをクリアする。"
    },
    "completeLevels10": {
      "title": "努力家",
      "message": "10個のレベルをクリアする。"
    },
    "completeLevels15": {
      "title": "やみつき",
      "message": "15個のレベルをクリアする。"
    },
    "completeLevelsBronze": {
      "title": "ガリ勉",
      "message": "すべてのレベルで銅メダルを獲得する。"
    },
    "completeLevelsSilver": {
      "title": "エリート",
      "message": "すべてのレベルで銀メダルを獲得する。"
    },
    "completeLevelsGold": {
      "title": "H4X0R",
      "message": "すべてのレベルで金メダルを獲得する。"
    }
  },
  "helpScreen": {
    "title": "遊び方",
    "topicsTitle": "トピック",
    "topics": {
      "goal": "ゲームの目的",
      "howTo": "プログラムを作る",
      "objects": "ゲームオブジェクト",
      "walkForward": "前に進む",
      "turnRight": "右に回転",
      "turnLeft": "左に回転",
      "jump": "ジャンプ",
      "light": "ライト",
      "repeat": "繰り返し",
      "medals": "メダル"
    },
    "mainMenu": "メインメニュー",
    "goal": {
      "title": "ゲームの目的",
      "content": "ゲームをクリアするには、各レベルにあるすべてのライトタイルを点灯させる方法をロボットに教える必要があります。ただし、ロボットに指示できる唯一の方法は、命令を組み合わせてロボットが実行できるプログラムを作ることです。"
    },
    "howTo": {
      "title": "遊び方",
      "content": "命令をクリックするとプログラムの最後に追加されます。ドラッグすれば、「繰り返し」ブロックの中も含めて好きな位置に置けます。命令をドラッグして並べ替えることもできます。\n「実行」をクリックするとプログラムが実行されます。同じボタンが「一時停止」、続いて「再開」に変わるので、途中で止めてもそこから続けられます。「リセット」ボタンを押すと、ロボットとライトが初期状態に戻り、プログラムを編集できるようになります。リセットしても命令は消えません。実行が終わったら、「もう一度実行」でプログラムを最初から実行し直せます。"
    },
    "objects": {
      "title": "ゲームオブジェクト",
      "content": "レベルは、それぞれ高さを持つグレーのタイルで構成されています。レベル内には特別なライトタイルが点在しています。ライトタイルには、青色（消灯中）と黄色（点灯中）があります。ある時点でレベル内のすべてのライトタイルが点灯していれば、そのレベルはクリアです。"
    },
    "walkForward": {
      "title": "命令：前に進む",
      "content": "前に進むと、ロボットは現在向いている方向に1マス進みます。この移動は、進む先のマスが現在のマスと同じ高さである場合にのみ実行されます。それ以外の場合、移動は行われません。"
    },
    "turnRight": {
      "title": "命令：右に90度回転",
      "content": "右に90度回転すると、ロボットはその場で右（時計回り）に90度（4分の1回転）向きを変えます。"
    },
    "turnLeft": {
      "title": "命令：左に90度回転",
      "content": "左に90度回転すると、ロボットはその場で左（反時計回り）に90度（4分の1回転）向きを変えます。"
    },
    "jump": {
      "title": "命令：ジャンプ",
      "content": "ジャンプは、前方への移動と高さの変化を組み合わせた動作です。移動方向はロボットが向いている方向です。上方向へのジャンプは、移動先のタイルが現在のタイルよりちょうど1段高い場合にのみ成功します。高低差が2段以上ある場合、ジャンプは失敗し、移動は行われません。下方向へのジャンプには高さの制限はなく、高低差が1段以上であることだけが条件です。"
    },
    "light": {
      "title": "命令：ライト",
      "content": "ライト命令は、ライトタイルの点灯・消灯を切り替えるために使用します。ライト命令の実行時にロボットが消灯中のライトタイルの上にいる場合、そのタイルが点灯します。ただし、すでに点灯しているライトタイルの上にいる場合は、そのタイルが消灯します。通常のタイルの上にいる場合は、何も起こりません。"
    },
    "repeat": {
      "title": "命令：繰り返し",
      "content": "繰り返し命令は、いくつかの命令を指定した回数だけ繰り返すための特別な命令です。繰り返し命令には専用の枠があり、命令リストから命令をドロップできます。また、繰り返し命令の中の命令を何回繰り返すかを指定するカウンターもあります。繰り返し命令の中にさらに繰り返し命令を入れることもでき、これは非常に短いプログラムを作るうえで欠かせません。"
    },
    "medals": {
      "title": "メダル",
      "content": "メダルは、非常に少ない命令数でレベルをクリアしたときに授与されます。しかし、そのような短いプログラムでは、ロボットが無駄な命令をたくさん実行してしまうことがあり、非常に非効率で時間もかかります。コンピュータサイエンスでは、最良のプログラムとは命令の数が最も少ないものではなく、ロボットが実行する命令の数が最も少ないものであることを覚えておいてください。"
    },
    "video": {
      "play": "再生"
    }
  },
  "gameScreen": {
    "decreaseRepeat": "繰り返し回数を減らす",
    "increaseRepeat": "繰り返し回数を増やす",
    "status": { "running": "実行中…", "paused": "一時停止中", "finished": "終了" },
    "pause": "一時停止",
    "resume": "再開",
    "runAgain": "もう一度実行",
    "paused": "一時停止中 · 編集するにはリセット",
    "addHint": "クリックで追加 · ドラッグで並べ替え",
    "ready": "実行準備完了",
    "running": "実行中…",
    "finished": "プログラム終了 · 編集するにはリセット",
    "reset": "リセット",
    "remove": "命令を削除",
    "commands": {
      "walk": "前進",
      "turnRight": "右",
      "turnLeft": "左"
    },
    "back": "戻る",
    "toggleAudio": "サウンド切替",
    "clear": "クリア",
    "run": "実行",
    "speed": "スピード："
  },
  "instructions": {
    "title": "命令",
    "walk": "前に進む",
    "turnRight": "右に90度回転",
    "turnLeft": "左に90度回転",
    "jump": "ジャンプ",
    "light": "ライト",
    "repeat": {
      "label": "繰り返し",
      "times": "回"
    },
    "placeholder": "ここに命令をドロップ"
  },
  "program": {
    "title": "プログラム",
    "clearAll": "すべてクリア"
  },
  "dialogs": {
    "levelComplete": {
      "title": "レベルクリア",
      "message": "おめでとうございます！{{count}}個の命令でこのレベルをクリアしました！",
      "bronzeMedalHint": "{{count}}個以下の命令でクリアすると銅メダルを獲得できます。",
      "silverMedalHint": "{{count}}個以下の命令でクリアすると銀メダルを獲得できます。",
      "goldMedalHint": "{{count}}個以下の命令でクリアすると金メダルを獲得できます。"
    },
    "achievement": {
      "title": "実績を解除しました！"
    }
  }
};