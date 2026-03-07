import { Question, Grade, Category } from "./types";

export const hardcodedQuestions: Question[] = [
  // ============================
  // 第二種 - 電気理論 (15問)
  // ============================
  {
    id: "hc-001", type: "choice", grade: 2, category: "theory",
    question: "100Vの電源に20Ωの抵抗を接続したとき、流れる電流は何Aか。",
    choices: ["2A", "5A", "10A", "20A"],
    answer: 1, explanation: "オームの法則 I=V/R=100/20=5A", source: "hardcoded",
  },
  {
    id: "hc-002", type: "choice", grade: 2, category: "theory",
    question: "200Vの回路に5Aの電流が流れているとき、消費電力は何Wか。",
    choices: ["40W", "100W", "1000W", "2000W"],
    answer: 2, explanation: "P=V×I=200×5=1000W", source: "hardcoded",
  },
  {
    id: "hc-003", type: "choice", grade: 2, category: "theory",
    question: "10Ωと20Ωの抵抗を直列に接続した場合の合成抵抗は何Ωか。",
    choices: ["6.7Ω", "15Ω", "20Ω", "30Ω"],
    answer: 3, explanation: "直列接続の合成抵抗 R=R₁+R₂=10+20=30Ω", source: "hardcoded",
  },
  {
    id: "hc-004", type: "choice", grade: 2, category: "theory",
    question: "10Ωと10Ωの抵抗を並列に接続した場合の合成抵抗は何Ωか。",
    choices: ["5Ω", "10Ω", "15Ω", "20Ω"],
    answer: 0, explanation: "並列接続 R=(R₁×R₂)/(R₁+R₂)=(10×10)/(10+10)=5Ω", source: "hardcoded",
  },
  {
    id: "hc-005", type: "choice", grade: 2, category: "theory",
    question: "交流100Vの最大値は約何Vか。",
    choices: ["70.7V", "100V", "141V", "200V"],
    answer: 2, explanation: "最大値=実効値×√2=100×1.414≒141V", source: "hardcoded",
  },
  {
    id: "hc-006", type: "truefalse", grade: 2, category: "theory",
    question: "電力量の単位は「W」（ワット）である。",
    answer: false, explanation: "電力量の単位は「Wh」（ワット時）または「kWh」。「W」は電力の単位。", source: "hardcoded",
  },
  {
    id: "hc-007", type: "choice", grade: 2, category: "theory",
    question: "力率80%の回路で、電圧100V、電流5Aのとき消費電力は何Wか。",
    choices: ["200W", "400W", "500W", "625W"],
    answer: 1, explanation: "P=V×I×cosθ=100×5×0.8=400W", source: "hardcoded",
  },
  {
    id: "hc-008", type: "choice", grade: 2, category: "theory",
    question: "500Wの電熱器を2時間使用した場合の電力量は何Whか。",
    choices: ["250Wh", "500Wh", "1000Wh", "2000Wh"],
    answer: 2, explanation: "W=P×t=500×2=1000Wh=1kWh", source: "hardcoded",
  },
  {
    id: "hc-009", type: "truefalse", grade: 2, category: "theory",
    question: "キルヒホッフの第一法則は「回路の任意の接続点において、流入する電流の和と流出する電流の和は等しい」である。",
    answer: true, explanation: "キルヒホッフの第一法則（電流の法則）の正しい説明。", source: "hardcoded",
  },
  {
    id: "hc-010", type: "choice", grade: 2, category: "theory",
    question: "抵抗Rに電流Iが流れたとき、発生する熱量はどれか。",
    choices: ["I×R", "I²×R×t", "V/I", "V×t"],
    answer: 1, explanation: "ジュールの法則 Q=I²Rt（ジュール熱）", source: "hardcoded",
  },
  {
    id: "hc-011", type: "choice", grade: 2, category: "theory",
    question: "コンデンサの容量の単位はどれか。",
    choices: ["H（ヘンリー）", "F（ファラド）", "Ω（オーム）", "V（ボルト）"],
    answer: 1, explanation: "コンデンサの静電容量の単位はF（ファラド）。Hはインダクタンスの単位。", source: "hardcoded",
  },
  {
    id: "hc-012", type: "choice", grade: 2, category: "theory",
    question: "200Vの回路で抵抗50Ωに流れる電流と消費電力の組み合わせで正しいものはどれか。",
    choices: ["2A, 200W", "4A, 800W", "4A, 400W", "2A, 400W"],
    answer: 1, explanation: "I=V/R=200/50=4A, P=V×I=200×4=800W", source: "hardcoded",
  },
  {
    id: "hc-013", type: "truefalse", grade: 2, category: "theory",
    question: "導体の抵抗は、長さに比例し、断面積に反比例する。",
    answer: true, explanation: "R=ρ×L/A（ρ:抵抗率, L:長さ, A:断面積）。長さに比例し断面積に反比例する。", source: "hardcoded",
  },
  {
    id: "hc-014", type: "choice", grade: 2, category: "theory",
    question: "単相交流回路の皮相電力の単位はどれか。",
    choices: ["W", "VA", "var", "Wh"],
    answer: 1, explanation: "皮相電力の単位はVA（ボルトアンペア）。Wは有効電力、varは無効電力。", source: "hardcoded",
  },
  {
    id: "hc-015", type: "choice", grade: 2, category: "theory",
    question: "RLC直列回路において、共振時のインピーダンスはどうなるか。",
    choices: ["最大になる", "最小になる（Rのみ）", "0になる", "無限大になる"],
    answer: 1, explanation: "直列共振ではXL=XCとなりインピーダンスZ=Rとなり最小になる。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 配線設計・図記号 (12問)
  // ============================
  {
    id: "hc-016", type: "choice", grade: 2, category: "wiring",
    question: "単線図で「○」は何を表すか。",
    choices: ["コンセント", "スイッチ", "照明器具（電灯）", "接地端子"],
    answer: 2, explanation: "○は照明器具（電灯）を表す。コンセントは⊕。", source: "hardcoded",
  },
  {
    id: "hc-017", type: "choice", grade: 2, category: "wiring",
    question: "15A分岐回路に使用する電線の最小太さはどれか。",
    choices: ["1.0mm", "1.6mm", "2.0mm", "2.6mm"],
    answer: 1, explanation: "15A分岐回路では直径1.6mm以上の電線を使用する。", source: "hardcoded",
  },
  {
    id: "hc-018", type: "truefalse", grade: 2, category: "wiring",
    question: "3路スイッチは、2箇所から同一の照明器具をON/OFFできるスイッチである。",
    answer: true, explanation: "3路スイッチは階段の上下など2箇所からON/OFF制御するために使用する。", source: "hardcoded",
  },
  {
    id: "hc-019", type: "choice", grade: 2, category: "wiring",
    question: "複線図で接地側電線の色は何色か。",
    choices: ["黒", "白", "赤", "緑"],
    answer: 1, explanation: "接地側（N相）は白色。非接地側（L相）は黒色が原則。", source: "hardcoded",
  },
  {
    id: "hc-020", type: "choice", grade: 2, category: "wiring",
    question: "20A配線用遮断器の分岐回路で使用できるコンセントの最大定格は何Aか。",
    choices: ["15A", "20A", "25A", "30A"],
    answer: 1, explanation: "20A分岐回路では20A以下のコンセントを使用する。", source: "hardcoded",
  },
  {
    id: "hc-021", type: "choice", grade: 2, category: "wiring",
    question: "600Vビニル絶縁電線（IV線）直径1.6mmの許容電流は約何Aか。",
    choices: ["19A", "27A", "35A", "48A"],
    answer: 1, explanation: "IV線1.6mmの許容電流は27A（周囲温度30℃の場合）。", source: "hardcoded",
  },
  {
    id: "hc-022", type: "truefalse", grade: 2, category: "wiring",
    question: "4路スイッチは、3箇所以上から照明を制御する場合に、3路スイッチの間に使用する。",
    answer: true, explanation: "4路スイッチは3路スイッチ2個の間に入れて使用し、3箇所以上での制御を可能にする。", source: "hardcoded",
  },
  {
    id: "hc-023", type: "choice", grade: 2, category: "wiring",
    question: "電線管内に収める電線本数を3本以下にした場合の電流減少係数はいくつか。",
    choices: ["0.56", "0.63", "0.70", "1.00"],
    answer: 2, explanation: "電線管内3本以下の場合、電流減少係数は0.70。", source: "hardcoded",
  },
  {
    id: "hc-024", type: "choice", grade: 2, category: "wiring",
    question: "住宅の屋内配線において、対地電圧の上限は原則何Vか。",
    choices: ["100V", "150V", "200V", "300V"],
    answer: 1, explanation: "住宅等の屋内配線では対地電圧は原則150V以下とされている。", source: "hardcoded",
  },
  {
    id: "hc-025", type: "choice", grade: 2, category: "wiring",
    question: "VVFケーブル2.0mm 2芯の許容電流は約何Aか。",
    choices: ["17A", "24A", "33A", "42A"],
    answer: 1, explanation: "VVF2.0mm-2芯の許容電流は約24A。", source: "hardcoded",
  },
  {
    id: "hc-026", type: "choice", grade: 2, category: "wiring",
    question: "分電盤を表す図記号はどれか。",
    choices: ["○", "□", "△", "◇"],
    answer: 1, explanation: "□は分電盤を表す。○は照明器具、◇は配線用遮断器を表す。", source: "hardcoded",
  },
  {
    id: "hc-027", type: "truefalse", grade: 2, category: "wiring",
    question: "単相3線式100/200Vの電源方式では、中性線と電圧線間が100V、電圧線間が200Vである。",
    answer: true, explanation: "単相3線式は中性線を境に100Vが2系統、電圧線間は200Vとなる。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 施工方法・工具 (12問)
  // ============================
  {
    id: "hc-028", type: "choice", grade: 2, category: "construction",
    question: "VVFケーブルの被覆を剥ぐために使用する専用工具はどれか。",
    choices: ["ペンチ", "ニッパー", "VVFストリッパー", "パイプカッター"],
    answer: 2, explanation: "VVFストリッパーはVVFケーブルの外装・絶縁被覆を剥ぐ専用工具。", source: "hardcoded",
  },
  {
    id: "hc-029", type: "choice", grade: 2, category: "construction",
    question: "金属管工事で管を曲げるために使用する工具はどれか。",
    choices: ["パイプレンチ", "パイプベンダー", "パイプカッター", "リーマー"],
    answer: 1, explanation: "パイプベンダーは金属管の曲げ加工に使用する工具。", source: "hardcoded",
  },
  {
    id: "hc-030", type: "truefalse", grade: 2, category: "construction",
    question: "CD管（オレンジ色の合成樹脂製可とう管）は、露出配管として使用できる。",
    answer: false, explanation: "CD管はコンクリート埋設専用。露出配管にはPF管（自己消火性あり）を使用する。", source: "hardcoded",
  },
  {
    id: "hc-031", type: "choice", grade: 2, category: "construction",
    question: "金属管のバリ取りに使用する工具はどれか。",
    choices: ["パイプベンダー", "リーマー", "パイプレンチ", "ウォーターポンププライヤー"],
    answer: 1, explanation: "リーマーは金属管切断後の内面バリ取りに使用する工具。", source: "hardcoded",
  },
  {
    id: "hc-032", type: "choice", grade: 2, category: "construction",
    question: "VVFケーブルをステップルで固定する際の間隔は、直線部で何m以下か。",
    choices: ["0.5m", "1.0m", "1.5m", "2.0m"],
    answer: 3, explanation: "VVFケーブルのステップル留め間隔は直線部で2m以下。", source: "hardcoded",
  },
  {
    id: "hc-033", type: "choice", grade: 2, category: "construction",
    question: "D種接地工事の接地抵抗値は何Ω以下か。",
    choices: ["10Ω", "50Ω", "100Ω", "500Ω"],
    answer: 2, explanation: "D種接地工事は100Ω以下。漏電遮断器（0.5秒以内）設置時は500Ω以下に緩和。", source: "hardcoded",
  },
  {
    id: "hc-034", type: "truefalse", grade: 2, category: "construction",
    question: "ねじなし電線管（E管）は、ねじなしコネクタ（ねじなしカップリング）で接続する。",
    answer: true, explanation: "E管はねじが切られていないため、ねじなしコネクタやねじなしカップリングで接続する。", source: "hardcoded",
  },
  {
    id: "hc-035", type: "choice", grade: 2, category: "construction",
    question: "金属管を曲げる場合、管の内側の曲げ半径は管内径の何倍以上か。",
    choices: ["3倍", "4倍", "6倍", "8倍"],
    answer: 2, explanation: "金属管の曲げ半径は管内径の6倍以上が原則。", source: "hardcoded",
  },
  {
    id: "hc-036", type: "choice", grade: 2, category: "construction",
    question: "ロックナットの締め付けに使用する工具はどれか。",
    choices: ["パイプレンチ", "ウォーターポンププライヤー", "トルクレンチ", "ペンチ"],
    answer: 1, explanation: "ウォーターポンププライヤーはロックナットの締め付けに使用する。", source: "hardcoded",
  },
  {
    id: "hc-037", type: "choice", grade: 2, category: "construction",
    question: "合成樹脂管工事に使用するPF管の特徴として正しいものはどれか。",
    choices: ["コンクリート埋設専用", "自己消火性がある", "金属製である", "曲げ加工ができない"],
    answer: 1, explanation: "PF管は自己消火性のある合成樹脂製可とう管で、露出・隠ぺい配管に使用可能。", source: "hardcoded",
  },
  {
    id: "hc-038", type: "choice", grade: 2, category: "construction",
    question: "D種接地工事に使用する接地線の最小太さはどれか。",
    choices: ["0.8mm", "1.2mm", "1.6mm", "2.0mm"],
    answer: 2, explanation: "D種接地工事の接地線は直径1.6mm以上（断面積で表す場合は同等）。", source: "hardcoded",
  },
  {
    id: "hc-039", type: "truefalse", grade: 2, category: "construction",
    question: "リングスリーブによる圧着接続では、圧着ペンチ（JIS適合品）を使用しなければならない。",
    answer: true, explanation: "リングスリーブの圧着はJIS C 9711に適合した圧着ペンチを使用する必要がある。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 法規 (12問)
  // ============================
  {
    id: "hc-040", type: "choice", grade: 2, category: "regulation",
    question: "第二種電気工事士が工事できる範囲はどれか。",
    choices: ["事業用電気工作物", "一般用電気工作物", "自家用電気工作物", "すべての電気工作物"],
    answer: 1, explanation: "第二種電気工事士は一般用電気工作物（600V以下）の電気工事ができる。", source: "hardcoded",
  },
  {
    id: "hc-041", type: "choice", grade: 2, category: "regulation",
    question: "対地電圧150V以下の電路の絶縁抵抗は何MΩ以上必要か。",
    choices: ["0.1MΩ", "0.2MΩ", "0.4MΩ", "1.0MΩ"],
    answer: 0, explanation: "対地電圧150V以下の絶縁抵抗は0.1MΩ以上必要。", source: "hardcoded",
  },
  {
    id: "hc-042", type: "truefalse", grade: 2, category: "regulation",
    question: "電気工事士免状に有効期限がある。",
    answer: false, explanation: "電気工事士免状に有効期限はない（終身有効）。ただし第一種は5年ごとの定期講習が必要。", source: "hardcoded",
  },
  {
    id: "hc-043", type: "choice", grade: 2, category: "regulation",
    question: "電気工事士でなくてもできる作業はどれか。",
    choices: ["コンセントの交換", "スイッチの交換", "電球の交換", "ブレーカーの交換"],
    answer: 2, explanation: "電球やヒューズの交換は軽微な作業として電気工事士でなくても行える。", source: "hardcoded",
  },
  {
    id: "hc-044", type: "choice", grade: 2, category: "regulation",
    question: "低圧の範囲として正しいものはどれか。",
    choices: ["交流300V以下", "交流600V以下", "交流750V以下", "交流1000V以下"],
    answer: 1, explanation: "低圧は直流750V以下、交流600V以下と定義されている。", source: "hardcoded",
  },
  {
    id: "hc-045", type: "choice", grade: 2, category: "regulation",
    question: "300V以下の電路の絶縁抵抗値は何MΩ以上必要か。",
    choices: ["0.1MΩ", "0.2MΩ", "0.4MΩ", "1.0MΩ"],
    answer: 1, explanation: "300V以下（対地電圧150V超）の絶縁抵抗は0.2MΩ以上必要。", source: "hardcoded",
  },
  {
    id: "hc-046", type: "truefalse", grade: 2, category: "regulation",
    question: "住所が変わった場合、電気工事士免状の書換え申請が必要である。",
    answer: false, explanation: "住所変更では免状の書換えは不要。氏名変更の場合は書換え申請が必要。", source: "hardcoded",
  },
  {
    id: "hc-047", type: "choice", grade: 2, category: "regulation",
    question: "漏電遮断器の設置が義務付けられている場所はどれか。",
    choices: ["乾燥した室内", "湿気の多い場所で金属製外箱の機器", "事務所の照明回路", "分電盤内"],
    answer: 1, explanation: "湿気の多い場所で金属製外箱の機器には漏電遮断器の設置が義務付けられている。", source: "hardcoded",
  },
  {
    id: "hc-048", type: "choice", grade: 2, category: "regulation",
    question: "300Vを超える低圧電路の絶縁抵抗は何MΩ以上必要か。",
    choices: ["0.1MΩ", "0.2MΩ", "0.4MΩ", "1.0MΩ"],
    answer: 2, explanation: "300V超の電路の絶縁抵抗は0.4MΩ以上必要。", source: "hardcoded",
  },
  {
    id: "hc-049", type: "choice", grade: 2, category: "regulation",
    question: "一般用電気工作物の電圧の上限はどれか。",
    choices: ["300V", "400V", "600V", "750V"],
    answer: 2, explanation: "一般用電気工作物は600V以下の電圧で受電するもの。", source: "hardcoded",
  },
  {
    id: "hc-050", type: "truefalse", grade: 2, category: "regulation",
    question: "インターホンの配線工事は、電気工事士の資格がなくても行える。",
    answer: true, explanation: "インターホン、ベル等の36V以下の二次側配線工事は電気工事士でなくても可能。", source: "hardcoded",
  },
  {
    id: "hc-051", type: "choice", grade: 2, category: "regulation",
    question: "電気工事士法で定められた電気工事士の義務として正しいものはどれか。",
    choices: ["毎年の届出", "電気設備技術基準に適合するよう工事を行う", "5年ごとの免状更新", "工事完了後の届出"],
    answer: 1, explanation: "電気工事士は電気設備技術基準に適合するよう電気工事を行う義務がある。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 鑑別 (10問)
  // ============================
  {
    id: "hc-052", type: "choice", grade: 2, category: "identification",
    question: "絶縁被覆が赤、白、黒、緑の4芯からなり、断面が平たいケーブルの名称はどれか。",
    choices: ["VVRケーブル", "VVFケーブル", "CVケーブル", "IV電線"],
    answer: 1, explanation: "VVF（ビニル絶縁ビニルシースケーブル平形）は断面が平たく、住宅配線に多用される。", source: "hardcoded",
  },
  {
    id: "hc-053", type: "choice", grade: 2, category: "identification",
    question: "オレンジ色の合成樹脂製可とう管の名称はどれか。",
    choices: ["PF管", "CD管", "VE管", "E管"],
    answer: 1, explanation: "CD管はオレンジ色でコンクリート埋設専用の合成樹脂製可とう管。", source: "hardcoded",
  },
  {
    id: "hc-054", type: "choice", grade: 2, category: "identification",
    question: "電線を挟むことなく、クランプ式で負荷電流を測定できる計器はどれか。",
    choices: ["テスター", "絶縁抵抗計", "クランプメーター", "接地抵抗計"],
    answer: 2, explanation: "クランプメーターは電線を挟み込んで非接触で電流を測定できる計器。", source: "hardcoded",
  },
  {
    id: "hc-055", type: "choice", grade: 2, category: "identification",
    question: "絶縁抵抗を測定するために使用する計器の通称はどれか。",
    choices: ["テスター", "メガー", "クランプメーター", "検電器"],
    answer: 1, explanation: "メガー（メガオームメーター）は絶縁抵抗計の通称。", source: "hardcoded",
  },
  {
    id: "hc-056", type: "choice", grade: 2, category: "identification",
    question: "表示灯が内蔵されており、スイッチがOFFのとき点灯するスイッチはどれか。",
    choices: ["タンブラスイッチ", "パイロットスイッチ", "ほたるスイッチ", "調光スイッチ"],
    answer: 2, explanation: "ほたるスイッチはOFF時に表示灯が点灯し、暗所でスイッチ位置がわかる。パイロットスイッチはON時に点灯。", source: "hardcoded",
  },
  {
    id: "hc-057", type: "choice", grade: 2, category: "identification",
    question: "過電流が流れたときに自動的に回路を遮断する器具はどれか。",
    choices: ["漏電遮断器", "配線用遮断器", "電磁開閉器", "ヒューズ"],
    answer: 1, explanation: "配線用遮断器（ブレーカー）は過電流を検出して自動的に回路を遮断する。", source: "hardcoded",
  },
  {
    id: "hc-058", type: "truefalse", grade: 2, category: "identification",
    question: "漏電遮断器と配線用遮断器は同じものである。",
    answer: false, explanation: "漏電遮断器（ELB）は漏電を検出して遮断する。配線用遮断器（MCCB）は過電流を検出して遮断する。機能が異なる。", source: "hardcoded",
  },
  {
    id: "hc-059", type: "choice", grade: 2, category: "identification",
    question: "充電部に触れずに電圧の有無を確認できる器具はどれか。",
    choices: ["テスター", "検電器", "絶縁抵抗計", "接地抵抗計"],
    answer: 1, explanation: "検電器は充電の有無を非接触で確認できる器具。", source: "hardcoded",
  },
  {
    id: "hc-060", type: "choice", grade: 2, category: "identification",
    question: "差込形コネクタの用途として正しいものはどれか。",
    choices: ["電線管の接続", "電線相互の接続", "電線管とボックスの接続", "接地線の接続"],
    answer: 1, explanation: "差込形コネクタは電線相互を差し込むだけで接続できる器具。", source: "hardcoded",
  },
  {
    id: "hc-061", type: "choice", grade: 2, category: "identification",
    question: "エアコン等の200V機器に使用される、回転させて抜き差しするコンセントの形状はどれか。",
    choices: ["平刃形", "引掛形", "丸刃形", "ねじ込み形"],
    answer: 1, explanation: "引掛形コンセントは200V機器に使用され、プラグを回転させて固定する。", source: "hardcoded",
  },

  // ============================
  // 第一種 - 電気理論 (15問)
  // ============================
  {
    id: "hc-101", type: "choice", grade: 1, category: "theory",
    question: "三相交流回路のY結線において、線間電圧と相電圧の関係で正しいものはどれか。",
    choices: ["線間電圧=相電圧", "線間電圧=√3×相電圧", "線間電圧=2×相電圧", "線間電圧=相電圧/√3"],
    answer: 1, explanation: "Y結線では線間電圧=√3×相電圧の関係がある。", source: "hardcoded",
  },
  {
    id: "hc-102", type: "choice", grade: 1, category: "theory",
    question: "三相交流の電力の計算式はどれか。",
    choices: ["P=V×I", "P=√2×V×I×cosθ", "P=√3×V×I×cosθ", "P=3×V×I×cosθ"],
    answer: 2, explanation: "三相電力P=√3×V(線間電圧)×I(線電流)×cosθ", source: "hardcoded",
  },
  {
    id: "hc-103", type: "choice", grade: 1, category: "theory",
    question: "変圧器の巻数比が1次側:2次側=10:1のとき、1次側6600Vに対する2次側電圧はいくらか。",
    choices: ["330V", "440V", "660V", "6600V"],
    answer: 2, explanation: "V₂=V₁×N₂/N₁=6600×1/10=660V", source: "hardcoded",
  },
  {
    id: "hc-104", type: "truefalse", grade: 1, category: "theory",
    question: "Δ結線では、線電流は相電流の√3倍である。",
    answer: true, explanation: "Δ結線では線電流=√3×相電流、線間電圧=相電圧の関係がある。", source: "hardcoded",
  },
  {
    id: "hc-105", type: "choice", grade: 1, category: "theory",
    question: "三相200V、10kWの電動機の力率が0.8のとき、線電流は約何Aか。",
    choices: ["18A", "28A", "36A", "50A"],
    answer: 2, explanation: "I=P/(√3×V×cosθ)=10000/(√3×200×0.8)≒36A", source: "hardcoded",
  },
  {
    id: "hc-106", type: "choice", grade: 1, category: "theory",
    question: "高圧受電設備で使用される計器用変圧器（VT）の2次側定格電圧は何Vか。",
    choices: ["100V", "110V", "200V", "220V"],
    answer: 1, explanation: "VT（計器用変圧器）の2次側定格電圧は110V。CT（変流器）の2次側定格電流は5A。", source: "hardcoded",
  },
  {
    id: "hc-107", type: "choice", grade: 1, category: "theory",
    question: "同期速度Nsを求める式はどれか。ただしfは周波数、pは極数とする。",
    choices: ["Ns=120f/p", "Ns=60f/p", "Ns=f×p", "Ns=120p/f"],
    answer: 0, explanation: "同期速度Ns=120f/p [min⁻¹]。f:周波数[Hz], p:極数", source: "hardcoded",
  },
  {
    id: "hc-108", type: "truefalse", grade: 1, category: "theory",
    question: "変圧器の鉄損は負荷の大きさに関係なくほぼ一定である。",
    answer: true, explanation: "鉄損（ヒステリシス損＋渦電流損）は磁束密度と周波数に依存し、負荷に関係なくほぼ一定。銅損は負荷電流の2乗に比例する。", source: "hardcoded",
  },
  {
    id: "hc-109", type: "choice", grade: 1, category: "theory",
    question: "進相コンデンサを設置する主な目的はどれか。",
    choices: ["電圧を上げる", "力率を改善する", "周波数を安定させる", "電流を増やす"],
    answer: 1, explanation: "進相コンデンサは遅れ力率を改善（1に近づける）するために設置する。", source: "hardcoded",
  },
  {
    id: "hc-110", type: "choice", grade: 1, category: "theory",
    question: "CT（変流器）の2次側定格電流は何Aか。",
    choices: ["1A", "5A", "10A", "15A"],
    answer: 1, explanation: "CT（変流器）の2次側定格電流は5A。VT（計器用変圧器）の2次側定格電圧は110V。", source: "hardcoded",
  },
  {
    id: "hc-111", type: "choice", grade: 1, category: "theory",
    question: "三相誘導電動機の回転方向を逆転させるには何をすればよいか。",
    choices: ["電圧を変える", "3本のうち任意の2本の結線を入れ替える", "接地を変える", "周波数を変える"],
    answer: 1, explanation: "三相誘導電動機は3相のうち2相を入れ替えると逆転する。", source: "hardcoded",
  },
  {
    id: "hc-112", type: "choice", grade: 1, category: "theory",
    question: "高圧6600Vの配電線路の電力損失を半分にするには、電圧を何Vにすればよいか。",
    choices: ["9600V（√2倍）", "3300V（1/2倍）", "6600V（そのまま）", "13200V（2倍）"],
    answer: 0, explanation: "電力損失PL=I²R。電圧を√2倍にすると電流が1/√2倍になり、損失はI²Rから(I/√2)²R=PL/2となる。", source: "hardcoded",
  },
  {
    id: "hc-113", type: "truefalse", grade: 1, category: "theory",
    question: "単相変圧器のV-V結線は、単相変圧器2台で三相電力を供給する方法である。",
    answer: true, explanation: "V-V結線は変圧器2台でΔ-Δ結線の1台を省略した結線方式。利用率は√3/2≒86.6%。", source: "hardcoded",
  },
  {
    id: "hc-114", type: "choice", grade: 1, category: "theory",
    question: "電力用コンデンサに直列リアクトルを設置する目的はどれか。",
    choices: ["電圧降下の補償", "高調波電流の抑制", "力率の改善", "短絡電流の制限"],
    answer: 1, explanation: "直列リアクトルはコンデンサ回路の高調波電流（第5次等）を抑制するために設置する。通常コンデンサ容量の6%のリアクトルを使用。", source: "hardcoded",
  },
  {
    id: "hc-115", type: "choice", grade: 1, category: "theory",
    question: "需要率の定義として正しいものはどれか。",
    choices: ["平均需要電力/最大需要電力", "最大需要電力/設備容量の合計", "負荷設備の合計/契約電力", "設備容量/変圧器容量"],
    answer: 1, explanation: "需要率=最大需要電力/設備容量の合計×100[%]", source: "hardcoded",
  },

  // ============================
  // 第一種 - 配線設計・図記号 (12問)
  // ============================
  {
    id: "hc-116", type: "choice", grade: 1, category: "wiring",
    question: "高圧受電設備の単線結線図で「VCB」は何を表すか。",
    choices: ["真空遮断器", "気中遮断器", "計器用変圧器", "断路器"],
    answer: 0, explanation: "VCB=Vacuum Circuit Breaker（真空遮断器）。高圧回路の開閉・保護に使用。", source: "hardcoded",
  },
  {
    id: "hc-117", type: "choice", grade: 1, category: "wiring",
    question: "高圧受電設備で「DS」と表記されるものはどれか。",
    choices: ["遮断器", "断路器", "変流器", "避雷器"],
    answer: 1, explanation: "DS=Disconnecting Switch（断路器）。無負荷状態で回路を開閉する。", source: "hardcoded",
  },
  {
    id: "hc-118", type: "choice", grade: 1, category: "wiring",
    question: "PAS（気中負荷開閉器）は一般的にどこに設置されるか。",
    choices: ["変電所内", "責任分界点（引込柱）", "キュービクル内", "分電盤内"],
    answer: 1, explanation: "PASは責任分界点に設置され、需要家側の事故時に自動的に開放する。", source: "hardcoded",
  },
  {
    id: "hc-119", type: "truefalse", grade: 1, category: "wiring",
    question: "高圧ケーブルの遮へい層は接地する必要がある。",
    answer: true, explanation: "高圧ケーブルの遮へい層（シールド）はA種接地工事を施す。感電防止と故障電流の帰路確保のため。", source: "hardcoded",
  },
  {
    id: "hc-120", type: "choice", grade: 1, category: "wiring",
    question: "高圧受電設備で「LA」と表記されるものはどれか。",
    choices: ["断路器", "避雷器", "計器用変圧器", "変流器"],
    answer: 1, explanation: "LA=Lightning Arrester（避雷器）。雷サージから機器を保護する。", source: "hardcoded",
  },
  {
    id: "hc-121", type: "choice", grade: 1, category: "wiring",
    question: "キュービクル式高圧受電設備の受電容量の上限は一般的に何kVA以下か。",
    choices: ["300kVA", "500kVA", "1000kVA", "4000kVA"],
    answer: 3, explanation: "キュービクル式は一般的に4000kVA以下の受電設備に使用される。", source: "hardcoded",
  },
  {
    id: "hc-122", type: "truefalse", grade: 1, category: "wiring",
    question: "高圧受電設備において、CT（変流器）の2次側は開放してはならない。",
    answer: true, explanation: "CTの2次側を開放すると2次側に異常高電圧が発生し、絶縁破壊や感電の危険がある。", source: "hardcoded",
  },
  {
    id: "hc-123", type: "choice", grade: 1, category: "wiring",
    question: "高圧受電設備のPF・S形の「PF」は何を指すか。",
    choices: ["パワーヒューズ", "パワーファクター", "プラスチックフィルム", "プログラマブルフューズ"],
    answer: 0, explanation: "PF=Power Fuse（高圧限流ヒューズ）。PF・S形は限流ヒューズと高圧交流負荷開閉器の組み合わせ。", source: "hardcoded",
  },
  {
    id: "hc-124", type: "choice", grade: 1, category: "wiring",
    question: "高圧受電設備において、OCR（過電流継電器）と組み合わせて使用する機器はどれか。",
    choices: ["断路器", "遮断器", "避雷器", "計器用変圧器"],
    answer: 1, explanation: "OCR（過電流継電器）は過電流を検出し、遮断器にトリップ信号を送って回路を遮断する。", source: "hardcoded",
  },
  {
    id: "hc-125", type: "choice", grade: 1, category: "wiring",
    question: "高圧受電設備の力率改善用コンデンサの開閉に使用される機器はどれか。",
    choices: ["真空遮断器", "高圧交流電磁接触器", "断路器", "限流ヒューズ"],
    answer: 1, explanation: "力率改善用コンデンサの開閉には高圧交流電磁接触器を使用する。", source: "hardcoded",
  },
  {
    id: "hc-126", type: "choice", grade: 1, category: "wiring",
    question: "高圧地中電線路に使用されるケーブルで、架橋ポリエチレン絶縁のものはどれか。",
    choices: ["VVFケーブル", "CVケーブル", "VVRケーブル", "IV電線"],
    answer: 1, explanation: "CVケーブル（架橋ポリエチレン絶縁ビニルシースケーブル）は高圧地中電線路に使用される。", source: "hardcoded",
  },
  {
    id: "hc-127", type: "truefalse", grade: 1, category: "wiring",
    question: "ZCT（零相変流器）は地絡電流を検出するために使用される。",
    answer: true, explanation: "ZCT（Zero-phase Current Transformer）は地絡電流を検出し、GR（地絡継電器）と組み合わせて使用する。", source: "hardcoded",
  },

  // ============================
  // 第一種 - 施工方法・工具 (12問)
  // ============================
  {
    id: "hc-128", type: "choice", grade: 1, category: "construction",
    question: "高圧ケーブルの端末処理に使用するものはどれか。",
    choices: ["リングスリーブ", "終端接続部（ストレスコーン）", "差込形コネクタ", "圧着端子"],
    answer: 1, explanation: "高圧ケーブルの端末には終端接続部（ストレスコーン付き）を使用して電界集中を緩和する。", source: "hardcoded",
  },
  {
    id: "hc-129", type: "choice", grade: 1, category: "construction",
    question: "高圧受電設備のA種接地工事の接地抵抗値は何Ω以下か。",
    choices: ["10Ω", "50Ω", "100Ω", "500Ω"],
    answer: 0, explanation: "A種接地工事は10Ω以下。高圧・特別高圧の機器の金属製外箱等に施す。", source: "hardcoded",
  },
  {
    id: "hc-130", type: "choice", grade: 1, category: "construction",
    question: "高圧ケーブルの絶縁耐力試験の試験電圧はどれか。",
    choices: ["最大使用電圧の1.5倍の交流電圧を10分間", "6900Vの直流電圧を10分間", "10350Vの交流電圧を10分間", "最大使用電圧の1.25倍を1分間"],
    answer: 2, explanation: "高圧の絶縁耐力試験は最大使用電圧の1.5倍の交流電圧（6900×1.5=10350V）を10分間印加。", source: "hardcoded",
  },
  {
    id: "hc-131", type: "truefalse", grade: 1, category: "construction",
    question: "金属ダクト工事は、高圧屋内配線に使用できる。",
    answer: true, explanation: "金属ダクト工事は高圧屋内配線にも使用可能な工事方法の一つ。", source: "hardcoded",
  },
  {
    id: "hc-132", type: "choice", grade: 1, category: "construction",
    question: "高圧受電設備で使用されるB種接地工事の接地線の最小太さはどれか。",
    choices: ["1.6mm", "2.6mm", "4mm", "変圧器容量による"],
    answer: 3, explanation: "B種接地工事の接地線太さは変圧器の容量と1線地絡電流によって決まる。一般的に4mm以上。", source: "hardcoded",
  },
  {
    id: "hc-133", type: "choice", grade: 1, category: "construction",
    question: "ケーブルラック工事で、ケーブルをラックに固定する間隔は水平部で何m以下か。",
    choices: ["1m", "2m", "3m", "5m"],
    answer: 2, explanation: "ケーブルラック上のケーブル固定間隔は水平部で3m以下、垂直部で1.5m以下。", source: "hardcoded",
  },
  {
    id: "hc-134", type: "truefalse", grade: 1, category: "construction",
    question: "高圧受電設備の竣工検査では、接地抵抗測定、絶縁抵抗測定、絶縁耐力試験が必要である。",
    answer: true, explanation: "竣工検査では接地抵抗測定、絶縁抵抗測定、絶縁耐力試験、保護継電器の動作試験等が必要。", source: "hardcoded",
  },
  {
    id: "hc-135", type: "choice", grade: 1, category: "construction",
    question: "油入変圧器の絶縁油の劣化を判断する試験はどれか。",
    choices: ["絶縁耐力試験", "酸価度試験", "接地抵抗試験", "導通試験"],
    answer: 1, explanation: "絶縁油の劣化は酸価度試験（全酸価の測定）で判断する。", source: "hardcoded",
  },
  {
    id: "hc-136", type: "choice", grade: 1, category: "construction",
    question: "高圧引込ケーブルの屋外露出部分の防護管の最小地上高さは何mか。",
    choices: ["2m", "2.5m", "3.5m", "5m"],
    answer: 2, explanation: "高圧引込ケーブルの防護管の地上高さは3.5m以上（車両の通行がない場合）。", source: "hardcoded",
  },
  {
    id: "hc-137", type: "choice", grade: 1, category: "construction",
    question: "高圧受電設備でC種接地工事が必要なものはどれか。",
    choices: ["高圧機器の金属製外箱", "300V超の低圧機器の金属製外箱", "300V以下の低圧機器", "変圧器の2次側中性点"],
    answer: 1, explanation: "C種接地工事は300Vを超える低圧機器の金属製外箱等に施す。10Ω以下（漏電遮断器設置時500Ω以下）。", source: "hardcoded",
  },
  {
    id: "hc-138", type: "truefalse", grade: 1, category: "construction",
    question: "高圧受電設備の主遮断器として真空遮断器（VCB）を使用する方式をCB形という。",
    answer: true, explanation: "CB形は遮断器（Circuit Breaker）を主遮断装置として使用する方式。PF・S形より大容量の受電設備に使用。", source: "hardcoded",
  },
  {
    id: "hc-139", type: "choice", grade: 1, category: "construction",
    question: "高圧受電設備の年次点検で行うべき試験として不適切なものはどれか。",
    choices: ["絶縁抵抗測定", "接地抵抗測定", "短絡試験", "保護継電器動作試験"],
    answer: 2, explanation: "短絡試験は通常の年次点検では行わない。絶縁抵抗測定、接地抵抗測定、保護継電器試験は必須。", source: "hardcoded",
  },

  // ============================
  // 第一種 - 法規 (12問)
  // ============================
  {
    id: "hc-140", type: "choice", grade: 1, category: "regulation",
    question: "第一種電気工事士が工事できる自家用電気工作物の最大電力は何kW未満か。",
    choices: ["50kW", "100kW", "500kW", "1000kW"],
    answer: 2, explanation: "第一種電気工事士は最大電力500kW未満の自家用電気工作物の工事ができる。", source: "hardcoded",
  },
  {
    id: "hc-141", type: "choice", grade: 1, category: "regulation",
    question: "第一種電気工事士の定期講習の受講間隔は何年ごとか。",
    choices: ["1年", "3年", "5年", "10年"],
    answer: 2, explanation: "第一種電気工事士は5年ごとに定期講習を受講する義務がある。", source: "hardcoded",
  },
  {
    id: "hc-142", type: "choice", grade: 1, category: "regulation",
    question: "高圧の定義として正しいものはどれか。",
    choices: ["交流600V超〜7000V以下", "交流750V超〜7000V以下", "交流600V超〜10000V以下", "交流1000V超〜7000V以下"],
    answer: 0, explanation: "高圧は交流600V超〜7000V以下、直流750V超〜7000V以下と定義されている。", source: "hardcoded",
  },
  {
    id: "hc-143", type: "truefalse", grade: 1, category: "regulation",
    question: "自家用電気工作物の設置者は、電気主任技術者を選任しなければならない。",
    answer: true, explanation: "事業用（自家用）電気工作物の設置者は電気主任技術者を選任する義務がある（電気事業法）。", source: "hardcoded",
  },
  {
    id: "hc-144", type: "choice", grade: 1, category: "regulation",
    question: "自家用電気工作物で、竣工検査を行う者はだれか。",
    choices: ["電気工事士", "電気主任技術者", "経済産業大臣", "設備の施工者"],
    answer: 1, explanation: "自家用電気工作物の竣工検査は電気主任技術者（又は保安管理業務の委託先）が行う。", source: "hardcoded",
  },
  {
    id: "hc-145", type: "choice", grade: 1, category: "regulation",
    question: "高圧受電設備の月次点検で確認すべき事項として最も適切なものはどれか。",
    choices: ["絶縁耐力試験", "外観点検・表示灯確認", "遮断器の分解整備", "変圧器油の交換"],
    answer: 1, explanation: "月次点検は外観点検が主で、表示灯、計器、異音、異臭等を確認する。絶縁耐力試験は年次点検で実施。", source: "hardcoded",
  },
  {
    id: "hc-146", type: "truefalse", grade: 1, category: "regulation",
    question: "自家用電気工作物の設置者は、保安規程を定めて経済産業大臣に届け出なければならない。",
    answer: true, explanation: "電気事業法により、自家用電気工作物の設置者は保安規程を定め、届出する義務がある。", source: "hardcoded",
  },
  {
    id: "hc-147", type: "choice", grade: 1, category: "regulation",
    question: "高圧受電設備の接地工事で、変圧器の低圧側中性点に施すべき接地種別はどれか。",
    choices: ["A種", "B種", "C種", "D種"],
    answer: 1, explanation: "変圧器の低圧側中性点にはB種接地工事を施す。高低圧の混触防止が目的。", source: "hardcoded",
  },
  {
    id: "hc-148", type: "choice", grade: 1, category: "regulation",
    question: "電気事故が発生した場合、設置者は速やかにどこに報告しなければならないか。",
    choices: ["都道府県知事", "市町村長", "所轄の産業保安監督部長", "消防署長"],
    answer: 2, explanation: "電気事故の報告先は所轄の産業保安監督部長（経済産業省の地方機関）。", source: "hardcoded",
  },
  {
    id: "hc-149", type: "choice", grade: 1, category: "regulation",
    question: "特別高圧の定義はどれか。",
    choices: ["3000V超", "6000V超", "7000V超", "10000V超"],
    answer: 2, explanation: "特別高圧は7000Vを超える電圧と定義されている。", source: "hardcoded",
  },
  {
    id: "hc-150", type: "truefalse", grade: 1, category: "regulation",
    question: "認定電気工事従事者は、自家用電気工作物の低圧部分の簡易な工事を行うことができる。",
    answer: true, explanation: "認定電気工事従事者は自家用電気工作物のうち600V以下の簡易な電気工事を行える。", source: "hardcoded",
  },
  {
    id: "hc-151", type: "choice", grade: 1, category: "regulation",
    question: "電気用品安全法で「特定電気用品」に該当するものはどれか。",
    choices: ["電気スタンド", "配線用遮断器", "扇風機", "テレビ"],
    answer: 1, explanation: "配線用遮断器は特定電気用品に該当し、菱形のPSEマークが必要。", source: "hardcoded",
  },

  // ============================
  // 第一種 - 鑑別 (10問)
  // ============================
  {
    id: "hc-152", type: "choice", grade: 1, category: "identification",
    question: "高圧検電器の用途はどれか。",
    choices: ["電流の測定", "高圧充電部の充電の有無の確認", "絶縁抵抗の測定", "接地抵抗の測定"],
    answer: 1, explanation: "高圧検電器は高圧回路の充電の有無を確認するための器具。作業前の検電は必須。", source: "hardcoded",
  },
  {
    id: "hc-153", type: "choice", grade: 1, category: "identification",
    question: "高圧カットアウト（PC）の用途はどれか。",
    choices: ["主回路の遮断", "変圧器の一次側保護", "力率改善", "接地"],
    answer: 1, explanation: "高圧カットアウト（PC）は柱上変圧器等の一次側保護に使用される。ヒューズ内蔵。", source: "hardcoded",
  },
  {
    id: "hc-154", type: "choice", grade: 1, category: "identification",
    question: "真空遮断器（VCB）の消弧媒体はどれか。",
    choices: ["油", "真空", "SF6ガス", "空気"],
    answer: 1, explanation: "VCB（Vacuum Circuit Breaker）は真空中でアークを消弧する。メンテナンスが少ない。", source: "hardcoded",
  },
  {
    id: "hc-155", type: "truefalse", grade: 1, category: "identification",
    question: "GR（地絡継電器）とZCT（零相変流器）は組み合わせて使用し、地絡保護を行う。",
    answer: true, explanation: "ZCTで地絡電流を検出し、GRが動作して遮断器にトリップ信号を出す。GR付きPAS等で使用。", source: "hardcoded",
  },
  {
    id: "hc-156", type: "choice", grade: 1, category: "identification",
    question: "断路器（DS）の操作上の注意として正しいものはどれか。",
    choices: ["負荷電流を遮断できる", "無負荷状態でのみ開閉する", "短絡電流を遮断できる", "自動的に開閉する"],
    answer: 1, explanation: "断路器は消弧能力がないため、無負荷状態でのみ開閉する。負荷の開閉には遮断器を使用。", source: "hardcoded",
  },
  {
    id: "hc-157", type: "choice", grade: 1, category: "identification",
    question: "モールド変圧器の特徴として正しいものはどれか。",
    choices: ["絶縁油を使用する", "エポキシ樹脂でモールドされている", "油入変圧器より安い", "屋外専用"],
    answer: 1, explanation: "モールド変圧器はエポキシ樹脂で巻線をモールドしたもので、不燃性・小型のため屋内設置に適する。", source: "hardcoded",
  },
  {
    id: "hc-158", type: "choice", grade: 1, category: "identification",
    question: "高圧受電設備で使用される「SOG」とは何か。",
    choices: ["過電圧継電器付き気中負荷開閉器", "零相接地電流検出器", "油入変圧器保護装置", "高圧限流ヒューズ"],
    answer: 0, explanation: "SOG=Storage Over-current Ground relay付きの気中負荷開閉器。PASの一種で地絡・過電流を検出。", source: "hardcoded",
  },
  {
    id: "hc-159", type: "choice", grade: 1, category: "identification",
    question: "高圧受電設備で使用される変圧器の冷却方式のうち、小容量で一般的なものはどれか。",
    choices: ["油入自冷式", "油入風冷式", "強制油循環水冷式", "ガス冷却式"],
    answer: 0, explanation: "小容量の変圧器は油入自冷式（ONAN）が一般的。大容量になると送風冷却等が必要。", source: "hardcoded",
  },
  {
    id: "hc-160", type: "truefalse", grade: 1, category: "identification",
    question: "過電流継電器（OCR）は過負荷及び短絡電流を検出して遮断器にトリップ信号を出す。",
    answer: true, explanation: "OCR（Over Current Relay）は設定値以上の電流を検出して遮断器を動作させる保護継電器。", source: "hardcoded",
  },
  {
    id: "hc-161", type: "choice", grade: 1, category: "identification",
    question: "高圧進相コンデンサの放電装置（放電コイル）を設置する理由はどれか。",
    choices: ["力率改善", "高調波抑制", "開放後の残留電荷の放電", "突入電流の制限"],
    answer: 2, explanation: "放電コイルはコンデンサ開放後の残留電荷を安全に放電するため。5分以内に50V以下にする。", source: "hardcoded",
  },
];

export function getQuestions(grade: Grade, category: Category): Question[] {
  return hardcodedQuestions.filter(
    (q) => q.grade === grade && q.category === category
  );
}

export function getRandomQuestions(grade: Grade, count: number): Question[] {
  const gradeQuestions = hardcodedQuestions.filter((q) => q.grade === grade);
  const shuffled = [...gradeQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getAllQuestions(): Question[] {
  return hardcodedQuestions;
}
