import React from "react";

const PreviewDefaultTemplate = ({ resume }: any) => (
  <div className="p-5 max-w-3xl mx-auto font-sans">
    {/* Personal Info */}
    {resume.personalInfo && (
      <section className="mb-4 pb-2 border-b border-gray-200">
        {resume.personalInfo.image && (
          <img 
            src={resume.personalInfo.image} 
            className="w-20 h-20 rounded-full mb-3 object-cover" 
            alt="Profile"
          />
        )}
        <h1 className="text-xl font-bold">{resume.personalInfo.fullName}</h1>
        <p className="text-sm">{resume.personalInfo.jobTitle}</p>
        <div className="text-xs space-y-1 mt-1">
          {resume.personalInfo.email && <p>{resume.personalInfo.email}</p>}
          {resume.personalInfo.phone && <p>{resume.personalInfo.phone}</p>}
          {resume.personalInfo.address && <p>{resume.personalInfo.address}</p>}
        </div>
      </section>
    )}

    {/* Summary */}
    {resume.summary && (
      <section className="mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-lg font-bold mb-1">Summary</h2>
        <p className="text-sm">{resume.summary}</p>
      </section>
    )}

    {/* Experience */}
    {resume.experience && resume.experience.length > 0 && (
      <section className="mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-lg font-bold mb-1">Experience</h2>
        {resume.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-3">
            <p className="text-sm font-medium">
              {exp.role} - {exp.companyName}, {exp.location}
            </p>
            <p className="text-xs text-gray-600">
              {exp.startDate} - {exp.endDate || "Present"}
            </p>
            {exp.description && (
              <ul className="mt-1 space-y-1">
                {exp.description.split("\n").map((desc: string, i: number) => (
                  <li key={i} className="text-xs flex">
                    <span className="mr-1">•</span>
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
      <section className="mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-lg font-bold mb-1">Education</h2>
        {resume.education.map((edu: any, index: number) => (
          <div key={index} className="mb-2">
            <p className="text-sm">{edu.degree} - {edu.school}</p>
            <p className="text-xs text-gray-600">
              {edu.startDate} - {edu.endDate || "Present"}
            </p>
          </div>
        ))}
      </section>
    )}

    {/* Skills */}
    {resume.skills && resume.skills.length > 0 && (
      <section className="mb-4">
        <h2 className="text-lg font-bold mb-1">Skills</h2>
        <ul className="space-y-1">
          {resume.skills.map((skill: string, index: number) => (
            <li key={index} className="text-xs flex">
              <span className="mr-1">•</span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </section>
    )}
  </div>
);

export default PreviewDefaultTemplate;