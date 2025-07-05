import { DEFAULT_PAGES } from "@/constants"
import {createLoader, parseAsInteger, parseAsString} from "nuqs/server"
export const filterSearchparams ={
    search:parseAsString.withDefault("").withOptions({clearOnDefault:true}), 
    page:parseAsInteger.withDefault(DEFAULT_PAGES).withOptions({clearOnDefault:true})
}
export const loadSearchParams = createLoader(filterSearchparams)