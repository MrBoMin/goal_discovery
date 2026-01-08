import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { QuestionResponse, AnalysisResult } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

    const systemPrompt = `You are a career clarity coach analyzing self-reflection responses. Based on 12 strategic questions and answers, you identify career archetypes, strengths, blind spots, and action plans.

Always respond with ONLY a valid JSON object in this exact format (no markdown, no explanations):
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
}`;

    const userPrompt = `Based on these 12 strategic questions and answers, identify:

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

Return ONLY the JSON object.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview', // or 'gpt-4' or 'gpt-3.5-turbo'
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }, // Force JSON response
    });

    // Extract the response
    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    let analysisResult: AnalysisResult;
    try {
      // Remove any markdown code blocks if present
      let cleanedText = responseText.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/```\n?/g, '');
      }

      analysisResult = JSON.parse(cleanedText);
    } catch {
      console.error('Failed to parse OpenAI response:', responseText);
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
