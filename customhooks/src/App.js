import React from "react";

import { Title, NameContainer, PostContainer } from './style'
import { GlobalStyle } from './GlobalStyle'
import { Header } from './components/Header/Header'
import { Card } from './components/Card/Card'
import useCapturarNome from "./hooks/useCapturarNome";
import useCapturarPostagens from "./hooks/useCapturarPostagens";
import useRequestdata from "./hooks/useRequestData";
import { BASE_URL, BASE_URL_HP } from "./constants/constants";


//    AULA 15 CUSTOM HOOKS 
//    PRATICA GUIADA 1
//  1 - Extraia a lógica das requisições ja existentes e crie 2 custom hooks: a) useCapturarNome (custom hook para capturar o noem dos usuarios) e b) useCapturarPostagens (custom hook para capturar as postagens dos ususarios)

//1.1- primeiro criamos uma pasta de hooks e um arquivo com useCapturarNome la. recortamos toda a requisição de pegar nome que estava dentro de um useeffect e o estado nomeUsuario e levamos pro nosso custom hook, como no app estamos renderizando o estado nomeUsuarios na tela, ele é o retorno do custom hook (verificar como esta o custom no hook na pgina dele)

//1.2 - agora vamos consumir o custom hook no App

//1.3 criação do custom hook usecapturarPostagens (mesma coisa do primeiro)

//    PRATICA GUIADA 2
//2 -Organize o códugo do exercico 1 para que  cosnigamos reutilizar a logica para ambas as requisções ao longo doprojeto usando o useRequestData
// veja, criamos dois hooks, porem a logica dos dois é identica, podemos reduzir isso ainda mais
//2.1 criamos outro arquivo em hooks  chamado useRequestData e basicamente colamos o codigo de um dos customhooks anteriores dentro dele, pois a logica sera a mesma, mas com algumas modificações (verificar o arquivo)

//    PRATICA GUIADA 3
//3- Atualize o useRequestData  para tratar possiveis erros e adicione um isLoading (verificvar no arquivo)

//      FIXAÇÃO

// Utilizando o useRequestData, faça um integração com a api do harry potter para mostrar a lsita de personagens na tela

// fixação 1- coloco a a url base ma pasta constants (só trocar a url que ja tinha)
// depois no app quando chamo o useRequest, passo o path params necessario (no caso dos personagens de harrypotter, seria "characters")

//fixação 2-  fizemos mais uma alteração, como agoravamos consumir ou base url e caso quisemos consumir masi outras, o nosso use request estava rebendo a BASE-URL diretamente dentro da função, então criamos outro paramertro da função la chamado baseUrl, alteramos dentro do axios tbm e agora podemos enviar outras bases url como argumento

//OBS: fiz uma brincadeira para entender as props do styled componnets: passo uma props textclour = usuarios.haircolour dentro do card(lembre-se, agora o map esta mapeadno o array de personagens que recebmos na requisição, e la tem diversas propriedades.), no componente cards ele recebe as props. o nome ele coloca um <p> no card, mas veja que o backgrou e o textclor ele passa como props no CardCOntainer, como ele é um styled components, isso vai ser recebido como props dentro do arquivo de estlização(verificar no styles do card a sintaxe)

// OBS2: poderia ter deixado os exercicos anteriors, chamado um novo userequest, e fazendo outro map pra mostrar os personagens


function App() {

  //1.2 criamos uma const com o mesmo nome que esta sendo mapeado no retorno do APP e dizemos que ela sera igual o custom hook
  // veja que funciona da mesma forma, como o retorno do custom hook é o estado onde esta sendo guardada a requisição, isso fica basicamente como const nomeUsuarios = estado nomeUsuarios (com o a lista de usuarios setada nele, decorrente da requisição)


  // const nomeUsuarios = useCapturarNome()
  // const postagens = useCapturarPostagens()

  // 2.2 chamamos o useRequestData em duas const diferentes (os nomes são os mesmo que estão sendo mapeados) e passamos o path params de cada requisição, em cada um ele devolve o estado com a requisição armazenada e então mapeamos a const pois isso é basicamente const nomeUsuarios = estado dados de useRequest com a requsição de users que passamos por parametro

  //3.2, como agora estamos exportando dois elementos dentro de um array no nosso custom hook, temos que colocar o array aqui tbm
  // 3.3 usaremos o loading antes do map, pois o map só sera feitos quando a requisição acabar, entao fazemos um ternario : {!loading ? (se loading for falso) renderiza o container do map: (se for verdadeiro) renderza um <p> com CARREGANDO...}

  //3.4 a mesma coisa com o postagens, modificaremos a const póstagens, para tbm receber o loading e faremos o ternario
  //OBS: como eu to consumindo os dois no app, eu poderia só receber o primeiro loading (de nomeUsuarios) e usar ele duas vezes, no map dos ususarios e das postagens

  //3.5 tratamento dos erros (verificar arquivo primeiro para a explicação)
  // recebemos o erro tbm
  const [nomeUsuarios, loading, erroUsuario] = useRequestdata(BASE_URL_HP,"characters")
  const [postagens, loadingPostagens, erroPostagens] = useRequestdata(BASE_URL,"comments")
  console.log("ususarios no app", nomeUsuarios)

  //3.6 antes do ternario do loading, abrimos chavez e levamos o erro pra la e faremos um curto circuito, ou seja, caso o erroUsuario e o erroPostagnes sejam verdaderios, ele exibe o <p> com a mensagem erro na requisição, se não for ele nem olha pra segunda parte e vai direto pro ternario
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Title>Nomes dos usuários</Title>
      {erroUsuario && <p>ERRO NA REQUISIÇÃO, AGUARDE</p>}
      {!loading ?
        <NameContainer>
          {nomeUsuarios.map((usuario) => {
            return (
              <Card
                key={usuario.id}
                text={usuario.name}
                backgroudColor={'nome'}
                textColor={usuario.hairColour}
                especie={usuario.species}
              />)
          })}
        </NameContainer> :
        <p>CARREGANDO ...</p>
      }


      
      <hr />
      <Title>Comentários dos usuários</Title>
      {erroPostagens && <p>ERRO NA REQUISIÇÃO, AGUARDE</p>}
      {!loadingPostagens?
      <PostContainer>

      {postagens.map((post) => {
        //console.log(post);
        return (
          <Card
            key={post.id}
            text={post.body}
            backgroudColor={'#1dc690'}
            textColor={'#ffffff'}
          />)
      })}
    </PostContainer>:
    <p>CARREGANDO POSTAGENS ...</p>
    }
      
    </div>
  );
}

export default App;



