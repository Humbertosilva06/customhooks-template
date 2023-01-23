
import { CardContainer } from "./style";

export const Card = ({text, backgroudColor, textColor, especie}) => {
  return (
    <CardContainer backgroudColor={backgroudColor} textColor={textColor}>
   
      <p>{text}</p>
     <hr></hr>
      <p>{especie}</p>
    </CardContainer>
  );
};