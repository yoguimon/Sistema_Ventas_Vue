import { urlBase, http } from "./Http";
export const getProductos = () => {
    return http().get(urlBase+"productos");
}
export const saveProducto = formulario => {
    return http().post(urlBase+"productos",formulario);
}
export const updateProducto = (id,formulario) => {
    return http().put(urlBase+"productos/"+id,formulario);
}
export const getProducto = id =>{
    return http().get(urlBase+"productos/"+id);
}
export const cambiarEstado = id =>{
    return http().delete(urlBase+"productos/"+id);
}