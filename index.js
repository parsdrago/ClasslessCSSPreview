const fileForPreview = document.getElementById("fileForPreview");
const previewFrame = document.getElementById("previewFrame");

fileForPreview.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      previewFrame.srcdoc = reader.result;
    };
    
    reader.readAsText(file);
}