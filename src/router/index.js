import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/auth/login.vue'
import dashboard from '@/views/general/Dashboard.vue'
import proveedores from '@/views/general/Proveedores.vue' //con @ va al inicio del src
import LayoutApp from '@/layout/LayoutApp.vue'
import proveedoresForm from '@/views/general/Proveedores-form.vue'
import clientes from '@/views/general/Clientes.vue'
import clienteForm from '@/views/general/Cliente-form.vue'
import productos from '@/views/general/Productos.vue'
import productoForm from '@/views/general/Producto-form.vue'
import Compras from '@/views/movimientos/Compras.vue'
import ComprasForm from '@/views/movimientos/Compras-form.vue'
import VentasForm from '@/views/movimientos/Ventas-form.vue'
import Ventas from '@/views/movimientos/Ventas.vue'
import Perfil from '@/views/administracion/Perfil.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: LayoutApp,
      children: [
        {
          path: '/dashboard',
          component: dashboard
        },
        {
          path: '/proveedores',
          component: proveedores
        },
        {
          path: '/proveedor-formulario/:idProveedor?',
          component: proveedoresForm
        },
        {
          path: '/clientes',
          component: clientes 
        },
        {
          path: '/cliente-formulario/:idCliente?',
          component: clienteForm
        },
        {
          path: '/productos',
          component: productos
        },
        {
          path: '/producto-formulario/:idProducto?',
          component: productoForm
        },
        {
          path: '/compras',
          component: Compras
        },
        {
          path: '/compras-formulario',
          component: ComprasForm
        },
        {
          path: '/ventas-formulario',
          component: VentasForm
        },
        {
          path: '/ventas',
          component: Ventas
        },
        {
          path: '/perfil',
          component: Perfil
        }
        
      ]
    },
    {
      path: '/:catchAll(.*)',//cualquier ruta carga login
      redirect: '/login'
    }
  ]
})

export default router
