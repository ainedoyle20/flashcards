import React, { useEffect } from "react";

import { useCookies } from 'react-cookie';

export default function useCookie(user) {
    const [cookies, setCookie] = useCookies(['currentUser']);

    console.log('hit');

    useEffect(() => {
        if (user) {
            console.log('useCookie user is true', user.id);
            setCookie('currentUser', true, { path: '/' });
            setCookie('currentUserId', user.id, { path: '/'});
        } else {
            console.log('useCookie user is false: ', user);
            setCookie('currentUser', false, { path: '/' });
            setCookie('currentUserId', null, { path: '/'});
        }
    }, [user]);

    return cookies;
}
