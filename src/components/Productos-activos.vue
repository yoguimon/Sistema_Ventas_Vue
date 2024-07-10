<template>
    <div class="col-12 col-md-6 mt-3">
        <div class="card">
            <div class="card-header card-titulo" style="background-color: #77B0AA;">
                <h5 class="card-title">Productos registrados</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table" id="tabla-productos">
                        <thead class="table-success">
                            <tr>
                                <th>Nro</th>
                                <th>Nombre</th>
                                <th>Codigo</th>
                                <th>Cantidad <span class="text-danger">{{propiedades.tipoPrecio=='compra'?'(Compra)':'(Venta)'}}</span></th>
                                <th>Precio <span class="text-danger">{{propiedades.tipoPrecio=='compra'?'(Compra)':'(Venta)'}}</span></th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(producto,index) in productos">
                                <td>{{index+1}}</td>
                                <td>{{producto.nombre}}</td>
                                <td>{{producto.codigo}}</td>
                                <td>{{producto.cantidad}}</td>
                                <td>{{propiedades.tipoPrecio=='compra'?producto.precio_compra:producto.precio_venta}}</td>
                                <td><div class="text-center"><button class="btn btn-sm" type="button" style="background-color: #77B0AA;" @click="propiedades.tipoPrecio=='compra'?addCarritoCompras(producto):addCarritoVentas(producto)"><i class="fas fa-plus"></i></button></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getProductos } from '@/services/productosService';
import { useCarritoStore } from '@/stores/carrito';
import { onMounted, ref, defineProps } from 'vue';


    const productos = ref([]);

    const { addCarritoCompras } = useCarritoStore();
    const { addCarritoVentas } = useCarritoStore();
    const propiedades = defineProps({
        tipoPrecio: String,
        required: true
    });
    onMounted(()=>{
        listarProductos();
    });
    const listarProductos = async () =>{
        try {
            const { data } = await getProductos();
            productos.value = data.datos.data;
            //paginacion aqui
        } catch (error) {
            console.log(error);
        }
    }
</script>
<style>
    
</style>