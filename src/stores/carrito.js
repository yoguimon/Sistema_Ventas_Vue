
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carritoMovimiento', () => {
  const carritoCompras = ref([]);
  const carritoVentas = ref([]);
  const totalCompras = computed(() => {
    return carritoCompras.value.reduce((suma,elemento) => { return suma + elemento.precio_total},0);//reduce igual que foreach?, computed funciona cuando se realice algun cambio carritoCompras
  });
  const totalVentas = computed(() => {
    return carritoVentas.value.reduce((suma,elemento) => { return suma + elemento.precio_total},0);//reduce igual que foreach?, computed funciona cuando se realice algun cambio carritoCompras
  });
    const addCarritoCompras = param => {
        if(!comprobarProducto(param.id,carritoCompras)){
          let objeto = {
            producto_id: param.id,
            nombre: param.nombre,
            codigo: param.codigo,
            cantidad: 1,
            precio_unitario: parseFloat(param.precio_venta),
            precio_total: parseFloat(param.precio_venta)
          };
          carritoCompras.value.push(objeto);
        }else{
          const posicion = carritoCompras.value.findIndex(element=>element.producto_id===param.id);
          carritoCompras.value[posicion].cantidad++;
          carritoCompras.value[posicion].precio_total += parseFloat(param.precio_compra);
        }
    }
    const addCarritoVentas = param => {
      if(!comprobarProducto(param.id,carritoVentas)){
        let objeto = {
          producto_id: param.id,
          nombre: param.nombre,
          codigo: param.codigo,
          cantidad: 1,
          precio_unitario: parseFloat(param.precio_compra),
          precio_total: parseFloat(param.precio_compra)
        };
        carritoVentas.value.push(objeto);
      }else{
        const posicion = carritoVentas.value.findIndex(element=>element.producto_id===param.id);
        carritoVentas.value[posicion].cantidad++;
        carritoVentas.value[posicion].precio_total += parseFloat(param.precio_compra);
      }
  }
    const comprobarProducto = (param,carrito) => {
      const existe = carrito.value.some(element => element.producto_id === param);
      return existe;
      
    }
    const eliminarCarritoCompra = param => {
      carritoCompras.value.splice(param,1);
    }
    const eliminarCarritoVenta = param => {
      carritoVentas.value.splice(param,1);
    }
  return {  
    carritoCompras,
    carritoVentas,
    addCarritoCompras,
    totalCompras,
    eliminarCarritoCompra,
    addCarritoVentas,
    eliminarCarritoVenta,
    totalVentas
  }
});

