async function getUsers() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users" //GET
        );

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

getUsers();