
export const trainingSessionService = {
    addTrainingSession,
    getAll
};

function addTrainingSession(id , session) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session })
    };

    return fetch(`http://localhost:4000/trainingSession/add/${id}`, requestOptions)
        .then(handleResponse)
        .then(session => {
           localStorage.setItem('session', JSON.stringify(session));
            return session;

        });
}
        }).then(console.log(localStorage));
}

function getAll() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`http://localhost:4000/trainingSession/all`, requestOptions).then(sessions => {
        localStorage.setItem('sessions', JSON.stringify(sessions));
        return sessions;
    }).then(console.log(sessionStorage));
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
