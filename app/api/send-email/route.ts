import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailCaptureData } from '@/lib/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data: EmailCaptureData = await request.json();

    if (!data.email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    if (!data.analysis) {
      return NextResponse.json(
        { error: 'Analysis data is required' },
        { status: 400 }
      );
    }

    // Generate HTML email content
    const htmlContent = generateEmailHTML(data);

    // Send email using Resend
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Find Your Path <noreply@yourdomain.com>',
      to: data.email,
      subject: `Your Career Path: ${data.analysis.careerArchetype}`,
      html: htmlContent,
    });

    // Optional: Send notification to admin
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'Find Your Path <noreply@yourdomain.com>',
        to: process.env.ADMIN_EMAIL,
        subject: 'New Find Your Path Completion',
        html: `
          <h2>New User Completed Find Your Path</h2>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Name:</strong> ${data.name || 'Not provided'}</p>
          <p><strong>Current Situation:</strong> ${data.currentSituation || 'Not provided'}</p>
          <p><strong>Career Archetype:</strong> ${data.analysis.careerArchetype}</p>
        `,
      });
    }

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      {
        error: 'Failed to send email',
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

function generateEmailHTML(data: EmailCaptureData): string {
  const { analysis, name } = data;
  const userName = name || 'there';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Career Path Results</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #2D3748;
      background-color: #F5F7FA;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
      padding: 40px 30px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 3px solid #6B9BD1;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #6B9BD1;
      font-size: 28px;
      margin: 0;
    }
    .hero {
      text-align: center;
      margin-bottom: 40px;
    }
    .hero h2 {
      color: #2D3748;
      font-size: 24px;
      margin-bottom: 10px;
    }
    .archetype {
      color: #6B9BD1;
      font-size: 32px;
      font-weight: bold;
      margin: 20px 0;
    }
    .description {
      font-size: 16px;
      color: #4A5568;
      margin: 20px 0;
    }
    .section {
      margin: 30px 0;
    }
    .section h3 {
      color: #2D3748;
      font-size: 20px;
      margin-bottom: 15px;
      border-left: 4px solid #6B9BD1;
      padding-left: 15px;
    }
    .insight-item, .blindspot-item, .action-item {
      background-color: #F5F7FA;
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
      border-left: 3px solid #6B9BD1;
    }
    .blindspot-item {
      background-color: #FFF5F5;
      border-left-color: #F6AD55;
    }
    .action-item {
      display: flex;
      gap: 15px;
      align-items: flex-start;
    }
    .action-number {
      background-color: #6B9BD1;
      color: white;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
    }
    .action-content h4 {
      margin: 0 0 8px 0;
      color: #2D3748;
      font-size: 18px;
    }
    .action-content p {
      margin: 0;
      color: #4A5568;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #E2E8F0;
      color: #718096;
      font-size: 14px;
    }
    .cta {
      text-align: center;
      margin: 30px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #6B9BD1;
      color: white;
      text-decoration: none;
      padding: 15px 30px;
      border-radius: 8px;
      font-weight: bold;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Find Your Path</h1>
    </div>

    <div class="hero">
      <p>Hi ${userName},</p>
      <h2>Your Career Path:</h2>
      <div class="archetype">${analysis.careerArchetype}</div>
      <p class="description">${analysis.archetypeDescription}</p>
    </div>

    <div class="section">
      <h3>Key Insights About You</h3>
      ${analysis.keyInsights
        .map(
          (insight) => `
        <div class="insight-item">
          ${insight}
        </div>
      `
        )
        .join('')}
    </div>

    <div class="section">
      <h3>Your Blind Spots</h3>
      ${analysis.blindSpots
        .map(
          (blindSpot) => `
        <div class="blindspot-item">
          ${blindSpot}
        </div>
      `
        )
        .join('')}
    </div>

    <div class="section">
      <h3>Your 90-Day Action Plan</h3>
      ${analysis.actionPlan
        .map(
          (action) => `
        <div class="action-item">
          <div class="action-number">${action.step}</div>
          <div class="action-content">
            <h4>${action.title}</h4>
            <p>${action.description}</p>
          </div>
        </div>
      `
        )
        .join('')}
    </div>

    <div class="cta">
      <p>Want to dive deeper into your career clarity?</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" class="cta-button">
        Explore More Resources
      </a>
    </div>

    <div class="footer">
      <p>You're receiving this email because you completed the Find Your Path assessment.</p>
      <p>Inspired by principles from "Master Your Focus"</p>
      <p>© 2024 Find Your Path. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}
