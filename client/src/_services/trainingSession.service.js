export const trainingSessionService = {
    addTrainingSession
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