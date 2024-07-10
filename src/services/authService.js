import { urlBase, http } from "./Http.js";
export const iniciarSesion = data => {
    return http().post(urlBase+"login",data);
}
export const registroUsuarioAxios = dato => {
    return http().post(urlBase+"usuario",dato);
}
export const cerrarSesion = () => {
    return http().post(urlBase+"logout")
}