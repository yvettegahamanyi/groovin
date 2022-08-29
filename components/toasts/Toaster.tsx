import { useEffect } from 'react';
import toast , { Toaster }from 'react-hot-toast';
import { ToastProps } from '../../util/types';
export function Toast(props: ToastProps):JSX.Element{
useEffect(() =>{
  if(props.status === 'success'){
    toast.success(props.message,{
      style: {
        borderRadius: '10px',
        background: '#00c132',
        color: '#fff',
      },
    });
  }
  else if(props.status === 'error'){
 toast.error(props.message,{
    style: {
      borderRadius: '10px',
      background: '#E61F1F',
      color: '#fff',
    },
  });
}else return

},[props.status,props.message])
    
    return(
        <div className="text-sm">
        <Toaster
         position="top-center"
         reverseOrder={false}
        />
      </div>
    )
}