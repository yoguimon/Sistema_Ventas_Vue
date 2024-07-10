<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header card-titulo" style="background-color: #77B0AA;">
                <h5 class="card-title">Proveedores registrados</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-8 mt-3">
                        <input type="search" class="form-control" placeholder="Buscar...">
                    </div>
                    <div class="col-12 col-md-4 text-center mt-3">
                        <RouterLink class="btn" style="background-color: #77B0AA;" to="/proveedor-formulario">Agregar</RouterLink>
                    </div>
                    <!--<div class="col-12 col-md-4 text-center mt-3">
                        <button class="btn" style="background-color: #77B0AA;" @click="agregarProveedor()">Agregar</button>
                    </div>-->
                    <div class="col-12 col-sm-12 mt-4">
                        <div class="table-responsive">
                            <table class="table table-striped" id="tabla">
                                <thead class="table-success">
                                    <tr>
                                        <th>Item</th>
                                        <th>Nombre(s)</th>
                                        <th>Apellido(s)</th>
                                        <th>Numero identificacion</th>
                                        <th>Contacto</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="proveedor in proveedores">
                                        <td>{{proveedor.id}}</td>
                                        <td>{{proveedor.nombre}}</td>
                                        <td>{{proveedor.apellido}}</td>
                                        <td>{{proveedor.identificacion}}</td>
                                        <td>{{proveedor.contacto}}</td>
                                        <td><p class="badge" style="background-color: #77B0AA">{{proveedor.estado==1?'Activo':'Inactivo'}}</p></td>
                                        <td><div class="text-center"><button type="button" class="btn btn-sm me-1" style="background-color: #77B0AA;" @click="editarProveedor(proveedor.id)"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-sm" @click="estado(proveedor.id)" style="background-color: #77B0AA;"><i class="fas fa-exchange-alt"></i></button></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item" :class="{ 'disabled' : paginacion.pagina <= 1}" style="color: #77B0AA;">
                                    <button type="button" class="page-link" aria-label="Previous"
                                        @click="paginaPrev()">
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                                <li class="page-item" :class="{'active' : item == paginacion.pagina}" v-for="(item, indice) in paginacion.total" :key="indice"><button type="button" class="page-link" @click="paginaCambio(item)" style="color: #77B0AA;">{{item}}</button>
                                </li>
                                <li class="page-item"
                                    :class="{ 'disabled' : paginacion.pagina >= paginacion.total}">
                                    <button type="button" class="page-link" aria-label="Next"
                                        @click="paginaNext()">
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal
        <div class="modal fade" id="modalProveedores" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: #77B0AA;">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel"><i class="fas fa-edit me-2"></i>{{posicion==null?'Agregar Proveedor':'Editar Proveedor'}}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cerrarModal()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row gy-4">
                            <div class="col-12 mb-6">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="formulario.nombre"
                                        :class="{ 'border-danger' : errors.nombre}">
                                    <label>Nombre</label>
                                </div>
                                <small class="text-danger" v-if="errors.nombre"><i
                                        class="fas fa-times me-1"></i>{{errors.nombre[0]}}</small>
                            </div>
                            <div class="col-12 mb-6">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="formulario.apellido">
                                    <label>Apellido</label>
                                </div>
                            </div>
                            <div class="col-12 mb-6">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="formulario.identificacion"
                                        :class="{ 'border-danger' : errors.identificacion}">
                                    <label>Identificacion</label>
                                </div>
                                <small class="text-danger" v-if="errors.identificacion"><i
                                        class="fas fa-times me-1"></i>{{errors.identificacion[0]}}</small>
                            </div>
                            <div class="col-12 mb-6">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="formulario.contacto"
                                        :class="{ 'border-danger' : errors.contacto}">
                                    <label>Contacto</label>
                                </div>
                                <small class="text-danger" v-if="errors.contacto"><i
                                        class="fas fa-times me-1"></i>{{errors.contacto[0]}}</small>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-bs-dismiss="modal" @click="cerrarModal()" style="background-color: #77B0AA;">Cerrar</button>
                        <button type="button" class="btn" @click="guardarProveedor()" style="background-color: #77B0AA;" :class="{'d-none':posicion==null}">Editar</button>
                        <button type="button" class="btn" @click="guardarProveedor()" style="background-color: #77B0AA;" :class="{'d-none':posicion!=null}">Guardar</button>
                    </div>
                </div>
            </div>
        </div>-->
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { index, changeStatus } from '@/services/proveedoresService';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'
const proveedores =  ref([]);
const paginacion = ref({
    total: null,
    pagina: 1
});
const router = useRouter();
    onMounted(() => {
        listar();
    });
    const listar = async () => {
        try {
            const { data } = await index(paginacion.value.pagina);
            proveedores.value = data.datos.data;
            paginacion.value.total= data.datos.last_page;
        } catch (error) {
            console.log(error);
        }
    }
    const estado = param => {
        try {
            Swal.fire({   
                title: "Estas seguro?",   
                text: "Estas a punto de modificar el estado!",   
                icon: "warning",   
                iconColor: "#77B0AA",
                confirmButtonColor: "#77B0AA",
                showCancelButton: true,   
                confirmButtonColor: "#77B0AA",   
                cancelButtonColor: "#77B0AA",   
                confirmButtonText: "Si, modificar!!"
            }).then(async (result) => {   
                if (result.isConfirmed) {   
                    const { data } =  await changeStatus(param);
                    listar();  
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
    const paginaNext = () => {
        paginacion.value.pagina++;
        listar();
    }
    const paginaPrev = () => {
        paginacion.value.pagina--;
        listar();
    }
    const paginaCambio = param => {
        paginacion.value.pagina=param;
        listar();
    }
    /*function agregarProveedor(){
        router.push(path: 'proveedores-form');
    }*/
    const editarProveedor = param => {
        router.push({path: 'proveedor-formulario/'+param});
   }
</script>
<style>
</style>