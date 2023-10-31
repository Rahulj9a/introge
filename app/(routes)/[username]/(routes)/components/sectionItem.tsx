"use client"
import { templateList } from '@/components/templates/templateList'
import {  SectionItem } from '@prisma/client'
import React from 'react'

interface SectionItemProps {
    sectionItems:SectionItem[],
    sectionTemplate:string
}

const SectionItem: React.FC<SectionItemProps> = ({ sectionItems, sectionTemplate}) => {
    
    const templateDetail =
        templateList.find((template) => template.label === sectionTemplate) ||
        templateList[0];
    const Template = templateDetail.template;
    return (<div className='flex justify-center gap-5 flex-wrap'>
        
        {sectionItems?.length > 0 ? sectionItems.map((data: SectionItem) => <Template key={data.id} data={data}/>) : null}
    </div>
    )
}

export default SectionItem