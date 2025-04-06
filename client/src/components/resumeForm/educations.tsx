"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  delEducation,
  updateEducation,
} from "@/lib/redux/resumeData/resumeDataSlice";
import { debounce } from "lodash";
import dayjs from "dayjs"; // Import Day.js
import { Input } from "../ui/input";
import CustomDatePicker from "../costumeDatePicker";

interface Education {
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
}

interface EducationForm {
  education: Education[];
}

const Education = ({ setActiveForm }: any) => {
  const educations = useSelector((state: any) => state.resumeData.education);
  const dispatch = useDispatch();

  const { register, control, handleSubmit, watch, setValue } =
    useForm<EducationForm>({
      defaultValues: {
        education: educations,
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const handleInputChange = debounce(
    (index: number, name: string, value: any) => {
      let formattedValue = value;
      if (name.includes("Date") && value) {
        if (dayjs(value).isValid()) {
          formattedValue = dayjs(value).format("YYYY-MM-DD");
        } else {
          formattedValue = value;
        }
      }
      dispatch(
        updateEducation({
          index,
          data: { [name]: formattedValue },
        })
      );
    },
    500
  );

  useEffect(() => {
    fields.forEach((_, index) => {
      if (educations[index]) {
        setValue(`education.${index}.degree`, educations[index].degree);
        setValue(`education.${index}.school`, educations[index].school);
        setValue(
          `education.${index}.startDate`,
          educations[index].startDate || ""
        );
        setValue(`education.${index}.endDate`, educations[index].endDate || "");
      }
    });
  }, [educations, fields, setValue]);

  const onSubmit = async (data: EducationForm) => {
    console.log("Submitted Education Data:", data);
    setActiveForm("Summary");
  };

  const handleAdd = () => {
    append({
      degree: "",
      school: "",
      startDate: "",
      endDate: "",
    });
    dispatch(addEducation({}));
  };

  const handleDelete = (index: number) => {
    remove(index);
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
        {fields.map((field, index) => (
          <Card key={field.id} className="w-full p-3">
            <p className="font-sans font-bold text-[16]">{`Education ${
              index + 1
            }`}</p>

            <div className="flex flex-col gap-2">
              <div className="w-full">
                <label className="font-semibold font-sans text-sm">
                  Degree
                </label>
                <Input
                  {...register(`education.${index}.degree`)}
                  onChange={(e) =>
                    handleInputChange(index, "degree", e.target.value)
                  }
                />
              </div>

              <div className="w-full">
                <label className="font-semibold font-sans text-sm">
                  School / University
                </label>
                <Input
                  {...register(`education.${index}.school`)}
                  onChange={(e) =>
                    handleInputChange(index, "school", e.target.value)
                  }
                />
              </div>

              <div className="flex justify-between w-full gap-2">
                <div className="flex flex-col w-full">
                  <label className="font-semibold font-sans text-sm">
                    Start date
                  </label>
                  <CustomDatePicker
                    date={
                      watch(`education.${index}.startDate`)
                        ? new Date(watch(`education.${index}.startDate`))
                        : undefined
                    }
                    onChange={(date) => {
                      if (date) {
                        const formattedDate = dayjs(date).format("YYYY-MM-DD");
                        setValue(`education.${index}.startDate`, formattedDate);
                        handleInputChange(index, "startDate", formattedDate);
                      } else {
                        setValue(`education.${index}.startDate`, "");
                        handleInputChange(index, "startDate", "");
                      }
                    }}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="font-semibold font-sans text-sm">
                    End date
                  </label>
                  <CustomDatePicker
                    date={
                      watch(`education.${index}.endDate`)
                        ? new Date(watch(`education.${index}.endDate`))
                        : undefined
                    }
                    onChange={(date) => {
                      if (date) {
                        const formattedDate = dayjs(date).format("YYYY-MM-DD");
                        setValue(`education.${index}.endDate`, formattedDate);
                        handleInputChange(index, "endDate", formattedDate);
                      } else {
                        setValue(`education.${index}.endDate`, "");
                        handleInputChange(index, "endDate", "");
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => handleDelete(index)}
              className="bg-red-600 hover:bg-red-400 w-fit mt-2"
            >
              <Minus />
              Remove
            </Button>
          </Card>
        ))}

        <Button
          type="button"
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-700"
        >
          <Plus />
          Add new
        </Button>

        <Button type="submit">
          Next <ChevronRight />
        </Button>
      </form>
    </div>
  );
};

export default Education;
