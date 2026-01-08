import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { QuestionResponse, AnalysisResult } from '@/lib/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { responses } = await request.json();

    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: 'Invalid request. Responses array is required.' },
        { status: 400 }
      );
    }

    if (responses.length === 0) {
      return NextResponse.json(
        { error: 'No responses provided for analysis.' },
        { status: 400 }
      );
    }

    // Format responses for the prompt
    const formattedResponses = responses
      .map((r: QuestionResponse) => `Q${r.questionId}: ${r.question}\nA: ${r.answer}`)
      .join('\n\n');

    const prompt = `You are a career clarity coach analyzing self-reflection responses. Based on these 12 strategic questions and answers, identify:

1. PRIMARY CAREER ARCHETYPE: One of these categories:
   - Knowledge Entrepreneur (consultant, coach, advisor)
   - Creative Builder (designer, maker, artist)
   - Strategic Operator (business owner, manager, CEO)
   - Technical Specialist (engineer, analyst, scientist)
   - Impact Leader (educator, nonprofit, social impact)
   - Lifestyle Freelancer (digital nomad, solopreneur)

2. KEY INSIGHTS: 3-4 bullet points about their strengths, values, and patterns

3. STRATEGIC BLIND SPOTS: 1-2 things they might be missing or avoiding

4. 90-DAY ACTION PLAN: 3 concrete steps to move toward this career direction

User's Responses:
${formattedResponses}

Format your response as valid JSON with this exact structure:
{
  "careerArchetype": "...",
  "archetypeDescription": "...",
  "keyInsights": ["...", "...", "..."],
  "blindSpots": ["...", "..."],
  "actionPlan": [
    {"step": 1, "title": "...", "description": "..."},
    {"step": 2, "title": "...", "description": "..."},
    {"step": 3, "title": "...", "description": "..."}
  ]
}

IMPORTANT: Return ONLY the JSON object, with no markdown code blocks, no explanations, and no additional text.`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract the text content
    const textContent = message.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in Claude response');
    }

    // Parse the JSON response
    let analysisResult: AnalysisResult;
    try {
      // Remove any markdown code blocks if present
      let cleanedText = textContent.text.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/```\n?/g, '');
      }

      analysisResult = JSON.parse(cleanedText);
    } catch {
      console.error('Failed to parse Claude response:', textContent.text);
      throw new Error('Failed to parse AI analysis result');
    }

    return NextResponse.json({ analysis: analysisResult }, { status: 200 });
  } catch (error) {
    console.error('Analysis error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      {
        error: 'Failed to analyze responses',
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
