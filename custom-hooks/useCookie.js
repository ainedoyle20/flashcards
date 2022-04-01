// import { useEffect } from "react";

// import { useCookies } from 'react-cookie';

// export default function useCookie(userData) {
//     const [cookies, setCookie] = useCookies(['currentUser']);

//     console.log('hit');

//     useEffect(() => {
//         console.log('userData: ', userData);
//         if (userData) {
//             setCookie('currentUser', true, { path: '/' });
//             setCookie('currentUserId', userData.id, { path: '/' });
//         } else {
//             setCookie('currentUser', false, { path: '/' });
//             setCookie('currentUserId', null, { path: '/' });
//         }
//     }, [userData]);

//     return cookies;
// }
