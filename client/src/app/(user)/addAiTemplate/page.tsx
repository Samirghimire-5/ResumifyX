"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  description: string;
  isPremium: boolean;
  templateContent: string;
  previewImage: FileList;
}

const AddTemplate = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("isPremium", data.isPremium);
    formData.append("templateContent", data.templateContent);
    formData.append("previewImage", data.previewImage[0]); // file input is array

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/templates`,
        formData
      );
      console.log(res);
      toast.success("Template uploaded!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Error uploading template");
    }
  };

  return (
    <Card className="max-w-xl mx-auto shadow">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle className="text-xl font-bold text-center">
          Add New Template
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="block mb-1 font-medium">
              Template Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter template name"
              className="w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="block mb-1 font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Template Description"
              className="w-full"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Premium */}
          <div className="flex gap-2 items-center pt-2">
            <Controller
              name="isPremium"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="isPremium"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              )}
            />
            <span>Premium Template</span>
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="previewImage" className="block mb-1 font-medium">
              Preview Image
            </Label>
            <Input
              id="previewImage"
              type="file"
              accept="image/*"
              className="w-full"
              {...register("previewImage", {
                required: "Preview image is required",
              })}
            />
            {errors.previewImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.previewImage.message}
              </p>
            )}
          </div>

          {/* Template HTML */}
          <div>
            <Label htmlFor="templateContent" className="block mb-1 font-medium">
              Template HTML
            </Label>
            <Textarea
              id="templateContent"
              placeholder="Paste HTML here..."
              className="w-full min-h-32 max-h-32 font-mono text-sm overflow-y-auto"
              {...register("templateContent", {
                required: "HTML content is required",
              })}
            />
            {errors.templateContent && (
              <p className="text-red-500 text-sm mt-1">
                {errors.templateContent.message}
              </p>
            )}
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full mt-6">
            Add Template
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTemplate;
