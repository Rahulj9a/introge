"use client";
import * as z from "zod";

import { Section, SectionItem, User } from "@prisma/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { templateList } from "@/components/templates/templateList";

interface SectionFormProps {
  initialData?: SectionItem;
  currentUser: User;
  sectionItems: SectionItem[];
  sectionTemplate: String;
  sectionId: string;
}

const SectionItemForm: React.FC<SectionFormProps> = ({
  initialData,
  currentUser,
  sectionItems,
  sectionTemplate,
  sectionId,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  //if temlate set to edit it will record the id and replace template with Form

  const username = currentUser.username;

  const toastMessage = initialData ? "Item Updated" : "Item Created";
  const templateDetail =
    templateList.find((template) => template.label === sectionTemplate) ||
    templateList[0];

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      await axios.post(
        `/api/${username}/section/${sectionId}/sectionItem`,
        data
      );


      /*} */
      router.refresh();

      toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async (itemId: string) => {
    try {
      setLoading(true);
      /* if (initialData) {
        await axios.patch(
          `/api/${currentUser.username}/section/${initialData.sectionid}/sectionitem/${initialData.id}`,
          { ...data }
        );
      } else { */
      await axios.delete(
        `/api/${username}/section/${sectionId}/sectionItem/${itemId}`
      );
      /*} */
      router.refresh();

      toast.success("Successfully Deleted");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const Form = templateDetail.form;
  const Template = templateDetail.template;

  return (
    <div className="flex flex-col gap-3">
      <Form onSubmit={onSubmit} disabled={loading} />
      <h2 className="text-lg font-semibold">Existed Items : {sectionItems.length}</h2>
      <div className="flex flex-wrap w-full my-2 gap-5 justify-start">
        {sectionItems?.length > 0
          ? sectionItems.map((data: SectionItem) =>

            <Template
              onDelete={() => onDelete(data.id)}
              key={data.id}
              data={data}

            />
          )

          : null}
      </div>
    </div>
  );
};

export default SectionItemForm;
