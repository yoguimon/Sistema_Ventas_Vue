<template>
    <div class="container mt-5" id="ventas">
        <div class="card">
            <div class="card-header card-titulo" style="background-color: #77B0AA">
                <h5 class="card-title">Ventas registradas</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-8 mt-3">
                        <input type="search" class="form-control" placeholder="Bucar...">
                    </div>
                    <div class="col-12 col-md-4 mt-3 text-center">
                        <RouterLink to="/ventas-formulario" class="btn" style="background-color: #77B0AA;">Agregar</RouterLink>
                    </div>
                    <div class="col-12 col-sm-12 mt-4">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover" id="tabla-ventas">
                                <thead class="table-success">
                                    <tr>
                                        <th>Item</th>
                                        <th>Cliente</th>
                                        <th>Identifiacion</th>
                                        <th>Total<span class="text-danger">(venta)</span></th>
                                        <th>Estado</th>
                                        <th>Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(venta,index) in ventas">
                                        <td>{{index+1}}</td>
                                        <td>{{venta.clientes.nombre}} {{venta.clientes.apellido}}</td>
                                        <td>{{venta.clientes.identificacion}}</td>
                                        <td>{{venta.total}}</td>
                                        <td><p class="badge" style="background-color: #77B0AA;">{{venta.estado==1?'Activo':'Inactivo'}}</p></td>
                                        <td><div class="text-center"><button type="button" class="btn btn-sm me-2" style="background-color: #77B0AA;" @click="verDetallesProductosVendidos(venta.id)"><i class="fas fa-eye"></i></button><button type="button" class="btn btn-sm" style="background-color: #77B0AA;" @click="cambiarEstado(venta.id)"><i class="fas fa-exchange-alt"></i></button></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalDetalles" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header card-titulo">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ver detalle</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover" id="tabla-detalles">
                                        <thead class="table-success">
                                            <tr>
                                                <th>Nro</th>
                                                <th>Nombre</th>
                                                <th>Codigo</th>
                                                <th>Precio <span class="text-danger">(venta)</span></th>
                                                <th>Cantidad</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(producto,index) in venta">
                                                <td>{{index+1}}</td>
                                                <td>{{producto.producto.nombre}}</td>
                                                <td>{{producto.producto.codigo}}</td>
                                                <td>{{producto.producto.precio_compra}}</td>
                                                <td>{{producto.cantidad}}</td>
                                                <td>{{producto.total}}</td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-4 offset-8">
                                <input type="text" id="precioTotal" class="form-control form-control-lg text-white text-end" readonly style="background-color: #77B0AA;" v-model="totalDetalle">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-bs-dismiss="modal" style="background-color: #77B0AA;">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { estado, index, show } from '@/services/ventasService';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

    const ventas = ref([]);
    const venta = ref({});
    let modal = null;
    let instanciaModal = null;
    let totalDetalle = ref(0);
    
    onMounted(()=>{
        listarVentas();
        modal = document.getElementById("modalDetalles");
        instanciaModal = new Modal(modal);
    });
    async function listarVentas(){
        try{
            const {data} = await index(1);
            ventas.value = data.datos.data;
        }catch(error){
            console.log(error);
        }
    }
    async function verDetallesProductosVendidos(idVenta){
        instanciaModal.show();
        try{
            const {data} = await show(idVenta);
            venta.value = data.datos.detalle_venta;
            totalDetalle.value=0;
            venta.value.forEach(element => {
                totalDetalle.value += parseInt(element.total);
            });
        }catch(error){
            console.log(error);
        }
    }
    const cambiarEstado = async (id) => {
        try {
            Swal.fire({   
                title: "Estas seguro?",   
                text: "Estas a punto de modificar el estado!",   
                icon: "warning",  
                iconColor: "#77B0AA", 
                showCancelButton: true,   
                confirmButtonColor: "#77B0AA",   
                cancelButtonColor: "#77B0AA",   
                confirmButtonText: "Si, modificar!!"
            }).then(async (result) => {   
                if (result.isConfirmed) {   
                    const { data } =  await estado(id);
                    listarVentas();  
                    Swal.fire({       
                        title: "Bien!",       
                        text: data.mensaje,       
                        icon: "success", 
                        iconColor: "#77B0AA",
                        confirmButtonColor: "#77B0AA"   
                    });   
                } 
            });
        } catch (error) {
            console.log(error);
        }
    }
    /*const paginaPrev = () => {
        paginacion.value.pagina--;
        listarCompras();   
    }
    const paginaSig = () => {
        paginacion.value.pagina++;
        listarCompras();
    }*/
</script>
<style>
    
</style>