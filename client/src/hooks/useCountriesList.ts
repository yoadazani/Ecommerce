import {useCallback, useEffect, useState} from "react";
import axios from "axios";


type country = {
    name: string,
    unicodeFlag: string
    cities: string[]
}

export const useCountriesList = () => {
    const url = "https://countriesnow.space/api/v0.1/countries/info?returns=name,unicodeFlag,cities"
    const [countries, setCountries] = useState<country[]>()


    const fetchCountries = useCallback(async () => {
        const {data} = await axios.get(url)
        return data.data
    }, [])


    useEffect(() => {
        fetchCountries().then(data => {
            setCountries(data)
        })
    }, [fetchCountries])


    return countries
}
