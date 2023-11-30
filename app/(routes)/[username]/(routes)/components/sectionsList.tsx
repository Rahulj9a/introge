import { Section } from '@prisma/client'
import React from 'react'
import SectionItemList from './sectionItemList'
interface SectionListProps {
    sections?: Section[]
}
const SectionList: React.FC<SectionListProps> = ({ sections }) => {
    sections?.sort((a,b)=>{
        if (a.template === 'Skill 1') {
            return -1; // 'skill' comes first
          } else if (b.template === 'Skill 1') {
            return 1; // 'skill' comes first
          } else {
            return 0; // No change in order
          }
    })
   
    return (
        <>
            {sections?.map(section =>  
            section.isActive?<SectionItemList key={section.name} section={section}/>:null
            )}
        </>
    )
}

export default SectionList