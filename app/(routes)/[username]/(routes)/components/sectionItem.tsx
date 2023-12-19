"use client"
import { templateList } from '@/components/templates/templateList'
import {  Section, SectionItem } from '@prisma/client'
import { ArrowRightCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface SectionItemProps {
    sectionItems:SectionItem[],
    sectionTemplate:string,
    sectionPage?:boolean,
    section?:Section
}

const SectionItem: React.FC<SectionItemProps> = ({ sectionItems, sectionTemplate, sectionPage=false, section}) => {
    const pathname = usePathname()
    let limit = sectionPage ? Infinity : 3
    const templateDetail =
        templateList.find((template) => template.label === sectionTemplate) ||
        templateList[0];
    const Template = templateDetail.template;
    return (<div className='flex items-center px-2 lg:px-8 gap-5 flex-wrap justify-center'>
        
        {sectionItems?.length > 0 ? sectionItems.map((data: SectionItem, index:number) =>  index<limit && <Template backgroundColor={section?.itemsBackgroundColor||""} textColor={section?.itemsTextColor||""} key={data.id} data={data}/>) : null}
        {sectionItems?.length>limit && section?.name?<Link href={`${pathname}/${section?.name}`} style={{backgroundColor:section?.itemsBackgroundColor||"", color:section?.itemsTextColor||""}} className='py-5 px-3 bg-dark flex items-center gap-4 rounded-full hover:scale-105 cursor-pointer'>Explore more <span><ArrowRightCircle className='w-6 h-6'/></span></Link>:null}
    </div>
    )
}

export default SectionItem