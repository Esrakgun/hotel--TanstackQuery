import type { FC } from "react";
import type { Place } from "../../types";
import { Link } from "react-router-dom";
import Status from "./status";
import Rating from './rating';


interface Props{
    place:Place;
}

const Card:FC<Props> = ({place}) => {
  return (
    <Link to={`/place/${place.id}`} className="border border-zinc-300 rounded-md p-4 gap-4 grid grid-cols-3 min-h-[300px] hover:shadow-md">
        {/* Resimler olucak */}

     <div>
        <img src={place.image_url} alt={place.name} className="size-full object-cover rouded-lg" />
     </div>

    <div className="col-span-2 flex flex-col justify-between">
     {/* İçerik */}
     <div className=" flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">{place.name}</h1>
         {/* yazılı kullnamak için denedik:Detay sayfasında yazıcaz zaten: <Status availability={place.availability} expand/> */}
         <Status availability={place.availability}/>
      </div>
      <p>{place.location}</p>

     <div className="flex gap-4 mb-2">
      {place.amenities.slice(0,2).map((i,key)=>(
        <span key={key} className="border py-1 px-2 rounded-md border-zinc-300 text-nowrap line-clamp-1">{i}
        </span>
      ))}
     </div>

      <Rating rating={place.rating}/>
      {/*Detay safasında zaten yazılıcak denemek için yaptık: <Rating rating={place.rating} expand/> */}
     </div>

    {/* Fiyat Bilgisi: */}
    <div className="flex flex-col items-end">
      <span className="text-2xl font-bold">${place.price_per_night}</span>
      <span className="text-xs text-gray-400">Vergiler ve Ücretler Dahildir.</span>
    </div>

    </div>

    </Link>
  )
}

export default Card;