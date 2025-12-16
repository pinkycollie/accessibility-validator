'use client';

import { useState } from 'react';
import Link from "next/link";

interface ApiResponse {
  [key: string]: unknown;
}

export default function Home() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [workflowStory, setWorkflowStory] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchApiDemo = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/py/health');
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      setApiResponse({ error: 'API service unavailable' });
    }
    setLoading(false);
  };

  const fetchWorkflowStory = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/py/workflows/ci-cd-story');
      const data = await response.json();
      setWorkflowStory(data);
    } catch (error) {
      setWorkflowStory({ error: 'API service unavailable' });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🧙‍♂️✨</div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Developer Magician
          </h1>
          <p className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-4">
            Next-Gen AI Developer Agent
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Autonomous AI-powered developer that automates workflows, orchestrates tasks, 
            and learns from your codebase. Part of the <span className="font-semibold text-purple-600 dark:text-purple-400">360 Magicians</span> ecosystem.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Link 
            href="/api/py/docs"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">🔮 Magician API</h3>
            <p className="text-gray-600 dark:text-gray-400">Explore the AI agent capabilities and endpoints</p>
          </Link>
          
          <Link 
            href="/api/helloNextJs"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">⚡ Integration Demo</h3>
            <p className="text-gray-600 dark:text-gray-400">See how Developer Magician integrates with your stack</p>
          </Link>
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">🎮 Try Developer Magician Live</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Interact with the AI agent APIs and see autonomous capabilities in action
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <button
              onClick={fetchApiDemo}
              disabled={loading}
              className="px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 font-semibold text-lg shadow-lg"
            >
              {loading ? '⏳ Loading...' : '🏥 Check Agent Status'}
            </button>
            
            <button
              onClick={fetchWorkflowStory}
              disabled={loading}
              className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 font-semibold text-lg shadow-lg"
            >
              {loading ? '⏳ Loading...' : '🤖 Get Automation Story'}
            </button>
          </div>

          {/* API Response Display */}
          {apiResponse && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Agent Status Response:</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm shadow-inner">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}

          {/* Workflow Story Display */}
          {workflowStory && (
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Developer Magician Automation Workflow:</h3>
              {workflowStory.error ? (
                <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
                  {String(workflowStory.error)}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-800 dark:to-blue-800 p-4 rounded-lg">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{String(workflowStory.workflow_name || '')}</h4>
                    <p className="text-gray-700 dark:text-gray-300">{String(workflowStory.description || '')}</p>
                    <div className="mt-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Automation Progress: </span>
                      <span className="text-purple-600 dark:text-purple-400 font-bold">{String(workflowStory.overall_progress || 0)}%</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    {Array.isArray(workflowStory.stages) && workflowStory.stages.slice(0, 3).map((stage: ApiResponse, idx: number) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-purple-500">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900 dark:text-white">
                            {String((stage.educational_content as ApiResponse)?.title || '')}
                          </h5>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            stage.status === 'success' ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200' :
                            stage.status === 'pending' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' :
                            'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                          }`}>
                            {String(stage.status || '')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {String((stage.educational_content as ApiResponse)?.message || '')}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href="/api/py/docs"
                    className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Explore All Magician Capabilities →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-purple-500">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Autonomous Agent</h3>
            <p className="text-gray-600 dark:text-gray-400">Self-learning AI that understands your codebase and automates complex workflows</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
            <div className="text-4xl mb-3">🔮</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Intelligent Orchestration</h3>
            <p className="text-gray-600 dark:text-gray-400">Coordinates tasks across your development pipeline with AI-powered decision making</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-pink-500">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">360 Magicians Network</h3>
            <p className="text-gray-600 dark:text-gray-400">Part of a distributed ecosystem of specialized AI agents working together</p>
          </div>
        </div>

        {/* Capabilities Section */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">🧙‍♂️ Magician Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-200">Development Automation</h3>
              <ul className="space-y-2 text-purple-100">
                <li>✨ <strong>Code Generation:</strong> AI-powered code creation and refactoring</li>
                <li>✨ <strong>Testing:</strong> Automated test generation and execution</li>
                <li>✨ <strong>CI/CD:</strong> Intelligent pipeline orchestration</li>
                <li>✨ <strong>Documentation:</strong> Auto-generated technical docs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-200">AI Operations</h3>
              <ul className="space-y-2 text-blue-100">
                <li>🤖 <strong>Learning:</strong> Adapts to your codebase patterns</li>
                <li>🤖 <strong>Monitoring:</strong> Real-time health and performance tracking</li>
                <li>🤖 <strong>Optimization:</strong> Suggests improvements automatically</li>
                <li>🤖 <strong>Integration:</strong> Connects with 360 Magicians ecosystem</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Endpoints Reference */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🔗 Magician API Endpoints</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Core Agent APIs:</h4>
              <ul className="space-y-1 text-sm">
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/py/health</code> - Agent status</li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/py/helloFastApi</code> - Hello world</li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/helloNextJs</code> - Next.js integration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Automation Workflows:</h4>
              <ul className="space-y-1 text-sm">
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/py/workflows/ci-cd-story</code> - CI/CD automation</li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/py/workflows/security-story</code> - Security ops</li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/py/learn/mbtq-ecosystem</code> - 360 network</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p className="text-lg font-semibold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🧙‍♂️ Powered by 360 Magicians Ecosystem
          </p>
          <p className="text-sm">Next-Gen AI Developer Agents • Autonomous • Intelligent • Magical</p>
        </div>
      </div>
    </main>
  );
}
