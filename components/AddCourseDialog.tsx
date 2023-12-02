"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tag, TagInput } from "./ui/tag-input";

const formSchema = z.object({
  courseName: z.string().min(2),
  ListTAs: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

export function AddCourseDialog() {
  const [tags, setTags] = useState<Tag[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      ListTAs: [],
    },
  });
  const { setValue } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let courseName = values.courseName.toLowerCase();
    // make API call to create course by api at /api/courses/[courseName]/create
    let response = await fetch("/api/" + courseName + "/create", {
      method: "POST",
      body: JSON.stringify(values.ListTAs),
    });

    response = await response;

    if (response.status == 200) {
      console.log("Course created");
    } else {
      console.log("Course not created");
    }
  }

  return (
    <DialogContent className="sm:max-w-[40%]">
      <DialogHeader>
        <DialogTitle>Create new course</DialogTitle>
        <DialogDescription>
          Add course details and save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input placeholder="CS 1101" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ListTAs"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-left">Teaching Assistants</FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    placeholder="Enter TA emails"
                    tags={tags}
                    className="sm:min-w-[450px]"
                    setTags={(newTags) => {
                      setTags(newTags);
                      setValue("ListTAs", newTags as [Tag, ...Tag[]]);
                    }}
                  />
                </FormControl>
                <FormDescription>Press enter to add an email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose asChild>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogClose>
        </form>
      </Form>
    </DialogContent>
  );
}
