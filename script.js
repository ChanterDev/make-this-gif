let url;
let link;
let image;
let compress;

function clearWhenPossible() {
    image.value = "";
    setTimeout(() => {
        link.href = "";
        link.removeAttribute('download');
    }, 100);
}

window.onload = () => {
    link = document.getElementById("download-link");
    image = document.getElementById("image");
    compress = document.getElementById("compress");
    image.addEventListener("change", () => {
        if (image.files.length === 1) {
            convertToFakeGIF(image.files[0]);
        }
    });
    link.addEventListener("click", clearWhenPossible);
};

function convertToFakeGIF(file) {
    var img = new Image();
    img.onload = () => {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
            var file = new File([blob], "converted.gif", { type: "image/gif" });
            link.href = URL.createObjectURL(file);
            link.download = 'converted.gif';
        }, "image/jpeg", parseInt(compress.value) / 100);
        URL.revokeObjectURL(img.src); // Free up memory
    };
    img.src = URL.createObjectURL(file);
}
