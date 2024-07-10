<template>
    <div class="container mt-5" id="lista-productos">
        <div class="card">
            <div class="card-header card-titulo">
                <h5 class="card-title">Productos registrados</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-8 mt-3">
                        <input type="search" class="form-control" placeholder="Bucar...">
                    </div>
                    <div class="col-12 col-md-4 mt-3 text-center">
                        <RouterLink class="btn" style="background-color: #77B0AA;" to="producto-formulario">Agregar</RouterLink>
                    </div>
                    <div class="col-12 col-sm-12 mt-4">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover" id="tabla">
                                <thead class="table-success">
                                    <tr>
                                        <th>Nro</th>
                                        <th>Codigo</th>
                                        <th>Nombre</th>
                                        <th>Cantidad</th>
                                        <th>Precio compra</th>
                                        <th>Precio venta</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="producto in productos">
                                        <td>{{producto.id}}</td>
                                        <td>{{producto.codigo}}</td>
                                        <td>{{producto.nombre}}</td>
                                        <td>{{producto.cantidad}}</td>
                                        <td>{{producto.precio_venta}}</td>
                                        <td>{{producto.precio_compra}}</td>
                                        <td><p class="badge" style="background-color: #77B0AA;">{{producto.estado==1?'Activo':'Inactivo'}}</p></td>
                                        <td><div class="text-center"><button type="button" class="btn btn-sm me-1" style="background-color: #77B0AA;" @click="editarProducto(producto.id)"><i class="fas fa-edit"></i></button><button type="button" class="btn btn-sm" @click="estado(producto.id)" style="background-color: #77B0AA;"><i class="fas fa-exchange-alt"></i></button></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>   
                    </div>
                        
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { cambiarEstado, getProductos } from '@/services/productosService';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
    const productos = ref([]);
    const router = useRouter();
    //Revisar paginacion, creo que no hay
    const paginacion = ref({
        total: null,
        pagina: 1
    });
    onMounted(()=>{
        listarProductos();
    });
    const listarProductos = async () => {
        try {
            const { data } = await getProductos();
            productos.value = data.datos.data;
        } catch (error) {
            console.log(error);
        }
    }
    const editarProducto = (id) =>{
        router.push({path:'/producto-formulario/'+id});
    }
    const estado = async (id) => {
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
                    const { data } =  await cambiarEstado(id);
                    listarProductos();  
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
</script>
<style>
    
</style>