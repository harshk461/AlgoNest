'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlexWrapper from '@/components/FlexWrapper';
import Heading from '@/components/Common/Heading';
import { useParams } from 'next/navigation';
import { LinkIcon } from 'lucide-react';

export default function ResourcePage() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3090/roadmaps/get-resource?id=${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <FlexWrapper>
        <Heading
          heading="Resource"
          className="text-center py-8 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-extrabold"
        />

        {/* Resource Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {data.map((item, index) => (
              <div
                key={index}
                className="relative group bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.05] hover:shadow-xl border border-gray-700/50"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative space-y-4">
                  {/* Title */}
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                    {item.description}
                  </p>

                  {/* Links */}
                  {item.link && item.link.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-purple-400 mb-3 flex items-center uppercase tracking-wide">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Resources
                      </h3>
                      <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                        {item.link.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-[12px] py-[8px] bg-gray-[700]/20 rounded-full text-sm font-medium text-blue-[300] hover:bg-blue-[500]/20 hover:text-blue-[200] transition-all duration-[300ms]"
                          >
                            {/* Display hostname */}
                            <span>{new URL(link).hostname}</span>
                            {/* External Link Icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-[16px] h-[16px] ml-[8px]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
    </FlexWrapper>
  );
}
