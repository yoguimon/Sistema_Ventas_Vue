<template>
    <nav class="navbar navbar-expand-lg" style="background-color: #77B0AA;">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/dashboard"><i class="fas fa-store" style="font-size: 40px;"></i></RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" to="/dashboard"> Inicio</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/productos">Productos</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/proveedores">Proveedores</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/clientes" class="nav-link">Clientes</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/compras">Compras</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/ventas">Ventas</RouterLink>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle fs-5 me-1" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img :src="userStore.usuario.image != null ? urlBaseAsset+'imagenes/'+userStore.usuario.image : 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'"
                                width="40px" height="40px" class="rounded-circle me-3" alt="">{{userStore.usuario.nombre}}</a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <RouterLink to="/perfil" class="dropdown-item">Ver perfil</RouterLink>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item" @click="logout()">Cerrar sesión</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <RouterView />
</template>
<script setup>
import { cerrarSesion } from '@/services/authService';
import { useUserStore } from '@/stores/usuario';
import { RouterView, RouterLink, useRouter } from 'vue-router';
import { urlBaseAsset } from '@/services/Http';
const router = useRouter();
    const userStore = useUserStore();

    const logout = async () => {
        try {
            const { data } = await cerrarSesion();
            localStorage.clear();
            router.push({path: 'login'});
        } catch (error) {
            console.log(error);
        }
    }
</script>
<style>
    
</style>