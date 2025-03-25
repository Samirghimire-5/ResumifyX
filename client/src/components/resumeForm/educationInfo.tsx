"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { DatePicker } from "../datePicker";
import { Button } from "../ui/button";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  delEducation,
  updateEducation,
} from "@/lib/redux/resumeData/resumeDataSlice";

const Education = ({setActiveForm}: any) => {
  const educations = useSelector((state: any) => state.resumeData.education);
  const dispatch = useDispatch();

  interface EducationForm {
    degree: string;
    school: string;
    startDate: Date | null;
    endDate: Date | null;
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EducationForm>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const updateEdu = (index: any, item: any) => {
    const data = {...item,
      startDate: item.startDate ? item.startDate.toISOString() : null,
      endDate: item.endDate ? item.endDate.toISOString() : null
    }
    dispatch(updateEducation({data, index}))
  };

  const addNew = () => {
    dispatch(
      addEducation({
        degree: "",
        school: "",
        startDate: null,
        endDate: null,
      })
    );
  };

  const deleteEdu = (index: any) => {
    dispatch(delEducation(index));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center font-serif">
        <p className="font-bold text-xl">Education</p>
        <p className="font-light text-sm">Add your education degrees.</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center"
      >
        {educations.map((item: any, index: any) => {
          return (
            <Card key={index} className="w-full p-3">
              <p className="font-sans font-bold text-[16]">{`Education ${
                index + 1
              }`}</p>

              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    Degree
                  </label>
                  <Input
                    {...register("degree")}
                    onChange={(e) =>
                      updateEdu(index, { ...item, degree: e.target.value })
                    }
                  />
                </div>

                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    School
                  </label>
                  <Input
                    {...register("school")}
                    onChange={(e) =>
                      updateEdu(index, { ...item, school: e.target.value })
                    }
                  />
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
                            updateEdu(index, { ...item, startDate: date });
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
                      End data
                    </label>
                    <Controller
                      name="endDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          value={field.value || null}
                          onChange={(date) => {
                            field.onChange(date);
                            updateEdu(index, { ...item, endDate: date });
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={() => deleteEdu(item)}
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
        <Button type="submit" onClick={() => setActiveForm('Skills')}>Next  <ChevronRight/></Button>
      </form>
    </div>
  );
};

export default Education;
