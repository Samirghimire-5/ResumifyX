"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { Search, Tag, ExternalLink } from "lucide-react";
import { useDispatch } from "react-redux";
import { setHtml } from "@/lib/redux/aiResumeHtml/resumeHtmlSlice";
import { useRouter } from "next/navigation";

interface templateTypes {
  _id: string;
  name: string;
  description: string;
  templateContent: string;
  previewImage: string;
  downloads?: number;
  category?: string;
  featured?: string;
}

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const router = useRouter()

  const {
    data: templates,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/templates`
      );
      return data.response;
    },
  });

  const filteredTemplates =
    searchTerm && templates
      ? templates.filter(
          (template: templateTypes) =>
            template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
      : templates;

  const handleTemplateClick = (template: templateTypes) => {
    // console.log(template)
    dispatch(setHtml(template.templateContent));
    router.push('/aiResume')
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading templates...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-700 font-medium">
                Failed to load templates. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Templates Gallery For AI_Resumes
        </h1>
        <p className="text-gray-600 mb-6">
          Browse our collection of professionally designed templates
        </p>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search templates..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredTemplates && filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template: templateTypes) => (
            <div
              key={template._id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl w-[220]"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${template.previewImage}`}
                  alt={template.name}
                  // width={300}
                  // height={200}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
                {template.featured && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {template.name}
                  </h2>
                  {template.category && (
                    <div className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      <Tag size={12} className="mr-1" />
                      {template.category}
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mt-2 text-sm line-clamp-2 min-h-12">
                  {template.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {template?.downloads
                      ? `${template.downloads} downloads`
                      : "New"}
                  </div>
                  <button
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => handleTemplateClick(template)}
                  >
                    Use Template
                    <ExternalLink size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gray-100 rounded-full p-6 mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No templates found
          </h3>
          <p className="text-gray-500 max-w-md">
            We couldn't find any templates matching your search. Try using
            different keywords or browse all templates.
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-blue-600 font-medium hover:text-blue-800"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Templates;
