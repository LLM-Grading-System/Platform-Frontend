// Backend Server
const backendServer = import.meta.env.VITE_BACKEND_SERVER || "";
if (backendServer === ""){
    console.log("No backend server in environment")
}

// Backend Server
const isDev = import.meta.env.DEV;

export { backendServer, isDev };

