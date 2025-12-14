let url;
let link;
let image;

window.onload = () => {
    link = document.getElementById("download-link");
    image = document.getElementById("image");
    image.addEventListener("change", () => {
        if (image.files.length === 1) {
            if (link.href !== undefined && link.href !== "" && isValidUrl(link.href))
                URL.revokeObjectURL(link.href);
            var img = new Image();
            img.onload = convert;
            img.src = URL.createObjectURL(image.files[0]);
        } else {
            if (link.href !== undefined && link.href !== "" && isValidUrl(link.href))
                URL.revokeObjectURL(link.href);
        }
    });
};

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (error) {
        return false;
    }
}

function convert() {
    URL.revokeObjectURL(this.src); // Free up memory
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    // Set canvas dimensions to the image's
    canvas.width = this.width;
    canvas.height = this.height;

    // Draw the image onto the canvas
    ctx.drawImage(this, 0, 0);

    // Convert canvas to a Blob (File-like object) with JPEG format and quality
    // 'quality' can be between 0 and 1, default is 0.92
    canvas.toBlob(function(blob) {
        // You can now use the 'blob' object, e.g., upload it or trigger a download
        var file = new File([blob], "converted.gif", { type: "image/gif" });
        
        // Example of triggering a download link:
        link.href = URL.createObjectURL(file);
        link.download = 'converted.gif';
        
    }, "image/jpeg", 0.8); // Specify JPEG mime-type and quality (0.8 = 80%)
}
