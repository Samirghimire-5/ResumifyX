"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { debounce } from "lodash";
import dayjs from "dayjs";
import CustomDatePicker from "../costumeDatePicker";

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

const Experience = ({ setActiveForm }: any) => {
  const dispatch = useDispatch();
  const experiences = useSelector((state: any) => state.resumeData.experience);

  const { register, control, handleSubmit, watch, setValue } =
    useForm<ExperienceForm>({
      defaultValues: {
        experience: experiences,
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const handleInputChange = debounce(
    (index: number, name: string, value: any) => {
      let formattedValue = value;

      if (name.includes("Date")) {
        if (value?.length >= 10) {
          const dayjsDate = dayjs(value);
          formattedValue = dayjsDate.isValid()
            ? dayjsDate.format("YYYY-MM-DD")
            : value;
        }
      }

      dispatch(
        updateExperience({
          index,
          data: { [name]: formattedValue },
        })
      );
    },
    500
  );

  useEffect(() => {
    fields.forEach((_, index) => {
      if (experiences[index]) {
        setValue(`experience.${index}.role`, experiences[index].role);
        setValue(
          `experience.${index}.companyName`,
          experiences[index].companyName
        );
        setValue(
          `experience.${index}.startDate`,
          experiences[index].startDate || ""
        );
        setValue(
          `experience.${index}.endDate`,
          experiences[index].endDate || ""
        );
        setValue(
          `experience.${index}.description`,
          experiences[index].description
        );
      }
    });
  }, [experiences, fields, setValue]);

  const onSubmit = (data: ExperienceForm) => {
    console.log("Submitted Data:", data);
    setActiveForm("Skills");
  };

  const handleAdd = () => {
    append({
      role: "",
      companyName: "",
      startDate: "",
      endDate: "",
      description: "",
    });
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

  const handleDelete = (index: number) => {
    remove(index);
    dispatch(delExperience(index));
  };

  const preventDefault = (e: any) => {
    if (e.key === "Enter") e.preventDefault();
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
        {fields.map((field, index) => (
          <Card key={field.id} className="w-full p-3">
            <p className="font-sans font-bold text-[16px]">
              Work Experience {index + 1}
            </p>

            <div className="flex flex-col gap-2">
              <div>
                <label className="font-semibold font-sans text-sm">Role</label>
                <Input
                  {...register(`experience.${index}.role`)}
                  placeholder="Software Engineer"
                  onKeyDown={preventDefault}
                  onChange={(e) =>
                    handleInputChange(index, "role", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="font-semibold font-sans text-sm">
                  Company Name
                </label>
                <Input
                  {...register(`experience.${index}.companyName`)}
                  placeholder="Google"
                  onKeyDown={preventDefault}
                  onChange={(e) =>
                    handleInputChange(index, "companyName", e.target.value)
                  }
                />
              </div>

              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <label className="font-semibold font-sans text-sm">
                    Start Date
                  </label>
                  <CustomDatePicker
                    date={
                      watch(`experience.${index}.startDate`)
                        ? new Date(watch(`experience.${index}.startDate`))
                        : undefined
                    }
                    onChange={(date) => {
                      if (date) {
                        const formattedDate = dayjs(date).format("YYYY-MM-DD");
                        setValue(
                          `experience.${index}.startDate`,
                          formattedDate
                        );
                        handleInputChange(index, "startDate", formattedDate);
                      } else {
                        setValue(`experience.${index}.startDate`, "");
                        handleInputChange(index, "startDate", "");
                      }
                    }}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="font-semibold font-sans text-sm">
                    End Date
                  </label>
                  <CustomDatePicker
                    date={
                      watch(`experience.${index}.endDate`)
                        ? new Date(watch(`experience.${index}.endDate`))
                        : undefined
                    }
                    onChange={(date) => {
                      if (date) {
                        const formattedDate = dayjs(date).format("YYYY-MM-DD");
                        setValue(`experience.${index}.endDate`, formattedDate);
                        handleInputChange(index, "endDate", formattedDate);
                      } else {
                        setValue(`experience.${index}.endDate`, "");
                        handleInputChange(index, "endDate", "");
                      }
                    }}
                  />
                </div>
              </div>

              <p className="text-xs font-light">
                Leave end date empty if you're still working there.
              </p>

              <div>
                <label className="font-semibold font-sans text-sm">
                  Description
                </label>
                <Textarea
                  {...register(`experience.${index}.description`)}
                  placeholder="Write a short description..."
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={() => handleDelete(index)}
              className="bg-red-600 hover:bg-red-400 mt-2"
            >
              <Minus className="mr-1" />
              Remove
            </Button>
          </Card>
        ))}

        <Button
          type="button"
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-700"
        >
          <Plus className="mr-1" />
          Add New
        </Button>

        <Button type="submit">
          Next <ChevronRight className="ml-1" />
        </Button>
      </form>
    </div>
  );
};

export default Experience;
