import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComponent = ({ onLogin }) => {
    const responseFacebook = (response) => {
        onLogin(response);
    };

    const app_id = import.meta.env.VITE_APP_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;

    return (
        <FacebookLogin
            appId={app_id}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            scope="pages_show_list, pages_manage_engagement, pages_read_engagement, pages_manage_posts, pages_read_user_content, pages_manage_posts, pages_manage_metadata, page_events"
            disableMobileRedirect={true}
            isMobile={false}
            redirectUri={redirectUri}
            responseType="token"
        />
    );
};

export default FacebookLoginComponent;
