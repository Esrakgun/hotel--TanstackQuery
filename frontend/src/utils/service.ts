import { useMutation, useQuery } from "@tanstack/react-query";
import type { CreatePlaceResponse,FilterParams,HotelFormValues,Place } from "../types";
import api from "./api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// !Bilgiler:
// 1)useQuery Hook'una Api isteğinin isini  ve Api isteğini atan fonksiyonu veriyoruz.
// 2)useQuery bizim için Api isteğini atıyor ve gelen cevaba göre State'ini yönetiyor.
//3) IsLoading, Error, Data gibi Stateleri bizim için tutuyor.
//4) Otomatik olara Cache işlemi tutuyor.Cache deki apı verisini almış ve isteiğim kadar api isteği atmıs gıbı oluyorum.
// Hata durumunda 3 kez daha extra dneme yapıyor.
// 5) Birden fazla Component'da aynı veriye ihtiyacımız varsa State Manegament Kütüphanesine gerek duymadan bütün componentlerda UseQuery ile Api'a istek atarız.
// Anlık sunucu yogunlugundan kaynaklanıcak hataların önüne geceriz.
// Gereksiz kod tekrarının da önüne geçeriz.

export const usePlaces = (params?: FilterParams) =>
  useQuery<Place[]>({
    // Api isteğinin adı:Bağımlılık Dizisini Tanımlamak için kullanıyoruz.
    queryKey: ["places", params], //useEffectdeki bağımlılık dizi burdaki key kısmı dızı olan tek yer burası.
    // then bölümünden return edilen veri useQuery tarafından saklanır (data)
    queryFn: () =>
      api.get("/places", { params }).then((res) => res.data.places),
    // todo:Diğerleri:____________________________________________
    // Hata durumunda deneme sayısı:
    // retry:2,
    // Hata durumunda bekleme süresi:
    // retryDelay:2000,
    // Stale time:Cache'deki verilerin geçerli kalma Süresi:
    // staleTime:0,
    // GarbageTime:Cache'deki verilerin geçersiz kalma Süresi:
    // gcTime:30000,
  });

//!  id'ye göre bir veri döndüren Api isteği:
export const usePlace = (id: string) =>
  useQuery<Place>({
    queryKey: ["place", id],
    queryFn: () => api.get(`/place/${id}`).then((res) => res.data.place),
  });

// Todo:İd'ye göre bir veri silen Api isteği:
export const useDeletePlace = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["remove"],
    mutationFn: (id: string) => api.delete(`/place/${id}`),
    onSuccess: () => {
      toast.success("Konaklama Noktası Başarıyla Kaldırıldı.");
      navigate("/");
    },
    onError: () => {
      toast.error("Bir Hata Oluştu");
    },
  });
};


// Yeni Bir Konaklama Noktası Oluşturan api İsteği:
export const useCreatePlace = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["create"],
    mutationFn: (values: HotelFormValues) =>
      api.post<CreatePlaceResponse>("/places", values),
    onSuccess: (res) => {
      toast.success("Konaklama noktası başarıyla oluşturuldu");
      navigate(`/place/${res.data.place.id}`); // detay sayfasına
    },
    onError: () => {
      toast.error("Bir hata oluştu");
    },
  });
};