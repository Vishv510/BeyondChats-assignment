export default function ArticleList({ articles, onSelect, selected }) {
  return (
    <div className="h-screen overflow-y-auto border-r bg-white">
      
      <h2 className="p-4 font-bold text-lg sticky top-0 bg-white border-b">
        Articles
      </h2>
      
        {articles.map((a) => (
          <div
            key={a._id}
            onClick={() => onSelect(a)}
            className={`p-4 cursor-pointer border-b transition-colors
              ${
                selected?._id === a._id
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <p className="font-semibold leading-snug">{a.title}</p>

            <small className="text-gray-500">
              {a.optimized_content ? "Optimized" : "Original"}
            </small>
          </div>
        ))}
    </div>
  );
}
