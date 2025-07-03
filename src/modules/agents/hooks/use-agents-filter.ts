import {parseAsString, useQueryStates} from 'nuqs'
export const useAgentsFilter =()=>{
    return useQueryStates({
        search:parseAsString.withDefault("").withOptions({clearOnDefault:true})
    })
}