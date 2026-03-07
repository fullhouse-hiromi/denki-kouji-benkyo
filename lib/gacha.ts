// ========================================
// ガチャシステム
// ========================================

export type GachaCard = {
  id: string;
  name: string;
  rarity: 1 | 2 | 3 | 4 | 5;
  description: string;
  testTip: string;
};

export type RarityConfig = {
  rarity: number;
  label: string;
  color: string;
  rate: number;
};

// ========================================
// レアリティ設定
// ========================================

export const RARITY_CONFIG: RarityConfig[] = [
  { rarity: 1, label: "ノーマル", color: "#9ca3af", rate: 0.5 },
  { rarity: 2, label: "レア", color: "#3b82f6", rate: 0.3 },
  { rarity: 3, label: "スーパーレア", color: "#a855f7", rate: 0.15 },
  { rarity: 4, label: "ウルトラレア", color: "#f59e0b", rate: 0.04 },
  { rarity: 5, label: "レジェンド", color: "#ef4444", rate: 0.01 },
];

// ========================================
// ガチャカード一覧（30枚以上）
// ========================================

export const GACHA_CARDS: GachaCard[] = [
  // ========================================
  // ノーマル（レアリティ1）- 基本工具
  // ========================================
  {
    id: "penchi",
    name: "ペンチ",
    rarity: 1,
    description: "電線の切断や曲げ加工に使用する基本工具。電気工事士の必需品。",
    testTip: "ペンチは電線の切断・曲げに使用。圧着には使えないので注意。",
  },
  {
    id: "driver_plus",
    name: "プラスドライバー",
    rarity: 1,
    description: "ネジの締め付け・取り外しに使う。サイズは1番・2番が一般的。",
    testTip: "鑑別問題で出題される。プラスとマイナスの区別は基本中の基本。",
  },
  {
    id: "driver_minus",
    name: "マイナスドライバー",
    rarity: 1,
    description: "マイナスネジの操作や、端子台の結線に使用する。",
    testTip: "連用取付枠からの器具の取り外しにも使用される。",
  },
  {
    id: "nippaa",
    name: "ニッパー",
    rarity: 1,
    description: "電線やケーブルの切断に特化した工具。刃先が薄く、精密な切断が可能。",
    testTip: "ペンチとの違いを押さえよう。ニッパーは切断専用、ペンチは切断＋曲げ。",
  },
  {
    id: "denkou_knife",
    name: "電工ナイフ",
    rarity: 1,
    description: "ケーブルの外装被覆を剥ぎ取るために使用する。折りたたみ式が一般的。",
    testTip: "VVFケーブルの外装剥ぎに使用。最近はストリッパーの使用が主流。",
  },
  {
    id: "scale",
    name: "スケール（巻尺）",
    rarity: 1,
    description: "ケーブルや配管の長さを測定する。現場での寸法取りに必須。",
    testTip: "技能試験では寸法通りにケーブルを切断する必要がある。",
  },
  {
    id: "vinyl_tape",
    name: "ビニルテープ",
    rarity: 1,
    description: "電線の絶縁処理に使用。色分けで相の識別にも用いる。",
    testTip: "絶縁テープの巻き方は半幅重ね2回巻きが基本。",
  },
  {
    id: "wire_gauge",
    name: "ワイヤーゲージ",
    rarity: 1,
    description: "電線の太さ（直径）を測定するための工具。",
    testTip: "鑑別問題で形状を問われることがある。円形の板状の測定器具。",
  },
  {
    id: "kiri",
    name: "木工用キリ",
    rarity: 1,
    description: "木材にケーブルを通す穴を開けるための工具。",
    testTip: "合成樹脂管工事やケーブル工事の貫通穴開けに使用。",
  },
  {
    id: "hammer",
    name: "ハンマー",
    rarity: 1,
    description: "釘やステープルの打ち込みに使用する基本工具。",
    testTip: "ケーブルをステープルで固定する際に使用する。",
  },

  // ========================================
  // レア（レアリティ2）- 専門工具
  // ========================================
  {
    id: "wire_stripper",
    name: "ワイヤーストリッパー",
    rarity: 2,
    description: "電線の絶縁被覆を正確に剥ぎ取る専用工具。芯線を傷つけずに作業できる。",
    testTip: "技能試験ではVVFストリッパーの使用が効率的。時間短縮のカギ。",
  },
  {
    id: "ring_sleeve_tool",
    name: "リングスリーブ用圧着工具",
    rarity: 2,
    description:
      "リングスリーブで電線を圧着接続する専用工具。JIS適合品を使用すること。",
    testTip: "圧着マーク（○・小・中・大）の選定は頻出。電線の本数と太さで決まる。",
  },
  {
    id: "crimping_pliers",
    name: "圧着ペンチ（裸圧着端子用）",
    rarity: 2,
    description: "裸圧着端子やスリーブの圧着に使用する。端子のサイズに合わせて使う。",
    testTip: "リングスリーブ用と裸圧着端子用は別の工具。混同しないこと。",
  },
  {
    id: "cable_cutter",
    name: "ケーブルカッター",
    rarity: 2,
    description: "太いケーブルを切断するための工具。てこの原理で少ない力で切断可能。",
    testTip: "CVケーブルなど太い電線の切断に使用。ペンチでは切れない太さに対応。",
  },
  {
    id: "pipe_bender",
    name: "パイプベンダー",
    rarity: 2,
    description: "金属管を曲げるための工具。均一な曲げ加工が可能。",
    testTip: "金属管工事で使用。曲げ半径は管の内径の6倍以上が原則。",
  },
  {
    id: "pipe_cutter",
    name: "パイプカッター",
    rarity: 2,
    description: "金属管を切断するための工具。バリ取りも忘れずに。",
    testTip: "金属管の切断後は必ずリーマーでバリ取りを行う。電線の被覆損傷防止。",
  },
  {
    id: "pipe_reamer",
    name: "リーマー",
    rarity: 2,
    description: "金属管の切断面のバリ（かえり）を取り除く工具。",
    testTip: "パイプカッターとセットで覚える。切断→リーマーの順序が重要。",
  },
  {
    id: "knockout_punch",
    name: "ノックアウトパンチャー",
    rarity: 2,
    description: "分電盤や金属箱に配管用の穴を開ける油圧式工具。",
    testTip: "鑑別問題で出題される。金属製ボックスへの穴開けに使用。",
  },
  {
    id: "tester",
    name: "回路計（テスター）",
    rarity: 2,
    description: "電圧、電流、抵抗を測定するマルチメーター。現場の必需品。",
    testTip: "回路計は電圧・電流・抵抗の測定が可能。活線状態での抵抗測定は不可。",
  },
  {
    id: "insulation_tester",
    name: "絶縁抵抗計（メガー）",
    rarity: 2,
    description: "回路の絶縁抵抗を測定する計器。定期点検で使用する。",
    testTip:
      "対地電圧150V以下は0.1MΩ以上、300V以下は0.2MΩ以上、300V超は0.4MΩ以上が基準。",
  },

  // ========================================
  // スーパーレア（レアリティ3）- 高性能計測器・特殊工具
  // ========================================
  {
    id: "clamp_meter",
    name: "クランプメーター",
    rarity: 3,
    description:
      "電線を挟むだけで電流を測定できる計器。回路を切断せずに測定可能。",
    testTip: "変流器（CT）の原理を利用。漏れ電流の測定にも使用される。",
  },
  {
    id: "earth_tester",
    name: "接地抵抗計",
    rarity: 3,
    description: "接地極の接地抵抗を測定する専用計器。補助接地極を使用して測定する。",
    testTip:
      "A種10Ω以下、B種変圧器容量で計算、C種10Ω以下（500Ω）、D種100Ω以下（500Ω）。",
  },
  {
    id: "phase_tester",
    name: "検相器",
    rarity: 3,
    description: "三相交流の相回転方向（相順）を確認する計器。モーターの回転方向確認に必須。",
    testTip: "三相誘導電動機の結線時に使用。正相・逆相の確認で出題される。",
  },
  {
    id: "hydraulic_crimper",
    name: "油圧式圧着工具",
    rarity: 3,
    description: "大サイズの圧着端子やスリーブを圧着する油圧式工具。強力な圧着力。",
    testTip: "38mm²以上の太い電線の圧着に使用。手動式では対応できないサイズ用。",
  },
  {
    id: "cable_jack",
    name: "ケーブルジャッキ",
    rarity: 3,
    description: "ケーブルドラムを持ち上げて回転させる。大規模工事での電線敷設に使用。",
    testTip: "幹線工事でケーブルを引き延ばす際に使用。ドラムの回転方向に注意。",
  },
  {
    id: "torque_driver",
    name: "トルクドライバー",
    rarity: 3,
    description:
      "設定したトルク値で正確にネジを締め付ける。端子台の規定トルク締めに使用。",
    testTip: "分電盤の端子接続では規定トルクでの締め付けが求められる。",
  },

  // ========================================
  // ウルトラレア（レアリティ4）- 高圧用機器
  // ========================================
  {
    id: "high_voltage_detector",
    name: "高圧検電器",
    rarity: 4,
    description:
      "高圧回路の充電の有無を確認する検電器。伸縮式で安全な距離から検電可能。",
    testTip:
      "停電作業の前に必ず検電を行う。検電器は使用前に動作確認が必要。第一種の頻出問題。",
  },
  {
    id: "power_analyzer",
    name: "電力量計（スマートメーター）",
    rarity: 4,
    description:
      "電力使用量を計測・記録する計器。通信機能搭載型が主流になりつつある。",
    testTip: "計器の結線方法（単相2線式・三相3線式）は試験で出題される。",
  },
  {
    id: "ct_transformer",
    name: "変流器（CT）",
    rarity: 4,
    description:
      "大電流を小電流に変換して計測可能にする計器用変成器。高圧回路の電流測定に使用。",
    testTip: "二次側を開放してはならない。開放すると高電圧が発生し危険。超重要ポイント。",
  },
  {
    id: "vt_transformer",
    name: "計器用変圧器（VT）",
    rarity: 4,
    description:
      "高電圧を低電圧に変換して計測可能にする。電圧計やリレーの電源として使用。",
    testTip: "二次側を短絡してはならない。CTとVTの取り扱いの違いは頻出。",
  },

  // ========================================
  // レジェンド（レアリティ5）- 伝説の工具
  // ========================================
  {
    id: "legend_penchi",
    name: "伝説のペンチ",
    rarity: 5,
    description:
      "職人の魂が宿った究極のペンチ。どんな電線も一発で完璧に加工できると言われている。",
    testTip:
      "ペンチの基本を極めし者へ：電線の切断はもちろん、のの字曲げも完璧に。技能試験の時間短縮のカギ。",
  },
  {
    id: "legend_tester",
    name: "万能マルチテスター",
    rarity: 5,
    description:
      "あらゆる電気的数値を瞬時に測定できる究極の計測器。伝説の電気工事士が愛用したと言われる。",
    testTip:
      "回路計の全機能を極めし者へ：電圧・電流・抵抗に加え、周波数、容量まで測れる計器を使いこなそう。",
  },
];

// ========================================
// ガチャ関数
// ========================================

/**
 * レアリティに基づいてランダムにカードを1枚引く
 */
export function rollGacha(): GachaCard {
  // レアリティを決定
  const rand = Math.random();
  let cumulative = 0;
  let selectedRarity = 1;

  for (const config of RARITY_CONFIG) {
    cumulative += config.rate;
    if (rand < cumulative) {
      selectedRarity = config.rarity;
      break;
    }
  }

  // 該当レアリティのカードからランダムに選択
  const candidates = GACHA_CARDS.filter((card) => card.rarity === selectedRarity);

  // 該当レアリティのカードがない場合はノーマルから選択
  if (candidates.length === 0) {
    const normals = GACHA_CARDS.filter((card) => card.rarity === 1);
    return normals[Math.floor(Math.random() * normals.length)];
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}

/**
 * レアリティ番号からラベルを取得
 */
export function getRarityLabel(rarity: number): string {
  return RARITY_CONFIG.find((c) => c.rarity === rarity)?.label ?? "不明";
}

/**
 * レアリティ番号から表示色を取得
 */
export function getRarityColor(rarity: number): string {
  return RARITY_CONFIG.find((c) => c.rarity === rarity)?.color ?? "#9ca3af";
}
