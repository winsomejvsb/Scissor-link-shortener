const domain = `http://127.0.0.1:8000/`

// - - - - - - - - - - - URL SHORTENING - - - - - - - - - - - 
// link to shorten

const shortenLnkBtn = document.getElementById("shorten-url-btn");
async function shortenUrl() {
    const urlToShorten = document.getElementById("shorten-url");        // input element
    const responseEl = document.getElementById("result");
    const domainName = document.getElementById("domain");       // p tag
    const shortUrlEl = document.getElementById("trimmed-url");  // a tag

    try {
        const response = await fetch(`${domain}shorten-url`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ target_url: urlToShorten.value }),
        });
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            const data = await response.json();
            responseEl.style.display = "flex";

            domainName.textContent = domain;
            urlObject = new URL(data.shortened_url);
            address = urlObject.pathname.slice(1);
            shortUrlEl.textContent = address;
            shortUrlEl.href = data.shortened_url;
            console.log(address);
            console.log(data);
        }
    } catch (error) {
            console.error("Error fetching data: ", error);
        }
}

shortenLnkBtn.addEventListener("click", shortenUrl);



// - - - - - - - - - - - CUSTOMIZING URL - - - - - - - - - - - 
// link to customize URL
const customizeLnkBtn = document.getElementById("customize-url-btn");
async function customizeUrl() {
    console.log(domain)
    // URL to be customized
    const oldAddress = document.getElementById("old-url")
    const newAddress = document.getElementById("new-url")
    const key = "127.0.0.1:8000/EXEUS"
    // Regex to match a valid URL
    // const urlRegex = /^(http|https):\/\/[^\s]+/;
    // if (!urlRegex.test(oldAddress.value)) {
    //     const key = oldAddress.value
    //     console.log(`key without splitting: ${key}`)
    // } else {
    //     const key = oldAddress.value.split("/").pop();
    // console.log(`key from splitting: ${key}`)
    // }
    // console.log(`New address value: ${newAddress.value}`)

    try {
        const response = await fetch(`${domain}{url}?url=${key}&new_address=${newAddress.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            const data = await response.json();
            console.log(data);
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}
customizeLnkBtn.addEventListener("click", customizeUrl());


// - - - - - - - - - - - CREATING QR CODE - - - - - - - - - - - 
const generateQrBtn = document.getElementById("g-qrcode")
async function generateQrCode() {
    const urlForQRCode = document.getElementById("url-for-qrcode").value;
    const imgBlock = document.getElementById("qrcode-img");
    const qrImage = document.getElementById("qrcode");
    const link = document.getElementById("download")

    const response = await fetch(`${domain}${urlForQRCode}/qrcode`, {
        method: "GET",
        headers: {
            "Content-Type": "images/png",
        }
    }).then((response) => response.blob())
    .then((myBlob) => {
        const objectURL = URL.createObjectURL(myBlob);
    });
    if (!response.ok) {
        throw Error(response.statusText);
    } else {
        imgBlock.style.display = "flex";
        qrImage.src = objectURL;
        link.href = objectURL;
        link.download = "qrcode.png";
        const data = await response.json();
        console.log(data);
    }
}
// generateQrBtn.addEventListener("click", generateQrCode)



// - - - - - - - - - - - FORWARDING SHORT URL TO IT'S TARGET - - - - - - - - - - - 



// - - - - - - - - - - - DELETE SHORT URL - - - - - - - - - - - 
urlToDelete = "get-from-user-input"

async function deleteUrl() {
    try {
        const response = await fetch(`${domain}${urlToDelete}/delete`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        });
        if (!resoponse.ok) {
            throw Error(response.statusText);
        } else {
            const data = await response.json();
            console.log(data);
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`)
    }
}



// - - - - - - - - - - -    RECOVER DELETED SHORT URL - - - - - - - - - - - 
urlToRecover = "get-from-user-input"

async function recoverUrl() {
    try {
        const response = await fetch(`${domain}${urlToRecover}/delete`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
        });
        if (!resoponse.ok) {
            throw Error(response.statusText);
        } else {
            const data = await response.json();
            console.log(data);
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`)
    }
}