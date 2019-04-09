import {authHeader} from "../_helpers";


export const profileService = {
    getProfile
};

function getProfile(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        mode: 'cors'
};

    return fetch("http://localhost:4000/profil/5ca4f4be25601c2e649cd12f", requestOptions).then(handleResponse)
        .then(profile => {
            console.log(localStorage)
            localStorage.setItem('profile', JSON.stringify(profile));
            return profile;
        }).catch(err=>console.log(err));
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
