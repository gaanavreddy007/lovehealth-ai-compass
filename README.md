# LoveHealth AI Compass

LoveHealth AI Compass is a health assistant platform featuring Ayu, an AI health companion designed for Bengaluru residents. The application blends modern healthcare with traditional wisdom to provide personalized health guidance.

## Features

- **Symptom Guide**: Get personalized health guidance with traditional and modern remedies for common ailments
- **Healthcare Provider Finder**: Find the right hospitals and specialists across Bengaluru neighborhoods
- **Pharmacy Locator**: Locate nearby pharmacies with operating hours and medication delivery services
- **Multilingual Support**: Available in English, Telugu, and Kannada
- **User Authentication**: Personalized experience with user accounts and preferences

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **State Management**: React Context API, React Query
- **AI Integration**: OpenAI API for health guidance
- **Authentication**: Local storage-based authentication (demo)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- OpenAI API key (for AI chat functionality)

### Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/lovehealth-ai-compass.git
cd lovehealth-ai-compass
```

2. Install dependencies:
```sh
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your OpenAI API key:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```sh
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Demo Accounts

For testing purposes, you can use the following demo accounts:

- **English User**: 
  - Email: user@example.com
  - Password: password123

- **Telugu User**: 
  - Email: telugu@example.com
  - Password: password123

- **Kannada User**: 
  - Email: kannada@example.com
  - Password: password123

## Project Structure

```
lovehealth-ai-compass/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ayu/          # Ayu-specific components
│   │   ├── auth/         # Authentication components
│   │   ├── layout/       # Layout components
│   │   ├── symptoms/     # Symptom-related components
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/
│   │   ├── contexts/     # React contexts
│   │   └── services/     # API services
│   ├── pages/            # Application pages
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── .env                  # Environment variables (local)
├── .env.example          # Example environment variables
└── package.json          # Project dependencies
```

## Deployment

To deploy this application:

1. Build the production version:
```sh
npm run build
# or
yarn build
```

2. The build output will be in the `dist` directory, which can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was built with [Lovable](https://lovable.dev/projects/d0ccc255-0f0a-4d23-bf55-2ee2475a986c)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
