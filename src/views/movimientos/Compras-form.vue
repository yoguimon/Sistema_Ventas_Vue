<template>
    <div class="container mt-4" id="formulario-compra">
        <div class="row">
            <ProductosActivos tipoPrecio="compra"></ProductosActivos>
            <div class="col-12 col-md-6 mt-3">
                <div class="card">
                    <div class="card-header card-titulo" style="background-color: #77B0AA">
                        <h5 class="card-title">Lista carrito</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-input mb-4">
                            <label class="form-label">Proveedor</label>
                            <select v-model="proveedorId" class=" form-select">
                                <option value="">Seleccione</option>
                                <option :value="proveedor.id" v-for="proveedor in proveedores">{{proveedor.nombre}} {{proveedor.apellido}}</option>
                            </select>
                        </div>
                        <div class="table-responsive">
                            <table class="table" id="tabla-carrito">
                                <thead class="table-success">
                                    <tr>
                                        <th>Nro</th>
                                        <th>Nombre</th>
                                        <th>Codigo</th>
                                        <th>Precio <span class="text-danger">(compra)</span></th>
                                        <th>Cantidad <span class="text-danger">(compra)</span></th>
                                        <th>Subtotal</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,indice) in useStore.carritoCompras" :key="indice">
                                        <td>{{indice+1}}</td>
                                        <td>{{item.nombre}}</td>
                                        <td>{{item.codigo}}</td>
                                        <td><input type="number" class="form-control from-control-sm" v-model="item.precio_unitario" @change="modificarPrecio(indice)"></td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-sm" style="background-color: #77B0AA;" @click="decrementar(indice)"><i class="fas fa-minus"></i></button>
                                                <button type="button" class="btn btn-sm btn-outline">{{item.cantidad}}</button>
                                                <button type="button" class="btn btn-sm" style="background-color: #77B0AA;" @click="incrementar(indice)"><i class="fas fa-plus"></i></button>
                                            </div>
                                        </td>
                                        <td>{{item.precio_total}}</td>
                                        <td>
                                            <button type="button" class="btn btn-sm" @click="useStore.eliminarCarritoCompra(indice)" style="background-color: #77B0AA;"><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-5 offset-7 col-md-4 offset-md-8">
                                <label class="form-label">Total</label>
                                <input type="text" :value="useStore.totalCompras" class="form-control form-control-lg text-end" style="background-color: #77B0AA;" id="total-carrito" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-12 text-center mt-4">
                <div class="row justify-content-center">
                    <div class="col-7 col-md-4 d-flex justify-content-between">
                        <a @click="cancelar()" class="btn btn-lg" style="background-color: #77B0AA;"><i class="fas fa-times me-2"></i>Cancelar</a>
                        <button type="button" class="btn btn-lg" @click="guardarCarrito()" style="background-color: #77B0AA;"><i class="fas fa-save me-2"></i>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import ProductosActivos from '@/components/Productos-activos.vue'
import { proveedoresActivos } from '@/services/proveedoresService';
import { store } from '@/services/comprasService';
import { useCarritoStore } from '@/stores/carrito';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
    const useStore = useCarritoStore();
    const proveedores = ref([]);
    const proveedorId = ref('');
    const router = useRouter();
    onMounted(()=>{
        listarProveedores();
    });
    const listarProveedores = async () => {
        try {
            const { data } = await proveedoresActivos();
            
            proveedores.value = data.datos;
        } catch (error) {
            console.log(error);
        }
    }
    const guardarCarrito = async () => {
        try {
            let objeto = {};
                objeto.total = useStore.totalCompras;
                objeto.proveedor_id = proveedorId.value;
                objeto.detalle = useStore.carritoCompras;
            const { data } = await store(objeto);

            useStore.carritoCompras = [];
            console.log(data);
            
            Swal.fire({
            title: "Guardado",
            text: data.mensaje,
            icon: "success"
            });
            router.push({path: '/compras'});
        } catch (error) {
            if(error.response.status===422){
                    Swal.fire({
                        title: "Error!",
                        text: error.response.data.mensaje?error.response.data.mensaje:error.response.data.message,
                        icon: "error",
                        iconColor: "#77B0AA",
                        confirmButtonColor: "#77B0AA"
                    });
                }else{
                    Swal.fire({
                        title: "Error!",
                        text: "Contacte a Soporte!",
                        icon: "error",
                        iconColor: "#77B0AA",
                        confirmButtonColor: "#77B0AA"
                    });
                }
        }
    }
    const cancelar = () => {
        router.push({path: '/compras'});
    }

</script>
<style>
    
</style>