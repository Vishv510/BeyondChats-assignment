import { useEffect, useState, useCallback  } from "react";
import { fetchArticles, optimizeArticle } from "../api/articles";
import ArticleList from "../components/ArticleList";
import ArticleViewer from "../components/ArticleViewer";

export default function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showList, setShowList] = useState(true);
    const [showOptimized, setShowOptimized] = useState(false);
    
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

    const handleSelect = (article) => {
        setSelected(article);
        // Only hide list on mobile screens
        if (window.innerWidth < 768) {
            setShowList(false);
        }
    };

    const handleOptimize = async () => {
        if (!selected) return;

        await optimizeArticle(selected._id);
        loadArticles();
    };

    return (
        <div className="h-screen flex flex-col md:flex-row  overflow-hidden">
        
            <div className={`md:w-72 w-full ${showList ? 'block' : 'hidden md:block'}`}>
                <ArticleList
                    articles={articles}
                    selected={selected}
                    onSelect={handleSelect}
                />
            </div>

            {(              
                <main className={`flex-1 ${!showList ? 'block' : 'hidden md:block'}`}>
                    <ArticleViewer
                        article={selected}
                        optimized={showOptimized}
                        onToggle={() => setShowOptimized(!showOptimized)}
                        onOptimize={handleOptimize}
                        onBack={() => setShowList(true)}
                    />
                </main>
            )}        
        </div>
    );
}
