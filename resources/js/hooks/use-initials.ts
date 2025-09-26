import { useCallback } from "react";


export function useInitials() {
    return useCallback((fullName : String)=> {

        if (!fullName) return "";

        const names = fullName.trim().split(" ");

        if (names.length === 0) return '';
        if(names.length === 1 ) return names[0]?.charAt(0).toUpperCase();

        let firstLettre = names[0]?.charAt(0) ;
        let lastLetttre = names[names.length - 1]?.charAt(0);

        return `${firstLettre}${lastLetttre}`.toUpperCase();




    } , [])
}


