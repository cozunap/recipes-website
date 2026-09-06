'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/v1/projects');
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    const name = prompt('Enter project name:');
    if (!name) return;
    
    try {
      const res = await fetch('/api/v1/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        fetchProjects(); // Refresh the list
      }
    } catch (e) {
      console.error('Failed to create project', e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Projects</h1>
        
        {loading ? (
          <p className="text-gray-500">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div 
                key={proj.id} 
                onClick={() => router.push(`/editor/${proj.id}/page_001`)}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-center min-h-[200px] cursor-pointer hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold text-lg text-gray-800">{proj.name}</h3>
                <p className="text-sm text-gray-500 mt-2">ID: {proj.id.substring(0,8)}</p>
              </div>
            ))}
            
            <div 
              onClick={handleCreateProject}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-500 font-medium">+ New Project</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
