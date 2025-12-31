export default function ArticleViewer({ article, onOptimize, loading }) {
  if (!article) return <div className="flex-1 p-6">Select an article</div>;

  return (
    <div className="flex-1 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{article.title}</h1>
        <button
          onClick={onOptimize}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Processing..." : "Optimize with AI"}
        </button>
      </div>

      {/* Split screen */}
      <div className="flex gap-4 flex-1 overflow-hidden">
        {/* Old content */}
        <div className="w-1/2 border rounded p-4 overflow-y-auto">
          <h3 className="font-semibold mb-2">Original Article</h3>
          <div className="text-sm whitespace-pre-wrap">
            {article.original_content}
          </div>
        </div>

        {/* New content */}
        <div className="w-1/2 border rounded p-4 overflow-y-auto bg-gray-50">
          <h3 className="font-semibold mb-2">AI Optimized Article</h3>
          <div className="text-sm whitespace-pre-wrap">
            {article.optimized_content || "Not generated yet"}
          </div>
        </div>
      </div>
    </div>
  );
}
