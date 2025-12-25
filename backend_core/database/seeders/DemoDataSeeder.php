<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;

class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. The AI Enhanced Article
        Article::create([
            'title' => '(AI) Chatbots Magic: Beginner’s Guidebook',
            'content' => '(AI Rewritten) Chatbots Magic: Beginner’s Guidebook ... Analysis of search results: Data from https://www.ibm.com/topics/artificial-intelligence ... Chatbots Magic: Beginner’s Guidebook ... (Refined with latest data from web)',
            'original_url' => 'https://beyondchats.com/blogs/chatbots-magic-beginners-guidebook/',
            'source_citations' => json_encode(['https://www.ibm.com/topics/artificial-intelligence']),
            'is_updated' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2. Original Article
        Article::create([
            'title' => 'From 0 to Sales Hero: How Sales Chatbots Increase Conversions',
            'content' => null, // Represents un-scraped content
            'original_url' => 'https://beyondchats.com/blogs/sales-chatbots-increase-conversions/',
            'is_updated' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 3. Original Article
        Article::create([
            'title' => 'Can Chatbots Boost Your E-commerce Conversions?',
            'content' => null,
            'original_url' => 'https://beyondchats.com/blogs/can-chatbots-boost-your-e-commerce-conversions/',
            'is_updated' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 4. Original Article
        Article::create([
            'title' => '10 Solutions for Common Customer Service Issues',
            'content' => null,
            'original_url' => 'https://beyondchats.com/blogs/10-solutions-for-common-customer-service-issues/',
            'is_updated' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 5. Original Article
        Article::create([
            'title' => 'Chatbots Vs Live Chat: What is best?',
            'content' => null,
            'original_url' => 'https://beyondchats.com/blogs/chatbots-vs-live-chat/',
            'is_updated' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
