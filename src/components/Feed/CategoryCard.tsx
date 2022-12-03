import {Container, Typography, Chip} from '@mui/material';
import { ICategories } from '@store/Slices/categorySlice';

interface ICategoryCardProps{
    handleClick:(id:string|number, description:string) => void;
    selected:boolean;
}

const CategoryCard = ({ _id, status, title, description, handleClick, selected}:ICategories&ICategoryCardProps) => {
    return(
        <>
            <Chip onClick={()=>handleClick(_id as string, description)}  sx={{my:1, mx:1}} label={title} color="primary" variant={selected ? 'filled' : 'outlined'} />    
        </>
    )
}   

export default CategoryCard;