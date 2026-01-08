# Find Your Path - Career Discovery Web App

A free, AI-powered career clarity tool that helps users discover their true career direction through strategic self-reflection questions.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Overview

**Find Your Path** helps people who are stuck or unclear about their career goals discover clarity through:

- **12 Strategic Questions** across 3 phases (Desire Clarity, Strength Discovery, Leverage & Priority)
- **AI-Powered Analysis** using Claude Sonnet 4 by Anthropic
- **Personalized Results** including career archetype, key insights, blind spots, and 90-day action plan
- **Email Delivery** of full PDF reports for users who opt in

**Inspired by:** "Master Your Focus" by Thibaut Meurisse

## ✨ Features

- ✅ Beautiful, minimal UI with peaceful color palette (Notion/Linear aesthetic)
- ✅ One question per page with smooth transitions
- ✅ Progress tracking with localStorage (resume later)
- ✅ Progress bar showing completion (1/12, 2/12, etc.)
- ✅ Skip option for each question
- ✅ Mobile-first, fully responsive design
- ✅ AI analysis using Claude API (claude-sonnet-4-20250514)
- ✅ Six career archetypes identified
- ✅ Email capture with Resend integration
- ✅ Comprehensive FAQ page
- ✅ Error handling and loading states

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Email:** Resend
- **Deployment:** Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Anthropic API key ([Get one here](https://console.anthropic.com/))
- Resend API key ([Get one here](https://resend.com/))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd goal_discovery
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual API keys:

```env
# Anthropic API Key for Claude AI Analysis
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here

# Resend API Key for Email Sending
RESEND_API_KEY=re_your-actual-key-here

# Email configuration
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# App URL (for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
goal_discovery/
├── app/
│   ├── api/
│   │   ├── analyze/         # Claude API integration
│   │   └── send-email/      # Resend email integration
│   ├── questions/
│   │   └── [id]/           # Dynamic question pages
│   ├── results/            # Results page with analysis
│   ├── faq/                # FAQ page
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/             # Reusable React components
├── lib/
│   ├── types.ts            # TypeScript type definitions
│   ├── questions.ts        # 12 strategic questions data
│   └── storage.ts          # localStorage utilities
├── .env.local              # Environment variables (not in git)
├── .env.example            # Example environment file
├── tailwind.config.ts      # Tailwind configuration
└── package.json
```

## 🎨 Career Archetypes

The AI identifies one of six primary career archetypes:

1. **Knowledge Entrepreneur** - Consultant, coach, advisor
2. **Creative Builder** - Designer, maker, artist
3. **Strategic Operator** - Business owner, manager, CEO
4. **Technical Specialist** - Engineer, analyst, scientist
5. **Impact Leader** - Educator, nonprofit, social impact
6. **Lifestyle Freelancer** - Digital nomad, solopreneur

## 📝 The 12 Strategic Questions

### Phase 1: Desire Clarity
1. What do you really, really want?
2. Where would you want to be in three years if guaranteed to succeed?
3. What does your ideal day look like?
4. What one thing would you focus on for the rest of your life?

### Phase 2: Strength Discovery
5. What do you find easy that others struggle with?
6. When are you happiest at work?
7. What did you enjoy doing as a child?
8. Who do you envy and why?

### Phase 3: Leverage & Priority
9. What tasks would you perform if time was reduced by 95%?
10. What activities are you "fooling yourself" about?
11. What one thing would make the biggest impact in 12 months?
12. Will your current path achieve your goals? What needs to change?

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `ANTHROPIC_API_KEY`
   - `RESEND_API_KEY`
   - `FROM_EMAIL`
   - `ADMIN_EMAIL`
   - `NEXT_PUBLIC_APP_URL`
5. Deploy!

Vercel will automatically:
- Build your Next.js application
- Set up edge functions for API routes
- Configure CDN for optimal performance
- Provide automatic HTTPS

### Alternative Deployment Options

- **Netlify**: Similar process to Vercel
- **AWS Amplify**: Good for AWS ecosystem integration
- **DigitalOcean App Platform**: Simple container-based deployment
- **Self-hosted**: Use `npm run build` then `npm start`

## 🔧 Configuration

### Customizing Questions

Edit `lib/questions.ts` to modify or add questions.

### Customizing Career Archetypes

Edit the prompt in `app/api/analyze/route.ts` to modify archetypes or analysis structure.

### Customizing Email Template

Edit the HTML template in `app/api/send-email/route.ts`.

### Customizing Colors

Edit `tailwind.config.ts` to change the color palette.

## 🧪 Testing

Test the application locally:

1. Complete the question flow
2. Check localStorage is saving progress
3. Test the AI analysis (requires valid API key)
4. Test email sending (requires valid Resend key)

## 📊 Analytics (Optional)

To track usage, consider adding:

- **Vercel Analytics**: Built-in, zero-config analytics
- **Google Analytics**: Add to `app/layout.tsx`
- **Plausible**: Privacy-friendly alternative

## 🐛 Troubleshooting

### API Key Issues

```
Error: Invalid API key
```
- Verify your `.env.local` file has correct keys
- Restart the dev server after changing environment variables

### Email Not Sending

```
Error: Failed to send email
```
- Check Resend API key is valid
- Verify `FROM_EMAIL` domain is verified in Resend
- Check Resend dashboard for error logs

### Build Errors

```
Type error: ...
```
- Run `npm run build` to see detailed TypeScript errors
- Check all imports and type definitions

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💡 Ideas for Enhancement

- [ ] Add PDF generation for results (using jsPDF or similar)
- [ ] Add social sharing functionality
- [ ] Implement basic analytics dashboard
- [ ] Add more career archetypes
- [ ] Create a "Compare Results" feature for retakes
- [ ] Add multilingual support
- [ ] Implement user accounts (optional)
- [ ] Add A/B testing for questions
- [ ] Create a mobile app version

## 📧 Support

For questions or issues:
- Open an issue on GitHub
- Email: support@findyourpath.com

## 🙏 Acknowledgments

- Inspired by "Master Your Focus" by Thibaut Meurisse
- Built with [Next.js](https://nextjs.org/)
- AI powered by [Anthropic Claude](https://anthropic.com/)
- Email by [Resend](https://resend.com/)

---

Built with ❤️ for people seeking career clarity
