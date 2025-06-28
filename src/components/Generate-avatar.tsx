import React from 'react'
import {createAvatar} from "@dicebear/core"
import {botttsNeutral,initials} from "@dicebear/collection"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'
interface Generateavatarprops{
    seed:string 
    classname?:string 
    variant:"bottsNeutral" | "intials"
}
const Generateavatar = ({seed,variant,classname}:Generateavatarprops) => {
  let avatar  
  if(variant === "bottsNeutral"){
    avatar = createAvatar(botttsNeutral, {seed})
  }else{
    avatar = createAvatar(initials,{
      seed, fontWeight:500, fontSize:42
    })
  }
  return (
    <Avatar className={cn(classname)}> 
    <AvatarImage src={avatar.toDataUri()} alt='avatar'/>
     <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

export default Generateavatar