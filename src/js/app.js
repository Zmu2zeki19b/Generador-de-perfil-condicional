import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  // Cover logic
  let cover = `<div class="cover"></div>`;
  if (variables.includeCover && variables.background) {
    cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  }

  // Función para generar enlaces de redes sociales
  const getSocialLink = (username, baseUrl) => {
    if (!username) return null; // Si no hay nombre de usuario, retorna null
    return username.startsWith("http") ? username : `${baseUrl}${username}`;
  };

  // Reset the website body with the new HTML output
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${variables.name || "Nombre"} ${variables.lastName || "Apellido"}</h1>
      <h2>${variables.role || "Role"}</h2>
      <h3>${variables.city || "City"}${
    variables.city && variables.country ? ", " : ""
  }${variables.country || "Country"}</h3>
      <ul class="${variables.socialMediaPosition}">
        ${
          variables.twitter
            ? `<li><a href="${getSocialLink(
                variables.twitter,
                "https://twitter.com/"
              )}" target="_blank"><i class="fab fa-twitter"></i></a></li>`
            : ""
        }
        ${
          variables.github
            ? `<li><a href="${getSocialLink(
                variables.github,
                "https://github.com/"
              )}" target="_blank"><i class="fab fa-github"></i></a></li>`
            : ""
        }
        ${
          variables.linkedin
            ? `<li><a href="${getSocialLink(
                variables.linkedin,
                "https://linkedin.com/in/"
              )}" target="_blank"><i class="fab fa-linkedin"></i></a></li>`
            : ""
        }
        ${
          variables.instagram
            ? `<li><a href="${getSocialLink(
                variables.instagram,
                "https://instagram.com/"
              )}" target="_blank"><i class="fab fa-instagram"></i></a></li>`
            : ""
        }
      </ul>
    </div>
  `;
}

// Don't change any of the lines below
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "left",
    twitter: null, // Puedes usar "usuario" o "https://twitter.com/usuario"
    github: null, // Puedes usar "usuario" o "https://github.com/usuario"
    linkedin: null, // Puedes usar "usuario" o "https://linkedin.com/in/usuario"
    instagram: null, // Puedes usar "usuario" o "https://instagram.com/usuario"
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });
};
