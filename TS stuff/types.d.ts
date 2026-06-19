declare global {
    type user = {
        name:string,
        age: number,
        email:string,
    }

    type status = "success" | "error"
}

export {}