 
import { Section } from "@prisma/client"
import prisma from "@/lib/prismadb"
import React from "react"
 
import SectionItem from "./sectionItem"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


interface SectionItemsListProps {
    section: Section,
      
}

const SectionItemList: React.FC<SectionItemsListProps> = async ({ section}) => {

    const sectionId = section.id
    const sectionDetails = await prisma.section.findUnique({
        where: {
            id: sectionId
        },
        include: {
            SectionItems: true
        }
    })
    if (!sectionDetails) {
        return <div>Can not found</div>
    }

   

    if (sectionDetails.SectionItems?.length>0)
        return (
            <section key={section.id} style={{backgroundColor:section.backgroundColor||"", color:section.textColor||""}} className=" mx-1 mt-4 py-6 relative">
                
               <h1 className=" text-3xl px-4 flex gap-6 py-2 justify-center items-center -top-7 left-2">
                <span className="h-[1px] w-1/12 bg-white"></span>{section.name}<span className="h-[1px] w-1/12 bg-white"></span></h1>
                 
                <div className="my-4">
                    {<SectionItem section={section} sectionItems={sectionDetails?.SectionItems as any} sectionTemplate= {section.template}/>}

                </div>
            </section>
        )
}

export default SectionItemList