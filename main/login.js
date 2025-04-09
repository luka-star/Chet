function main() {
    res = httpGet("http://127.0.0.1:5500/Chet/main/login.html")
  };

document.getElementById("name").addEventListener("keypress", function(e) {
    if(e.key == "Enter"){
        e.preventDefault();
        document.getElementById("butt").click();
    }
})
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("butt").addEventListener("click", async () => {
        const nameInput = document.getElementById("name").value;
        console.log("Joining lobby with name:", nameInput);
        await joinNewUser(nameInput);
    });
});

async function joinNewUser(name){
    try{
        const res = await fetch("http://127.0.0.1:5500/Chet/main/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name })
        })
        const data = await res.json();

        if (res.ok) {
        console.log('Login successful:', data);
        document.getElementById('loginMessage').innerText = `Welcome, ${data.username}!`;
        } else {
        console.error('Login failed:', data.message);
        document.getElementById('loginMessage').innerText = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error('Request failed', error);
        document.getElementById('loginMessage').innerText = 'Network error. Please try again later.';
    }
};

