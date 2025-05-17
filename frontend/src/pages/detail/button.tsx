import type { FC } from "react"
import { useDeletePlace } from "../../utils/service";



interface Props {
    id: string;
}
// !useQuery Api isteğini sayfa yüklendiğinde tetikler.
// !useMutation Api isteğini mutate() fonksiyonu çağrıldığında tetikler.

const Button: FC<Props> = ({ id }) => {
    console.log(id);
    const { mutate, isPending } =useDeletePlace();
    return (
          <div className="flex justify-end my-5">
              <button onClick={() => mutate(id)}
                  disabled={isPending}
                  className="border border-zinc-300 py-1 px-4 rounded-md transition hover:bg-zinc-500 cursor-pointer">
                  {isPending ? "Kaldırılıyor.." : "Kaldır"}
              </button>
          </div>
      )
  }
  
  export default Button;
    

 
    
    