import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-gray-900 bg-opacity-70 backdrop-blur-md sticky top-0 z-50 border-b border-indigo-500/30">
        <div className="h-12 relative">
          <Image
            className="text-white"
            src={"/resumifyx-logo.svg"}
            width={180}
            height={48}
            alt="ResumifyX logo"
            priority
          />
        </div>
        <div>
          <button className="mr-4 px-4 py-2 border border-indigo-500/50 text-cyan-400 rounded-lg font-semibold hover:bg-indigo-900/50 transition duration-300">
            <Link href={"/login"}>Login</Link>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-violet-700 transition duration-300 shadow-lg shadow-indigo-500/20">
            <Link href={"/register"}>Sign Up</Link>
          </button>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section className="text-center py-40 text-white relative">
        <div className="relative z-10 px-4 backdrop-blur-sm p-8 max-w-5xl mx-auto bg-gray-900 bg-opacity-60 rounded-lg shadow-2xl border border-indigo-500/30">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
            Build Your Resume & Portfolio Effortlessly
          </h1>
          <p className="mt-6 text-xl max-w-2xl mx-auto text-gray-300">
            ResumifyX helps you craft professional resumes and portfolios in minutes.
          </p>
          <button className="mt-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-indigo-700 hover:to-violet-700 transition duration-300 transform hover:scale-105">
            <Link href={"/register"}>Get Started</Link>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Why Choose ResumifyX?</h2>
        <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          Our platform simplifies the job-seeking process with powerful
          resume-building and portfolio tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-8 bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-indigo-500/30">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-blue-600 to-indigo-600">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-cyan-400">Resume Builder</h3>
            <p className="mt-4 text-gray-300">
              Easily create professional resumes with our intuitive editor.
            </p>
          </div>

          <div className="p-8 bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-indigo-500/30">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-indigo-600 to-violet-600">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-violet-400">Portfolio Showcase</h3>
            <p className="mt-4 text-gray-300">
              Display your work in a visually appealing online portfolio.
            </p>
          </div>

          <div className="p-8 bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-indigo-500/30">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-violet-600 to-purple-600">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-cyan-400">PDF Export</h3>
            <p className="mt-4 text-gray-300">
              Download your resume as a high-quality PDF instantly.
            </p>
          </div>

          <div className="p-8 bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-indigo-500/30">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-cyan-600 to-blue-600">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-violet-400">AI-Powered Suggestions</h3>
            <p className="mt-4 text-gray-300">
              Get AI-driven insights to optimize your resume for better job prospects.
            </p>
          </div>

          <div className="p-8 bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-indigo-500/30">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-blue-600 to-indigo-600">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-cyan-400">Customization</h3>
            <p className="mt-4 text-gray-300">
              Choose from various templates and styles to personalize your resume.
            </p>
          </div>

          <div className="p-8 bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-indigo-500/30">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-indigo-600 to-violet-600">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-violet-400">Secure Storage</h3>
            <p className="mt-4 text-gray-300">
              Store your resumes and portfolios securely and access them anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 text-white relative">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-900 bg-opacity-60 backdrop-blur-md p-6 rounded-lg border border-indigo-500/30 shadow-2xl">
              <p className="text-lg italic text-gray-300">
                "ResumifyX helped me land my dream job. The templates are professional and the AI suggestions were incredibly helpful."
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"></div>
                <div className="ml-3">
                  <h4 className="font-semibold text-cyan-400">Sarah Johnson</h4>
                  <p className="text-sm text-gray-400">Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 bg-opacity-60 backdrop-blur-md p-6 rounded-lg border border-indigo-500/30 shadow-2xl">
              <p className="text-lg italic text-gray-300">
                "The portfolio feature is incredible. I was able to showcase my design work effectively and received multiple interview requests."
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <div className="ml-3">
                  <h4 className="font-semibold text-violet-400">Michael Chen</h4>
                  <p className="text-sm text-gray-400">UI/UX Designer</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 bg-opacity-60 backdrop-blur-md p-6 rounded-lg border border-indigo-500/30 shadow-2xl">
              <p className="text-lg italic text-gray-300">
                "As a hiring manager, I appreciate candidates who use ResumifyX. Their resumes are consistently well-formatted and highlight relevant skills."
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-purple-600"></div>
                <div className="ml-3">
                  <h4 className="font-semibold text-cyan-400">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-400">HR Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white border-y border-indigo-500/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
            Start Building Your Resume Today
          </h2>
          <p className="mt-6 text-xl text-gray-300">
            Join thousands of users in crafting the perfect resume & portfolio.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-indigo-700 hover:to-violet-700 transition duration-300 transform hover:scale-105">
            <Link href={"/register"}>Sign Up Free</Link>
            </button>
            <button className="bg-transparent border-2 border-indigo-500/50 text-cyan-400 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-900/50 transition duration-300">
              View Demos
            </button>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            No credit card required. Start with our free plan.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-indigo-500/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">ResumifyX</h3>
              <p className="text-gray-400">
                Building better careers through professional resumes and portfolios.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyan-400">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Resume Builder</li>
                <li>Portfolio Creator</li>
                <li>AI Suggestions</li>
                <li>Template Library</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-violet-400">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyan-400">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-indigo-500/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} ResumifyX. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {/* Social Media Icons */}
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-indigo-500/30 hover:bg-indigo-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-indigo-500/30 hover:bg-indigo-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-violet-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-indigo-500/30 hover:bg-indigo-900/50 transition-colors">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;