<template>
    <div class="container mt-5" id="compras">
        <div class="card">
            <div class="card-header card-titulo" style="background-color: #77B0AA">
                <h5 class="card-title">Compras registradas</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-8 mt-3">
                        <input type="search" class="form-control" placeholder="Bucar...">
                    </div>
                    <div class="col-12 col-md-4 mt-3 text-center">
                        <RouterLink to="/compras-formulario" class="btn" style="background-color: #77B0AA;">Agregar</RouterLink>
                    </div>
                    <div class="col-12 col-sm-12 mt-4">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover" id="tabla-compras">
                                <thead class="table-success">
                                    <tr>
                                        <th>Item</th>
                                        <th>Proveedor</th>
                                        <th>Contacto</th>
                                        <th>Total <span class="text-danger">(compra)</span></th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in compras">
                                        <td>{{index+1}}</td>
                                        <td>{{item.proveedores.nombre}} {{item.proveedores.apellido}}</td>
                                        <td>{{item.proveedores.contacto}}</td>
                                        <td>{{item.total}}</td>
                                        <td><p class="badge" style="background-color: #77B0AA;">{{item.estado==1?'Activo':'Inactivo'}}</p></td>
                                        <td><div class="text-center"><button type="button" class="btn btn-sm me-2" @click="verDetalle(item.id)" style="background-color: #77B0AA;"><i class="fas fa-eye"></i></button><button type="button" class="btn btn-sm" style="background-color: #77B0AA;" @click="cambiarEstado(item.id)"><i class="fas fa-exchange-alt"></i></button></div></td>
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
                                                <th>Precio Unitario</th>
                                                <th>Cantidad</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item,index) in compra">
                                                <td>{{index+1}}</td>
                                                <td>{{item.producto.nombre}}</td>
                                                <td>{{item.producto.codigo}}</td>
                                                <td>{{item.precio_unitario}}</td>
                                                <td>{{item.cantidad}}</td>
                                                <td>{{item.total}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-4 offset-8">
                                <input type="text" class="form-control form-control-lg text-white text-end" readonly v-model="totalDetalle" style="background-color: #77B0AA;">
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
import { estado, index, show } from '@/services/comprasService';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
    const compras = ref([]);
    const compra = ref({});
    let modal = null;
    let instanciaModal = null;
    let totalDetalle = ref(0);
    onMounted(()=>{
        listarCompras();
        modal = document.getElementById("modalDetalles");
        instanciaModal = new Modal(modal);
    });
    async function listarCompras(){
        try{
            const {data} = await index(1);
            compras.value = data.datos.data;
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
                    listarCompras();  
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
    const verDetalle = async param => {
        instanciaModal.show();
        try{
            const { data } = await show(param);
            compra.value = data.datos.detalle_compra;
            totalDetalle.value=0;
            compra.value.forEach(element => {
                totalDetalle.value += parseInt(element.total);
            });
            
        }catch(error){
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