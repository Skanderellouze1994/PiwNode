
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
        .then(session => {
           localStorage.setItem('session', JSON.stringify(session));
            return session;
        });
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