const form = document.querySelector("#hello-form");
const result = document.querySelector("#result");
const button = document.querySelector("#submit");
async function getBackendUrl() {
  try { const response = await fetch("/api-config"); if (!response.ok) throw new Error(); return (await response.json()).backendUrl; }
  catch { return "http://localhost:5000"; }
}
form.addEventListener("submit", async (event) => {
  event.preventDefault(); result.className = ""; result.textContent = ""; button.disabled = true; button.querySelector("span").textContent = "Sending…";
  try {
    const backendUrl = await getBackendUrl();
    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/process`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.elements.name.value.trim() }) });
    const data = await response.json(); if (!response.ok) throw new Error(data.error || "The request could not be processed.");
    result.textContent = data.message; form.reset();
  } catch (error) { result.className = "error"; result.textContent = `${error.message} Check that the backend is running.`; }
  finally { button.disabled = false; button.querySelector("span").textContent = "Send message"; }
});
