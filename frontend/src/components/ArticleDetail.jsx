import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://beyond-chats-assignment-7fof.onrender.com/api/articles/${id}`)
            .then(res => {
                setArticle(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (!article) return <div className="text-center p-10">Article not found</div>;

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <Link to="/" className="inline-block mb-4 text-blue-600 hover:underline">&larr; Back to Articles</Link>

            <article className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <header className="mb-6">
                    <span className={`inline-block mb-2 text-xs font-semibold px-2 py-1 rounded ${article.is_updated ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                        {article.is_updated ? 'AI REWRITTEN' : 'ORIGINAL'}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>Original Source: <a href={article.original_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">BeyondChats</a></span>
                        <span>{new Date(article.updated_at).toLocaleDateString()}</span>
                    </div>
                </header>

                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }}></div>

                {article.source_citations && article.source_citations.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold mb-3">References & Citations</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {article.source_citations.map((url, index) => (
                                <li key={index}>
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all text-sm">{url}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </article>
        </div>
    );
};

export default ArticleDetail;
