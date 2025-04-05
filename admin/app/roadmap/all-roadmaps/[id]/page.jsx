 'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { motion } from 'framer-motion';

export default function RoadmapPage() {
  const params = useParams();
  const id = params?.id;
  const [data, setData] = useState(null);

  const getSingleRoadmap = async (roadmapId) => {
    try {
      const res = await axios.get(`http://localhost:3090/roadmaps/get-roadmap?id=${roadmapId}`);
      setData(res.data);
    } catch (err) {
      console.error('Error fetching roadmap:', err.response?.data || err.message);
    }
  }

  useEffect(() => {
    if (id) getSingleRoadmap(id);
  }, [id]);

  if (!data) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
      <div className="animate-pulse text-2xl text-white/50">Loading Roadmap...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      {/* Header Section */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <div className="inline-flex items-center gap-4 mb-8">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: data.iconColor }}
          >
            {data.iconName === 'check-circle' && '✓'}
            {data.iconName === 'star' && '★'}
            {data.iconName === 'heart' && '❤️'}
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {data.name}
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">{data.description}</p>
      </motion.header>

      {/* Timeline Visualization */}
      <div className="max-w-7xl mx-auto space-y-16">
       {data.topics
        .slice()
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((topic, index) => (
          <motion.div 
            key={topic.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            {/* Timeline Connector */}
            <div className="absolute left-8 top-12 bottom-12 w-1 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2"></div>

            <div className="relative pl-24">
              {/* Timeline Dot */}
              <div className="absolute left-8 top-6 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 transform -translate-x-1/2 shadow-glow"></div>

              {/* Topic Card */}
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/30">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-blue-400">0{index + 1}</span>
                  {topic.name}
                </h2>
                <p className="text-gray-400 mb-6">{topic.description}</p>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topic.resources.map((resource, resIndex) => (
                    <div 
                      key={resIndex}
                      className="bg-gray-900/50 p-6 rounded-xl hover:bg-gray-800/50 transition-colors border border-gray-700/20"
                    >
                      <h3 className="text-lg font-semibold text-white mb-3">{resource.title}</h3>
                      <p className="text-gray-400 mb-4">{resource.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {resource.link.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm hover:bg-blue-500/30 transition-colors"
                          >
                            Resource {linkIndex + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
