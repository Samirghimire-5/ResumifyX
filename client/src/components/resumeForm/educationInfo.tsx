"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { DatePicker } from "../datePicker";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

const Education = () => {
  const [educations, setEducations] = useState([{ id: 1 }]);

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
  } = useForm<EducationForm>({
    defaultValues: {
      degree: "",
      school: "",
      startDate: null,
      endDate: null,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const addNew = () => {
    setEducations([...educations, { id: educations.length + 1 }]);
  };

  const deleteEdu = (item: any) => {
    setEducations(educations.filter((edu) => edu.id !== item.id));
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
        {educations.map((item, index) => {
          return (
            <Card key={index} className="w-full p-3">
              <p className="font-sans font-bold text-[16]">{`Education ${item.id}`}</p>

              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    Degree
                  </label>
                  <Input {...register("degree")} />
                </div>

                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    School
                  </label>
                  <Input {...register("school")} />
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
                      End data
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
          className="bg-green-500 hover:bg-green-400"
        >
          <Plus />
          Add new{" "}
        </Button>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
};

export default Education;
