import { PropsWithChildren } from "react";
import './Card.css';

interface CardProps {
  title? : string;
}

const Card = ({children, title, ..._props}: PropsWithChildren<CardProps>)=>{
  return (
    <div className="card">
      {title && (<div className="cardTitle">{title}</div>)}
      {children}
    </div>
  )
}
export default Card;
