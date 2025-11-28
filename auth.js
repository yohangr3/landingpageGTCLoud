// auth.js - Versión definitiva (Firebase Modular SDK v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Configuración de tu proyecto (la misma que ya tenías)
const firebaseConfig = {
  apiKey: "AIzaSyBjktx8YCSCTvTK8hxFXjFTfSKZLOlizWI",
  authDomain: "ai-agents-gtcloud.firebaseapp.com",
  projectId: "ai-agents-gtcloud",
  storageBucket: "ai-agents-gtcloud.firebasestorage.app",
  messagingSenderId: "434277005102",
  appId: "1:434277005102:web:f4ddbd6a00674a17af2cbf"
};

// Inicializar Firebase una sola vez
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ================ FUNCIONES EXPORTADAS =================

// Proteger páginas privadas (todas menos login/registro/recuperar)
export function protectPage() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.log("No autenticado → redirigiendo a login");
      window.location.replace("/login.html");
    } else {
      console.log("Usuario autenticado:", user.email);
    }
  });
}

// Redirigir si YA está logueado (para login.html y registro.html)
export function redirectIfLoggedIn() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Ya logueado → redirigiendo a index");
      window.location.replace("/index.html");
    }
  });
}

// Cerrar sesión
export function logout() {
  signOut(auth)
    .then(() => {
      window.location.replace("/login.html");
    })
    .catch((err) => {
      alert("Error al cerrar sesión: " + err.message);
    });
}

// Exponer auth y funciones para usarlas en otros archivos si necesitas
export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail };