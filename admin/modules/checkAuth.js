export const checkAuth = () => {

    const isAuth = document.cookie.split(';').some(item => item.trim() === 'auth=true');

    if (!isAuth) {
        window.location.replace("index.html");
    } else {
        console.log("table loaded");
    }
}