import Axios from "axios";
import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
// import uuid from "uuid";

const useAxios = (baseUrl, formattingFunction = null, key) => {
    
    const [state, setState] = useLocalStorage(key, [])
    const addToState = async (restOfUrl = null) => {
        let modifiedUrl;

        restOfUrl ? modifiedUrl = `${baseUrl}${restOfUrl}` : modifiedUrl = baseUrl;
        const response = await Axios.get(modifiedUrl)

        let formattedResponse;
        formattingFunction ? formattedResponse = formattingFunction(response) : formattedResponse = response;

        setState((state) => {

            return [...state, formattedResponse]
        })
    }

    const clearState = () => {
        setState([])
    }

    return [state, addToState, clearState]
}

export default useAxios;