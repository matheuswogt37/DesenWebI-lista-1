function copyClipboard(src) {
    console.log(src);
    navigator.clipboard.writeText(src);
}

async function downloadImg(id) {
    const imageSrc = "https://picsum.photos/id/" + id + "/1980/1080.webp";
    const response = await fetch(imageSrc);
    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);
    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = "image-good.webp";

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
}

function sendWhats(src) {
    window.open("whatsapp://send?text=" + src + "");
}

function error() {
    document.getElementById("galeria").classList.add("escondido");
    document.getElementById("erro").classList.remove("escondido");
}

function getId(str) {
    let strSplit = str.split("/");
    return strSplit[4];
}

function requestImgs() {
    const alt = document.getElementById("altura").value;
    const lar = document.getElementById("largura").value;
    const qtd = document.getElementById("qtdImagens").value;
    const divContainer = document.getElementById("galeria");
    let newDiv;
    let newImg;
    let newDivText;
    let buttonCopy;
    let buttonDown;
    let buttonWhats;
    //* validação de input

    for (let i = 0; i < qtd; i++) {
        fetch("https://picsum.photos/" + alt + "/" + lar + ".webp").then(
            (response) => {
                if (!response.ok) {
                    // throw new Error("Erro na rede: " + response.status);
                    if (400 == response.status) {
                        error();
                    }
                }
                newDiv = document.createElement("div");
                newDiv.classList.add("imgDiv");
                newImg = document.createElement("img");
                // newImg.setAttribute('src', response.url);
                newImg.src = response.url;
                newImg.classList.add("img");
                newDiv.appendChild(newImg);

                buttonCopy = document.createElement("button");
                buttonCopy.innerHTML += "<img src='imgs/link.svg' alt=''/>";
                buttonCopy.setAttribute(
                    "onclick",
                    'copyClipboard("' + newImg.src + '")'
                );

                buttonDown = document.createElement("button");
                buttonDown.innerHTML += "<img src='imgs/download.svg' alt=''/>";
                buttonDown.setAttribute(
                    "onclick",
                    'downloadImg("' + getId(newImg.src) + '")'
                );

                buttonWhats = document.createElement("button");
                buttonWhats.innerHTML +=
                    "<img src='imgs/whatsapp.svg' alt=''/>";
                buttonWhats.setAttribute(
                    "onclick",
                    'sendWhats("' + newImg.src + '")'
                );

                newDivText = document.createElement("div");
                newDivText.classList.add("imgTexto");
                newDivText.appendChild(buttonCopy);
                newDivText.appendChild(buttonDown);
                newDivText.appendChild(buttonWhats);
                newDiv.appendChild(newDivText);
                divContainer.appendChild(newDiv);
                console.log(response);
            }
        );
    }
}

requestImgs();
