// app/roadmap/[slug]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar2 from "@/components/Others/Navbar2";
import Footer from "@/components/Others/Footer";
import { CheckCircle, Lock, ArrowLeft, BookOpen, ChevronDown, ChevronUp, Globe, Server, Code, Database } from "lucide-react";

export default function SpecificRoadmapPage() {
  const params = useParams();
  const router = useRouter();
  const [roadmap, setRoadmap] = useState(null);
  const [expandedMilestones, setExpandedMilestones] = useState({});
  
  // Roadmap data - in a real app, you would fetch this from an API
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
          ],
          resources: [
            { type: "video", title: "HTML & CSS Crash Course", url: "#" },
            { type: "article", title: "CSS Grid Complete Guide", url: "#" },
            { type: "exercise", title: "Build a Responsive Layout", url: "#" }
          ],
          description: "Learn the core building blocks of web pages. HTML provides structure while CSS controls presentation and layout."
        },
        // Other milestones with similar structure...
      ]
    },
    // Other roadmaps...
  };
  
  useEffect(() => {
    if (params.slug && roadmaps[params.slug]) {
      setRoadmap(roadmaps[params.slug]);
      
      // Initialize all milestones as expanded
      const initialExpandState = {};
      roadmaps[params.slug].milestones.forEach((_, index) => {
        initialExpandState[index] = true;
      });
      setExpandedMilestones(initialExpandState);
    } else {
      router.push("/roadmap");
    }
  }, [params.slug, router]);
  
  const toggleMilestone = (index) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
  
  if (!roadmap) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar2 />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading roadmap...</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const progress = calculateProgress(roadmap.milestones);
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar2 />
      
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <button 
            onClick={() => router.push("/roadmap")}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to all roadmaps
          </button>
          
          <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  {roadmap.icon}
                  {roadmap.title}
                </h1>
                <p className="text-zinc-400 mt-2">
                  {roadmap.description}
                </p>
              </div>
              
              <div className="bg-zinc-800 rounded-lg p-4 w-full md:w-auto">
                <div className="flex items-center justify-between gap-8 mb-2">
                  <span className="text-zinc-400">Overall Progress</span>
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
            
            <div className="prose prose-invert max-w-none mb-8">
              <h2>About this roadmap</h2>
              <p>This comprehensive learning path will guide you through all the essential skills and concepts needed to become proficient in {roadmap.title.toLowerCase()}. Each milestone builds upon the previous one, providing a structured approach to mastering this domain.</p>
              
              <h2>How to use this roadmap</h2>
              <ul>
                <li>Complete each milestone in sequence for the best learning experience</li>
                <li>Mark topics as completed as you progress through them</li>
                <li>Use the provided resources to deepen your understanding</li>
                <li>Practice with the suggested exercises to reinforce your learning</li>
              </ul>
            </div>
          </div>
          
          {/* Detailed Milestones */}
          <div className="space-y-6">
            {roadmap.milestones.map((milestone, index) => (
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
                <div 
                  className="p-4 md:p-6 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleMilestone(index)}
                >
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
                    expandedMilestones[index] ? (
                      <ChevronUp size={20} className="text-zinc-500" />
                    ) : (
                      <ChevronDown size={20} className="text-zinc-500" />
                    )
                  )}
                </div>
                
                {!milestone.locked && expandedMilestones[index] && (
                  <div className="px-4 md:px-6 pb-6">
                    {milestone.description && (
                      <div className="mb-6 text-zinc-400 border-l-2 border-zinc-700 pl-4">
                        {milestone.description}
                      </div>
                    )}
                    
                    <h4 className="text-md font-medium mb-3 text-zinc-300">Topics to master:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {milestone.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex} 
                          className={`flex items-center gap-2 p-3 rounded-md ${
                            item.completed ? "bg-green-900/20 text-green-400" : "bg-zinc-800/50 text-zinc-300"
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle size={16} className="text-green-500 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-zinc-600 shrink-0"></div>
                          )}
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    {milestone.resources && (
                      <>
                        <h4 className="text-md font-medium mb-3 text-zinc-300">Learning resources:</h4>
                        <div className="grid grid-cols-1 gap-2 mb-4">
                          {milestone.resources.map((resource, resourceIndex) => (
                            <div key={resourceIndex} className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-md">
                              {resource.type === "video" && (
                                <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                  </svg>
                                </div>
                              )}
                              {resource.type === "article" && (
                                <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                  </svg>
                                </div>
                              )}
                              {resource.type === "exercise" && (
                                <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                  </svg>
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-zinc-200">{resource.title}</div>
                                <div className="text-xs text-zinc-500 capitalize">{resource.type}</div>
                              </div>
                              <button className="ml-auto px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-sm">
                                View
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between mt-4">
                      <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md text-sm transition-colors">
                        Mark all as completed
                      </button>
                      
                      {milestone.completed ? (
                        <button className="px-4 py-2 bg-green-900/30 text-green-400 rounded-md text-sm">
                          Completed
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors">
                          Start learning
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-900/30">
            <div>
              <h3 className="text-xl font-bold mb-2">Want personalized guidance?</h3>
              <p className="text-zinc-400">
                Get expert mentorship, project reviews, and certification with AlgoNest Premium.
              </p>
            </div>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
