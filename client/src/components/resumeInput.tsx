"use client";
import React, { useState } from "react";
import { Card } from "./ui/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import PersonalInfo from "./resumeForm/personal";
import Summary from "./resumeForm/summary";
import Experience from "./resumeForm/experiences";
import Education from "./resumeForm/educations";
import Skills from "./resumeForm/skills";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";
import Projects from "./resumeForm/projects";

const InputSec = ({setPreviewPhoto}: any) => {

  const categories = [
    "Personal Info",
    "Experiences",
    "Skills",
    "Projects",
    "Educations",
    "Summary",
  ];

  const [activeForm, setActiveForm] = useState('Personal Info')

  const handleBreadcrumbClick = (category: any) => {
    setActiveForm(category)
  };

  const renderForm = () => {
    switch (activeForm) {
      case "Skills":
        return <Skills setActiveForm={setActiveForm}/>;
      case "Educations":
        return <Education setActiveForm={setActiveForm}/>;
      case "Personal Info":
        return <PersonalInfo setActiveForm={setActiveForm}/>;
      case "Summary":
        return <Summary />;
      case "Experiences":
        return <Experience setActiveForm={setActiveForm} />;
      case "Projects":
        return <Projects setActiveForm={setActiveForm} />;
      default:
        return null;
    }
  };

  return (
    <Card className="flex flex-col items-center max-h-[80vh] min-h-[80vh] w-[40%] p-4 cursor-pointer">
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
      <div className="w-full h-full overflow-y-auto">{renderForm()}</div>
      {/* <RotateCcw className="left-2 bottom-2"/> */}
    </Card>
  );
};

export default InputSec;
