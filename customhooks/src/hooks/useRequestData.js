import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constants";


//2.1 criamos outro custom hook e deixaremos ele mais genrico para que possa ser usados em diversos lugares
//primeiro, mudaremos o estado pra data e setdata
// 2.2 como esse custom hook sera usado tantopara o nomeusuarios, quanto postanges, a url que antes era chumbada, recebera por parametro, dentro de uma template string o path, e ele sera enviado quando chamarmos o userequestdata no App como argumento da função 

//3.1 criamos um estado novo na função que servira como loading, ele começa como false (a ideia é comeca como false, quando comeca a requisição fica como true, pq diagmos que a resuisição demores 10 segundos, então teriamos um loading = true) e vamos setalo em alguns locais no useffect (antes do axio se torna true, a requisição é feita e apos o set dados, ou seja fim da requisição, o loading acaba, setando para false)

//3.2 iremos exportar os dois estados, dados e isLoading, como são dois, passamos dentro de um array []

//3.5faremos os tratamentos dos erros, construido mais um estado pra isso, ele comeco com false e setaremos como true dentro do catch, ou seja, caso a requsição de erro, ele vai pro catch e seta o estado erro
// retornanmos o  erro tbm junto dos outros retornos para recebermos no APP
export default function useRequestdata(baseUrl,path){
    
    const [dados, setDados] = useState([]);
    const [isLoading, setIsLoading]= useState(false)
    const [erro, setErro]=useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        axios
            .get(`${baseUrl}${path}`)
            .then((response) => {
                console.log("dados dos usuarios", response)
                setDados(response.data);
                setIsLoading(false)
            })
            .catch((error) => {
                setErro(true)
                // console.log(error);
            });
    }, []);


    return [dados, isLoading, erro]
}