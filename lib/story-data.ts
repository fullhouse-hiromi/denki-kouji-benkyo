import type { Category, Grade } from "./types";

// ========================================
// キャラクター定義
// ========================================

export type Character = {
  id: string;
  name: string;
  role: string;
  description: string;
};

export const CHARACTERS: Character[] = [
  {
    id: "player",
    name: "主人公",
    role: "新人電気工事士",
    description: "電気工事会社に入社したばかりの新人。電気工事士の資格取得を目指している。",
  },
  {
    id: "tanaka",
    name: "田中先輩",
    role: "二種電気工事士（入社3年目）",
    description:
      "面倒見がよく、後輩思いの先輩。第二種電気工事士の資格を持ち、現場経験も豊富。分かりやすく教えてくれる。",
  },
  {
    id: "sato",
    name: "佐藤所長",
    role: "一種電気工事士（ベテラン）",
    description:
      "電気工事のベテラン。第一種電気工事士の資格を持つ。厳しいが公正で、部下の成長を見守っている。",
  },
  {
    id: "yamada",
    name: "山田さん",
    role: "事務・資格試験アドバイザー",
    description:
      "事務所の管理担当。資格試験の情報に詳しく、勉強のコツや試験対策のアドバイスをしてくれる。",
  },
];

// ========================================
// ステージ定義
// ========================================

export type Stage = {
  id: number;
  name: string;
  theme: string;
  grade: Grade;
  categories: Category[];
  questionCount: number;
  clearCondition: number;
  intro: {
    character: string;
    lines: string[];
  };
  outro: {
    character: string;
    lines: string[];
  };
};

export const STAGES: Stage[] = [
  // ========================================
  // 第二種電気工事士 編（ステージ1〜8）
  // ========================================
  {
    id: 1,
    name: "入社初日",
    theme: "座学研修",
    grade: 2,
    categories: ["theory"],
    questionCount: 5,
    clearCondition: 3,
    intro: {
      character: "tanaka",
      lines: [
        "おっ、新入りか！ようこそ、サンライト電工へ！",
        "俺は田中、先輩だ。よろしくな！",
        "今日はまず座学研修だ。電気の基本をしっかり覚えような。",
        "オームの法則とか、電力の計算とか...試験にも出るから、ここで基礎を固めよう！",
      ],
    },
    outro: {
      character: "tanaka",
      lines: [
        "おお、なかなかやるじゃないか！",
        "電気理論は全ての基本だからな。ここがしっかりしていれば、現場でも困らないぞ。",
        "明日はいよいよ工具に触れるから、楽しみにしてな！",
      ],
    },
  },
  {
    id: 2,
    name: "初めての工具箱",
    theme: "工具の鑑別",
    grade: 2,
    categories: ["identification"],
    questionCount: 5,
    clearCondition: 3,
    intro: {
      character: "tanaka",
      lines: [
        "よし、今日は工具の勉強だ！",
        "電気工事士にとって工具は命みたいなもんだ。",
        "ペンチ、ドライバー、ニッパー...それぞれの名前と使い方を覚えような。",
        "試験の鑑別問題でも写真を見て答える問題が出るから、しっかり覚えるんだぞ！",
      ],
    },
    outro: {
      character: "tanaka",
      lines: [
        "いいぞ！工具の名前と用途をちゃんと覚えたな。",
        "現場じゃ「あれ取って」じゃ通じないからな。正式名称で言えるようにしておけよ。",
        "次はいよいよ実際の配線工事だ！気合い入れていこう！",
      ],
    },
  },
  {
    id: 3,
    name: "住宅の配線工事",
    theme: "配線設計の基本",
    grade: 2,
    categories: ["wiring"],
    questionCount: 8,
    clearCondition: 5,
    intro: {
      character: "tanaka",
      lines: [
        "今日は住宅の配線工事に同行だ！",
        "配線図の読み方、図記号の意味...これが分からないと現場で何もできないぞ。",
        "単線図と複線図の違い、ちゃんと分かるか？",
        "問題数も増えるけど、落ち着いてやれば大丈夫だ！",
      ],
    },
    outro: {
      character: "tanaka",
      lines: [
        "よくやった！配線図が読めるようになったな。",
        "図記号は覚えることが多いけど、現場で毎日見るうちに自然と覚えるもんだ。",
        "お前、センスあるかもな！",
      ],
    },
  },
  {
    id: 4,
    name: "先輩の法規講座",
    theme: "法規の基本",
    grade: 2,
    categories: ["regulation"],
    questionCount: 8,
    clearCondition: 5,
    intro: {
      character: "sato",
      lines: [
        "今日は私が法規について教えよう。",
        "電気工事は人の命に関わる仕事だ。法律やルールを守ることは絶対だ。",
        "電気工事士法、電気設備技術基準...難しく感じるかもしれんが、",
        "現場の安全を守るために、一つ一つしっかり覚えなさい。",
      ],
    },
    outro: {
      character: "sato",
      lines: [
        "うむ、よく頑張ったな。",
        "法規は暗記が多くて大変だが、これを知らずに工事をするのは危険だ。",
        "安全に仕事をするための知識だと思って、しっかり身につけなさい。",
      ],
    },
  },
  {
    id: 5,
    name: "コンセント増設工事",
    theme: "施工方法の基本",
    grade: 2,
    categories: ["construction"],
    questionCount: 8,
    clearCondition: 5,
    intro: {
      character: "tanaka",
      lines: [
        "今日はコンセントの増設工事だ！",
        "施工方法の基本をしっかり覚えような。",
        "ケーブルの接続方法、電線の許容電流、工事の種類...",
        "実技試験にも関係する内容だから、気合い入れていこう！",
      ],
    },
    outro: {
      character: "tanaka",
      lines: [
        "いい感じだ！施工の基本が身についてきたな。",
        "コンセント一つ取り付けるにも、正しい知識が必要なんだ。",
        "この調子でどんどんレベルアップしていこうぜ！",
      ],
    },
  },
  {
    id: 6,
    name: "店舗の照明工事",
    theme: "配線と施工の応用",
    grade: 2,
    categories: ["wiring", "construction"],
    questionCount: 10,
    clearCondition: 7,
    intro: {
      character: "tanaka",
      lines: [
        "今日は店舗の照明工事だ。ちょっと規模が大きいぞ！",
        "配線設計と施工方法、両方の知識が必要になる。",
        "照明回路の設計、スイッチの結線、ケーブルの選定...",
        "10問あるから集中してやっていこう！",
      ],
    },
    outro: {
      character: "tanaka",
      lines: [
        "お見事！複合的な問題にもしっかり対応できたな。",
        "配線と施工の知識が繋がってきた証拠だ。",
        "お前、成長してるぞ！この調子だ！",
      ],
    },
  },
  {
    id: 7,
    name: "現場のトラブル対応",
    theme: "総合力テスト",
    grade: 2,
    categories: ["theory", "wiring", "construction", "regulation", "identification"],
    questionCount: 10,
    clearCondition: 7,
    intro: {
      character: "sato",
      lines: [
        "現場ではいろいろなトラブルが起きる。",
        "理論、配線、施工、法規、鑑別...全ての知識を使って解決しなければならない。",
        "ジャンルを問わず出題する。これまでの学びの総まとめだ。",
        "第二種の試験前の腕試しだと思ってやりなさい。",
      ],
    },
    outro: {
      character: "sato",
      lines: [
        "よくやった。現場で必要な総合力が身についてきたようだな。",
        "トラブルに対応できる工事士は、どこの現場でも頼りにされる。",
        "さあ、いよいよ第二種電気工事士の試験だ。自信を持って臨みなさい。",
      ],
    },
  },
  {
    id: 8,
    name: "第二種試験に挑戦！",
    theme: "第二種電気工事士 模擬試験",
    grade: 2,
    categories: ["theory", "wiring", "construction", "regulation", "identification"],
    questionCount: 20,
    clearCondition: 14,
    intro: {
      character: "yamada",
      lines: [
        "いよいよ第二種電気工事士の試験ですね！",
        "筆記試験は50問で60%以上が合格ライン。",
        "今回は20問の模擬試験です。14問以上正解でクリアですよ。",
        "これまでの勉強の成果を発揮してください！応援しています！",
      ],
    },
    outro: {
      character: "yamada",
      lines: [
        "おめでとうございます！見事合格ラインをクリアしましたね！",
        "第二種電気工事士の知識がしっかり身についている証拠です。",
        "田中さんも佐藤所長も喜んでいましたよ。",
        "さあ、次は第一種を目指しましょう！",
      ],
    },
  },

  // ========================================
  // 第一種電気工事士 編（ステージ9〜12）
  // ========================================
  {
    id: 9,
    name: "ビルの幹線工事",
    theme: "高圧理論と配線設計",
    grade: 1,
    categories: ["theory", "wiring"],
    questionCount: 10,
    clearCondition: 7,
    intro: {
      character: "sato",
      lines: [
        "第一種の世界へようこそ。ここからはレベルが上がるぞ。",
        "今日はビルの幹線工事だ。高圧の理論と大規模な配線設計を学ぶ。",
        "需要率、負荷率、力率改善...第二種とは桁が違う計算問題が出る。",
        "気を引き締めていこう。",
      ],
    },
    outro: {
      character: "sato",
      lines: [
        "よくついてきたな。高圧の世界は奥が深い。",
        "ビルの電気設備は多くの人の生活を支えている。",
        "責任は重いが、やりがいのある仕事だ。次も頑張れ。",
      ],
    },
  },
  {
    id: 10,
    name: "高圧受変電設備",
    theme: "高圧設備と法規",
    grade: 1,
    categories: ["theory", "regulation"],
    questionCount: 10,
    clearCondition: 7,
    intro: {
      character: "sato",
      lines: [
        "今日は高圧受変電設備について学ぶ。",
        "変圧器、遮断器、保護継電器...高圧設備の心臓部だ。",
        "法規面では、自家用電気工作物の保安規程や主任技術者制度も押さえる必要がある。",
        "第一種の試験では頻出分野だ。集中して取り組みなさい。",
      ],
    },
    outro: {
      character: "sato",
      lines: [
        "素晴らしい。高圧設備の知識がしっかり身についてきたな。",
        "受変電設備は電気の入口だ。ここを理解すれば、全体が見えてくる。",
        "一人前の電気工事士に近づいているぞ。",
      ],
    },
  },
  {
    id: 11,
    name: "工場の動力設備",
    theme: "総合応用",
    grade: 1,
    categories: ["theory", "wiring", "construction", "regulation", "identification"],
    questionCount: 15,
    clearCondition: 11,
    intro: {
      character: "sato",
      lines: [
        "工場の動力設備は、電気工事の集大成とも言える現場だ。",
        "三相誘導電動機、スターデルタ始動、インバータ制御...",
        "理論、配線、施工、法規、鑑別、全ての知識が問われる。",
        "15問、覚悟はいいか？",
      ],
    },
    outro: {
      character: "sato",
      lines: [
        "見事だ。お前はもう立派な電気工事士だ。",
        "工場の動力設備を任せられるということは、一流の証拠だ。",
        "最後の試験、全力で挑みなさい。私は信じているぞ。",
      ],
    },
  },
  {
    id: 12,
    name: "第一種試験に挑戦！",
    theme: "第一種電気工事士 模擬試験",
    grade: 1,
    categories: ["theory", "wiring", "construction", "regulation", "identification"],
    questionCount: 25,
    clearCondition: 18,
    intro: {
      character: "yamada",
      lines: [
        "ついに最終ステージ、第一種電気工事士の模擬試験です！",
        "第一種の筆記試験は50問で60%以上が合格ライン。",
        "今回は25問の模擬試験で、18問以上正解が必要です。",
        "ここまで来たあなたなら、きっと大丈夫。全力を尽くしてください！",
      ],
    },
    outro: {
      character: "yamada",
      lines: [
        "おめでとうございます！！第一種電気工事士の模擬試験、見事合格です！",
        "ここまでの道のり、本当に素晴らしかったです。",
      ],
    },
  },
];

// ========================================
// ヘルパー関数
// ========================================

export function getStage(id: number): Stage | undefined {
  return STAGES.find((s) => s.id === id);
}

export function getCharacter(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

export function isStageUnlocked(stageId: number, clearedStageIds: number[]): boolean {
  if (stageId === 1) return true;
  return clearedStageIds.includes(stageId - 1);
}

export function isStageClear(score: number, stageId: number): boolean {
  const stage = getStage(stageId);
  if (!stage) return false;
  return score >= stage.clearCondition;
}
