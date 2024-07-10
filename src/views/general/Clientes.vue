<template>
    <div class="container mt-5" id="lista-clientes">
        <div class="card">
            <div class="card-header card-titulo" style="background-color: #77B0AA">
                <h5 class="card-title">Clientes registrados</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-8 mt-3">
                        <input type="search" class="form-control" placeholder="Bucar...">
                    </div>
                    <div class="col-12 col-md-4 mt-3 text-center">
                        <RouterLink class="btn" style="background-color: #77B0AA;" to="/cliente-formulario">Agregar</RouterLink>
                    </div>
                    <div class="col-12 col-sm-12 mt-4">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover" id="tabla">
                                <thead class="table-success">
                                    <tr>
                                        <th>Nro</th>
                                        <th>Nombre(s)</th>
                                        <th>Apellido(s)</th>
                                        <th>Nro Identificacion</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="cliente in clientes">
                                        <td>{{cliente.id}}</td>
                                        <td>{{cliente.nombre}}</td>
                                        <td>{{cliente.apellido}}</td>
                                        <td>{{cliente.identificacion}}</td>
                                        <td><p class="badge" style="background-color: #77B0AA">{{cliente.estado==1?'Activo':'Inactivo'}}</p></td>
                                        <td><div class="text-center"><button type="button" class="btn btn-sm me-1" @click="editarCliente(cliente.id)" style="background-color: #77B0AA;"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-sm" @click="estado(cliente.id)" style="background-color: #77B0AA;"><i class="fas fa-exchange-alt"></i></button></div></td>
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
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { index, changeStatus } from '@/services/clientesService';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'
const clientes =  ref([]);
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
            clientes.value = data.datos.data;
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
    const editarCliente = param => {
        router.push({path: 'cliente-formulario/'+param});
   }
</script>
<style>
    
</style>