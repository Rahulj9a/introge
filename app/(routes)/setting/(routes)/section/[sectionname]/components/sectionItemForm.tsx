"use client";
import * as z from "zod";

import { SectionItem, User } from "@prisma/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { templateList } from "@/components/templates/templateList";
 import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "@/components/ui/modal";

interface SectionFormProps {
  currentUser: User;
  sectionItems: SectionItem[];
  sectionTemplate: String;
  sectionId: string;
}

const SectionItemForm: React.FC<SectionFormProps> = ({
  currentUser,
  sectionItems,
  sectionTemplate,
  sectionId,
}) => {
  const router = useRouter();
   const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  //if temlate set to edit it will record the id and replace template with Form
  const [initialDataId, setInitialDataId] = useState("");
  const userid = currentUser.id;

  const toastMessage =
    initialDataId.length > 0 ? "Item Updated" : "Item Created";
  const templateDetail =
    templateList.find((template) => template.label === sectionTemplate) ||
    templateList[0];

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      if (initialDataId.length > 1) {
        await axios.patch(
          `/api/${userid}/section/${sectionId}/sectionItem/${initialDataId}`,
          data
        );
      } else {
        await axios.post(
          `/api/${userid}/section/${sectionId}/sectionItem`,
          data
        );
      }

      /*} */

      toast.success(toastMessage);
      setInitialDataId("");
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async (itemId: string) => {
    const confirmDelete = window.confirm("This action is irreversible, do you still want to delete it?")
    if (confirmDelete) {
      try {
        setLoading(true);

        await axios.delete(
          `/api/${userid}/section/${sectionId}/sectionItem/${itemId}`
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
    }
  };

  const Form = templateDetail.form;
  const Template = templateDetail.template;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Items : {sectionItems.length}</h1>
      <Button type="button" onClick={() => setIsOpen(true)} className="w-full h-14 rounded-md flex gap-4 bg-dark">Add Item <Plus className="w-6 h-6"></Plus></Button>
      <Modal title="Add" description={`${initialDataId?"Edit Item":"Add an Item"}`} isOpen={isOpen} onClose={() => { setInitialDataId(""); setIsOpen(false) }}>
        <Form
          onSubmit={onSubmit}
          disabled={loading}
          initialData={
            initialDataId
              ? sectionItems.find((data) => data.id === initialDataId)
              : undefined
          }
        />

      </Modal>

      <div className="flex flex-wrap w-full my-2 gap-5 justify-start">
        {sectionItems?.length > 0
          ? sectionItems.map((data: SectionItem) =>
            data.id !== initialDataId ? (
              <Template
                onDelete={() => onDelete(data.id)}
                key={data.id}
                data={data}
                onEdit={() => { setIsOpen(true); setInitialDataId(data.id); }}
              />
            ) : null
          )
          : null}
      </div>
    </div>
  );
};

export default SectionItemForm;
