const fileForPreview = document.getElementById("fileForPreview");
const previewFrame = document.getElementById("previewFrame");

let previewHTML = "";
let currentCssLink = "";

fileForPreview.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        previewHTML = reader.result;
        applyClasslessCss();
        previewFrame.srcdoc = previewHTML;
    };

    reader.readAsText(file);
}

function applyClasslessCss(newLink) {
    for(const linkTag of previewFrame.contentWindow.document.getElementsByTagName("link"))
    {
        if (linkTag.getAttribute("rel") !== "stylesheet")
        {
            continue;
        }
        if (linkTag.getAttribute("href") === currentCssLink)
        {
            linkTag.remove();
        }
    }

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", newLink);
    currentCssLink = newLink;

    previewFrame.contentWindow.document.head.appendChild(link);
}

for (const radio of document.getElementsByName("selectCss")) {
    radio.onchange = () => {
        if (radio.checked) {
            applyClasslessCss(radio.value);
        }
    }
}