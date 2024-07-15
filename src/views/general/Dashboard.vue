<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-12 col-md-3 mt-3">
                <div class="card text-white" style="background-color: #003C43;">
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-12 col-md-7">
                                <span class="h5">Total Clientes <b>{{ datos.totalClientes }}</b></span>
                            </div>
                            <div class="col-12 col-md-5 display-4">
                                <i class="fas fa-users"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-3 mt-3">
                <div class="card text-white" style="background-color: #003C43;">
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-12 col-md-7" id="totalProductos">
                                <span class="h5">Total Productos <b>{{ datos.totalProductos }}</b></span>
                            </div>
                            <div class="col-12 col-md-5 display-4">
                                <i class="fas fa-cubes"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-3 mt-3">
                <div class="card text-white" style="background-color: #003C43;">
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-12 col-md-7">
                                <span class="h5">Total Compras <b>{{ datos.totalCompras }}</b></span>
                            </div>
                            <div class="col-12 col-md-5 display-4">
                                <i class="fas fa-cart-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-3 mt-3">
                <div class="card text-white" style="background-color: #003C43;">
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-12 col-md-7">
                                <span class="h5">Total Ventas <b class="me-2">{{ datos.totalVentas }}</b></span>
                            </div>
                            <div class="col-12 col-md-5 display-4">
                                <i class="fas fa-cash-register"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 mt-5">
                <Bar id="my-chart-id" :options="opcionesBarra" :data="datosBarra"></Bar>
            </div>
            <div class="col-12 col-md-6 mt-5">
                <Pie :options="opcionesBarra" :data="datosTorta"></Pie>
            </div>
        </div>
    </div>
</template>
<script setup>
import { index } from '@/services/dashboardService';
import { onMounted, ref } from 'vue';

//Importaciones Vue-chartjs
import { Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)
//Termina importaciones vue-chartjs
const datosBarra = ref({
    labels: [],
    datasets: [
        {
            backgroundColor: ['blue', 'pink', 'orange'],
            data: []
        }
    ]
});
const datosTorta = ref({
    labels: [],
    datasets: [
        {
            backgroundColor: ['blue', 'pink', 'orange'],
            data: []
        }
    ]
});
const opcionesBarra = ref({
    responsive: true
})

const datos = ref({
    totalClientes: null,
    totalProveedores: null,
    totalProductos: null,
    totalVentas: null,
    totalCompras: null
});
onMounted(()=>{
    listar();
});
const listar = async () => {
    let nombreBarra = [];
    let totalBarra = [];
    let nombreTorta = [];
    let totalTorta = [];
    try {
        const { data } = await index();
        console.log(data);
        datos.value.totalClientes = data.total_clientes;
        datos.value.totalProveedores = data.total_proveedores;
        datos.value.totalProductos = data.total_productos;
        datos.value.totalVentas = data.total_ventas;
        datos.value.totalCompras = data.total_compras;

        data.chartCompras.forEach(element => {
            nombreBarra.push(element.nombre_producto);
            totalBarra.push(element.total_compras)
        });
        data.chartVentas.forEach(element => {
            nombreTorta.push(element.nombre_producto);
            totalTorta.push(element.total_ventas)
        });
        
        datosBarra.value = {
            labels: nombreBarra,
            datasets: [
                {
                    backgroundColor: ['blue', 'pink', 'orange'],
                    data: totalBarra
                }
            ]
        };
        datosTorta.value = {
            labels: nombreTorta,
            datasets: [
                {
                    backgroundColor: ['blue', 'pink', 'orange', 'green'],
                    data: totalTorta
                }
            ]
        };
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>

</style>