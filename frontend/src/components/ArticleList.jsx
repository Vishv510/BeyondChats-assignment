export default function ArticleList({ articles, onSelect, selected }) {
  return (
    <div className="w-1/4 border-r overflow-y-auto">
      <h2 className="p-4 font-bold text-lg">Articles</h2>

      {articles.map((a) => (
        <div
          key={a._id}
          onClick={() => {
            onSelect(a);
            console.log(a);
          }}
          className={`p-4 cursor-pointer border-b ${
            selected?._id === a._id ? "bg-gray-200" : ""
          }`}
        >
          <p className="font-medium">{a.title}</p>
          <small className="text-gray-500">
            {a.updated_content ? "Optimized" : "Original"}
          </small>
        </div>
      ))}
    </div>
  );
}
