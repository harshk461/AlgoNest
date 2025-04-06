// app/roadmap/page.jsx
"use client";

import { useState } from "react";
import Footer from "@/components/Others/Footer";
import { CheckCircle, Lock, ChevronRight, BookOpen, Code, Database, Server, Globe } from "lucide-react";
import Link from "next/link";

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState("frontend");
  
  const roadmaps = {
    frontend: {
      title: "Frontend Development",
      icon: <Globe className="text-blue-500" size={24} />,
      description: "Master modern frontend technologies and frameworks to build responsive, interactive web applications.",
      milestones: [
        {
          title: "HTML & CSS Fundamentals",
          completed: true,
          items: [
            { name: "HTML5 Semantic Elements", completed: true },
            { name: "CSS Box Model & Flexbox", completed: true },
            { name: "CSS Grid Layout", completed: true },
            { name: "Responsive Design Principles", completed: true }
          ]
        },
        {
          title: "JavaScript Essentials",
          completed: true,
          items: [
            { name: "JavaScript Syntax & Data Types", completed: true },
            { name: "DOM Manipulation", completed: true },
            { name: "Asynchronous JavaScript", completed: true },
            { name: "ES6+ Features", completed: true }
          ]
        },
        {
          title: "Frontend Frameworks",
          completed: false,
          items: [
            { name: "React Fundamentals", completed: true },
            { name: "State Management (Redux/Context)", completed: true },
            { name: "React Hooks & Custom Hooks", completed: false },
            { name: "Next.js & Server Components", completed: false }
          ]
        },
        {
          title: "Advanced Concepts",
          completed: false,
          locked: true,
          items: [
            { name: "Performance Optimization", completed: false },
            { name: "Animations & Transitions", completed: false },
            { name: "Testing (Jest, React Testing Library)", completed: false },
            { name: "Micro Frontends Architecture", completed: false }
          ]
        }
      ]
    },
    backend: {
      title: "Backend Development",
      icon: <Server className="text-green-500" size={24} />,
      description: "Build robust server-side applications, APIs, and services that power modern web applications.",
      milestones: [
        {
          title: "Server-Side Basics",
          completed: true,
          items: [
            { name: "HTTP Protocol & REST Principles", completed: true },
            { name: "Node.js Fundamentals", completed: true },
            { name: "Express.js Framework", completed: true },
            { name: "API Design Best Practices", completed: true }
          ]
        },
        {
          title: "Database Integration",
          completed: false,
          items: [
            { name: "SQL Fundamentals", completed: true },
            { name: "NoSQL Concepts", completed: true },
            { name: "ORM/ODM (Sequelize/Mongoose)", completed: false },
            { name: "Database Design Patterns", completed: false }
          ]
        },
        {
          title: "Authentication & Security",
          completed: false,
          items: [
            { name: "JWT Authentication", completed: false },
            { name: "OAuth 2.0 & OpenID Connect", completed: false },
            { name: "Security Best Practices", completed: false },
            { name: "Input Validation & Sanitization", completed: false }
          ]
        },
        {
          title: "Advanced Backend Concepts",
          completed: false,
          locked: true,
          items: [
            { name: "Microservices Architecture", completed: false },
            { name: "Message Queues & Event-Driven Design", completed: false },
            { name: "GraphQL API Development", completed: false },
            { name: "Containerization & Orchestration", completed: false }
          ]
        }
      ]
    },
    algorithms: {
      title: "Algorithms & Data Structures",
      icon: <Code className="text-purple-500" size={24} />,
      description: "Master the fundamental algorithms and data structures essential for solving complex programming problems and acing technical interviews.",
      milestones: [
        {
          title: "Data Structures Fundamentals",
          completed: true,
          items: [
            { name: "Arrays & Strings", completed: true },
            { name: "Linked Lists", completed: true },
            { name: "Stacks & Queues", completed: true },
            { name: "Hash Tables", completed: true }
          ]
        },
        {
          title: "Basic Algorithms",
          completed: false,
          items: [
            { name: "Sorting Algorithms", completed: true },
            { name: "Searching Algorithms", completed: true },
            { name: "Recursion & Backtracking", completed: false },
            { name: "Greedy Algorithms", completed: false }
          ]
        },
        {
          title: "Advanced Data Structures",
          completed: false,
          items: [
            { name: "Trees & Binary Search Trees", completed: false },
            { name: "Heaps & Priority Queues", completed: false },
            { name: "Graphs & Graph Algorithms", completed: false },
            { name: "Trie & Suffix Trees", completed: false }
          ]
        },
        {
          title: "Complex Algorithms",
          completed: false,
          locked: true,
          items: [
            { name: "Dynamic Programming", completed: false },
            { name: "Advanced Graph Algorithms", completed: false },
            { name: "String Matching Algorithms", completed: false },
            { name: "NP-Complete Problems", completed: false }
          ]
        }
      ]
    },
    database: {
      title: "Database Systems",
      icon: <Database className="text-yellow-500" size={24} />,
      description: "Learn database design, optimization, and management across SQL and NoSQL systems to build efficient data-driven applications.",
      milestones: [
        {
          title: "Relational Database Fundamentals",
          completed: true,
          items: [
            { name: "SQL Syntax & Queries", completed: true },
            { name: "Database Normalization", completed: true },
            { name: "Indexing & Query Optimization", completed: true },
            { name: "Transactions & ACID Properties", completed: true }
          ]
        },
        {
          title: "NoSQL Databases",
          completed: false,
          items: [
            { name: "Document Databases (MongoDB)", completed: true },
            { name: "Key-Value Stores (Redis)", completed: true },
            { name: "Column-Family Stores (Cassandra)", completed: false },
            { name: "Graph Databases (Neo4j)", completed: false }
          ]
        },
        {
          title: "Database Design & Modeling",
          completed: false,
          items: [
            { name: "Entity-Relationship Modeling", completed: false },
            { name: "Schema Design Patterns", completed: false },
            { name: "Data Warehousing Concepts", completed: false },
            { name: "Database Migration Strategies", completed: false }
          ]
        },
        {
          title: "Advanced Database Concepts",
          completed: false,
          locked: true,
          items: [
            { name: "Distributed Database Systems", completed: false },
            { name: "Database Sharding & Partitioning", completed: false },
            { name: "Database Replication & High Availability", completed: false },
            { name: "Big Data Processing Systems", completed: false }
          ]
        }
      ]
    }
  };

  const calculateProgress = (milestones) => {
    let completedItems = 0;
    let totalItems = 0;
    
    milestones.forEach(milestone => {
      if (!milestone.locked) {
        milestone.items.forEach(item => {
          totalItems++;
          if (item.completed) completedItems++;
        });
      }
    });
    
    return {
      percentage: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
      completed: completedItems,
      total: totalItems
    };
  };

  const activeRoadmap = roadmaps[activeTab];
  const progress = calculateProgress(activeRoadmap.milestones);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learning Roadmaps
            </h1>
            <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
              Follow structured learning paths designed to take you from beginner to expert in various domains of software development.
            </p>
          </div>
          
          {/* Roadmap Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {Object.keys(roadmaps).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === key 
                    ? "bg-zinc-800 text-white" 
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                }`}
              >
                {roadmaps[key].icon}
                {roadmaps[key].title}
              </button>
            ))}
          </div>
          
          {/* Active Roadmap */}
          <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <Link href={"/roadmap/frontend"} className="text-2xl font-bold flex items-center gap-2">
                  {activeRoadmap.icon}
                  {activeRoadmap.title}
                </Link>
                <p className="text-zinc-400 mt-2">
                  {activeRoadmap.description}
                </p>
              </div>
              
              <div className="bg-zinc-800 rounded-lg p-4 w-full md:w-auto">
                <div className="flex items-center justify-between gap-8 mb-2">
                  <span className="text-zinc-400">Progress</span>
                  <span className="font-semibold">{progress.percentage}%</span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-zinc-500 mt-2">
                  {progress.completed} of {progress.total} topics completed
                </div>
              </div>
            </div>
            
            {/* Milestones */}
            <div className="space-y-8">
              {activeRoadmap.milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg ${
                    milestone.locked 
                      ? "border-zinc-800 bg-zinc-900/50" 
                      : milestone.completed 
                        ? "border-green-900/30 bg-green-900/10" 
                        : "border-blue-900/30 bg-blue-900/10"
                  }`}
                >
                  <div className="p-4 md:p-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {milestone.locked ? (
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                          <Lock size={16} className="text-zinc-500" />
                        </div>
                      ) : milestone.completed ? (
                        <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center">
                          <CheckCircle size={16} className="text-green-500" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                          <BookOpen size={16} className="text-blue-500" />
                        </div>
                      )}
                      <h3 className={`font-semibold text-lg ${milestone.locked ? "text-zinc-500" : "text-white"}`}>
                        {milestone.title}
                      </h3>
                    </div>
                    
                    {milestone.locked ? (
                      <button className="px-4 py-1.5 bg-zinc-800 text-zinc-400 rounded-md text-sm font-medium flex items-center gap-1">
                        Premium <Lock size={14} />
                      </button>
                    ) : (
                      <ChevronRight size={20} className="text-zinc-500" />
                    )}
                  </div>
                  
                  {!milestone.locked && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {milestone.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex} 
                          className={`flex items-center gap-2 p-2 rounded ${
                            item.completed ? "text-green-400" : "text-zinc-400"
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle size={16} className="text-green-500 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-zinc-700 shrink-0"></div>
                          )}
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-900/30">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to advance your skills?</h3>
                <p className="text-zinc-400">
                  Unlock all roadmap content and get personalized guidance with AlgoNest Premium.
                </p>
              </div>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap">
                Get Premium Access
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
