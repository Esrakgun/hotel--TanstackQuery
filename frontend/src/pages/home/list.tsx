import type { FC } from "react";
import { usePlaces } from "../../utils/service";
import Card from "../../components/card";
import { useSearchParams } from "react-router-dom";
import type { FilterParams } from "../../types";
import Loader from "../../components/loader";
import Error from "../../components/error";

// !Bilgiler:
// 1)useQuery Hook'una Api isteğinin isini  ve Api isteğini atan fonksiyonu veriyoruz.
// 2)useQuery bizim için Api isteğini atıyor ve gelen cevaba göre State'ini yönetiyor.
//3) IsLoading, Error, Data gibi Stateleri bizim için tutuyor.
//4) Otomatik olara Cache işlemi tutuyor.

// _______________________________________________________-
//  Todo:Başta böyle yazdık:1.Versiyon
// const List:FC= () => {
//  const queryData = useQuery({
//  queryKey:["places"] ,
//  queryFn:()=>api.get("/places")});
//  console.log(queryData);
// ____________________________________________________________

//  Todo:Sonradan böyle yazdık:2.Versiyon:
// const List: FC = () => {
// const { isLoading, error, data } = useQuery<Place[]>({
//     queryKey: ["places"],
//     queryFn: () => api.get("/places").then((res) => res.data.places),
// });
// console.log({ isLoading, error, data });
// ____________________________________________________________

// Todo:Son olarak heryerde rahat erişim olması adına serviceden kurulan bilgiyi çekerek yaptık:Cache'deki Api verisini almış ve istediğim kadar Api isteği atmış gibi oluyorum.

const List: FC = () => {
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  console.log(paramsObject);
  const { isLoading, error, data , refetch} = usePlaces(paramsObject as FilterParams);

  if (isLoading) return <Loader/>;

  if (error) return <Error message={error.message} refetch={refetch} />;

  return (
    <div className="grid gap-5 mt-5">
      <h1 className="font-bold text-3xl mb-5">Çevrende Neler Var ???</h1>
      <div className="mt-10">
        {data?.length === 0 || !data ? (
          <div>
            <p>Aradığınız kriterlere uygun bir sonuç bulunamadı</p>
          </div>
        ) : (
          data?.map((place) => <Card key={place.id} place={place} />)
        )}
      </div>
    </div>
  );
};

export default List;
