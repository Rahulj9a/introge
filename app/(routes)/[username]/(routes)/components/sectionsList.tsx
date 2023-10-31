import { Section } from '@prisma/client'
import React from 'react'
import SectionItemList from './sectionItemList'
interface SectionListProps {
    sections?: Section[]
}
const SectionList: React.FC<SectionListProps> = ({ sections }) => {
   
    return (
        <>
            {sections?.map(section =>  
            section.isActive?<SectionItemList section={section}/>:null
            )}
        </>
    )
}

export default SectionList