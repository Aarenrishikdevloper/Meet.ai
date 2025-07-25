import { DEFAULT_PAGES } from '@/constants'
import {parseAsInteger, parseAsString, useQueryStates} from 'nuqs'
export const useAgentsFilter =()=>{
    return useQueryStates({
        search:parseAsString.withDefault("").withOptions({clearOnDefault:true}),
        page:parseAsInteger.withDefault(DEFAULT_PAGES).withOptions({clearOnDefault:true})
    })
}