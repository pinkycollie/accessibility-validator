'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [workflowStory, setWorkflowStory] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchApiDemo = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/py/health');
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      setApiResponse({ error: 'API not running - start with: npm run fastapi-dev' });
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
      setWorkflowStory({ error: 'API not running - start with: npm run fastapi-dev' });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Developer Magician API Demo
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            Interactive Next.js + FastAPI Educational Storytelling Platform
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Link 
            href="/api/py/docs"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">📚 FastAPI Documentation</h3>
            <p className="text-gray-600 dark:text-gray-400">Explore the complete API with Swagger UI</p>
          </Link>
          
          <Link 
            href="/api/helloNextJs"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">⚡ Next.js API Route</h3>
            <p className="text-gray-600 dark:text-gray-400">Test the Next.js 14 API endpoint</p>
          </Link>
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">🎮 Try the APIs Live</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <button
              onClick={fetchApiDemo}
              disabled={loading}
              className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 font-semibold text-lg"
            >
              {loading ? '⏳ Loading...' : '🏥 Check API Health'}
            </button>
            
            <button
              onClick={fetchWorkflowStory}
              disabled={loading}
              className="px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 font-semibold text-lg"
            >
              {loading ? '⏳ Loading...' : '📖 Get CI/CD Story'}
            </button>
          </div>

          {/* API Response Display */}
          {apiResponse && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">API Health Response:</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}

          {/* Workflow Story Display */}
          {workflowStory && (
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Educational CI/CD Workflow:</h3>
              {workflowStory.error ? (
                <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
                  {workflowStory.error}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-4 rounded-lg">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{workflowStory.workflow_name}</h4>
                    <p className="text-gray-700 dark:text-gray-300">{workflowStory.description}</p>
                    <div className="mt-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Progress: </span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{workflowStory.overall_progress}%</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    {workflowStory.stages?.slice(0, 3).map((stage: any, idx: number) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900 dark:text-white">{stage.educational_content?.title}</h5>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            stage.status === 'success' ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200' :
                            stage.status === 'pending' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' :
                            'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                          }`}>
                            {stage.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{stage.educational_content?.message}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href="/api/py/docs"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Explore All Endpoints →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Educational Workflows</h3>
            <p className="text-gray-600 dark:text-gray-400">Learn CI/CD through storytelling and interactive examples</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Next.js 14 + FastAPI</h3>
            <p className="text-gray-600 dark:text-gray-400">Modern full-stack with TypeScript and Python</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Developer Magician</h3>
            <p className="text-gray-600 dark:text-gray-400">AI-powered automation and intelligent task orchestration</p>
          </div>
        </div>

        {/* API Endpoints Reference */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🔗 Available API Endpoints</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Core Endpoints:</h4>
              <ul className="space-y-1 text-sm">
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/py/health</code></li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/py/helloFastApi</code></li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/helloNextJs</code></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Workflow Stories:</h4>
              <ul className="space-y-1 text-sm">
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/py/workflows/ci-cd-story</code></li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/py/workflows/security-story</code></li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">/api/py/learn/ci-cd-basics</code></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p className="mb-2">💜 Built for developers who love to learn</p>
          <p className="text-sm">Part of the MBTQ Universe • Accessibility-First Development</p>
        </div>
      </div>
    </main>
  );
}
