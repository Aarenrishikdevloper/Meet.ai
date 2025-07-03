import {createLoader, parseAsString} from "nuqs/server"
export const filterSearchparams ={
    search:parseAsString.withDefault("").withOptions({clearOnDefault:true})
}
export const loadSearchParams = createLoader(filterSearchparams)