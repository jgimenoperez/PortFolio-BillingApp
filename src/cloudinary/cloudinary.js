import { sha1 } from "crypto-hash";

export const uploadAvatar = async (file, imageFolder, imageName,extension) => {
  const uploadPreset = "BillingApp";
  const cloudUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARYCLOUDNAME
  }/upload`;
  const formData = new FormData();
  formData.append("upload_preset", uploadPreset);
  formData.append("file", file);
  formData.append("public_id", `users/${imageFolder}/${imageName}`); // Carpeta y nombre de la imagen
  try {
    return deleteAvatar(imageFolder, imageName,extension)
    .then(()=>{ return (
          fetch(cloudUrl, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          const imageUrl = data.secure_url;
          // console.log("Imagen cargada:", imageUrl);
          return imageUrl;
        })
        .catch((error) => {
          console.error("Error al cargar la imagen:", error);
        })
    )}
  
    );
  } catch (error) {
    console.error("Error al cargar la imagen:", error);
  }
};

export const deleteAvatar = async (imageFolder, imageName,extension) => {
  const publicId = `BillingApp/users/${imageFolder}/${imageName}`;
  const timestamp = new Date().getTime();
  const string = `public_id=${publicId}&timestamp=${timestamp}${
    import.meta.env.VITE_CLOUDINARYSECRET
  }`;
  const signature = await sha1(string);
  const formData = new FormData();
  formData.append("public_id", publicId); // Carpeta y nombre de la imagen
  formData.append("signature", signature);
  formData.append("api_key", import.meta.env.VITE_CLOUDINARYKEY);
  formData.append("timestamp", timestamp);
  // const res = await ax.post("https://api.cloudinary.com/v1_1/<your cloud name>/image/destroy", formData)
  return fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARYCLOUDNAME
    }/image/destroy`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
      // Realiza acciones adicionales después de eliminar la imagen
    })
    .catch((error) => {
      console.error("Error al eliminar la imagen:", error);
    });
};
