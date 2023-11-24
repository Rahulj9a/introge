"use client"
import { templateList } from '@/components/templates/templateList'
import {  SectionItem } from '@prisma/client'
import { ArrowRightCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface SectionItemProps {
    sectionItems:SectionItem[],
    sectionTemplate:string,
    sectionPage?:boolean,
    sectionName?:string
}

const SectionItem: React.FC<SectionItemProps> = ({ sectionItems, sectionTemplate, sectionPage=false, sectionName}) => {
    const pathname = usePathname()
    let limit = sectionPage ? Infinity : 3
    const templateDetail =
        templateList.find((template) => template.label === sectionTemplate) ||
        templateList[0];
    const Template = templateDetail.template;
    return (<div className='flex items-center px-8 gap-5 flex-wrap'>
        
        {sectionItems?.length > 0 ? sectionItems.map((data: SectionItem, index:number) =>  index<limit && <Template key={data.id} data={data}/>) : null}
        {sectionItems?.length>limit && sectionName?<Link href={`${pathname}/${sectionName}`} className='py-5 px-3 bg-dark flex items-center gap-4 rounded-full hover:scale-105 cursor-pointer'>Explore more <span><ArrowRightCircle className='w-6 h-6'/></span></Link>:null}
    </div>
    )
}

export default SectionItem