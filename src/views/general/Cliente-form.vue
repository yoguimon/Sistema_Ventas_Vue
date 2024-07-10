<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header" style="background-color: #77B0AA">
            <h5 class="card-title">
                <i class="fas fa-edit me-2"></i>{{idCliente!=""? "Editar Cliente":"Agregar Cliente"}}
            </h5>
        </div>
        <div class="card-body">
            <div class="row gy-4">
                <div class="col-12 col-md-6">
                    <label class="form-label">Nombre</label>
                    <input type="text" :class="{'border-danger' : errors.nombre}" class="form-control" placeholder="Escriba Nombre...." v-model="formulario.nombre">
                    <small class="text-danger" v-if="errors.nombre"><i class="fas fa-times me-1 ms-2"></i>{{ errors.nombre[0] }}</small>
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label">Apellido</label>
                    <input type="text" :class="{'border-danger' : errors.apellido}" class="form-control" placeholder="Escriba Apellido...." v-model="formulario.apellido">
                    <small class="text-danger" v-if="errors.apellido"><i class="fas fa-times me-1 ms-2"></i>{{ errors.apellido[0] }}</small>
                </div>
                <div class="col-12 col-md-6">
                    <label class="form-label">Identificacion</label>
                    <input type="text" :class="{'border-danger' : errors.identificacion}" class="form-control" placeholder="Escriba Identificacion...." v-model="formulario.identificacion">
                    <small class="text-danger" v-if="errors.identificacion"><i class="fas fa-times me-1 ms-2"></i>{{ errors.identificacion[0] }}</small>
                </div>
            </div>
        </div>
        <div class="card-footer text-end">
            <RouterLink type="button" to="/clientes" class="btn me-2" style="background-color: #77B0AA"><i class="fas fa-reply me-2"></i>Cancelar</RouterLink>
            <button type="button" class="btn me-2" style="background-color: #77B0AA" @click="guardar()">Guardar<i class="fas ms-2" :class="idCliente!=''?'fa-edit':'fa-save'"></i></button>
        </div>
      </div>
    </div>
</template>
<script setup>
    import { store, show, update } from '@/services/clientesService';
    import Swal from 'sweetalert2';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    const formulario = ref({});
   const router = useRouter();
   const errors = ref({});
   const idCliente = router.currentRoute.value.params.idCliente;
   onMounted(()=>{
        if(idCliente!=""){
            verRegistro();
        }
   });
   const volver = () => {
        router.push({path: '/clientes'});
   }
   const guardar = async () => {
    errors.value = {};
    try {
        let mensaje = null;
        if(idCliente != ""){
            const { data } = await update(idCliente, formulario.value);
            mensaje = data.mensaje;
        }else{
            const { data } = await store(formulario.value);
            mensaje = data.mensaje;
        }
        Swal.fire({
            title: "Bien!",
            text: mensaje,
            icon: "success",
            iconColor: "#77B0AA",
            confirmButtonColor: "#77B0AA"

        });
        volver();
        //router.push({path: '/proveedores'});
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
   const verRegistro = async () => {
    try {
        const { data } = await show(idCliente);
        formulario.value = {
            nombre: data.datos.nombre,
            apellido: data.datos.apellido,
            identificacion: data.datos.identificacion
        }
    } catch (error) {
        console.log(error);
    }
   }

</script>
<style>
    
</style>