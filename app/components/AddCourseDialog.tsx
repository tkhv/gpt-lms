"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  courseName: z.string().min(2),
  ListTAs: z.string().min(2),
});

export function AddCourseDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      ListTAs: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let courseName = values.courseName;
    // make API call to create course by api at /api/courses/[courseName]/create
    let response = await fetch(
      "http://localhost:3000/api/" + courseName + "/create",
      {
        method: "GET",
      }
    );

    response = await response;

    if (response.status == 200) {
      console.log("Course created");
    } else {
      console.log("Course not created");
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create new course</DialogTitle>
        <DialogDescription>
          Add course details and save when you're done.
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
              <FormItem>
                <FormLabel>List TAs</FormLabel>
                <FormControl>
                  <Input placeholder="@username" {...field} />
                </FormControl>
                <FormDescription>Enter as comma-seperated list</FormDescription>
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
