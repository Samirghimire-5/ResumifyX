"use client";
import React, { useState } from "react";
import { Card } from "./ui/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import PersonalInfo from "./resumeForm/personalInfo";
import Summary from "./resumeForm/summaryInfo";
import Experience from "./resumeForm/experienceInfo";
import Education from "./resumeForm/educationInfo";
import Skills from "./resumeForm/skillsInfo";
import { useDispatch, useSelector } from "react-redux";

const InputSec = ({setPreviewPhoto}: any) => {

  const categories = [
    "Personal Info",
    "Summary",
    "Experience",
    "Education",
    "Skills",
  ];

  const [activeForm, setActiveForm] = useState('Personal Info')

  const handleBreadcrumbClick = (category: any) => {
    setActiveForm(category)
  };

  const renderForm = () => {
    switch (activeForm) {
      case "Skills":
        return <Skills />;
      case "Education":
        return <Education setActiveForm={setActiveForm}/>;
      case "Personal Info":
        return <PersonalInfo setPreviewPhoto={setPreviewPhoto} setActiveForm={setActiveForm}/>;
      case "Summary":
        return <Summary setActiveForm={setActiveForm}/>;
      case "Experience":
        return <Experience setActiveForm={setActiveForm} />;
      default:
        return null;
    }
  };

  return (
    <Card className="flex flex-col items-center max-h-[75vh] min-h-[75vh] w-[40%] p-4 cursor-pointer">
      <Breadcrumb>
        <BreadcrumbList>
          {categories.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbPage
                className="text-sm font-semibold"
                onClick={() => handleBreadcrumbClick(item)}
              >
                {item}
              </BreadcrumbPage>
              {index < categories.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full overflow-y-auto">{renderForm()}</div>
    </Card>
  );
};

export default InputSec;
