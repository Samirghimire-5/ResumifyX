"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  delExperience,
  updateExperience,
} from "@/lib/redux/resumeData/resumeDataSlice";

const Experience = ({ setActiveForm }: any) => {
  const dispatch = useDispatch();
  const experiences = useSelector((state: any) => state.resumeData.experience);

  interface Experience {
    role: string;
    companyName: string;
    startDate: string;
    endDate: string;
    description: string;
  }

  interface ExperienceForm {
    experience: Experience[]; 
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExperienceForm>();

  const watchExperience = watch();

  const formatDateInput = (value: string) => {
    // Remove all non-digit characters
    let formattedValue = value.replace(/\D/g, '');
    
    // Add hyphens at appropriate positions
    if (formattedValue.length > 4) {
      formattedValue = formattedValue.substring(0, 4) + '-' + formattedValue.substring(4);
    }
    if (formattedValue.length > 7) {
      formattedValue = formattedValue.substring(0, 7) + '-' + formattedValue.substring(7);
    }
    
    // Limit to 10 characters (YYYY-MM-DD)
    return formattedValue.substring(0, 10);
  };

  const updateExp = (index: any, item: any) => {
    dispatch(updateExperience({ data: item, index }));
  };

  const onSubmit = async (data: any) => {
    setActiveForm("Skills");
  };

  const addNew = () => {
    dispatch(
      addExperience({
        role: "",
        companyName: "",
        startDate: "",
        endDate: "",
        description: "",
      })
    );
  };

  const deleteExp = (index: any) => {
    dispatch(delExperience(index));
  };

  const preventDefault = (e: any) => {
    if (e.key === "Enter") e.preventDefault();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center font-serif">
        <p className="font-bold text-xl">Work Experience</p>
        <p className="font-light text-sm">
          Add as many work experience as you like.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center"
      >
        {experiences.map((item: any, index: any) => {
          return (
            <Card key={index} className="w-full p-3">
              <p className="font-sans font-bold text-[16]">{`Work Experience ${
                index + 1
              }`}</p>

              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    Role
                  </label>
                  <Input
                    {...register(`experience.${index}.role`)}
                    type="text"
                    placeholder="Software Engineer"
                    onChange={(e) =>
                      updateExp(index, { ...item, role: e.target.value })
                    }
                    onKeyDown={(e) => preventDefault(e)}
                  />
                </div>

                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    Company name
                  </label>
                  <Input
                    {...register(`experience.${index}.companyName`)}
                    onChange={(e) =>
                      updateExp(index, { ...item, companyName: e.target.value })
                    }
                    onKeyDown={(e) => preventDefault(e)}
                  />
                </div>

                <div className="flex justify-between overflow-x-auto w-full gap-2">
                  <div className="flex flex-col w-full">
                    <label className="font-semibold font-sans text-sm">
                      Start date
                    </label>
                    <Input
                      {...register(`experience.${index}.startDate`)}
                      placeholder="YYYY-MM-DD"
                      value={item.startDate || ''}
                      onChange={(e) => {
                        const formattedValue = formatDateInput(e.target.value);
                        updateExp(index, { ...item, startDate: formattedValue });
                      }}
                      onKeyDown={(e) => preventDefault(e)}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="font-semibold font-sans text-sm">
                      End date
                    </label>
                    <Input
                      {...register(`experience.${index}.endDate`)}
                      placeholder="YYYY-MM-DD"
                      value={item.endDate || ''}
                      onChange={(e) => {
                        const formattedValue = formatDateInput(e.target.value);
                        updateExp(index, { ...item, endDate: formattedValue });
                      }}
                      onKeyDown={(e) => preventDefault(e)}
                    />
                  </div>
                </div>

                <p className="font-light font-sans text-sm">
                  Leave the end date empty if your currently working here.
                </p>

                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    Description
                  </label>
                  <Textarea
                    {...register(`experience.${index}.description`)}
                    onChange={(e) =>
                      updateExp(index, { ...item, description: e.target.value })
                    }
                    onKeyDown={(e) => preventDefault(e)}
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={() => deleteExp(index)}
                className="bg-red-600 hover:bg-red-400 w-fit"
              >
                <Minus />
                Remove
              </Button>
            </Card>
          );
        })}

        <Button
          type="button"
          onClick={() => addNew()}
          className="bg-green-500 hover:bg-green-700"
        >
          <Plus />
          Add new{" "}
        </Button>

        <Button type="submit">
          Next <ChevronRight />
        </Button>
      </form>
    </div>
  );
};

export default Experience;