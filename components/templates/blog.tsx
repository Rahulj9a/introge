"use client";
import { SectionItem } from "@prisma/client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Trash } from "lucide-react";
//Blog Template -->
interface BlogTemplateProps {
  data: SectionItem
  onDelete?: () => void;
}


const BlogTemplate: React.FC<BlogTemplateProps> = ({ data, onDelete }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className="w-[300px] h-[380px] rounded-md border-2 relative">
      {onDelete ? <Button
      onClick={onDelete}
        variant="destructive"
        size="icon"
        className=" rounded-md absolute -top-2 -right-2"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Trash className=" w-6 h-6" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button> : null
      }
      <div>
        {/* Priority for showing Image--> ImageURL -> URL fetched image -> Text */}
        <div>
          {data.name}
        </div>
      </div>
    </div>
  );
};
// BLog form -->

interface BlogFormProps {
  onSubmit: (data: any) => void;
  initialData?: SectionItem;
  disabled: boolean;

}

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Title must be atleast of 3 letters",
    })
    .max(50, {
      message: "Title must not be more than 50 letters",
    }),
  about: z
    .string()
    .min(5, {
      message: "About section should not be less than 5 letters",
    })
    .max(200, {
      message: "About section should not be more than 150 letters",
    }),
  url: z.string(),

  imageURL: z.string(),

  labels: z.string(),
});
type BlogFormValues = z.infer<typeof formSchema>;

export const BlogForm: React.FC<BlogFormProps> = ({
  onSubmit,
  initialData,
  disabled,
}) => {
  const action = initialData ? "Save Changes" : "Add Blog";
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: initialData
      ? ({ ...initialData } as any)
      : {
        name: "",
        about: "",
        url: "",
        imageURL: "",
        labels: "",
      },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-[300px] h-[380px] border-2 rounded-md p-2"
      >
        <Label>{action}</Label>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="h-8"
                  disabled={disabled}
                  placeholder="e.g.- Blog title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="h-8"
                  disabled={disabled}
                  placeholder="Live URL (if any)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem className="  h-[90px] w-full">
              <FormControl>
                <Textarea
                  className="w-full h-full"
                  disabled={disabled}
                  placeholder="Tell the world more ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageURL"
          render={({ field }) => (
            <FormItem className=" w-full">
              <FormControl>
                <Input
                  className="h-8"
                  disabled={disabled}
                  placeholder="Image Link (if any)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="labels"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="h-8"
                  disabled={disabled}
                  placeholder="Labels (seperate by comma) "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={disabled}
          className="ml-auto my-2 w-full md:w-full bg-dark h-8"
          type="submit"
        >
          {action}
        </Button>
      </form>
    </Form>
  );
};
export default BlogTemplate;
