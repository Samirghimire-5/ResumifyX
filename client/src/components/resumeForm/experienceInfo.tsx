"use client";
import React, { useEffect, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { DatePicker } from "../datePicker";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  delExperience,
  updateExperience,
} from "@/lib/redux/resumeData/resumeDataSlice";

const Experience = ({setActiveForm}: any) => {
  const dispatch = useDispatch();
  const experiences = useSelector((state: any) => state.resumeData.experience);
  // console.log(experiences);

  interface ExperienceForm {
    jobTitle: string;
    companyName: string;
    startDate: Date | null;
    endDate: Date | null;
    description: string;
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ExperienceForm>();

  const updateExp = (index: any, item: any) => {
    const data = {...item, 
      startDate: item.startDate ? item.startDate.toISOString(): null,
      endDate: item.endDate ? item.endDate.toISOString(): null,
    }
    dispatch(updateExperience({data, index}))
  };

  const onSubmit = (data: any) => {
    console.log(data)
  };

  const addNew = () => {
    dispatch(
      addExperience({
        jobTitle: "",
        companyName: "",
        startDate: null,
        endDate: null,
        description: "",
      })
    );
  };

  const deleteExp = (index: any) => {
    dispatch(delExperience(index));
  };

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
                    Job title
                  </label>
                  <Input
                    {...register("jobTitle", {
                      required: { value: true, message: "Add job title" },
                    })}
                    type="text"
                    placeholder="Software Engineer"
                    onChange={(e) => updateExp(index, {...item, jobTitle: e.target.value})}
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-xs">
                      {errors.jobTitle.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    Company name
                  </label>
                  <Input
                    {...register("companyName", {
                      required: { value: true, message: "Add job title" },
                    })}
                    placeholder="XYZ company"
                    onChange={(e) => updateExp(index, {...item, companyName: e.target.value})}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-xs">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-between overflow-x-auto w-full gap-2">
                  <div className="flex flex-col w-full">
                    <label className="font-semibold font-sans text-sm">
                      Start date
                    </label>
                    <Controller
                      name="startDate"
                      control={control}
                      rules={{ required: "Start date is required" }}
                      render={({ field }) => (
                        <DatePicker
                          value={field.value || null}
                          onChange={(date) => {
                            field.onChange(date);
                            updateExp(index, { ...item, startDate: date });
                          }}
                        />
                      )}
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-xs">
                        {errors.startDate.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold font-sans text-sm">
                      End date
                    </label>
                    <Controller
                      name="endDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          value={field.value || null}
                          onChange={(date) => {
                            field.onChange(date);
                            updateExp(index, { ...item, endDate: date });
                          }}
                        />
                      )}
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
                  <Textarea {...register("description")} 
                  onChange={(e) => updateExp(index, {...item, description: e.target.value})}
                  />
                </div>
              </div>

              <Button
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
          onClick={() => addNew()}
          className="bg-green-500 hover:bg-green-700"
        >
          <Plus />
          Add new{" "}
        </Button>
        <Button type="submit" onClick={() => setActiveForm('Education')}>Next  <ChevronRight/></Button>
      </form>
    </div>
  );
};

export default Experience;
