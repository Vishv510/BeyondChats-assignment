import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, Link2 } from "lucide-react";

export default function ArticleViewer({ article, optimized, onToggle, onOptimize, onBack }) {
  if (!article) return <div className="flex-1 p-6">Select an article</div>;

  // Safe URL parsing helper
  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'Invalid URL';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={onBack}
            className="md:hidden text-sm text-blue-600 hover:text-blue-800 flex gap-2"
          >
            <ArrowLeft className='w-5 h-5'/> Back
          </button>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={onToggle}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
            >
              {optimized ? "Original" : "AI Optimized"}
            </button>
            
            {!article.optimized_content && (
              <button
                onClick={onOptimize}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Generate AI Content
              </button>
            )}
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {article.title}
        </h1>

        <a
          href={article.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm hover:text-blue-800 underline inline-flex items-center gap-1"
        >
          <Link2 className='w-5 h-5' />View Original Source
        </a>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {optimized && article.optimized_content ? (
            <article className="prose prose-lg prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-3xl prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 prose-li:mb-2
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.optimized_content}
              </ReactMarkdown>
            </article>
          ) : (
            <article className="prose prose-lg prose-slate max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {article.original_content}
              </div>
            </article>
          )}

          {/* References Section */}
          {optimized && article.references && article.references.length > 0 && (
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                References & Sources
              </h3>
              <div className="space-y-3">
                {article.references.map((ref, idx) => {
                  const domain = getDomain(ref);
                  
                  return (
                    <a
                      key={idx}
                      href={ref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 
                        hover:border-blue-400 hover:bg-blue-50 hover:shadow-md 
                        transition-all duration-200 group"
                    >
                      <span className="shrink-0 w-8 h-8 bg-blue-100 text-blue-600 
                        rounded-full flex items-center justify-center font-semibold text-sm
                        group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900 mb-1">
                          {domain}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {ref}
                        </p>
                      </div>
                      <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                        <ArrowRight className='w-5 h-5'/>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}