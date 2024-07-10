<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header" style="background-color: #77B0AA">
            <h5 class="card-title">
                <i class="fas fa-edit me-2"></i>{{idProducto!=""? "Editar Producto":"Agregar Producto"}}
            </h5>
        </div>
        <div class="card-body">
            <div class="row gy-4">
                <div class="col-12 col-md-6">
                    <label class="form-label">Codigo</label>
                    <input type="text" :class="{'border-danger' : errors.codigo}" class="form-control" placeholder="Escriba Codigo...." v-model="formulario.codigo">
                    <small class="text-danger" v-if="errors.codigo"><i class="fas fa-times me-1 ms-2"></i>{{ errors.codigo[0] }}</small>
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label">Nombre</label>
                    <input type="text" :class="{'border-danger' : errors.nombre}" class="form-control" placeholder="Escriba Nombre...." v-model="formulario.nombre">
                    <small class="text-danger" v-if="errors.nombre"><i class="fas fa-times me-1 ms-2"></i>{{ errors.nombre[0] }}</small>
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label">Precio Venta</label>
                    <input type="number" :class="{'border-danger' : errors.precio_venta}" class="form-control" placeholder="Escriba precio venta...." v-model="formulario.precio_venta">
                    <small class="text-danger" v-if="errors.precio_venta"><i class="fas fa-times me-1 ms-2"></i>{{ errors.precio_venta[0] }}</small>
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label">Precio Compra</label>
                    <input type="number" :class="{'border-danger' : errors.precio_compra}" class="form-control" placeholder="Escriba precio compra...." v-model="formulario.precio_compra">
                    <small class="text-danger" v-if="errors.precio_compra"><i class="fas fa-times me-1 ms-2"></i>{{ errors.precio_compra[0] }}</small>
                </div>
            </div>
        </div>
        <div class="card-footer text-end">
            <RouterLink type="button" to="/productos" class="btn me-2" style="background-color: #77B0AA"><i class="fas fa-reply me-2"></i>Cancelar</RouterLink>
            <button type="button" class="btn me-2" style="background-color: #77B0AA" @click="guardar()">Guardar<i class="fas ms-2" :class="idProducto!=''?'fa-edit':'fa-save'"></i></button>
        </div>
      </div>
    </div>
</template>
<script setup>
import { getProducto, saveProducto, updateProducto } from '@/services/productosService';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
    const formulario = ref({});
    const router = useRouter();
    const idProducto = router.currentRoute.value.params.idProducto;
    const errors = ref({});
    onMounted(()=>{
        if(idProducto!=""){
            verProducto();
        }
    });
    const guardar = async () => {
        errors.value={};
        try {
            let mensaje = null;
            if(idProducto!=""){
                const { data } = await updateProducto(idProducto,formulario.value);
                mensaje= data.mensaje;
            }else{
                const { data } = await saveProducto(formulario.value);
                mensaje=data.mensaje;
            }
            Swal.fire({
                title: "Bien!",
                text: mensaje,
                icon: "success",
                iconColor: "#77B0AA",
                confirmButtonColor: "#77B0AA"
            });
            router.push({path: '/productos'});
        } catch (error) {
            if(error.response.status == 422){
                errors.value = error.response.data.errors;
                Swal.fire({
                    title: "Error!",
                    text: error.response.data.message,
                    icon: "error",
                    iconColor: "#77B0AA",
                    confirmButtonColor: "#77B0AA"
                });
            }else{
                console.log("contacte con soporte");
            }
        }
    }
    const verProducto = async () =>{
        try {
            const { data } = await getProducto(idProducto);
            console.log(data);
            formulario.value = {
                codigo: data.datos.codigo,
                nombre: data.datos.nombre,
                precio_venta: data.datos.precio_venta,
                precio_compra: data.datos.precio_compra
            };
        } catch (error) {
            console.log(error);
        }
    }
</script>
<style>
    
</style>