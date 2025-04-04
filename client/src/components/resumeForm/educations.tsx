"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  delEducation,
  updateEducation,
} from "@/lib/redux/resumeData/resumeDataSlice";

const Education = ({ setActiveForm }: any) => {
  const educations = useSelector((state: any) => state.resumeData.education);
  const dispatch = useDispatch();

  interface EducationForm {
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
  }

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<EducationForm>();

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

  const updateEdu = (index: any, item: any) => {
    dispatch(updateEducation({ data: item, index }));
  };

  const onSubmit = async (data: any) => {
    setActiveForm("Summary");
  };

  const addNew = () => {
    dispatch(
      addEducation({
        degree: "",
        school: "",
        startDate: "",
        endDate: "",
      })
    );
  };

  const deleteEdu = (index: any) => {
    dispatch(delEducation(index));
  };

  const preventDefault = (e: any) => {
    if (e.key === "Enter") e.preventDefault();
  }

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
                    onKeyDown={(e) => preventDefault(e)}
                  />
                </div>

                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    School / University
                  </label>
                  <Input
                    {...register("school")}
                    onChange={(e) =>
                      updateEdu(index, { ...item, school: e.target.value })
                    }
                    onKeyDown={(e) => preventDefault(e)}
                  />
                </div>

                <div className="flex justify-between overflow-x-auto w-full gap-2">
                  <div className="flex flex-col w-full">
                    <label className="font-semibold font-sans text-sm">
                      Start date (YYYY-MM-DD)
                    </label>
                    <Input
                      {...register("startDate")}
                      placeholder="YYYY-MM-DD"
                      value={item.startDate || ''}
                      onChange={(e) => {
                        const formattedValue = formatDateInput(e.target.value);
                        updateEdu(index, { ...item, startDate: formattedValue });
                      }}
                      onKeyDown={(e) => preventDefault(e)}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="font-semibold font-sans text-sm">
                      End date (YYYY-MM-DD)
                    </label>
                    <Input
                      {...register("endDate")}
                      placeholder="YYYY-MM-DD"
                      value={item.endDate || ''}
                      onChange={(e) => {
                        const formattedValue = formatDateInput(e.target.value);
                        updateEdu(index, { ...item, endDate: formattedValue });
                      }}
                      onKeyDown={(e) => preventDefault(e)}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="button"
                onClick={() => deleteEdu(index)}
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

export default Education;