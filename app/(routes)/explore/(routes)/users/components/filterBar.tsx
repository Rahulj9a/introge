"use client";
import React, { useEffect, useState } from "react";
import { Filter, Menu, SeparatorVertical } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { LabelList } from "@/components/templates/labelsList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterBarProps {
  onClick: (input: string) => void;
  selectedLabels?: string[];
}
const FilterBar: React.FC<FilterBarProps> = ({  onClick, selectedLabels }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className=" hover:bg-mid text-darkest  bg-light rounded-md h-10 w-fit px-2 flex items-center justify-center z-30 ">
          <Filter className="w-6" /> <p>Filter</p>
        </div>
      </SheetTrigger>
      <SheetContent
        side="right"
        className=" flex flex-col justify-between  bg-mid h-full w-48 md:w-64"
      >
        <div className="pt-2 px-1 flex-1 overflow-y-scroll">
          <h1 className="text-darkest text-xl py-1">Filter Result:</h1>
          <hr />
          <div>
            <h2 className="text- text-dark py-1">By Label:</h2>
            <div>
              {LabelList.map((labelGroup) => (
                <Accordion type="single" collapsible key={labelGroup.title}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <p>{labelGroup.title}</p>
                    </AccordionTrigger>
                    <AccordionContent>
                      {" "}
                      <div className="flex flex-wrap gap-1 ">
                        {[...labelGroup.list].map((label) => (
                          <div
                            key={label}
                           onClick={() => onClick(label)}
                          className={`px-3 rounded-md cursor-pointer py-2 text-xs ${
                              selectedLabels?.includes(label)
                                ? "bg-light"
                                : "bg-white"
                            }`}
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
        <Link
          className="w-full md:hidden h-fit pt-2 flex items-center gap-4 justify-center hover:bg-light cursor-pointer"
          href="/"
        >
          <Image
            width={50}
            height={50}
            src="/profiley.png"
            alt="Profiley"
            className=""
          />
          <span className="text-darkest font-bold text-2xl">Profiley</span>
        </Link>
      </SheetContent>
    </Sheet>
  );
};

export default FilterBar;
