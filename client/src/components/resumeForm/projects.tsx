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
  addProject,
  delProject,
  updateProject,
} from "@/lib/redux/resumeData/resumeDataSlice";
import { debounce } from "lodash";

interface Project {
  projectName: string;
  description: string;
}

interface ProjectForm {
  projects: Project[];
}

const Projects = ({ setActiveForm }: any) => {
  const dispatch = useDispatch();
  const projects = useSelector((state: any) => state.resumeData.projects);

  const { register, control, handleSubmit, setValue , formState: {errors}} =
    useForm<ProjectForm>({
      defaultValues: {
        projects: projects,
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const handleInputChange = debounce(
    (index: number, name: string, value: any) => {
      dispatch(
        updateProject({
          index,
          data: { [name]: value },
        })
      );
    },
    500
  );

  useEffect(() => {
    fields.forEach((_, index) => {
      if (projects[index]) {
        setValue(`projects.${index}.projectName`, projects[index].projectName);
        setValue(`projects.${index}.description`, projects[index].description);
      }
    });
  }, [projects, fields, setValue]);

  const onSubmit = (data: ProjectForm) => {
    console.log("Submitted Data:", data);
    setActiveForm("Educations");
  };

  const handleAdd = () => {
    append({
      projectName: "",
      description: "",
    });
    dispatch(addProject({ projectName: "", description: "" }));
  };

  const handleDelete = (index: number) => {
    remove(index);
    dispatch(delProject(index));
  };

  const preventDefault = (e: any) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center font-serif">
        <p className="font-bold text-xl">Projects</p>
        <p className="font-light text-sm">Add your projects. </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center"
      >
        {fields.map((field, index) => (
          <Card key={field.id} className="w-full p-3">
            <p className="font-sans font-bold text-[16px]">{`Project ${
              index + 1
            }`}</p>

            <div className="flex flex-col gap-2">
              <div className="w-full">
                <label className="font-semibold font-sans text-sm">
                  Project Name
                </label>
                <Input
                  {...register(`projects.${index}.projectName`, {
                    required: { value: true, message: "Add project name" },
                  })}
                  placeholder="Project Title"
                  onKeyDown={preventDefault}
                  onChange={(e) =>
                    handleInputChange(index, "projectName", e.target.value)
                  }
                />
                {errors.projects?.[index]?.projectName && (
                  <p className="text-sm text-red-600 font-sans">
                    {errors.projects?.[index]?.projectName?.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label className="font-semibold font-sans text-sm">
                  Description
                </label>
                <Textarea
                  {...register(`projects.${index}.description`)}
                  placeholder="Project description..."
                  onKeyDown={preventDefault}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                />
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

export default Projects;