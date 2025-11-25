function loadFromURL() {
  const url = document.getElementById("urlInput").value.trim();
  const output = document.getElementById("output");
  output.innerHTML = ""; // clear previous content

  if (!url) {
    output.innerHTML = "<em>Please enter a URL.</em>";
    return;
  }

  // --- SSRF simulation trigger ---
if (url === "localhost:8080/SECRETS" || url === "http://localhost:8080/SECRETS") {
  output.innerHTML = "<strong>Wow, what a cool picture!</strong>";

  const fakeDump = `
INTERNAL SERVER FILES:
-----------------------------------
/etc/passwd
/admin/config
/internal/api/db-creds.json

FAKE_CREDENTIALS:
  admin_user: "root"
  admin_pass: "super-secret-password"
  token: "12345-fake-token"
`;

  const secretBox = document.createElement("pre");
  secretBox.className = "secret";
  secretBox.textContent = fakeDump;

  const container = document.createElement("div");
  container.id = "imageContainer";
  container.appendChild(secretBox);

  output.appendChild(container);
  return;
}


  // --- Normal image path ---
const img = document.createElement("img");
img.src = url;

const container = document.createElement("div");
container.id = "imageContainer";
container.appendChild(img);

output.innerHTML = "<strong>Wow, what a cool picture!</strong>";
output.appendChild(container);

  img.onerror = () => {
    output.innerHTML = "<em>Could not load image.</em>";
  };
}

function loadFromFile() {
  const file = document.getElementById("fileInput").files[0];
  const output = document.getElementById("output");

  if (!file) {
    output.innerHTML = "<em>No file selected.</em>";
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    output.innerHTML = "<strong>Wow, what a cool picture!</strong>";
    const img = document.createElement("img");
    img.src = e.target.result;
    output.appendChild(img);
  };

  reader.readAsDataURL(file);
}