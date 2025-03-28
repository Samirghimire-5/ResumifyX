import Image from "next/image";
import React from "react";

const DefaultTemplate = ({resume, imageUrl}: any) => {
  return (
    <div className="w-full h-full bg-white p-8 box-border shadow-md overflow-y-auto font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        {resume.personalInfo && (
          <div className="flex items-start mb-6">
            {imageUrl && (
              <div className="mr-6">
                <Image
                  src={imageUrl}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              </div>
            )}

            <div>
              <h1 className="text-3xl font-semibold text-gray-800 leading-tight">
                {resume.personalInfo.fullName}
              </h1>
              <p className="text-lg text-gray-600">
                {resume.personalInfo.jobTitle}
              </p>
              {/* Add other personal info fields (e.g., email, phone, location) */}
              {resume.personalInfo.email && (
                <p className="text-sm text-gray-600">
                  {resume.personalInfo.email}
                </p>
              )}
              {resume.personalInfo.phone && (
                <p className="text-sm text-gray-600">
                  {resume.personalInfo.phone}
                </p>
              )}
              {resume.personalInfo.address && (
                <p className="text-sm text-gray-600">
                  {resume.personalInfo.address}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Summary Section */}
        {resume.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Summary
            </h2>
            <p className="text-gray-700 mt-2 leading-relaxed">
              {resume.summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {resume.experience && resume.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Experience
            </h2>
            {resume.experience.map((exp: any, index: any) => (
              <div key={index} className="mt-4">
                <h3 className="font-semibold text-gray-700">{exp.role}</h3>
                <p className="text-sm text-gray-600">
                  {exp.companyName}, {exp.location}
                </p>
                <p className="text-sm text-gray-600">
                  {exp.startDate &&
                    new Date(exp.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  {exp.endDate &&
                    exp.endDate !== "" &&
                    ` - ${new Date(exp.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}`}
                  {(!exp.endDate || exp.endDate === "") &&
                    exp.startDate &&
                    " - Present"}
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  {exp.description &&
                    exp.description
                      .split("\n")
                      .map((item:any, descIndex:any) => (
                        <li key={descIndex}>{item}</li>
                      ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {resume.education && resume.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Education
            </h2>
            {resume.education.map((edu:any, index:any) => (
              <div key={index} className="mt-4">
                <h3 className="font-semibold text-gray-700">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-600">
                  {edu.startDate &&
                    new Date(edu.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  {edu.endDate &&
                    edu.endDate !== "" &&
                    ` - ${new Date(edu.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}`}
                  {(!edu.endDate || edu.endDate === "") &&
                    edu.startDate &&
                    " - Present"}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Skills Section */}
        {resume.skills && resume.skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Skills
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {resume.skills.map((skill:any, index:any) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default DefaultTemplate;
