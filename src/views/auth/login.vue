<template>
    <div class="loginPrincipal">
        <div class="containerlogin" :class="{'active':posicion===1}" id="container">
       
            <div class="form-container sign-up">
                <form action="#">
                    <h1>Crear Cuenta</h1>
                    <samp>utiliza un correo para el registro</samp>
                    <input type="text" class="inputlogin" placeholder="Name" v-model="usernameR">
                    <small v-if="errors.name" style="color:red"><i class="fas fa-times me-1"></i>{{errors.name[0]}}</small>
                    <input type="email" class="inputlogin" placeholder="Email" v-model="emailR">
                    <small v-if="errors.email" style="color:red"><i class="fas fa-times me-1"></i>{{errors.email[0]}}</small>
                    <input type="password" class="inputlogin" placeholder="Password" v-model="passwordR">
                    <small v-if="errors.password" style="color:red"><i class="fas fa-times me-1"></i>{{errors.password[0]}}</small>
                    <input type="password" class="inputlogin" placeholder="Password Confirmation" v-model="password2">
                    <small v-if="errors.password_confirmation" style="color:red"><i class="fas fa-times me-1"></i>{{errors.password_confirmation[0]}}</small>
                    <button type="button" class="btnlogin" @click="registrarUsuario()">Registrar</button>
                </form>
            </div>
            <div class="form-container sign-in">
                <form action="#">
                    <h1>Iniciar Sessión</h1>      
                    <button type="button" class="btn" @click="llenarDatos()">👉 Correo y Contraseña de Prueba </button>
                    <input type="email" class="inputlogin mt-3" placeholder="Correo" v-model="email">
                    <small v-if="errors.email" style="color:red"><i class="fas fa-times me-1"></i>{{errors.email[0]}}</small>

                    <input type="password" class="inputlogin" placeholder="Contraseña" v-model="password">
                    <small v-if="errors.password" style="color:red"><i class="fas fa-times me-1"></i>{{errors.password[0]}}</small><br>
                    <button type="button"  @click="validar()" class="inicio-temporal btnlogin">Ingresar</button>
                </form>
            </div>
            <div class="toggle-container">
                <div class="toggle">
                    <div class="toggle-panel toggle-left">
                        <h1>Bienvenido de Nuevo!</h1>
                        <p>Ingresa tu correo y contraseña validos</p>
                        <button class="hidden btnlogin" @click="ingresar()">Ingresar</button>
                    </div>
                    <div class="toggle-panel toggle-right">
                        <h1>Hola, Bienvenido!</h1>
                        <p>Registrate como usuario nuevo para poder ver la funcionalidad de la pagina</p>
                        <button class="hidden btnlogin" @click="registrarse()">Registrarse</button>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import { iniciarSesion, registroUsuarioAxios } from '../../services/authService';
import { useRouter } from 'vue-router';
    const email = ref("");
    const password = ref("");
    const usernameR = ref("");
    const emailR = ref("");
    const passwordR = ref("");
    const password2 = ref("");
    const errors = ref({});
    const posicion = ref(0);
    const router  = useRouter();
    function ingresar(){
        errors.value={};
        posicion.value=0;
    }
    function registrarse(){
        errors.value={};
        posicion.value=1;
    }
    async function validar(){
        let usuario={
            email: email.value,
            password: password.value
        }
        try{
            const respuesta = await iniciarSesion(usuario);
            Swal.fire({
              title: "Bien!",
              text: "Inicio de Sesión exitosa!",
              icon: "success",
              iconColor: "#77B0AA",
              confirmButtonColor: "#77B0AA",
              confirmButtonText: "Ok"
            });
            const tokenEncript = Buffer.from(respuesta.data.access_token).toString("base64");
            localStorage.setItem("token",tokenEncript);
            let objeto = {
                id: respuesta.data.user.id,
              nombre: respuesta.data.user.name,
              correo: respuesta.data.user.email,
              imagen: respuesta.data.user.foto_perfil
            };
            localStorage.setItem("usuario",JSON.stringify(objeto));
            router.push({path: '/dashboard'});
        }catch(error){
            errors.value = error.response.data.errors;
        }
        
    }
    async function registrarUsuario(){
        errors.value={};
        let usuario={
            email: emailR.value,
            password: passwordR.value,
            name: usernameR.value,
            password_confirmation: password2.value
        }
        try{
            const respuesta = await registroUsuarioAxios(usuario);
            Swal.fire({
                title: "Bien!",
                text: "Usuario creado, Incia sesión para ingresar a la pagina y generar el Token",
                icon: "success",
                iconColor: "#77B0AA",
                confirmButtonColor: "#77B0AA",
                confirmButtonText: "Ok"
                }).then((result) => {
                if (result.isConfirmed) {
                    //window.location.href = "dashboard.html";
                    posicion.value=0;
                }
                });
        }catch(error){
            errors.value = error.response.data.errors;
        }
                
    }
    function llenarDatos(){
        email.value="yogui@gmail.com";
        password.value = "yogui1995";
    }
</script>
<style>
  @import '../../assets/login.css';
</style>