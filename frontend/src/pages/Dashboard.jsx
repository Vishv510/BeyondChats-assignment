import { useEffect, useState, useCallback  } from "react";
import { fetchArticles, optimizeArticle } from "../api/articles";
import ArticleList from "../components/ArticleList";
import ArticleViewer from "../components/ArticleViewer";

export default function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const loadArticles = useCallback(async () => {
        const res = await fetchArticles();
        setArticles(res.data);
        console.log(res.data);
    }, []);

    useEffect(() => {
        loadArticles();
    }, [loadArticles]);

    useEffect(() => {
        if (articles.length > 0 && !selected) {
            setSelected(articles[0]);
        }
    }, [articles]);

    const handleOptimize = async () => {
        if (!selected) return;
        setLoading(true);

        await optimizeArticle(selected._id);
        
        setTimeout(async () => {
            await loadArticles();
            setLoading(false);
        }, 3000);
    };

    return (
        <div className="h-screen flex">
        {/* Sidebar */}
        <ArticleList
            articles={articles}
            onSelect={setSelected }
            selected={selected}
        />

        {/* Main content */}
        <ArticleViewer
            article={selected}
            onOptimize={handleOptimize}
            loading={loading}
        />
        </div>
    );
}
