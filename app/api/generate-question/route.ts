import Anthropic from "@anthropic-ai/sdk";
import { getCategoryName } from "@/lib/types";

const client = new Anthropic();

export async function POST(req: Request) {
  try {
    const { grade, category, type, difficulty } = await req.json();
    const categoryName = getCategoryName(category);

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `あなたは電気工事士試験の出題者です。
以下の条件で1問作成してください。

- 試験種別: 第${grade}種電気工事士
- 分野: ${categoryName}
- 出題形式: ${type === "choice" ? "4択" : "○×"}
- 難易度: ${difficulty || "普通"}

以下のJSON形式のみで回答してください（他のテキスト不要）:
${
  type === "choice"
    ? `{
  "question": "問題文",
  "choices": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
  "answer": 0,
  "explanation": "解説文（公式や根拠を含む）"
}`
    : `{
  "question": "問題文",
  "answer": true,
  "explanation": "解説文（公式や根拠を含む）"
}`
}`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());

    return Response.json({
      id: `api-${Date.now()}`,
      type,
      grade,
      category,
      source: "api",
      ...parsed,
    });
  } catch (error) {
    console.error("Question generation error:", error);
    return Response.json(
      { error: "問題の生成に失敗しました" },
      { status: 500 }
    );
  }
}
