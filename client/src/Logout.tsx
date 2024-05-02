export default function Logout() {

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:1235/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            console.log(data);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}