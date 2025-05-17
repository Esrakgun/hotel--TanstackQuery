import type { FC } from "react";
import { usePlaces } from "../../utils/service";
import { sortOptions } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";

const Filter: FC = () => {
  const { data } = usePlaces();
  //  console.log(data?.map((i)=>i.location));
  const [searchParams, setSearchParams] = useSearchParams();
  // Url'e parametre ekleyen fonksiyon:
  const handleChange = (name: string, value: string) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
    // console.log(name,value,searchParams,setSearchParams);
  };
  // Url'deki parametrelei sıfırla:
  const handleReset=()=>{
    setSearchParams({});
  }

  // Todo:new Set ile class'tan örnek alıp tam anlamıyla dizi oluşmadığı için spread operetörü ile ve köşeli parantez de yazıyoruz.Böylece tekrar eden elemanlardan kurtumuş oldum!
  // Otellerin konum değerlerinden oluşan benzersiz bir dizi oluştur:
  const locations = [...new Set(data?.map((i) => i.location))];

  return (
    <form className="flex flex-col gap-4 lg:gap-10 lg:mt-15 lg:sticky lg:top-10">
      <div className="field">
        <label htmlFor="location"> Nereye Gitmek İstiyorsunuz? </label>
        <select
          className="input"
          name="location"
          id="location"
          onChange={(e) => handleChange("location", e.target.value)}
        >
          {/* <option value="1">İstanbul</option>
          <option value="2">Ankara</option>
          <option value="3">İzmir</option>
          <option value="4">Adana</option> */}
          <option value="">Seçiniz</option>
          {locations?.map((i, key) => (
            <option key={key} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="title"> Konaklama Yerini Adına Göre Arayın.</label>
        <input
          className="input"
          type="text"
          name="title"
          id="title"
          placeholder="Örn:Seaside Villa"
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="sort"> Sıraya Göre: </label>
        <select
          className="input"
          name="sort"
          id="sort"
          onChange={(e) => handleChange("order", e.target.value)}
        >
          {sortOptions?.map((i, key) => (
            <option key={key} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
        <button
          type="reset"
          onClick={handleReset}
          className="bg-blue-500 hover:bg-blue-600 transition text-white mt-3 p-1 rounded-md cursor-pointer "
        >
          Filtreleri Temizle
        </button>
      </div>
    </form>
  );
};

export default Filter;
