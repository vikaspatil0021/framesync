import { CheckIcon, Clock, Lock, SearchX, Users, X } from "lucide-react";

export const GoogleIcon = () => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         x="0px"
         y="0px"
         width="15px"
         height="15px"
         viewBox="0 0 48 48"
      >
         <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
         ></path>
         <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
         ></path>
         <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
         ></path>
         <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
         ></path>
      </svg>
   );
};

export const CheckMark = () => {
   return (
      <>
         <div className="rounded-full bg-green-700 p-3">
            <CheckIcon />
         </div>
      </>
   );
};

export const Xmark = () => {
   return (
      <>
         <div className="rounded-full bg-red-700 p-3">
            <X />
         </div>
      </>
   );
};

export const LockIcon = () => {
   return (
      <>
         <div className="rounded-full bg-red-700 p-3">
            <Lock />
         </div>
      </>
   );
};

export const ClockIcon = () => {
   return (
      <>
         <div className="rounded-full bg-red-700 p-3">
            <Clock />
         </div>
      </>
   );
};

export const NotFound = () => {
   return (
      <>
         <div className="rounded-full bg-red-700 p-3">
            <SearchX />
         </div>
      </>
   );
};

export const CopyIcon = () => {
   return (
      <>
         <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 105.02 122.88"
            height="16px"
            fill="#cccdce"
         >
            <g>
               <path
                  className="st0"
                  d="M97.67,20.81L97.67,20.81l0.01,0.02c3.7,0.01,7.04,1.51,9.46,3.93c2.4,2.41,3.9,5.74,3.9,9.42h0.02v0.02v75.28 v0.01h-0.02c-0.01,3.68-1.51,7.03-3.93,9.46c-2.41,2.4-5.74,3.9-9.42,3.9v0.02h-0.02H38.48h-0.01v-0.02 c-3.69-0.01-7.04-1.5-9.46-3.93c-2.4-2.41-3.9-5.74-3.91-9.42H25.1c0-25.96,0-49.34,0-75.3v-0.01h0.02 c0.01-3.69,1.52-7.04,3.94-9.46c2.41-2.4,5.73-3.9,9.42-3.91v-0.02h0.02C58.22,20.81,77.95,20.81,97.67,20.81L97.67,20.81z M0.02,75.38L0,13.39v-0.01h0.02c0.01-3.69,1.52-7.04,3.93-9.46c2.41-2.4,5.74-3.9,9.42-3.91V0h0.02h59.19 c7.69,0,8.9,9.96,0.01,10.16H13.4h-0.02v-0.02c-0.88,0-1.68,0.37-2.27,0.97c-0.59,0.58-0.96,1.4-0.96,2.27h0.02v0.01v3.17 c0,19.61,0,39.21,0,58.81C10.17,83.63,0.02,84.09,0.02,75.38L0.02,75.38z M100.91,109.49V34.2v-0.02h0.02 c0-0.87-0.37-1.68-0.97-2.27c-0.59-0.58-1.4-0.96-2.28-0.96v0.02h-0.01H38.48h-0.02v-0.02c-0.88,0-1.68,0.38-2.27,0.97 c-0.59,0.58-0.96,1.4-0.96,2.27h0.02v0.01v75.28v0.02h-0.02c0,0.88,0.38,1.68,0.97,2.27c0.59,0.59,1.4,0.96,2.27,0.96v-0.02h0.01 h59.19h0.02v0.02c0.87,0,1.68-0.38,2.27-0.97c0.59-0.58,0.96-1.4,0.96-2.27L100.91,109.49L100.91,109.49L100.91,109.49 L100.91,109.49z"
               />
            </g>
         </svg>
      </>
   );
};

export const LoadingIcon = () => {
   return (
      <svg
         className="mx-4 h-5 w-5 animate-spin absolute"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
      >
         <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
         />
         <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
         />
      </svg>
   );
};

export const SwitchTeamIcon = () => {
   return (
      <>

         <svg fill="#f4f4f4" height="16" width='16' viewBox="0 0 16 24" className="">
            <path d="M13 8.517L8 3 3 8.517M3 15.48l5 5.517 5-5.517"></path>
         </svg>
      </>
   )
}


export const AngleRight = () => {
   return (
      <>
         <svg height="24px" viewBox="0 0 1792 1792" width="24" fill='#f2f2f2' xmlns="http://www.w3.org/2000/svg">
            <path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" />
         </svg>
      </>
   )
}

export const AngleDown = () => {
   return (
      <>

         <svg className="py-1" width="14px" height="15px" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0.708L0.708 0L3.354 2.647L6 0L6.708 0.708L3.354 4.061L0 0.708Z" fill="white" />
         </svg>
      </>
   )
}

export const NotificationIcon = () => {
   return (
      <>

         <svg width="31px" height="31px" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 13V16C20 16.768 20.289 17.47 20.764 18H11.236C11.711 17.47 12 16.768 12 16V13C12 10.79 13.79 9 16 9C18.21 9 20 10.79 20 13ZM21 13V16C21 17.105 21.895 18 23 18V19H9V18C10.105 18 11 17.105 11 16V13C11 10.239 13.239 8 16 8C18.761 8 21 10.239 21 13ZM16 22C14.895 22 14 21.105 14 20H13C13 21.657 14.343 23 16 23C17.657 23 19 21.657 19 20H18C18 21.105 17.105 22 16 22Z" fill="white" fill-opacity="0.9" />
         </svg>
      </>
   )
}


export const RecentIcon = () => {
   return (
      <>

         <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 8.59261C3 5.62709 5.239 3.22224 8 3.22224C10.761 3.22224 13 5.62709 13 8.59261C13 11.5581 10.761 13.963 8 13.963C5.239 13.963 3 11.5581 3 8.59261ZM8 2.14816C4.686 2.14816 2 5.03313 2 8.59261C2 12.1521 4.686 15.0371 8 15.0371C11.314 15.0371 14 12.1521 14 8.59261C14 5.03313 11.314 2.14816 8 2.14816ZM7.5 5.37038V9.66668H11.5V8.59261H8.5V5.37038H7.5Z" fill="white" fill-opacity="0.9" />
         </svg>
      </>
   )
}

export const AppsIcon = () => {
   return (
      <>

         <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_44_8)">
               <path d="M11.875 1.875H3.125C2.43464 1.875 1.875 2.43464 1.875 3.125V11.875C1.875 12.5654 2.43464 13.125 3.125 13.125H11.875C12.5654 13.125 13.125 12.5654 13.125 11.875V3.125C13.125 2.43464 12.5654 1.875 11.875 1.875Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M1.875 5.625H13.125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M1.875 9.375H13.125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M5.625 1.875V13.125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M9.375 1.875V13.125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
               <clipPath id="clip0_44_8">
                  <rect width="15" height="15" fill="white" />
               </clipPath>
            </defs>
         </svg>
      </>
   )
}

export const ManyUsersIcon = () => {
   return (
      <>

         <svg width="15px" height="15px" viewBox="0 0 15 15" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_9_46)">
               <path d="M10 13.1346V11.9423C10 11.3099 9.73661 10.7033 9.26777 10.2561C8.79893 9.80894 8.16304 9.55771 7.5 9.55771H3.75C3.08696 9.55771 2.45107 9.80894 1.98223 10.2561C1.51339 10.7033 1.25 11.3099 1.25 11.9423V13.1346" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M5.625 7.17307C7.00571 7.17307 8.125 6.10544 8.125 4.78845C8.125 3.47147 7.00571 2.40384 5.625 2.40384C4.24429 2.40384 3.125 3.47147 3.125 4.78845C3.125 6.10544 4.24429 7.17307 5.625 7.17307Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M13.75 13.1346V11.9423C13.7496 11.414 13.5652 10.9007 13.2259 10.4831C12.8865 10.0655 12.4113 9.76728 11.875 9.63519" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
               <path d="M10 2.48135C10.5378 2.61269 11.0144 2.911 11.3548 3.32927C11.6952 3.74754 11.8799 4.26196 11.8799 4.79145C11.8799 5.32094 11.6952 5.83536 11.3548 6.25363C11.0144 6.6719 10.5378 6.97021 10 7.10155" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
               <clipPath id="clip0_9_46">
                  <rect width="15" height="14.3077" fill="white" transform="translate(0 0.615387)" />
               </clipPath>
            </defs>
         </svg>
      </>
   )
}


export const ThreeVerticalDotsIcon = () => {
   return (
      <>
         <svg width="18px" height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#fff" className="bi bi-three-dots-vertical" >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
         </svg>

      </>
   )
}

export const LogoutIcon = () => {
   return (
      <>
         <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#f2f2f2" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
         </svg>
      </>
   )
}
