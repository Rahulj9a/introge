 
import { Section } from '@prisma/client'
import prisma from "@/lib/prismadb"
import React from 'react'
 
import SectionItem from './sectionItem'


interface SectionItemsListProps {
    section: Section
}

const SectionItemList: React.FC<SectionItemsListProps> = async ({ section }) => {

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
            <section key={section.id}>
                <h1>{section.name}</h1>
                <div>
                    {<SectionItem sectionItems={sectionDetails?.SectionItems as any} sectionTemplate= {section.template}/>}

                </div>
            </section>
        )
}

export default SectionItemList