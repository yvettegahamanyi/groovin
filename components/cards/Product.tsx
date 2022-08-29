/* eslint-disable @next/next/no-img-element */
import {
  ShareAltOutlined
} from '@ant-design/icons'
import { IProductProps, ToastProps, UserObject } from '../../util/types';
import {
TwitterShareButton,TwitterIcon,FacebookShareButton,FacebookIcon,WhatsappShareButton,WhatsappIcon,LinkedinShareButton,LinkedinIcon,PinterestShareButton, PinterestIcon
} from 'next-share'
import moment from 'moment';
import styles from "../../styles/swiper.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"


// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper';
import { useContext, useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { AppContext } from '../context/GlobalContext';
import { Api } from '../../pages/api/service/Api';
import { EbackendEndpoints, EhttpMethod } from '../../util/enums';
import { getUserProfileAlphabets } from '../../util/profileLetters';

// install Swiper modules
SwiperCore.use([Pagination]);

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
export function Product(props: IProductProps): JSX.Element {
// const design: design = props.design;
  const {user} = useContext(AppContext);
  const [errortext, setErrortext] = useState<string>("");
  const [{status,message}, setStatus] = useState<ToastProps>({status:"",message:""});
  // console.log(props.design);
  // const images: string[] = design.images!;
    // const [time, setTime] = useState<string>(moment(new Date(design.createdAt)).fromNow());
    const  [votedUsers, setVotedUsers] = useState<string[]>(props.design!.votes!);
    const vote = async ()=>{
      // let found = votedUsers.includes(user?._id);
      if(votedUsers.includes(user!._id!)){
        for (let index = 0; index < votedUsers.length; index++) {
          if (votedUsers[index] == user?._id) {
            votedUsers.splice(index, 1);
          }
        }
      }else{
        votedUsers.push(user!._id!);
      }
      props.design!.votes=votedUsers;
      
      await new Api().connect(EbackendEndpoints.UPDATE_DESIGN+props.design!._id, EhttpMethod.PUT,props.design)
      .then(
        (response) => {
          if (response.success === true) {
              
          } else setStatus({status:"error",message:'something went rwong'}); setTimeout(() => { setStatus({status:'',message:''})},1000)
        },
        (error) => {
          // setStatus({status:"error",message:error.message});
            setErrortext("Invalid username or password");
        }
      );
    }

    const profileAlpha = getUserProfileAlphabets(props.design?.designer_id?.name!);
  return (
      <div className={`${props.hasActions && 'mb-5'}`}>
        {props.design? (
          <div className={`${props.hasActions && 'pb-5'}`}>
          <div className="flex gap-2 items-center">
              {/* <img src="/user_profile.png" alt="User profile" className="sm-img rounded-full" /> */}
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-stretch">
                 <p className="self-center mx-auto"> {profileAlpha}</p>
                </div>
              

              <div>
                {props.design.designer_id === null ?(<h1 className="font-bold text-sm">Unkown</h1>): (<h1 className="font-bold text-sm">{props.design.designer_id!.username!}</h1>)}
                  
                  <span className="text-gray-500 text-xs">{moment(new Date(props.design!.createdAt!)).fromNow()}</span>
              </div>
          </div>
          <div className=" my-5 relative z-5">

              {/* <img src="/shoes_product.png" alt="Product" className="rounded-md lg-img" /> */}
              {/* <Swiper spaceBetween={30} style={{'--swiper-pagination-color': '#fff'}}   pagination={{ */}
              <Swiper spaceBetween={30} pagination={{
"clickable": true
}}  className="mySwiper">
{/* <SwiperSlide> <img src="/shoes_product.png" alt="Product" className="rounded-md lg-img" /> </SwiperSlide><SwiperSlide> <img src="/shoes_product.png" alt="Product" className="rounded-md lg-img" /> </SwiperSlide><SwiperSlide> <img src="/shoes_product.png" alt="Product" className="rounded-md lg-img" /> </SwiperSlide> */}

{props.design!.images!.map((item, index)=>(
             <SwiperSlide key={index}> <img src={item} alt="Product" className="rounded-md lg-img " /> </SwiperSlide>
           ))}

</Swiper> 
          </div>
          {props.hasActions &&
          <div className="grid grid-cols-2 text-sm">
              <div className="flex gap-2 items-center" onClick={()=>vote()}>
                  <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.89329 14.8505C6.97085 14.6289 6.85402 14.3865 6.63259 14.309C6.41104 14.2315 6.16863 14.3482 6.0911 14.5697L5.42131 16.4834L4.75154 14.5697C4.67399 14.3482 4.43152 14.2315 4.21006 14.309C3.98854 14.3866 3.87177 14.629 3.94932 14.8505L5.02018 17.9102C5.04176 17.9718 5.07656 18.0261 5.1207 18.0702C5.19871 18.1482 5.30598 18.1947 5.42128 18.1948C5.60188 18.1948 5.76276 18.0806 5.82238 17.9102L6.89329 14.8505Z" fill="#57535A" />
                      <path d="M10.3657 15.7809C10.3657 14.9562 9.69467 14.2851 8.86982 14.285C8.04501 14.2851 7.37398 14.9561 7.37395 15.7809L7.37395 16.6988C7.37395 17.1112 7.54171 17.4852 7.81261 17.7561C8.08347 18.0269 8.45743 18.1947 8.86982 18.1947C9.69464 18.1946 10.3657 17.5236 10.3657 16.6988L10.3657 15.7809ZM8.86982 17.3448C8.51365 17.3448 8.22389 17.055 8.22389 16.6988L8.22389 15.781C8.22386 15.4248 8.51362 15.135 8.86982 15.135C9.04789 15.135 9.20938 15.2074 9.32636 15.3244C9.44334 15.4414 9.51576 15.6029 9.51576 15.781L9.51576 16.6988C9.51576 17.055 9.226 17.3448 8.86982 17.3448Z" fill="#57535A" />
                      <path d="M16.1091 17.3448L15.1323 17.3448C15.0781 17.3449 15.0341 17.3008 15.0341 17.2465L15.0341 16.6649L15.68 16.6649C15.9147 16.6649 16.1049 16.4746 16.105 16.2399C16.105 16.0052 15.9147 15.815 15.68 15.8149L15.0341 15.8149L15.0341 15.2333C15.0341 15.1791 15.0781 15.135 15.1323 15.135L16.1092 15.135C16.3438 15.135 16.5341 14.9448 16.5341 14.7101C16.5341 14.4754 16.3438 14.2851 16.1092 14.2851H15.1323C14.6095 14.2852 14.1842 14.7105 14.1841 15.2333L14.1841 17.2466C14.1841 17.4999 14.2828 17.738 14.4619 17.9171C14.6409 18.0961 14.8791 18.1948 15.1323 18.1948L16.1091 18.1948C16.3438 18.1948 16.534 18.0045 16.5341 17.7698C16.5341 17.5351 16.3438 17.3449 16.1091 17.3448Z" fill="#57535A" />
                      <path d="M12.6925 15.1351H13.2492C13.4838 15.1351 13.6741 14.9448 13.6741 14.7101C13.6741 14.4754 13.4838 14.2852 13.2492 14.2852H12.2676C12.2676 14.2852 12.2675 14.2852 12.2675 14.2852C12.2675 14.2852 12.2674 14.2852 12.2674 14.2852L11.2858 14.2852C11.0512 14.2852 10.8609 14.4755 10.8609 14.7101C10.8609 14.8275 10.9085 14.9337 10.9854 15.0106C11.0622 15.0875 11.1685 15.1351 11.2858 15.1351L11.8425 15.1351L11.8425 17.7698C11.8425 17.8872 11.8901 17.9934 11.967 18.0703C12.0439 18.1472 12.1501 18.1948 12.2675 18.1948C12.5021 18.1948 12.6924 18.0045 12.6924 17.7698L12.6925 15.1351Z" fill="#57535A" />
                      <path d="M20.8765 9.99771L17.04 6.1663C16.9606 6.08686 16.8528 6.04233 16.7406 6.04233H15.8231L16.9137 4.95173C17.0792 4.78622 17.0792 4.51791 16.9137 4.35256L13.6853 1.12414C13.5198 0.958621 13.2515 0.958621 13.086 1.12414L11.7454 2.46483L8.1633 6.0468C8.14427 6.04415 8.12507 6.04233 8.10537 6.04233H5.25367C5.14111 6.04233 5.03336 6.08702 4.95391 6.16663L1.12499 9.99787V9.99804C1.04836 10.0747 1.00085 10.1806 1.00085 10.2976V22.271C1.00085 22.5051 1.19054 22.6947 1.42458 22.6947H20.5771C20.8112 22.6947 21.0009 22.5051 21.0009 22.271V17.9793C21.0009 17.7453 20.8112 17.5556 20.5771 17.5556C20.3431 17.5556 20.1534 17.7453 20.1534 17.9793V21.8473H1.84831V10.7214H20.1534V14.5893C20.1534 14.8234 20.3431 15.0131 20.5771 15.0131C20.8112 15.0131 21.0009 14.8234 21.0009 14.5893V10.2976C21.0009 10.1804 20.9532 10.0745 20.8765 9.99771V9.99771ZM12.3446 3.06401L13.3857 2.0229L16.0148 4.65215L12.7089 7.95803H9.2198L8.33511 7.07351L12.3446 3.06401ZM2.44698 9.8739L5.42911 6.88978H7.35442C7.27844 7.04752 7.30542 7.24233 7.43618 7.37309L8.02129 7.95803H6.68539C6.45135 7.95803 6.26167 8.14788 6.26167 8.38176C6.26167 8.6158 6.45135 8.80548 6.68539 8.80548H15.3161C15.5502 8.80548 15.7399 8.6158 15.7399 8.38176C15.7399 8.14788 15.5502 7.95803 15.3161 7.95803H13.9073L14.9757 6.88978H16.5651L19.5531 9.8739H2.44698Z" fill="#57535A" stroke="#57535A" strokeWidth="0.4" />
                      <path d="M20.5771 15.8603C20.4655 15.8603 20.3563 15.9057 20.2775 15.9846C20.1987 16.0634 20.1534 16.1727 20.1534 16.2841C20.1534 16.396 20.1987 16.5049 20.2775 16.5842C20.3563 16.6629 20.4655 16.7078 20.5771 16.7078C20.6885 16.7078 20.7977 16.6629 20.8767 16.5842C20.9555 16.5049 21.0008 16.3956 21.0008 16.2841C21.0008 16.1727 20.9555 16.0638 20.8767 15.9846C20.7977 15.9057 20.6885 15.8603 20.5771 15.8603Z" fill="#57535A" stroke="#57535A" strokeWidth="0.4" />
                  </svg>

                  <span className="text-xs">{props.design.votes!.length}</span>


              </div>

              <div className="flex justify-end">
                  <div className="flex gap-1  items-center ">
                  {/* <ShareAltOutlined /> 
                  <span>Share</span> */}
                  <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        share
        <ShareAltOutlined className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="z-30 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
        {/* <div className="py-1"> */}
          <Menu.Item>
            {({ active }) => (
              <div 
              className="flex inline-block my-2 mx-2 " 
                // className={classNames(
                //   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                //   'block px-4 py-2 text-sm'
                // )}
              >
              <WhatsappShareButton
url={'https://github.com/next-share'}
title={'next-share is a social share buttons for your next React apps.'}
separator=":: "
>
<WhatsappIcon size={32} round />
</WhatsappShareButton>
<p className='ml-5 self-center'>Whatsapp</p>
</div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div 
              className="flex inline-block my-2 mx-2 " 
                // className={classNames(
                //   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                //   'block px-4 py-2 text-sm'
                // )}
              >
              <LinkedinShareButton
url={'https://github.com/next-share'}
title={'next-share is a social share buttons for your next React apps.'}
>
<LinkedinIcon size={32} round />
</LinkedinShareButton>
<p className='ml-5 self-center'>Linkedin</p>
</div>
            )}
          </Menu.Item>
        {/* </div>
        <div className="py-1"> */}
          <Menu.Item>
            {({ active }) => (
              <div 
              className="flex inline-block my-2 mx-2 " 
                // className={classNames(
                //   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                //   'block px-4 py-2 text-sm'
                // )}
              >
              <TwitterShareButton
url={'https://github.com/next-share'}
title={'next-share is a social share buttons for your next React apps.'}
>
<TwitterIcon size={32} round />
</TwitterShareButton>
<p className='ml-5 self-center'>Twitter</p>
</div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
                   <div 
                   className="flex inline-block my-2 mx-2 " 
                     // className={classNames(
                     //   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                     //   'block px-4 py-2 text-sm'
                     // )}
                   >
                   <FacebookShareButton
     url={'https://github.com/next-share'}
     title={'next-share is a social share buttons for your next React apps.'}
   >
     <FacebookIcon size={32} round />
   </FacebookShareButton>
   <p className='ml-5 self-center'>Facebook</p>
   </div>
            )}
          </Menu.Item>
        {/* </div> */}
        {/* <div className="py-1"> */}
          <Menu.Item>
            {({ active }) => (
                   <div 
                   className="flex inline-block my-2 mx-2 " 
                     // className={classNames(
                     //   active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                     //   'block px-4 py-2 text-sm'
                     // )}
                   >
   <PinterestShareButton
  url={'https://github.com/next-share'}
  media={'next-share is a social share buttons for your next React apps.'}
>
  <PinterestIcon size={32} round />
</PinterestShareButton>
   <p className='ml-5 self-center'>Pinterest</p>
   </div>
            )}
          </Menu.Item>
        {/* </div> */}
      </Menu.Items>
    </Transition>
  </Menu>
                  </div>
              </div>
          </div>
}
          
          </div>
        ):(
          <div>
            <p>there is no design available</p>
          </div>
        )}
          
        { props.hasActions &&  <hr />}
      </div>
  )
}