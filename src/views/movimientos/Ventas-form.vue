<template>
    <div class="container mt-4" id="formulario-venta">
        <div class="row">
            <ProductosActivos></ProductosActivos>
            <div class="col-12 col-md-6 mt-3">
                <div class="card">
                    <div class="card-header card-titulo" style="background-color: #77B0AA;">
                        <h5 class="card-title">Lista carrito</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-input mb-4">
                            <label class="form-label">Cliente</label>
                            <select v-model="clienteId" class=" form-select">
                                <option value="">Seleccione</option>
                                <option :value="cliente.id" v-for="cliente in clientes">{{cliente.nombre}} {{cliente.apellido}}</option>
                            </select>
                        </div>
                        <div class="table-responsive">
                            <table class="table" id="tabla-carrito">
                                <thead class="table-success">
                                    <tr>
                                        <th>Nro</th>
                                        <th>Nombre</th>
                                        <th>Codigo</th>
                                        <th>Precio <span class="text-danger">(venta)</span></th>
                                        <th>Cantidad <span class="text-danger">(venta)</span></th>
                                        <th>Subtotal</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in useStore.carritoVentas">
                                        <td>{{index+1}}</td>
                                        <td>{{item.nombre}}</td>
                                        <td>{{item.codigo}}</td>
                                        <td><input type="text" class="form-control" v-model="item.precio_unitario" @change="cambiarPrecio(index)"></td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-sm" style="background-color: #77B0AA;" @click="decrementar(index)"><i class="fas fa-minus"></i></button>
                                                <button type="button" class="btn btn-sm btn-outline">{{item.cantidad}}</button>
                                                <button type="button" class="btn btn-sm" style="background-color: #77B0AA;" @click="incrementar(index)"><i class="fas fa-plus"></i></button>
                                            </div>
                                        </td>
                                        <td>{{item.precio_total}}</td>
                                        <td><div class="text-center"><button class="btn btn-sm" type="button" style="background-color: #77B0AA;" @click="useStore.eliminarCarritoVenta(index)"><i class="fas fa-trash"></i></button></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="row">
                            <div class="col-5 offset-7 col-md-4 offset-md-8">
                                <label class="form-label">Total</label>
                                <input type="text" :value="useStore.totalVentas" class="form-control form-control-lg text-end" style="background-color: #77B0AA;" readonly>
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
import { clientesActivos } from '@/services/clientesService';
import { store } from '@/services/ventasService';
import { useCarritoStore } from '@/stores/carrito';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
    const useStore = useCarritoStore();
    const clienteId = ref('');
    const clientes = ref([]);
    const router = useRouter();
    onMounted(()=>{
        listarClientes();
    });
    const listarClientes =  async () => {
        try {
            const { data } =  await clientesActivos();
            clientes.value = data.datos;
        } catch (error) {
            console.log(error);
        }
    }
    const guardarCarrito = async () => {
        try {
            let objeto = {};
                objeto.total = useStore.totalVentas;
                objeto.cliente_id = clienteId.value;
                objeto.detalle = useStore.carritoVentas;
            const { data } = await store(objeto);

            useStore.carritoVentas = [];
            console.log(data);
            
            Swal.fire({
            title: "Guardado",
            text: data.mensaje,
            icon: "success"
            });
            router.push({path: '/ventas'});
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
        router.push({path: '/ventas'});
    }

</script>
<style>
    
</style>