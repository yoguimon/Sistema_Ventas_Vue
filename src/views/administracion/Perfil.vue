<template>
    <div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-12 col-md-7">
                    <div class="card">
                        <div class="card-header" style="background-color: #77B0AA;">
                            <h5 class="card-ttile">Editar Perfil</h5>
                        </div>
                        <div class="card-body">
                            <div class="row gy-3">
                                <div class="col-12 col-md-6">
                                    <label class="form-label">Usuario :</label>
                                    <input type="text" class="form-control" placeholder="Usuario" v-model="dato.name">
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label">Correo :</label>
                                    <input type="text" class="form-control" placeholder="Correo" v-model="dato.email">
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label">Contrasena :</label>
                                    <input type="password" class="form-control" placeholder="Contrasena"v-model="dato.password">
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label">Contrasena :</label>
                                    <input type="password" class="form-control" placeholder="Repetir Contrasena" v-model="dato.password_confirmation">
                                </div>
                                <div class="col-12 col-md-12 mt-4 text-center">
                                    <button class="btn" type="button" style="background-color: #77B0AA;" @click="editarDatos()">Modificar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-5">
                    <div class="card">
                        <div class="card-header" style="background-color: #77B0AA;">
                            <h5 class="card-title">Foto Perfil</h5>
                        </div>
                        <div class="card-body">
                            <div class="col-12 col-md-12 text-center">
                                <!--<img :src="userStore.usuario.image != null ? urlBaseAsset+'imagenes/'+userStore.usuario.image : 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'"
                                width="150px" height="150px" class="rounded-circle border border-3 border-secondary" alt="">-->
                                <img :src="urlImage" width="150px" height="150px" class="rounded-circle border border-3 border-secondary">
                            </div>
                            <div class="col-12 col-md-12 mt-3">
                                <input type="file" class="form-control" placeholder="ingrese url foto" @change="obtenerImagen($event)">
                            </div>
                            <div class="col-12 col-md-12 mt-3 text-center">
                                <button type="button" class="btn" style="background-color: #77B0AA;" @click="editarImagen()">Modificar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { actualizarImagen, show, update } from '@/services/usuarioService';
import { useUserStore } from '@/stores/usuario';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';

const userStore =  useUserStore();
const dato =  ref({
    name: null,
    email: null,
    password: '',
    password_confirmation: ''
});
const image =  ref(null);
const urlImage = ref('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg');
onMounted(()=>{
    listar();
});
const listar = async () => {
    try {
        const { data } = await show(userStore.usuario.id);
        dato.value.name = data.name;
        dato.value.email = data.email;
    } catch (error) {
        console.log(error);
    }
}
const editarDatos = async () => {
    try {
        const { data } = await update(userStore.usuario.id,dato.value);
        let objeto = {
            nombre: data.datos.name, 
            email: data.datos.email,
            id: data.datos.id,
            image: data.datos.foto_perfil
        };
        localStorage.setItem('usuario',JSON.stringify(objeto));
        userStore.obtenerPerfil();
        Swal.fire({
            text: data.mensaje,
            title: 'Bien',
            icon: 'success',
            iconColor: "#77B0AA",
            confirmButtonColor: "#77B0AA"
        });
    } catch (error) {
        console.log(error);
    }
}
const obtenerImagen = (event) => {
    image.value = event.target.files[0];
    if(image.value!=null){
        const reader = new FileReader();//lector de archivos multimedia
        reader.onload = (e) => urlImage.value = e.target.result;
        reader.readAsDataURL(image.value);
    }
}
const editarImagen = async () => {
    try {
        let formulario = new FormData();
        formulario.append('imagen', image.value);
        formulario.append('id', userStore.usuario.id);
        const { data } = await actualizarImagen(formulario);
        let objeto = {
            nombre: data.datos.name,
            email: data.datos.email,
            id: data.datos.id,
            image: data.datos.foto_perfil,
        }
        localStorage.setItem('usuario', JSON.stringify(objeto));
        userStore.obtenerPerfil();
        Swal.fire({
            text: data.mensaje,
            title: 'Bien',
            icon: 'success',
            iconColor: "#77B0AA",
            confirmButtonColor: "#77B0AA"
        });
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>
    
</style>