window.addEventListener("load", () => {
  const fileUpload = document.querySelector(".js-image-upload");

  fileUpload.addEventListener("change", (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "operations",
      JSON.stringify({
        query: `
        mutation($image: Upload!) {
          uploadPhoto(image: $image) {
            path
          }
        }`,
        variables: {
          image: null,
        },
      })
    );
    formData.append("image", fileUpload.files[0]);
    formData.append(
      "map",
      JSON.stringify({
        image: ["variables.image"],
      })
    );

    fetch("/graphql/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((avatar) => {
        window.appendNewAvatar(avatar.data.uploadPhoto);
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
});
