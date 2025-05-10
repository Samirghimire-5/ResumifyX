import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const PreviewDefaultTemplate = ({ resume, resumeRef }: any) => {
  return (
    <div ref={resumeRef} className="w-full h-full p-6 max-w-3xl mx-auto font-sans bg-white">
      {/* Header / Personal Info */}
      {resume.personalInfo && (
        <header className="mb-6 flex items-start gap-4">
          {/* Photo on the left side */}
          {resume.personalInfo.image && (
            <img
              src={resume.personalInfo.image}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
              alt="Profile"
            />
          )}

          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {resume.personalInfo.fullName}
                </h1>
                <p className="text-md text-gray-600 font-medium mt-1">
                  {resume.personalInfo.jobTitle}
                </p>
              </div>

              <div className="text-sm text-right space-y-1">
                {resume.personalInfo.email && (
                  <p className="flex items-center gap-1">
                    <Mail size={16} />
                    <span>{resume.personalInfo.email}</span>
                  </p>
                )}
                {resume.personalInfo.phone && (
                  <p className="flex items-center gap-1">
                    <Phone size={16} />
                    <span>{resume.personalInfo.phone}</span>
                  </p>
                )}
                {resume.personalInfo.address && (
                  <p className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{resume.personalInfo.address}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 text-gray-800 pb-1 border-b border-gray-200">
            Summary
          </h2>
          <p className="text-sm leading-relaxed mt-2">{resume.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-800 pb-1 border-b border-gray-200">
            Work Experience
          </h2>
          {resume.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-md font-semibold">{exp.role}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate
                    ? `${exp.startDate} - ${
                        exp.endDate ? exp.endDate : "Present"
                      }`
                    : ""}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                {exp.companyName}
                {exp.location ? `, ${exp.location}` : ""}
              </p>
              {exp.description && (
                <ul className="mt-2 space-y-1 pl-1">
                  {exp.description
                    .split("\n")
                    .map((desc: string, i: number) => (
                      <li key={i} className="text-sm flex">
                        <span className="mr-2 text-gray-500">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-800 pb-1 border-b border-gray-200">
            Projects
          </h2>
          {resume.projects.map((project: any, index: number) => (
            <div key={index} className="mb-3">
              <h3 className="text-md font-semibold">{project.projectName}</h3>
              {project.description && (
                <ul className="mt-1 space-y-1 pl-1">
                  {project.description
                    .split("\n")
                    .map((desc: string, i: number) => (
                      <li key={i} className="text-sm flex">
                        <span className="mr-2 text-gray-500">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-800 pb-1 border-b border-gray-200">
            Education
          </h2>
          {resume.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-md font-semibold">{edu.degree}</h3>
                <span className="text-sm text-gray-600">
                  {edu.startDate
                    ? `${edu.startDate}- ${
                        edu.endDate ? edu.endDate : "Present"
                      }`
                    : null}
                </span>
              </div>
              <p className="text-sm">{edu.school}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-2 text-gray-800 pb-1 border-b border-gray-200">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {resume.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="text-sm bg-gray-100 px-3 py-1 rounded-md text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PreviewDefaultTemplate;