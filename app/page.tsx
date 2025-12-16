export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PinkSync Accessibility Validator
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4">
            Deaf-First Accessibility Automation
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A core service within the MBTQ Ecosystem that ensures all interfaces prioritize ASL flow and bypass audio-only UX. 
            Going beyond standard WCAG compliance to focus on visual UI and sign language navigation patterns.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Visual-First Standards</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>✅ Enhanced color contrast</li>
              <li>✅ Visual indicators for all audio cues</li>
              <li>✅ Optimized text readability</li>
              <li>✅ Motion sensitivity support</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-purple-500">
            <div className="text-3xl mb-4">🤟</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">ASL Navigation Compatible</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>✅ Gesture support patterns</li>
              <li>✅ Clear visual feedback</li>
              <li>✅ Spatial logic layouts</li>
              <li>✅ Time-flexible interactions</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-pink-500">
            <div className="text-3xl mb-4">🔇</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Audio-Bypass Requirements</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>✅ No audio-only content</li>
              <li>✅ Visual-first alerts</li>
              <li>✅ Accurate captions</li>
              <li>✅ Full text alternatives</li>
            </ul>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Frontend</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Next.js 14:</strong> React-based validation dashboard</li>
                <li><strong>TypeScript:</strong> Type-safe development</li>
                <li><strong>Tailwind CSS:</strong> Responsive, accessible UI</li>
                <li><strong>Real-time Reports:</strong> Visual accessibility scores</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Backend</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>FastAPI:</strong> High-performance Python API</li>
                <li><strong>Web Scraping:</strong> Live website analysis</li>
                <li><strong>ASL Validator:</strong> Sign language navigation checks</li>
                <li><strong>Custom Scoring:</strong> Deaf-first algorithms</li>
              </ul>
            </div>
          </div>
        </div>

        {/* MBTQ Ecosystem */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Part of the MBTQ Ecosystem</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl mb-2">🔐</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">DeafAUTH</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Identity for Deaf users</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Fibonrose</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Trust & reputation system</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl mb-2">🤖</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">360Magicians</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI automation agents</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-900 dark:text-white">PinkSync</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accessibility executor</p>
            </div>
          </div>
        </div>

        {/* Deployment Options */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Quick Deploy</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a
              href="https://vercel.com/new/clone?repository-url=https://github.com/pinkycollie/accessibility-validator"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mr-2">▲</span>
              Deploy with Vercel
            </a>
            <a
              href="https://github.com/pinkycollie/accessibility-validator"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mr-2">⭐</span>
              View on GitHub
            </a>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Getting Started</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900 dark:bg-black text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="mb-2"># Clone and setup</div>
              <div className="text-blue-400">git clone</div> https://github.com/pinkycollie/accessibility-validator.git
              <div className="mt-2"><span className="text-blue-400">cd</span> accessibility-validator</div>
              <div className="mt-4"># Install dependencies</div>
              <div><span className="text-blue-400">npm install</span></div>
              <div><span className="text-blue-400">pip install -r</span> requirements.txt</div>
              <div className="mt-4"># Run development server</div>
              <div><span className="text-blue-400">npm run dev</span></div>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              Open <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">http://localhost:3000</code> to see the validator interface
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600 dark:text-gray-400">
          <p className="text-lg font-semibold mb-2">Built with ❤️ for the Deaf community by MBTQ</p>
          <p className="text-sm">Part of the MBTQ Universe Ecosystem • MIT License</p>
        </div>
      </div>
    </main>
  );
}
