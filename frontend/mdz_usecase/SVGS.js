import React from "react";

export const LoginButton =  ({ className }) =>  {



return (<svg  className={className} width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="7" width="16" height="12" rx="4" stroke="#DB3A33"/>
<path opacity="0.3" d="M9 14L9 12" stroke="#DB3A33" strokeLinecap="round" />
<path d="M13 7V5C13 2.79086 11.2091 1 9 1V1C6.79086 1 5 2.79086 5 5L5 7" stroke="#DB3A33"/>
</svg>
);
};


export const AddButton =  ({ className }) =>  {

return (
    <svg  lassName={className} width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_2330_3474)">
<rect x="1" y="1" width="24" height="20" rx="6" fill="#4945C4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 5C13.4142 5 13.75 5.33579 13.75 5.75V10.25H18.25C18.6642 10.25 19 10.5858 19 11C19 11.4142 18.6642 11.75 18.25 11.75H13.75V16.25C13.75 16.6642 13.4142 17 13 17C12.5858 17 12.25 16.6642 12.25 16.25V11.75H7.75002C7.3358 11.75 7.00002 11.4142 7.00002 11C7.00002 10.5858 7.3358 10.25 7.75002 10.25H12.25V5.75C12.25 5.33579 12.5858 5 13 5Z" fill="white"/>
</g>
<defs>
<filter id="filter0_dd_2330_3474" x="0" y="0" width="26" height="23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_2330_3474"/>
<feOffset/>
<feColorMatrix type="matrix" values="0 0 0 0 0.285019 0 0 0 0 0.2695 0 0 0 0 0.77 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2330_3474"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_2330_3474" result="effect2_dropShadow_2330_3474"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_2330_3474" result="shape"/>
</filter>
</defs>
</svg>

);
};

export const EditButton =  ({ className }) =>  {
    return (
<svg className={className} width="21" height="21" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1968 4.55237L20.4478 10.8033L6.87407 24.3771L1.30082 24.9923C0.554729 25.0748 -0.0756416 24.444 0.00736623 23.6979L0.627483 18.1207L14.1968 4.55237ZM24.314 3.6217L21.3789 0.686646C20.4634 -0.228882 18.9786 -0.228882 18.063 0.686646L15.3018 3.44788L21.5528 9.69885L24.314 6.93762C25.2295 6.02161 25.2295 4.53723 24.314 3.6217Z" fill="black"/>
</svg>
);
};


export const DeleteButton =  ({ className }) =>  {
    return (
<svg className={className} width="18" height="21" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path  d="M21.0938 1.56251H15.2344L14.7754 0.649423C14.6782 0.454215 14.5284 0.29001 14.3429 0.175281C14.1575 0.0605526 13.9437 -0.00014785 13.7256 8.5609e-06H8.14453C7.92694 -0.000827891 7.71352 0.0596463 7.52871 0.174503C7.34391 0.289359 7.19519 0.453951 7.09961 0.649423L6.64062 1.56251H0.78125C0.57405 1.56251 0.375336 1.64482 0.228823 1.79133C0.0823101 1.93784 0 2.13656 0 2.34376L0 3.90626C0 4.11346 0.0823101 4.31217 0.228823 4.45869C0.375336 4.6052 0.57405 4.68751 0.78125 4.68751H21.0938C21.301 4.68751 21.4997 4.6052 21.6462 4.45869C21.7927 4.31217 21.875 4.11346 21.875 3.90626V2.34376C21.875 2.13656 21.7927 1.93784 21.6462 1.79133C21.4997 1.64482 21.301 1.56251 21.0938 1.56251ZM2.59766 22.8027C2.63492 23.3978 2.89754 23.9562 3.33206 24.3644C3.76658 24.7727 4.34033 24.9999 4.93652 25H16.9385C17.5347 24.9999 18.1084 24.7727 18.5429 24.3644C18.9775 23.9562 19.2401 23.3978 19.2773 22.8027L20.3125 6.25001H1.5625L2.59766 22.8027Z" fill="black"/>
</svg>

);
};

export const ShareButton =  ({ className }) =>  {
    return (
<svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2394_2903)">
<path d="M19.184 16.2921C18.0801 16.2921 17.0655 16.6739 16.2645 17.3124L11.2603 14.1847C11.4085 13.5144 11.4085 12.8198 11.2603 12.1494L16.2645 9.0218C17.0655 9.66033 18.0801 10.0421 19.184 10.0421C21.7728 10.0421 23.8715 7.94343 23.8715 5.35461C23.8715 2.7658 21.7728 0.667114 19.184 0.667114C16.5951 0.667114 14.4965 2.7658 14.4965 5.35461C14.4965 5.70413 14.535 6.04456 14.6076 6.37224L9.60339 9.49988C8.80247 8.8614 7.78787 8.47961 6.68396 8.47961C4.09514 8.47961 1.99646 10.5783 1.99646 13.1671C1.99646 15.7559 4.09514 17.8546 6.68396 17.8546C7.78787 17.8546 8.80247 17.4728 9.60339 16.8344L14.6076 19.962C14.5336 20.2961 14.4964 20.6374 14.4965 20.9796C14.4965 23.5684 16.5951 25.6671 19.184 25.6671C21.7728 25.6671 23.8715 23.5684 23.8715 20.9796C23.8715 18.3908 21.7728 16.2921 19.184 16.2921Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_2394_2903">
<rect width="25" height="25" fill="white" transform="translate(0.43396 0.667114)"/>
</clipPath>
</defs>
</svg>

);
};

