"use client";
import { templateList } from "@/components/templates/templateList";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import React, { useState } from "react";

const Page = () => {
  const dummyData = {
    id: "abc",
    userid: "abc",
    sectionid: "123",
    otherURLs: '[{"title":"Extra 1", "url":"/explore/templates"}]',
    imageURL: null,
    videoURL: null,
    name: "Title",
    url: "/explore/templates",
    about: "Description",
    labels: "Pending, Label1",
  };

  return (
    <>
    <h1 className="font-semibold text-2xl text-light w-full text-center">Available Templates</h1>
      <div className="mx-4 flex text-light flex-wrap mt-4 md:mx-8 gap-2 min-h-screen pt-2 pb-4 max-h-fit">
        {[...templateList].map((template) => {
          const Form = template.form;
          const Frame = template.template;
          return (
            <div key={template.label} className="rounded-lg w-fit h-auto border-2 border-dark flex items-center justify-center gap-4 flex-col px-2 py-3">
              <h1 className="text-lg">{template.label}</h1>
              <div className="bg-light h-fit text-darkest rounded-md">
              <Frame data={dummyData} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Page;
