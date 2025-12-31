const axios = require('axios');
const cheerio = require('cheerio');

const API_URL = 'http://127.0.0.1:8000/api/articles';

// Mock Configuration
const MOCK_SEARCH_RESULTS = [
    'https://en.wikipedia.org/wiki/Artificial_intelligence',
    'https://www.ibm.com/topics/artificial-intelligence'
];

async function fetchPendingArticle() {
    try {
        const { data } = await axios.get(API_URL);
        // Find one that hasn't been updated yet
        // Default API returns all, let's pick the first is_updated=false
        const pending = data.find(a => a.is_updated === 0 || a.is_updated === false);
        return pending;
    } catch (error) {
        console.error('Error fetching articles:', error.message);
        return null;
    }
}

async function searchGoogle(query) {
    console.log(`[Mock] Searching Google for: "${query}"`);
    // In a real scenario, use SerpApi or custom scraper
    return MOCK_SEARCH_RESULTS;
}

async function scrapeUrl(url) {
    console.log(`Scraping: ${url}`);
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        // Generic content extraction
        const text = $('p').text().substring(0, 1000); // Limit size
        return { url, content: text };
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
        return { url, content: '' };
    }
}

async function callLLM(originalContent, newContexts) {
    console.log('[Mock] Calling LLM API...');
    const combinedContext = newContexts.map(c => c.content).join('\n\n');

    // Mock Rewrite Logic
    const newContent = `
    <h2>(AI Rewritten) ${originalContent.substring(0, 50)}...</h2>
    <p><strong>Analysis of search results:</strong></p>
    <ul>
        ${newContexts.map(c => `<li>Data from ${c.url}</li>`).join('')}
    </ul>
    <hr>
    <p>${originalContent.substring(0, 200)}...</p>
    <p><em>(Refined with latest data from web)</em></p>
    `;

    return newContent;
}

async function updateArticle(id, newTitle, newContent, citations) {
    try {
        console.log(`Updating Article ${id}...`);
        await axios.put(`${API_URL}/${id}`, {
            title: newTitle, // Keep original title or update? Task says "searches title", implied keep or refine.
            content: newContent,
            source_citations: citations,
            is_updated: true
        });
        console.log('Article updated successfully!');
    } catch (error) {
        console.error('Error updating article:', error.response?.data || error.message);
    }
}

async function main() {
    const article = await fetchPendingArticle();

    if (!article) {
        console.log('No pending articles found to process.');
        return;
    }

    console.log(`Processing Article ID ${article.id}: "${article.title}"`);

    // 1. Search
    const urls = await searchGoogle(article.title);

    // 2. Scrape
    const scrapedData = [];
    for (const url of urls) {
        const data = await scrapeUrl(url);
        if (data.content) scrapedData.push(data);
    }

    // 3. LLM Rewrite
    const newContent = await callLLM(article.title + " " + (article.content || ''), scrapedData);

    // 4. Update
    await updateArticle(
        article.id,
        `(AI) ${article.title}`,
        newContent,
        scrapedData.map(d => d.url)
    );
}

main();