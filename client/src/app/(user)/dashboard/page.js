"use client";
import { useSelector } from "react-redux";
import React from "react";
import { Plus } from "lucide-react";


const Dashboard = () => {

  const user = useSelector((state) => state.userData.user)

  if (!user) {
    return <div>...loading</div>
  }

  return (
    <main className="px-4 py-6 md:px-8 max-w-fit">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{`Welcome back, ${user.username}`}</h1>
        <p className="text-gray-600">
          Pick up where you left off or start something new.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-8 mb-8 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Resumes Created</h3>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Downloads</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Active Plan</h3>
          <p className="text-2xl font-bold">Free</p>
        </div>
      </div>

      {/* Recent Resumes */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Resumes</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View All
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Resume items */}
          {["Marketing Specialist", "Software Developer"].map(
            (title, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                <div className="mb-3 h-36 bg-gray-100 rounded-md flex items-center justify-center">
                  <img
                    src="/api/placeholder/120/160"
                    alt={`Resume preview`}
                    className="h-32 shadow-sm"
                  />
                </div>
                <h3 className="mb-1 text-md font-medium">{title}</h3>
                <p className="mb-3 text-xs text-gray-500">
                  Last edited: March 10, 2025
                </p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
                    Download
                  </button>
                </div>
              </div>
            )
          )}

          {/* Create new resume card */}
          <div className="p-4 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
            <div className="mb-3 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="mb-1 text-md font-medium">Create New Resume</h3>
            <p className="mb-4 text-xs text-gray-500">
              Start from scratch or use a template
            </p>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            Recommended Templates
          </h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
            Browse All
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {["Professional", "Modern", "Creative", "Simple"].map(
            (template, index) => (
              <div
                key={index}
                className="overflow-hidden bg-white rounded-lg shadow-sm"
              >
                <div className="h-40 bg-gray-100">
                  <img
                    src={`/api/placeholder`}
                    alt={`${template} template`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3">
                  <h3 className="mb-1 text-sm font-medium">{template}</h3>
                  <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
                    Use Template
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Premium Banner */}
      <div className="p-6 mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="mb-2 text-xl font-bold">Upgrade to Premium</h3>
            <p className="text-blue-100">
              Get access to 50+ premium templates and advanced features.
            </p>
          </div>
          <button className="px-6 py-2 font-medium text-blue-600 bg-white rounded-md hover:bg-blue-50">
            Upgrade Now
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
