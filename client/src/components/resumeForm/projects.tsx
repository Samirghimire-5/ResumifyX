import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { addProject, delProject } from "@/lib/redux/resumeData/resumeDataSlice";

const Projects = ({ setActiveForm }: any) => {
  const dispatch = useDispatch();
  const projects = useSelector((state: any) => state?.resumeData.projects);
  console.log("projects", projects);

  interface ProjectForm {
    project: string;
    description: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectForm>();

  const onSubmit = () => {
    setActiveForm("Educations");
  };

  const addNew = () => {
    dispatch(
      addProject({
        project: "",
        description: "",
      })
    );
  };

  const deleteProject = (index: any) => {
    dispatch(delProject(index));
  };

  const updateProject = (index: any, item: any) => {};

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
        {projects.map((item: any, index: any) => {
          return (
            <Card key={index} className="w-full p-3">
              <p className="font-sans font-bold text-[16]">{`Project ${
                index + 1
              }`}</p>

              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    Project Name
                  </label>
                  <Input
                    {...register("project", {
                      required: { value: true, message: "Add project name" },
                    })}
                    onChange={(e) =>
                      updateProject(index, { ...item, project: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.preventDefault();
                    }}
                  />
                  {errors.project && (
                    <p className="text-sm text-red-600 font-sans">
                      {errors?.project.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label className="font-semibold font-sans text-sm">
                    Description
                  </label>
                  <Input
                    {...register("description")}
                    onChange={(e) =>
                      updateProject(index, {
                        ...item,
                        description: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.preventDefault();
                    }}
                  />
                </div>
              </div>
              <Button
                type="button"
                onClick={() => deleteProject(index)}
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

export default Projects;
