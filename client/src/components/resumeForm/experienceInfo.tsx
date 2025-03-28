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
import toast from "react-hot-toast";

const Experience = ({ setActiveForm }: any) => {
  const dispatch = useDispatch();
  const experiences = useSelector((state: any) => state.resumeData.experience);
  // console.log(experiences);

  interface ExperienceForm {
    role: string;
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
    trigger,
  } = useForm<ExperienceForm>();

  const updateExp = (index: any, item: any) => {
    const data = {
      ...item,
      startDate: item.startDate instanceof Date ? item.startDate.toISOString() : item.startDate || '',
      endDate: item.endDate instanceof Date ? item.endDate.toISOString() : item.endDate || '',
    };
    dispatch(updateExperience({ data, index }));
  };

  const onSubmit = async (data: any) => {
    const isValid = await trigger();
    if (!isValid) return toast.error("please fillout necessary fields");
    setActiveForm("Education");
    // console.log(data)
  };

  const addNew = () => {
    dispatch(
      addExperience({
        role: "",
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
                    Role
                  </label>
                  <Input
                    {...register("role", {
                      required: { value: true, message: "What was you role" },
                    })}
                    type="text"
                    placeholder="Software Engineer"
                    onChange={(e) =>
                      updateExp(index, { ...item, role: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.preventDefault();
                    }}
                  />
                  {errors.role && (
                    <p className="text-red-500 text-xs">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    Company name
                  </label>
                  <Input
                    {...register("companyName")}
                    onChange={(e) =>
                      updateExp(index, { ...item, companyName: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.preventDefault();
                    }}
                  />
                </div>

                <div className="flex justify-between overflow-x-auto w-full gap-2">
                  <div className="flex flex-col w-full">
                    <label className="font-semibold font-sans text-sm">
                      Start date
                    </label>
                    <Controller
                      name={`startDate`}
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
                      name={`endDate`}
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
                  <Textarea
                    {...register("description")}
                    onChange={(e) =>
                      updateExp(index, { ...item, description: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.preventDefault();
                    }}
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
