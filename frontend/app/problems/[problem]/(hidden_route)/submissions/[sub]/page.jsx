"use client";

import { ChevronLeft, Link, Clock, CheckCircle, Code } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function SubmissionDetailsPage() {
  const { sub } = useParams();
  const router = useRouter();

  return (
    <div className="w-full flex flex-col bg-[#0E0E16] text-gray-200 min-h-screen">
      <div className="w-full flex justify-between items-center border-b border-gray-800 px-6 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Back to Submissions</span>
        </button>
        <Link
          size={20}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        />
      </div>

      <div className="flex flex-col p-6 gap-6">
        <div className="flex justify-between items-center bg-[#1A1A24] p-4 rounded-lg border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-900/30 border border-green-800/50">
              <CheckCircle size={24} className="text-green-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-400">Accepted</h1>
              <p className="text-sm text-gray-400 mt-1">Submission ID: {sub}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock size={16} />
            <span className="text-sm">April 6, 2025, 9:54 PM</span>
          </div>
        </div>

        <div className="bg-[#1A1A24] rounded-lg border border-gray-800 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 bg-[#2A2A36] border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Code size={18} className="text-purple-400" />
              <h2 className="font-semibold">Solution Code</h2>
            </div>
            <span className="text-sm font-medium text-purple-400">C++</span>
          </div>
          <div className="p-4">
            <pre className="bg-[#0E0E16] rounded-lg p-4 overflow-x-auto">
              <code className="text-sm font-mono text-gray-300">
                {`// Your code here
                #include &lt;iostream&gt;
                using namespace std;

                int main() {
                    cout &lt;&lt; "Hello, World!" &lt;&lt; endl;
                    return 0;
                }`}
              </code>
            </pre>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard
            title="Runtime"
            value="2 ms"
            icon={<Clock size={18} className="text-blue-400" />}
          />
          <MetricCard
            title="Memory"
            value="8.2 MB"
            icon={<Code size={18} className="text-green-400" />}
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <div className="bg-[#1A1A24] p-4 rounded-lg border border-gray-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <span className="text-lg font-bold text-purple-400">{value}</span>
    </div>
  );
}
