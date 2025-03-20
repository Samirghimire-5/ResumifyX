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
import { changeActiveForm } from "@/lib/redux/resumeForms/formSlice";

const InputSec = () => {
  const dispatch = useDispatch()

  const categories = [
    "Personal Info",
    "Summary",
    "Experience",
    "Education",
    "Skills",
  ];

  const activeForm = useSelector((state: any) => state.activeForm.currentForm)

  const handleBreadcrumbClick = (category: any) => {
    dispatch(changeActiveForm(category))
  };

  const renderForm = () => {
    switch (activeForm) {
      case "Skills":
        return <Skills />;
      case "Education":
        return <Education />;
      case "Personal Info":
        return <PersonalInfo />;
      case "Summary":
        return <Summary />;
      case "Experience":
        return <Experience />;
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
