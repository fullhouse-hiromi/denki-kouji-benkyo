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
  // 第二種 - 電気理論 追加 (12問)
  // ============================
  {
    id: "hc-062", type: "choice", grade: 2, category: "theory",
    question: "断面積2mm²、長さ100mの銅線の抵抗は約何Ωか。ただし銅の抵抗率を1.7×10⁻²Ω·mmとする。",
    choices: ["0.17Ω", "0.85Ω", "1.7Ω", "8.5Ω"],
    answer: 1, explanation: "R=ρL/A=1.7×10⁻²×100/2=0.85Ω", source: "hardcoded",
  },
  {
    id: "hc-063", type: "choice", grade: 2, category: "theory",
    question: "20Ωと30Ωの抵抗を並列に接続した場合の合成抵抗は何Ωか。",
    choices: ["10Ω", "12Ω", "25Ω", "50Ω"],
    answer: 1, explanation: "R=(20×30)/(20+30)=600/50=12Ω", source: "hardcoded",
  },
  {
    id: "hc-064", type: "choice", grade: 2, category: "theory",
    question: "100Vの回路にコイル（誘導性リアクタンス10Ω）のみを接続したとき、流れる電流は何Aか。",
    choices: ["5A", "10A", "15A", "20A"],
    answer: 1, explanation: "I=V/XL=100/10=10A。純粋な誘導回路では電流は電圧より90°遅れる。", source: "hardcoded",
  },
  {
    id: "hc-065", type: "truefalse", grade: 2, category: "theory",
    question: "交流回路において、抵抗だけの回路の力率は1（100%）である。",
    answer: true, explanation: "抵抗のみの回路では電圧と電流の位相差がなく、cosθ=cos0°=1（力率100%）。", source: "hardcoded",
  },
  {
    id: "hc-066", type: "choice", grade: 2, category: "theory",
    question: "電線の許容電流を超える電流を流し続けると、最も起こりやすい現象はどれか。",
    choices: ["電圧降下が小さくなる", "電線が冷える", "電線の絶縁物が劣化・発火する", "電流が自然に減少する"],
    answer: 2, explanation: "許容電流を超えると電線が過熱し、絶縁被覆が劣化・溶融して発火の危険がある。", source: "hardcoded",
  },
  {
    id: "hc-067", type: "choice", grade: 2, category: "theory",
    question: "静電容量10μFのコンデンサに100Vを充電したとき、蓄えられる電荷は何Cか。",
    choices: ["0.001C", "0.01C", "0.1C", "1C"],
    answer: 0, explanation: "Q=CV=10×10⁻⁶×100=0.001C=1mC", source: "hardcoded",
  },
  {
    id: "hc-068", type: "choice", grade: 2, category: "theory",
    question: "単相100V、消費電力1kWの電熱器に流れる電流は何Aか。",
    choices: ["5A", "10A", "15A", "20A"],
    answer: 1, explanation: "I=P/V=1000/100=10A。電熱器は抵抗負荷で力率1。", source: "hardcoded",
  },
  {
    id: "hc-069", type: "choice", grade: 2, category: "theory",
    question: "100Vの回路で2Aの電流が1時間流れたときの電力量は何Whか。",
    choices: ["50Wh", "100Wh", "200Wh", "400Wh"],
    answer: 2, explanation: "W=P×t=V×I×t=100×2×1=200Wh", source: "hardcoded",
  },
  {
    id: "hc-070", type: "truefalse", grade: 2, category: "theory",
    question: "直流回路ではコンデンサに定常的な電流が流れる。",

    answer: false, explanation: "コンデンサは直流を通さない。充電完了後は電流が流れなくなる（定常状態で電流ゼロ）。", source: "hardcoded",
  },
  {
    id: "hc-071", type: "choice", grade: 2, category: "theory",
    question: "抵抗8Ωと誘導リアクタンス6Ωが直列に接続された回路のインピーダンスは何Ωか。",
    choices: ["2Ω", "10Ω", "14Ω", "48Ω"],
    answer: 1, explanation: "Z=√(R²+XL²)=√(64+36)=√100=10Ω", source: "hardcoded",
  },
  {
    id: "hc-072", type: "choice", grade: 2, category: "theory",
    question: "銅と比べたアルミニウムの導電率は約何%か。",
    choices: ["約40%", "約60%", "約80%", "約100%"],
    answer: 1, explanation: "アルミニウムの導電率は銅の約60%。ただし軽量のため送電線等に使用される。", source: "hardcoded",
  },
  {
    id: "hc-073", type: "choice", grade: 2, category: "theory",
    question: "単相2線式の電圧降下の計算式はどれか。ただしρは抵抗率、Lは片道の長さ、Iは電流、Aは断面積とする。",
    choices: ["e=ρLI/A", "e=2ρLI/A", "e=√3ρLI/A", "e=ρL²I/A"],
    answer: 1, explanation: "単相2線式の電圧降下e=2ρLI/A（往復分で2倍）。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 配線設計・図記号 追加 (12問)
  // ============================
  {
    id: "hc-074", type: "choice", grade: 2, category: "wiring",
    question: "図記号「⊕」は何を表すか。",
    choices: ["照明器具", "コンセント", "スイッチ", "ジョイントボックス"],
    answer: 1, explanation: "⊕はコンセントを表す図記号。○は照明器具。", source: "hardcoded",
  },
  {
    id: "hc-075", type: "choice", grade: 2, category: "wiring",
    question: "接地極付きコンセントの図記号として正しいものはどれか。",
    choices: ["⊕", "⊕にEの添字", "○にEの添字", "□にEの添字"],
    answer: 1, explanation: "接地極付きコンセントは⊕にEの添字で表す。", source: "hardcoded",
  },
  {
    id: "hc-076", type: "truefalse", grade: 2, category: "wiring",
    question: "30A分岐回路では、直径2.6mm以上の電線を使用しなければならない。",

    answer: true, explanation: "30A分岐回路では直径2.6mm以上（断面積5.5mm²以上）の電線を使用する。", source: "hardcoded",
  },
  {
    id: "hc-077", type: "choice", grade: 2, category: "wiring",
    question: "VVFケーブル1.6mm 2芯の許容電流は約何Aか。",
    choices: ["13A", "19A", "24A", "33A"],
    answer: 1, explanation: "VVF1.6mm-2芯の許容電流は約19A。", source: "hardcoded",
  },
  {
    id: "hc-078", type: "choice", grade: 2, category: "wiring",
    question: "20A分岐回路で使用するコンセントは、定格何A以上何A以下か。",
    choices: ["15A以上20A以下", "20A", "10A以上20A以下", "15A"],
    answer: 0, explanation: "20A分岐回路のコンセントは定格15A以上20A以下のものを使用する。", source: "hardcoded",
  },
  {
    id: "hc-079", type: "choice", grade: 2, category: "wiring",
    question: "VVFケーブル2.0mm 3芯の許容電流は約何Aか。",
    choices: ["15A", "19A", "21A", "24A"],
    answer: 2, explanation: "VVF2.0mm-3芯の許容電流は約21A。芯数が増えると許容電流は下がる。", source: "hardcoded",
  },
  {
    id: "hc-080", type: "truefalse", grade: 2, category: "wiring",
    question: "引掛シーリングは天井に直付けする照明器具取付用の器具である。",

    answer: true, explanation: "引掛シーリング（ローゼット）は天井に取り付け、照明器具を引掛けて接続する器具。", source: "hardcoded",
  },
  {
    id: "hc-081", type: "choice", grade: 2, category: "wiring",
    question: "電線管内の電線本数が5〜6本の場合の電流減少係数はいくつか。",
    choices: ["0.49", "0.56", "0.63", "0.70"],
    answer: 1, explanation: "電線管内5〜6本の場合、電流減少係数は0.56。", source: "hardcoded",
  },
  {
    id: "hc-082", type: "choice", grade: 2, category: "wiring",
    question: "配線用遮断器の定格電流が30Aの分岐回路に接続できるコンセントの最大定格は何Aか。",
    choices: ["15A", "20A", "30A", "40A"],
    answer: 2, explanation: "30A分岐回路では20A以上30A以下のコンセントを使用する。", source: "hardcoded",
  },
  {
    id: "hc-083", type: "choice", grade: 2, category: "wiring",
    question: "100V15A分岐回路で、コンセントの総数に制限はあるか。",
    choices: ["3個まで", "5個まで", "10個まで", "制限なし"],
    answer: 3, explanation: "15A・20A分岐回路ではコンセントの個数に制限はない。ただし負荷容量の合計に注意が必要。", source: "hardcoded",
  },
  {
    id: "hc-084", type: "choice", grade: 2, category: "wiring",
    question: "防雨形コンセントの図記号で使用される添字はどれか。",
    choices: ["E", "LK", "WP", "T"],
    answer: 2, explanation: "WP（Weatherproof）は防雨形を表す添字。Eは接地極付き、LKは施錠形。", source: "hardcoded",
  },
  {
    id: "hc-085", type: "truefalse", grade: 2, category: "wiring",
    question: "単相3線式200Vの回路には、2極1素子の配線用遮断器を使用できる。",

    answer: false, explanation: "単相3線式200V回路には2極2素子の配線用遮断器を使用する。2極1素子は100V回路用。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 施工方法・工具 追加 (12問)
  // ============================
  {
    id: "hc-086", type: "choice", grade: 2, category: "construction",
    question: "リングスリーブの圧着マークが「○」となるのは、どの組み合わせか。",
    choices: ["1.6mm×2本", "1.6mm×3本", "1.6mm×4本", "2.0mm×2本"],
    answer: 0, explanation: "1.6mm×2本の場合は小スリーブで圧着マーク「○」。1.6mm×3〜4本は「小」。", source: "hardcoded",
  },
  {
    id: "hc-087", type: "choice", grade: 2, category: "construction",
    question: "差込形コネクタで接続する場合、電線の被覆を剥く長さはどれか。",
    choices: ["約10mm", "約12mm", "ストリップゲージに合わせる", "約20mm"],
    answer: 2, explanation: "差込形コネクタはストリップゲージに合わせて被覆を剥く（通常約12mm）。", source: "hardcoded",
  },
  {
    id: "hc-088", type: "truefalse", grade: 2, category: "construction",
    question: "合成樹脂管（VE管）工事は、屋内の隠ぺい場所および露出場所に施設できる。",

    answer: true, explanation: "VE管（硬質ビニル電線管）は自己消火性があり、隠ぺい・露出配管ともに使用可能。", source: "hardcoded",
  },
  {
    id: "hc-089", type: "choice", grade: 2, category: "construction",
    question: "アウトレットボックスの使用目的として正しいものはどれか。",
    choices: ["電線の分岐・接続", "電線の延長のみ", "配管の曲げ加工", "ケーブルの端末処理"],
    answer: 0, explanation: "アウトレットボックスは電線の引き入れ、分岐、接続および器具の取り付けに使用する。", source: "hardcoded",
  },
  {
    id: "hc-090", type: "choice", grade: 2, category: "construction",
    question: "金属管とボックスの接続に使用する部品はどれか。",
    choices: ["カップリング", "コネクタ（ボックスコネクタ）", "サドル", "ステップル"],
    answer: 1, explanation: "ボックスコネクタは金属管とアウトレットボックスを接続するための金具。", source: "hardcoded",
  },
  {
    id: "hc-091", type: "choice", grade: 2, category: "construction",
    question: "ケーブル工事でVVFケーブルを曲げる場合、曲げ半径は外径の何倍以上か。",
    choices: ["3倍", "6倍", "8倍", "10倍"],
    answer: 1, explanation: "VVFケーブルの曲げ半径は外径の6倍以上とする。", source: "hardcoded",
  },
  {
    id: "hc-092", type: "truefalse", grade: 2, category: "construction",
    question: "電線と電線の接続部分は、電線の引張強さの20%以上に低下してはならない。",

    answer: false, explanation: "接続部分の電線の引張強さは、接続前の80%以上（つまり20%以上の低下は不可）が要求される。正しくは「20%以上低下させてはならない」。", source: "hardcoded",
  },
  {
    id: "hc-093", type: "choice", grade: 2, category: "construction",
    question: "金属管工事でボンド線を取り付ける目的はどれか。",
    choices: ["管の固定", "管の電気的接続（接地の確保）", "管の防水", "管の保温"],
    answer: 1, explanation: "ボンド線は金属管相互の電気的接続を確保し、接地の連続性を保つために取り付ける。", source: "hardcoded",
  },
  {
    id: "hc-094", type: "choice", grade: 2, category: "construction",
    question: "ホルソーの用途はどれか。",
    choices: ["電線管の切断", "ボックスの穴あけ", "電線の被覆剥ぎ", "ねじの切断"],
    answer: 1, explanation: "ホルソーは金属板やボックスに大きな穴をあけるための工具。", source: "hardcoded",
  },
  {
    id: "hc-095", type: "choice", grade: 2, category: "construction",
    question: "リングスリーブの大スリーブを使用するのはどの組み合わせか。",
    choices: ["1.6mm×2本", "1.6mm×4本", "2.0mm×2本", "2.0mm×3本と1.6mm×1本"],
    answer: 3, explanation: "大スリーブは電線の断面積の合計が8mm²を超える場合に使用。2.0mm×3本+1.6mm×1本=11.42mm²。", source: "hardcoded",
  },
  {
    id: "hc-096", type: "choice", grade: 2, category: "construction",
    question: "埋込連用取付枠に取り付けられる器具の最大個数は何個か。",
    choices: ["2個", "3個", "4個", "5個"],
    answer: 1, explanation: "埋込連用取付枠には最大3個まで器具を取り付けられる。", source: "hardcoded",
  },
  {
    id: "hc-097", type: "truefalse", grade: 2, category: "construction",
    question: "天井内のジョイントボックスでの電線接続は、リングスリーブまたは差込形コネクタで行う。",

    answer: true, explanation: "ジョイントボックス内では、リングスリーブによる圧着接続または差込形コネクタによる接続が認められている。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 法規 追加 (12問)
  // ============================
  {
    id: "hc-098", type: "choice", grade: 2, category: "regulation",
    question: "電気工事士免状を取得せずに電気工事を行った場合の罰則はどれか。",
    choices: ["10万円以下の罰金", "30万円以下の罰金又は3月以下の懲役", "50万円以下の罰金", "100万円以下の罰金"],
    answer: 1, explanation: "無資格で電気工事を行った場合、3月以下の懲役又は30万円以下の罰金。", source: "hardcoded",
  },
  {
    id: "hc-099", type: "truefalse", grade: 2, category: "regulation",
    question: "電気工事士は、工事完了後に配線図を保存する義務がある。",

    answer: false, explanation: "電気工事士法では配線図の保存義務は定められていない。電気設備技術基準に適合した施工の義務がある。", source: "hardcoded",
  },
  {
    id: "hc-100", type: "choice", grade: 2, category: "regulation",
    question: "使用電圧が300V以下の金属製外箱に施すべき接地工事の種類はどれか。",
    choices: ["A種", "B種", "C種", "D種"],
    answer: 3, explanation: "300V以下の機器の金属製外箱にはD種接地工事（100Ω以下）を施す。", source: "hardcoded",
  },
  {
    id: "hc-200", type: "choice", grade: 2, category: "regulation",
    question: "接地抵抗を測定する計器はどれか。",
    choices: ["クランプメーター", "絶縁抵抗計", "接地抵抗計", "回路計"],
    answer: 2, explanation: "接地抵抗の測定には接地抵抗計（アーステスター）を使用する。", source: "hardcoded",
  },
  {
    id: "hc-201", type: "choice", grade: 2, category: "regulation",
    question: "電気用品安全法の「PSE」マークのうち、特定電気用品のマーク形状はどれか。",
    choices: ["丸形", "菱形", "三角形", "四角形"],
    answer: 1, explanation: "特定電気用品は菱形のPSEマーク。特定電気用品以外は丸形のPSEマーク。", source: "hardcoded",
  },
  {
    id: "hc-202", type: "truefalse", grade: 2, category: "regulation",
    question: "電気工事士免状の交付は都道府県知事が行う。",

    answer: true, explanation: "電気工事士免状は都道府県知事が交付する。", source: "hardcoded",
  },
  {
    id: "hc-203", type: "choice", grade: 2, category: "regulation",
    question: "低圧屋内配線の絶縁抵抗測定に使用する測定器の定格測定電圧は何Vか（対地電圧150V以下の場合）。",
    choices: ["25V", "50V", "125V", "250V"],
    answer: 2, explanation: "対地電圧150V以下の場合、125Vの絶縁抵抗計を使用する。", source: "hardcoded",
  },
  {
    id: "hc-204", type: "choice", grade: 2, category: "regulation",
    question: "D種接地工事で、漏電遮断器（動作時間0.5秒以内）を設置した場合の接地抵抗値は何Ω以下に緩和されるか。",
    choices: ["100Ω", "200Ω", "300Ω", "500Ω"],
    answer: 3, explanation: "D種接地工事は原則100Ω以下だが、0.5秒以内に動作する漏電遮断器設置時は500Ω以下に緩和される。", source: "hardcoded",
  },
  {
    id: "hc-205", type: "choice", grade: 2, category: "regulation",
    question: "配線用遮断器の極数と素子数の表記で「2P1E」の意味はどれか。",
    choices: ["2極1素子", "2極2素子", "1極2素子", "1極1素子"],
    answer: 0, explanation: "2P1E=2極（Pole）1素子（Element）。単相2線式100V回路に使用。", source: "hardcoded",
  },
  {
    id: "hc-206", type: "truefalse", grade: 2, category: "regulation",
    question: "浴室の照明器具は防湿形でなければならない。",

    answer: true, explanation: "浴室等の湿気の多い場所では防湿形の照明器具を使用する義務がある。", source: "hardcoded",
  },
  {
    id: "hc-207", type: "choice", grade: 2, category: "regulation",
    question: "金属管工事、金属可とう管工事で省略できない接地工事はどれか。",
    choices: ["A種", "B種", "C種", "D種"],
    answer: 3, explanation: "金属管等の金属製電線管にはD種接地工事が必要。ただし一定の条件を満たせば省略可能な場合もある。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 鑑別 追加 (12問)
  // ============================
  {
    id: "hc-208", type: "choice", grade: 2, category: "identification",
    question: "露出形スイッチとは異なり、壁面に埋め込んで取り付けるスイッチの名称はどれか。",
    choices: ["タンブラスイッチ", "埋込形スイッチ", "ロータリースイッチ", "プルスイッチ"],
    answer: 1, explanation: "埋込形スイッチは壁面の取付枠に埋め込んで施設するスイッチ。住宅で一般的に使用される。", source: "hardcoded",
  },
  {
    id: "hc-209", type: "choice", grade: 2, category: "identification",
    question: "電線管を造営材に固定するために使用する金具はどれか。",
    choices: ["サドル", "カップリング", "ノーマルベンド", "ブッシング"],
    answer: 0, explanation: "サドルは電線管を壁や天井等の造営材に固定するための金具。", source: "hardcoded",
  },
  {
    id: "hc-210", type: "choice", grade: 2, category: "identification",
    question: "VVRケーブルの「R」は何を意味するか。",
    choices: ["丸形（Round）", "補強（Reinforced）", "耐熱（Resistant）", "柔軟（Rubber）"],
    answer: 0, explanation: "VVR=ビニル絶縁ビニルシースケーブル丸形。Rは丸形（Round）を意味する。VVFのFはFlat（平形）。", source: "hardcoded",
  },
  {
    id: "hc-211", type: "truefalse", grade: 2, category: "identification",
    question: "接地抵抗計（アーステスター）は補助接地棒2本を使用して測定する。",

    answer: true, explanation: "接地抵抗計は被測定接地極と補助接地棒2本（P極、C極）の合計3点を使用して測定する。", source: "hardcoded",
  },
  {
    id: "hc-212", type: "choice", grade: 2, category: "identification",
    question: "EM-EEFケーブル（エコケーブル）の特徴として正しいものはどれか。",
    choices: ["ビニル絶縁である", "燃焼時にハロゲンガスを出さない", "高圧用ケーブルである", "鋼帯で補強されている"],
    answer: 1, explanation: "EM-EEF（エコマテリアルケーブル）は燃焼時に有害なハロゲンガスやダイオキシンを発生しない環境配慮型ケーブル。", source: "hardcoded",
  },
  {
    id: "hc-213", type: "choice", grade: 2, category: "identification",
    question: "写真に示すような丸い開口部をもち、電線管を相互に接続するための金属製の箱は何か。",
    choices: ["アウトレットボックス", "プルボックス", "ジョイントボックス", "スイッチボックス"],
    answer: 0, explanation: "アウトレットボックスは金属製の箱で、電線管の接続、電線の分岐・接続、器具の取り付けに使用する。", source: "hardcoded",
  },
  {
    id: "hc-214", type: "choice", grade: 2, category: "identification",
    question: "ねじなし電線管（E管）の色は一般的に何色か。",
    choices: ["黒色", "灰色", "銀色（亜鉛メッキ）", "オレンジ色"],
    answer: 2, explanation: "ねじなし電線管（E管）は亜鉛メッキ鋼管で銀色。C管（厚鋼電線管）も同様。", source: "hardcoded",
  },
  {
    id: "hc-215", type: "truefalse", grade: 2, category: "identification",
    question: "テストボタン付きの漏電遮断器は、テストボタンを押すと動作確認ができる。",

    answer: true, explanation: "漏電遮断器のテストボタンは擬似的に漏電状態を作り、正常に動作するか確認するためのもの。月1回の動作確認が推奨。", source: "hardcoded",
  },
  {
    id: "hc-216", type: "choice", grade: 2, category: "identification",
    question: "電線をねじ止めで接続するための端子台の名称はどれか。",
    choices: ["リングスリーブ", "端子台（端子ブロック）", "差込形コネクタ", "ジョイントボックス"],
    answer: 1, explanation: "端子台はねじ止めにより電線を接続する器具。分電盤内や制御盤内で使用される。", source: "hardcoded",
  },
  {
    id: "hc-217", type: "choice", grade: 2, category: "identification",
    question: "カットアウトスイッチ（ヒューズ付き開閉器）の主な用途はどれか。",
    choices: ["電動機の制御", "電灯回路の開閉と過電流保護", "接地抵抗の測定", "電圧の調整"],
    answer: 1, explanation: "カットアウトスイッチはヒューズを内蔵した開閉器で、電灯回路等の開閉と過電流保護に使用する。", source: "hardcoded",
  },
  {
    id: "hc-218", type: "choice", grade: 2, category: "identification",
    question: "位置表示灯内蔵スイッチ（パイロットスイッチ）の特徴はどれか。",
    choices: ["OFF時に点灯する", "ON時に点灯する", "常に点灯している", "自動で消灯する"],
    answer: 1, explanation: "パイロットスイッチはON時に表示灯が点灯し、換気扇等の動作状態を確認できる。OFF時点灯はほたるスイッチ。", source: "hardcoded",
  },
  {
    id: "hc-219", type: "choice", grade: 2, category: "identification",
    question: "200V用コンセントの刃受けの形状として正しいものはどれか。",
    choices: ["平行な2本の刃受け", "T字形の刃受け", "L字形の刃受け", "丸形の刃受け"],
    answer: 1, explanation: "単相200V15A用コンセントはT字形（タンデム形）の刃受け。100V用は平行な刃受け。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 電気理論 追加2 (15問)
  // ============================
  {
    id: "hc-220", type: "choice", grade: 2, category: "theory",
    question: "三相3線式200Vの電源で、1相当たりの負荷が10Aのとき、三相電力は約何kWか。ただし力率は100%とする。",
    choices: ["2kW", "3.46kW", "4kW", "6kW"],
    answer: 1, explanation: "P=√3×V×I×cosθ=√3×200×10×1≒3460W≒3.46kW", source: "hardcoded",
  },
  {
    id: "hc-221", type: "choice", grade: 2, category: "theory",
    question: "三相交流の相順（相回転）がR-S-Tのとき、各相の位相差は何度か。",
    choices: ["90°", "120°", "180°", "240°"],
    answer: 1, explanation: "三相交流は各相が120°（2π/3ラジアン）ずつ位相がずれている。", source: "hardcoded",
  },
  {
    id: "hc-222", type: "choice", grade: 2, category: "theory",
    question: "フレミングの左手の法則で、中指が示すものはどれか。",
    choices: ["力の方向", "磁界の方向", "電流の方向", "電圧の方向"],
    answer: 2, explanation: "フレミング左手の法則：親指=力（F）、人差し指=磁界（B）、中指=電流（I）。電動機の原理。", source: "hardcoded",
  },
  {
    id: "hc-223", type: "choice", grade: 2, category: "theory",
    question: "フレミングの右手の法則は、何の原理を示すか。",
    choices: ["電動機（モーター）", "発電機", "変圧器", "整流器"],
    answer: 1, explanation: "フレミング右手の法則は発電機の原理。左手の法則は電動機の原理を示す。", source: "hardcoded",
  },
  {
    id: "hc-224", type: "choice", grade: 2, category: "theory",
    question: "ダイオードの特性として正しいものはどれか。",
    choices: ["交流を通す", "電流を一方向のみ流す", "電圧を一定にする", "電流を増幅する"],
    answer: 1, explanation: "ダイオードは半導体素子で、電流を一方向にのみ流す整流作用がある。", source: "hardcoded",
  },
  {
    id: "hc-225", type: "truefalse", grade: 2, category: "theory",
    question: "LEDは発光ダイオードの略称であり、順方向に電圧を加えると発光する。",
    answer: true, explanation: "LED（Light Emitting Diode）は順方向電圧を印加すると発光する半導体素子。", source: "hardcoded",
  },
  {
    id: "hc-226", type: "choice", grade: 2, category: "theory",
    question: "ホイートストンブリッジ回路は何を測定するために使用されるか。",
    choices: ["電圧", "電流", "抵抗", "電力"],
    answer: 2, explanation: "ホイートストンブリッジは未知の抵抗値を精密に測定するための回路。", source: "hardcoded",
  },
  {
    id: "hc-227", type: "choice", grade: 2, category: "theory",
    question: "電磁誘導に関するファラデーの法則で、誘導起電力の大きさに関係しないものはどれか。",
    choices: ["コイルの巻数", "磁束の変化の速さ", "コイルの抵抗", "磁束の変化量"],
    answer: 2, explanation: "誘導起電力e=-NΔΦ/Δt。巻数Nと磁束変化の速さΔΦ/Δtに比例する。コイルの抵抗は無関係。", source: "hardcoded",
  },
  {
    id: "hc-228", type: "choice", grade: 2, category: "theory",
    question: "分流器（シャント）は何の測定範囲を拡大するために使用されるか。",
    choices: ["電圧計", "電流計", "抵抗計", "電力計"],
    answer: 1, explanation: "分流器は電流計に並列に接続し、測定可能な電流範囲を拡大するために使用する。", source: "hardcoded",
  },
  {
    id: "hc-229", type: "choice", grade: 2, category: "theory",
    question: "倍率器は何の測定範囲を拡大するために使用されるか。",
    choices: ["電圧計", "電流計", "抵抗計", "電力計"],
    answer: 0, explanation: "倍率器は電圧計に直列に接続し、測定可能な電圧範囲を拡大するために使用する。", source: "hardcoded",
  },
  {
    id: "hc-230", type: "truefalse", grade: 2, category: "theory",
    question: "単相3線式の中性線に流れる電流は、両側の負荷が平衡しているとき零になる。",
    answer: true, explanation: "単相3線式では両側の負荷が等しい（平衡）とき、中性線の電流は打ち消し合って零になる。", source: "hardcoded",
  },
  {
    id: "hc-231", type: "choice", grade: 2, category: "theory",
    question: "6μFと3μFのコンデンサを直列に接続した場合の合成静電容量はいくつか。",
    choices: ["1μF", "2μF", "4.5μF", "9μF"],
    answer: 1, explanation: "直列合成C=(C₁×C₂)/(C₁+C₂)=(6×3)/(6+3)=2μF。コンデンサの直列は抵抗の並列と同じ計算。", source: "hardcoded",
  },
  {
    id: "hc-232", type: "choice", grade: 2, category: "theory",
    question: "10Ωの抵抗に5Aの電流を30秒間流したとき、発生する熱量は何Jか。",
    choices: ["250J", "1500J", "7500J", "15000J"],
    answer: 2, explanation: "Q=I²Rt=5²×10×30=25×10×30=7500J", source: "hardcoded",
  },
  {
    id: "hc-233", type: "choice", grade: 2, category: "theory",
    question: "電気抵抗の温度係数が正の材料はどれか。",
    choices: ["半導体", "絶縁体", "導体（銅・アルミ）", "超電導体"],
    answer: 2, explanation: "銅やアルミ等の導体は温度が上がると抵抗が増加する（正の温度係数）。半導体は負の温度係数。", source: "hardcoded",
  },
  {
    id: "hc-234", type: "truefalse", grade: 2, category: "theory",
    question: "コイルのみの交流回路では、電流は電圧より90°進む。",
    answer: false, explanation: "コイル（インダクタンス）のみの回路では、電流は電圧より90°遅れる。コンデンサのみの場合は90°進む。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 配線設計・図記号 追加2 (15問)
  // ============================
  {
    id: "hc-235", type: "choice", grade: 2, category: "wiring",
    question: "単線図から複線図に書き換える際、最初に結線すべきものはどれか。",
    choices: ["スイッチの配線", "コンセントの配線", "接地側電線（白線）", "非接地側電線（黒線）"],
    answer: 2, explanation: "複線図では①接地側（白線）②非接地側（黒線）③スイッチの返り線の順で結線するのが基本。", source: "hardcoded",
  },
  {
    id: "hc-236", type: "choice", grade: 2, category: "wiring",
    question: "複線図で、スイッチから照明器具への渡り線は何色を使うか。",
    choices: ["白色", "黒色", "赤色または黒色（どちらでもよい）", "緑色"],
    answer: 2, explanation: "スイッチの返り線（渡り線）は非接地側なので黒色が原則だが、3芯ケーブルの場合は赤色も使用する。", source: "hardcoded",
  },
  {
    id: "hc-237", type: "choice", grade: 2, category: "wiring",
    question: "需要率の計算式として正しいものはどれか。",
    choices: ["最大需要電力÷設備容量×100%", "平均需要電力÷最大需要電力×100%", "設備容量÷最大需要電力×100%", "契約電力÷設備容量×100%"],
    answer: 0, explanation: "需要率(%)=最大需要電力/設備容量の合計×100。通常100%以下。", source: "hardcoded",
  },
  {
    id: "hc-238", type: "choice", grade: 2, category: "wiring",
    question: "負荷率の計算式として正しいものはどれか。",
    choices: ["最大需要電力÷設備容量×100%", "平均需要電力÷最大需要電力×100%", "設備容量÷契約電力×100%", "最小電力÷最大電力×100%"],
    answer: 1, explanation: "負荷率(%)=平均需要電力/最大需要電力×100。負荷率が高いほど設備の有効利用度が高い。", source: "hardcoded",
  },
  {
    id: "hc-239", type: "choice", grade: 2, category: "wiring",
    question: "図記号「◇」は何を表すか。",
    choices: ["コンセント", "スイッチ", "照明器具", "配線用遮断器"],
    answer: 3, explanation: "◇は配線用遮断器（ブレーカー）を表す図記号。", source: "hardcoded",
  },
  {
    id: "hc-240", type: "choice", grade: 2, category: "wiring",
    question: "漏電遮断器の図記号はどれか。",
    choices: ["◇", "◇にEの添字", "◇の中に点", "BE"],
    answer: 2, explanation: "漏電遮断器は◇の中に点（●）を付けた記号で表す。", source: "hardcoded",
  },
  {
    id: "hc-241", type: "truefalse", grade: 2, category: "wiring",
    question: "電磁開閉器の図記号にはMSと表記される。",
    answer: true, explanation: "電磁開閉器はMS（Magnetic Switch）で表記される。MCは電磁接触器。", source: "hardcoded",
  },
  {
    id: "hc-242", type: "choice", grade: 2, category: "wiring",
    question: "幹線の太さを選定する場合、考慮すべき電動機負荷の定格電流の合計が50Aを超えるとき、幹線の許容電流は定格電流合計の何倍以上必要か。",
    choices: ["1.0倍", "1.1倍", "1.25倍", "1.5倍"],
    answer: 2, explanation: "電動機負荷が50A超の場合、幹線の許容電流は定格電流の合計の1.25倍以上（+他の負荷電流）が必要。", source: "hardcoded",
  },
  {
    id: "hc-243", type: "choice", grade: 2, category: "wiring",
    question: "IV電線直径2.0mmの許容電流は約何Aか。（周囲温度30℃）",
    choices: ["19A", "27A", "35A", "48A"],
    answer: 2, explanation: "IV線2.0mmの許容電流は35A。1.6mmは27A、2.6mmは48A。", source: "hardcoded",
  },
  {
    id: "hc-244", type: "choice", grade: 2, category: "wiring",
    question: "IV電線直径2.6mmの許容電流は約何Aか。（周囲温度30℃）",
    choices: ["27A", "35A", "48A", "62A"],
    answer: 2, explanation: "IV線2.6mmの許容電流は48A。覚え方：1.6mm=27A, 2.0mm=35A, 2.6mm=48A。", source: "hardcoded",
  },
  {
    id: "hc-245", type: "truefalse", grade: 2, category: "wiring",
    question: "分岐回路の配線用遮断器の定格電流は、分岐回路の電線の許容電流以下でなければならない。",
    answer: false, explanation: "配線用遮断器の定格電流は、電線の許容電流以下でなくてよい。ただし電線の許容電流が遮断器定格の55%以上であること等の条件がある。", source: "hardcoded",
  },
  {
    id: "hc-246", type: "choice", grade: 2, category: "wiring",
    question: "VVFケーブル1.6mm 3芯の許容電流は約何Aか。",
    choices: ["13A", "17A", "19A", "24A"],
    answer: 1, explanation: "VVF1.6mm-3芯の許容電流は約17A。2芯の場合は19A。芯数が多いと許容電流が下がる。", source: "hardcoded",
  },
  {
    id: "hc-247", type: "choice", grade: 2, category: "wiring",
    question: "接地側電線に使用してはならない色はどれか。",
    choices: ["白色", "灰色", "黒色", "水色"],
    answer: 2, explanation: "黒色は非接地側電線に使用する。接地側電線は白色または灰色を使用する。", source: "hardcoded",
  },
  {
    id: "hc-248", type: "choice", grade: 2, category: "wiring",
    question: "100V15A分岐回路に接続できる固定器具（照明等）の合計容量の上限は何VAか。",
    choices: ["1000VA", "1500VA", "2000VA", "制限なし"],
    answer: 1, explanation: "15A分岐回路では固定器具の合計容量は1500VA以下。V×A=100×15=1500VA。", source: "hardcoded",
  },
  {
    id: "hc-249", type: "choice", grade: 2, category: "wiring",
    question: "単相3線式の中性線が断線した場合に起こる現象はどれか。",
    choices: ["全ての負荷に電流が流れなくなる", "軽い側の負荷に過電圧がかかる", "重い側の負荷に過電圧がかかる", "何も変化しない"],
    answer: 1, explanation: "中性線断線時、負荷の軽い側に過電圧がかかり機器が故障する危険がある。中性線には遮断器を入れてはならない理由の一つ。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 施工方法・工具 追加2 (15問)
  // ============================
  {
    id: "hc-250", type: "choice", grade: 2, category: "construction",
    question: "ランプレセプタクルに電線を接続するとき、のの字曲げ（輪作り）のねじ締めの方向はどちらか。",
    choices: ["時計回り（右回り）", "反時計回り（左回り）", "どちらでもよい", "ねじ締めの方向と反対"],
    answer: 0, explanation: "のの字曲げはねじの締付け方向（時計回り）に輪を作る。逆方向だと締付け時に電線が外れる。", source: "hardcoded",
  },
  {
    id: "hc-251", type: "choice", grade: 2, category: "construction",
    question: "ランプレセプタクルの受金ねじ部に接続すべき電線はどちらか。",
    choices: ["非接地側（黒線）", "接地側（白線）", "どちらでもよい", "接地線（緑線）"],
    answer: 1, explanation: "受金（外側のねじ部）には接地側電線（白線）を接続する。感電防止のため、触れやすい受金側を接地側にする。", source: "hardcoded",
  },
  {
    id: "hc-252", type: "choice", grade: 2, category: "construction",
    question: "露出形コンセントに電線を接続するとき、絶縁被覆のむき過ぎによる欠陥はどれか。",
    choices: ["接続不良", "心線の露出（絶縁不良）", "電圧降下", "器具の破損"],
    answer: 1, explanation: "被覆のむき過ぎは心線の露出（充電部露出）となり、技能試験では重大欠陥（不合格）となる。", source: "hardcoded",
  },
  {
    id: "hc-253", type: "truefalse", grade: 2, category: "construction",
    question: "金属線ぴ工事は、乾燥した場所の点検できる隠ぺい場所と露出場所に施設できる。",
    answer: true, explanation: "金属線ぴ工事は乾燥した点検可能な隠ぺい場所と露出場所に施設できる。湿気の多い場所には不適。", source: "hardcoded",
  },
  {
    id: "hc-254", type: "choice", grade: 2, category: "construction",
    question: "ライティングダクト工事の施設場所として正しいものはどれか。",
    choices: ["屋外", "湿気の多い場所", "乾燥した露出場所", "コンクリート埋設"],
    answer: 2, explanation: "ライティングダクトは乾燥した露出場所に施設する。ショールーム等の照明器具の位置を自由に変えたい場所で使用。", source: "hardcoded",
  },
  {
    id: "hc-255", type: "choice", grade: 2, category: "construction",
    question: "フロアダクト工事の主な施設場所はどこか。",
    choices: ["天井裏", "壁面", "床面（コンクリート埋設）", "屋外"],
    answer: 2, explanation: "フロアダクトはコンクリートの床面に埋設して施設する。オフィスビルの床下配線に使用される。", source: "hardcoded",
  },
  {
    id: "hc-256", type: "choice", grade: 2, category: "construction",
    question: "がいし引き工事を施設できる場所はどれか。",
    choices: ["コンクリートの壁面", "金属管内", "展開した場所（露出場所）", "天井裏の隠ぺい場所"],
    answer: 2, explanation: "がいし引き工事は展開した場所（開けた露出場所）のみに施設できる。木造家屋の屋内等で使用。", source: "hardcoded",
  },
  {
    id: "hc-257", type: "truefalse", grade: 2, category: "construction",
    question: "ケーブル工事は、低圧屋内配線のすべての場所（展開した場所、隠ぺい場所、湿気の多い場所）に施設できる。",
    answer: true, explanation: "ケーブル工事は最も汎用性が高く、展開・隠ぺい・湿気のある場所すべてに施設できる。", source: "hardcoded",
  },
  {
    id: "hc-258", type: "choice", grade: 2, category: "construction",
    question: "電線の接続部分の抵抗は、接続前と比べてどうでなければならないか。",
    choices: ["同等以上に大きい", "2倍以上", "増加してはならない", "制限なし"],
    answer: 2, explanation: "接続部分の電気抵抗を増加させてはならない。接続不良は発熱・火災の原因となる。", source: "hardcoded",
  },
  {
    id: "hc-259", type: "choice", grade: 2, category: "construction",
    question: "電工ナイフの主な用途はどれか。",
    choices: ["電線管の切断", "ケーブルの外装被覆の剥ぎ取り", "電線の圧着", "ねじの締め付け"],
    answer: 1, explanation: "電工ナイフはケーブルの外装被覆やIV線の絶縁被覆を剥ぎ取る工具。VVFストリッパーが普及した現在も使用される。", source: "hardcoded",
  },
  {
    id: "hc-260", type: "choice", grade: 2, category: "construction",
    question: "リングスリーブ「中」を使用する電線の組み合わせとして正しいものはどれか。",
    choices: ["1.6mm×2本", "1.6mm×5本〜6本", "2.0mm×1本と1.6mm×1本", "2.0mm×4本"],
    answer: 1, explanation: "中スリーブは断面積の合計が小スリーブの範囲を超え8mm²以下の場合に使用。1.6mm×5〜6本等。", source: "hardcoded",
  },
  {
    id: "hc-261", type: "choice", grade: 2, category: "construction",
    question: "合成樹脂管（VE管）を曲げる場合の方法はどれか。",
    choices: ["パイプベンダーで曲げる", "トーチランプ等で加熱して曲げる", "そのまま手で曲げる", "曲げてはならない"],
    answer: 1, explanation: "VE管（硬質塩化ビニル電線管）はトーチランプ等で加熱して軟化させてから曲げる。", source: "hardcoded",
  },
  {
    id: "hc-262", type: "truefalse", grade: 2, category: "construction",
    question: "低圧屋内配線で、ビニルテープのみによる電線の接続は認められていない。",
    answer: true, explanation: "電線の接続はリングスリーブや差込形コネクタ等の接続器具を使用する。ビニルテープのみの接続は不可。絶縁テープは接続後の絶縁処理に使用。", source: "hardcoded",
  },
  {
    id: "hc-263", type: "choice", grade: 2, category: "construction",
    question: "C種接地工事の接地抵抗値は何Ω以下か。",
    choices: ["10Ω", "50Ω", "100Ω", "500Ω"],
    answer: 0, explanation: "C種接地工事は10Ω以下。300V超の低圧機器の金属製外箱に施す。漏電遮断器設置時は500Ω以下に緩和。", source: "hardcoded",
  },
  {
    id: "hc-264", type: "choice", grade: 2, category: "construction",
    question: "B種接地工事が必要な箇所はどれか。",
    choices: ["高圧機器の外箱", "変圧器の低圧側中性点", "300V以下の機器外箱", "避雷器"],
    answer: 1, explanation: "B種接地工事は変圧器の低圧側中性点（または1端子）に施す。高低圧混触時の低圧側電圧上昇を抑制する。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 法規 追加2 (15問)
  // ============================
  {
    id: "hc-265", type: "choice", grade: 2, category: "regulation",
    question: "漏電遮断器の定格感度電流が30mAのものは、何を目的として設置されるか。",
    choices: ["過電流保護", "短絡保護", "感電保護", "過電圧保護"],
    answer: 2, explanation: "定格感度電流30mAの漏電遮断器は人体への感電保護を主目的とする。人体に危険な電流は約50mA。", source: "hardcoded",
  },
  {
    id: "hc-266", type: "choice", grade: 2, category: "regulation",
    question: "漏電遮断器の動作時間が0.1秒以内のものの種類はどれか。",
    choices: ["時延形", "反限時形", "高速形", "定限時形"],
    answer: 2, explanation: "高速形は動作時間0.1秒以内。人体の感電保護には高速形が適している。", source: "hardcoded",
  },
  {
    id: "hc-267", type: "truefalse", grade: 2, category: "regulation",
    question: "電気工事業を営もうとする者は、都道府県知事の登録を受けなければならない。",
    answer: true, explanation: "電気工事業法により、電気工事業を営む者は都道府県知事（2以上の都道府県の場合は経済産業大臣）に登録が必要。", source: "hardcoded",
  },
  {
    id: "hc-268", type: "choice", grade: 2, category: "regulation",
    question: "一般用電気工作物の竣工検査は誰が行うか。",
    choices: ["電気工事士", "電力会社", "都道府県知事", "設置者（届出不要）"],
    answer: 3, explanation: "一般用電気工作物は自家用と異なり、設置者が自主的に検査を行えばよく、届出は不要。電力会社の調査はある。", source: "hardcoded",
  },
  {
    id: "hc-269", type: "choice", grade: 2, category: "regulation",
    question: "一般用電気工作物の調査（定期調査）を行うのはどこか。",
    choices: ["経済産業省", "電力会社等の登録調査機関", "電気工事士", "都道府県知事"],
    answer: 1, explanation: "一般用電気工作物は電力会社等の登録調査機関が定期的に調査する。4年に1回以上。", source: "hardcoded",
  },
  {
    id: "hc-270", type: "choice", grade: 2, category: "regulation",
    question: "特定電気用品以外の電気用品に表示されるPSEマークの形状はどれか。",
    choices: ["菱形", "丸形", "三角形", "四角形"],
    answer: 1, explanation: "特定電気用品以外は丸形のPSEマーク。特定電気用品は菱形。電気スタンド等は丸形PSE。", source: "hardcoded",
  },
  {
    id: "hc-271", type: "truefalse", grade: 2, category: "regulation",
    question: "配線用遮断器、漏電遮断器は特定電気用品に該当する。",
    answer: true, explanation: "配線用遮断器、漏電遮断器は特定電気用品に該当し、菱形PSEマークと登録検査機関名の表示が必要。", source: "hardcoded",
  },
  {
    id: "hc-272", type: "choice", grade: 2, category: "regulation",
    question: "電気工事士が工事中に電線を損傷した場合の義務はどれか。",
    choices: ["報告書を提出する", "速やかに修復する", "検査機関に通報する", "特に義務はない"],
    answer: 1, explanation: "電気工事士は工事中に損傷を発見した場合、速やかに修復しなければならない（技術基準適合義務）。", source: "hardcoded",
  },
  {
    id: "hc-273", type: "choice", grade: 2, category: "regulation",
    question: "住宅の屋内に施設する電路で、対地電圧が150Vを超えることが認められるのはどの場合か。",
    choices: ["すべての場合で不可", "200V回路で専用の遮断器と接地極付きコンセントを使用する場合", "エアコン専用回路の場合のみ", "分電盤内のみ"],
    answer: 1, explanation: "定格消費電力2kW以上の機器で、専用回路・接地極付きコンセント・漏電遮断器の設置等の条件を満たせば対地電圧150V超が可能。", source: "hardcoded",
  },
  {
    id: "hc-274", type: "choice", grade: 2, category: "regulation",
    question: "単相3線式回路の中性線に設けてはならないものはどれか。",
    choices: ["接地工事", "ヒューズや遮断器", "電流計", "電線管"],
    answer: 1, explanation: "中性線にはヒューズや遮断器を設けてはならない。中性線が断線すると負荷に過電圧がかかる危険がある。", source: "hardcoded",
  },
  {
    id: "hc-275", type: "truefalse", grade: 2, category: "regulation",
    question: "電気工事士免状を他人に貸与することは禁止されている。",
    answer: true, explanation: "電気工事士法により、免状の貸与、不正使用は禁止されている。違反した場合は免状の返納を命じられることがある。", source: "hardcoded",
  },
  {
    id: "hc-276", type: "choice", grade: 2, category: "regulation",
    question: "使用電圧200Vの屋内配線の絶縁抵抗測定に使用する絶縁抵抗計の定格測定電圧はどれか。",
    choices: ["125V", "250V", "500V", "1000V"],
    answer: 2, explanation: "対地電圧150V超300V以下の場合、250Vの絶縁抵抗計を使用する。150V以下は125V。", source: "hardcoded",
  },
  {
    id: "hc-277", type: "choice", grade: 2, category: "regulation",
    question: "電気設備技術基準で「低圧」に分類される直流の電圧範囲はどれか。",
    choices: ["600V以下", "750V以下", "1000V以下", "1500V以下"],
    answer: 1, explanation: "低圧は交流600V以下、直流750V以下。交流と直流で上限値が異なる点に注意。", source: "hardcoded",
  },
  {
    id: "hc-278", type: "choice", grade: 2, category: "regulation",
    question: "水気のある場所に設置するコンセントに必要な措置はどれか。",
    choices: ["防雨形にする", "漏電遮断器を設置する", "使用しない", "カバーを付ける"],
    answer: 1, explanation: "水気のある場所のコンセントには漏電遮断器（定格感度電流15mA以下、動作時間0.1秒以下が望ましい）の設置が必要。", source: "hardcoded",
  },
  {
    id: "hc-279", type: "truefalse", grade: 2, category: "regulation",
    question: "エアコンの室内機と室外機を結ぶ配線工事は、電気工事士でなければできない。",
    answer: true, explanation: "エアコン接続は電気工事に該当し、電気工事士の資格が必要。ただし、コンセントに差し込むだけの場合は不要。", source: "hardcoded",
  },

  // ============================
  // 第二種 - 鑑別 追加2 (15問)
  // ============================
  {
    id: "hc-280", type: "choice", grade: 2, category: "identification",
    question: "圧着ペンチの柄が黄色のものは、何用か。",
    choices: ["裸圧着端子・裸スリーブ専用", "リングスリーブ専用", "絶縁被覆付き端子専用", "汎用"],
    answer: 1, explanation: "黄色の柄はリングスリーブ専用の圧着ペンチ。赤色は裸圧着端子用。JIS適合品を使用すること。", source: "hardcoded",
  },
  {
    id: "hc-281", type: "choice", grade: 2, category: "identification",
    question: "プルスイッチの操作方法はどれか。",
    choices: ["レバーを上下する", "紐（ひも）を引いて操作する", "ボタンを押す", "つまみを回す"],
    answer: 1, explanation: "プルスイッチは紐（ひも）を引いて照明等のON/OFFを操作するスイッチ。天井付近に設置される。", source: "hardcoded",
  },
  {
    id: "hc-282", type: "choice", grade: 2, category: "identification",
    question: "タイムスイッチの機能はどれか。",
    choices: ["手動でON/OFFする", "設定した時刻に自動的にON/OFFする", "温度により自動制御する", "光により自動制御する"],
    answer: 1, explanation: "タイムスイッチは設定時刻に自動的に回路をON/OFFする。外灯の自動点滅等に使用。", source: "hardcoded",
  },
  {
    id: "hc-283", type: "choice", grade: 2, category: "identification",
    question: "自動点滅器の動作原理として正しいものはどれか。",
    choices: ["タイマーで制御する", "周囲の明るさ（照度）で制御する", "人感センサーで制御する", "温度で制御する"],
    answer: 1, explanation: "自動点滅器はCdS（硫化カドミウムセル）等で周囲の明るさを検知し、暗くなると自動点灯、明るくなると消灯する。", source: "hardcoded",
  },
  {
    id: "hc-284", type: "truefalse", grade: 2, category: "identification",
    question: "OW線（屋外用ビニル絶縁電線）は、屋外の架空配線に使用される。",
    answer: true, explanation: "OW線（Outdoor Weatherproof）は屋外専用の絶縁電線。屋内配線には使用できない。", source: "hardcoded",
  },
  {
    id: "hc-285", type: "choice", grade: 2, category: "identification",
    question: "DV線（引込用ビニル絶縁電線）の主な用途はどれか。",
    choices: ["屋内配線", "地中埋設", "電柱から建物への引込線", "制御回路の配線"],
    answer: 2, explanation: "DV線は電柱から需要家への低圧引込線に使用される電線。", source: "hardcoded",
  },
  {
    id: "hc-286", type: "choice", grade: 2, category: "identification",
    question: "テスター（回路計）で直流電圧を測定する場合の接続方法はどれか。",
    choices: ["直列に接続する", "並列に接続する", "電線に巻き付ける", "接地に接続する"],
    answer: 1, explanation: "電圧計（テスター含む）は測定対象と並列に接続する。電流計は直列に接続する。", source: "hardcoded",
  },
  {
    id: "hc-287", type: "choice", grade: 2, category: "identification",
    question: "絶縁抵抗計（メガー）の使用上の注意として正しいものはどれか。",
    choices: ["電源を入れたまま測定する", "必ず回路を無電圧にしてから測定する", "接地を外してから測定する", "負荷を接続したまま測定する"],
    answer: 1, explanation: "絶縁抵抗計は回路を無電圧（停電状態）にしてから測定する。通電中の測定は機器の損傷や感電の危険がある。", source: "hardcoded",
  },
  {
    id: "hc-288", type: "truefalse", grade: 2, category: "identification",
    question: "IV電線は600Vビニル絶縁電線のことで、一般に単線で使用される。",
    answer: true, explanation: "IV（Indoor PVC）線は600Vビニル絶縁電線。電線管内の配線に使用され、直径1.6mm、2.0mm、2.6mm等の単線がある。", source: "hardcoded",
  },
  {
    id: "hc-289", type: "choice", grade: 2, category: "identification",
    question: "プルボックスの用途として正しいものはどれか。",
    choices: ["電線管のカーブ部での電線引き入れを容易にする", "電線を切断する", "接地棒を収納する", "電圧を測定する"],
    answer: 0, explanation: "プルボックスは長い配管ルートや曲がりの多い場所で、電線の引き入れを容易にするための大型ボックス。", source: "hardcoded",
  },
  {
    id: "hc-290", type: "choice", grade: 2, category: "identification",
    question: "ケーブルストリッパーとVVFストリッパーの違いとして正しいものはどれか。",
    choices: ["同じものである", "VVFストリッパーはVVF専用で外装と被覆を同時に剥ける", "ケーブルストリッパーの方が安い", "VVFストリッパーは金属管用"],
    answer: 1, explanation: "VVFストリッパーはVVFケーブル専用で、外装剥ぎと絶縁被覆剥ぎの両方ができる。のの字曲げ機能付きのものもある。", source: "hardcoded",
  },
  {
    id: "hc-291", type: "choice", grade: 2, category: "identification",
    question: "ブッシングの用途はどれか。",
    choices: ["電線管相互の接続", "電線管の端部に取り付け、電線の被覆を保護する", "電線管を壁に固定する", "電線管の穴をふさぐ"],
    answer: 1, explanation: "ブッシングは金属管の端部に取り付け、管端の角で電線の被覆が傷つくのを防ぐ保護用部品。", source: "hardcoded",
  },
  {
    id: "hc-292", type: "choice", grade: 2, category: "identification",
    question: "ノーマルベンドの用途はどれか。",
    choices: ["電線管を直角に曲げて接続する", "電線管を直線的に接続する", "電線管とボックスを接続する", "電線管を壁に固定する"],
    answer: 0, explanation: "ノーマルベンドは90°に曲がった金属製の管で、電線管を直角方向に配管するときに使用する。", source: "hardcoded",
  },
  {
    id: "hc-293", type: "choice", grade: 2, category: "identification",
    question: "カップリングの用途はどれか。",
    choices: ["電線管相互を直線で接続する", "電線管を曲げる", "電線管とボックスを接続する", "電線管を固定する"],
    answer: 0, explanation: "カップリングは電線管相互を直線方向に接続する金具。ねじなし管用とねじ切り管用がある。", source: "hardcoded",
  },
  {
    id: "hc-294", type: "truefalse", grade: 2, category: "identification",
    question: "接地極付接地端子付コンセント（EETコンセント）は、接地極と接地端子の両方を持つコンセントである。",
    answer: true, explanation: "EETコンセントは接地極（E）と接地端子（ET）の両方を備えたコンセント。洗濯機やエアコン等に使用。", source: "hardcoded",
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
