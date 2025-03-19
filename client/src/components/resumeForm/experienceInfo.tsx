"use client";
import React, { useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { DatePicker } from "../datePicker";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

const Experience = () => {
  const [experiences, setExperiences] = useState([{id: 1}]);

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
  } = useForm<ExperienceForm>({
    defaultValues: {
      jobTitle: "",
      companyName: "",
      startDate: null,
      endDate: null,
      description: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const addNew = () => {
    setExperiences([...experiences, {id: experiences.length + 1}])
  }

  const deleteExp = (item: any) => {
    setExperiences(experiences.filter((exp) => exp.id !== item.id))
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
        {experiences.map((item, index) => {
          return (
            <Card
              key={index}
              className="w-full p-3">
              <p className="font-sans font-bold text-[16]">{`Work Experience ${item.id}`}</p>

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
                          onChange={field.onChange}
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
                          onChange={field.onChange}
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
                  <Textarea {...register("description")} />
                </div>
              </div>

              <Button 
              onClick={() => deleteExp(item)}
              className="bg-red-600 hover:bg-red-400 w-fit">
                <Minus />
                Remove
              </Button>
            </Card>
          );
        })}

        <Button onClick={() => addNew()} className="bg-green-500 hover:bg-green-400">
          <Plus />
          Add new{" "}
        </Button>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
};

export default Experience;
