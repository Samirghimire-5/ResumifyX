"use client";
import React, { useState } from "react";

import { Card } from "./ui/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import PersonalInfo from "./personalInfo";

const InputSec = () => {
  const categories = [
    "Personal Info",
    "Summary",
    "Expirence",
    "Education",
    "Skills",
  ];
  const [activeForm, setActiveForm] = useState("Personal Info");

  const handleBreadcrumbClick = (category: any) => {
    setActiveForm(category);
  };

  const renderForm = () => {
    switch (activeForm) {
      case "Skills":
        return <div>Skills Form Content</div>;
      case "Education":
        return <div>Education Form Content</div>;
      case "Personal Info":
        return <PersonalInfo />;
      case "Summary":
        return <div>Summary Form Content</div>;
      case "Expirence":
        return <div>exp</div>
      default:
        return null;
    }
  };

  return (
      <Card className="flex flex-col items-center min-h-[75%] w-[40%] p-4 cursor-pointer">
        <Breadcrumb>
          <BreadcrumbList>
            {categories.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbPage className="text-sm font-semibold" onClick={() => handleBreadcrumbClick(item)}>
                  {item}
                </BreadcrumbPage>
                {index < categories.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="w-full overflow-y-auto">
          {renderForm()}
        </div>
      </Card>
  );
};

export default InputSec;
