import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        post: {
            //"Bearer" : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjcmlzdGkiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaWF0IjoxNjgzMTk4NTgwLCJleHAiOjE2ODMyODQ5ODB9.zT8qCvPG3MRamC9McABr9Y1KI0BeL-hnjzgdeSBC8mE",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control": "*",
            "Access-Control-Allow-Headers":
                "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        }
    }
});

export default axiosInstance;