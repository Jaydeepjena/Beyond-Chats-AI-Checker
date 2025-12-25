import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://beyond-chats-assignment-7fof.onrender.com/api/articles')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setArticles(res.data);
                } else {
                    console.error("API response is not an array:", res.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center p-10">Loading articles...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">BeyondChats Blog (AI Enhanced)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                    <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${article.is_updated ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {article.is_updated ? 'AI REWRITTEN' : 'ORIGINAL'}
                                </span>
                                <span className="text-xs text-gray-400">{new Date(article.created_at).toLocaleDateString()}</span>
                            </div>
                            <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">{article.title}</h2>
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                {article.content ? article.content.substring(0, 100).replace(/<[^>]*>?/gm, '') : 'No preview available...'}
                            </p>
                            <Link to={`/article/${article.id}`} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;
