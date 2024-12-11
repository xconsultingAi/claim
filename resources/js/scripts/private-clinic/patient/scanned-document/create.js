$(function () {
    'use strict';
    var form = $('#dataForm');
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    var assetPath = '../../../app-assets/',
        userView = 'app-user-view-account.html';
    var humanFriendlyPickr = $('.flatpickr-human-friendly');

    if (humanFriendlyPickr.length) {
        humanFriendlyPickr.flatpickr({
            altInput: true,
            altFormat: 'd-m-Y',
            dateFormat: 'Y-m-d',
            allowInput: true,
        });
    }
    if ($('body').data('framework') === 'laravel') {
        assetPath = $('body').data('asset-path');
        userView = assetPath + 'app/user/view/account';
    }

    $('#scanButton').click(function (e) {
        e.preventDefault(); // Prevent form submission
        scanAndUploadDirectly();
    });

    function scanAndUploadDirectly() {
        scanner.scan(displayImagesOnPage,
            {
                "output_settings": [
                    {
                        "type": "return-base64",
                        "format": "pdf",
                        "pdf_text_line": "By ${USERNAME} on ${DATETIME}"
                    },
                    {
                        "type": "return-base64-thumbnail",
                        "format": "jpg",
                        "thumbnail_height": 200
                    }
                ]
            }
        );
    }

    function displayImagesOnPage(successful, mesg, response) {
        if (!successful) { // On error
            console.error('Failed: ' + mesg);
            return;
        }

        if (successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
            console.info('User cancelled');
            return;
        }

        var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
        for (var i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
            var scannedImage = scannedImages[i];
            processOriginal(scannedImage);
        }

        var thumbnails = scanner.getScannedImages(response, false, true); // returns an array of ScannedImage
        for (var i = 0; (thumbnails instanceof Array) && i < thumbnails.length; i++) {
            var thumbnail = thumbnails[i];
            processThumbnail(thumbnail);
        }
    }

    var imagesScanned = [];
    function processOriginal(scannedImage) {
        if (scannedImage.src && scannedImage.src.trim()) { // Check if image is valid
            imagesScanned.push(scannedImage);
        }
    }
    function processThumbnail(scannedImage) {
        var elementImg = scanner.createDomElementFromModel({
            'name': 'img',
            'attributes': {
                'class': 'scanned',
                'src': scannedImage.src
            }
        });
        document.getElementById('images').appendChild(elementImg);
    }
    function base64ToBlob(base64, mimeType) {
        var byteString = atob(base64.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeType });
    }
    function getQueryParam(param) {
        var queryString = window.location.search.substring(1);
        var params = new URLSearchParams(queryString);
        return params.get(param);
    }
    var isGdpr = getQueryParam('is_gdpr');


    if (form.length) {
        form.validate({
            rules: {
                'name': {
                    required: true
                }
            },
            submitHandler: function (form) {
                var formData = new FormData(form);
                var patient_id = $('#patient_id').val();
                var doc_id = $('#id').val();
                if (imagesScanned.length) {
                    imagesScanned.forEach(function (image, index) {
                        var blob = base64ToBlob(image.src, image.mimeType);
                        formData.append('file[]', blob, patient_id + '-' + currentDate + '-scanned_document_' + index + '.' + image.mimeType.split('/')[1]);
                    });
                }
                if (isGdpr) {
                    $('#is_gdpr').val(isGdpr);
                    formData.append('is_gdpr', isGdpr);
                }
                var route = 'private-clinic/patient/scanned-document/';
                var url = assetPath + route;
                var method = 'POST'; // Default to POST method

                if (patient_id && doc_id) {
                    url += 'update/' + patient_id + '/' + doc_id;
                } else if (patient_id) {
                    url += patient_id;
                }

                $.ajax({
                    url: url,
                    method: method,
                    data: formData, // Use FormData object
                    contentType: false, // Prevent jQuery from automatically setting the Content-Type
                    processData: false, // Prevent jQuery from automatically processing the data
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        // Handle the success response
                        var swalConfig = {
                            title: response.status,
                            text: response.message,
                            icon: response.status,
                            // confirmButtonText: 'OK'
                            showConfirmButton: false,
                            timer: 800
                        };

                        if (response.status === 'success') {
                            Swal.fire(swalConfig).then(function (result) {
                                $('#gdprButton').hide(); // Hide the button
                                window.location.href = assetPath + route + 'get/' + patient_id;
                            });
                        } else {
                            Swal.fire(swalConfig);
                        }
                    },
                    error: function (xhr, status, error) {
                        // Handle the error response
                        Swal.fire({
                            title: xhr.status,
                            text: xhr.statusText,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                });

                return false; // Prevent the form from being submitted
            }
        });
    }
});

let selectedFiles = [];
function handleFileSelect(event) {
    const files = event.target.files;
    const fileNamesContainer = document.getElementById("fileNames");

    for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name;

        // Skip empty files
        if (!files[i]) continue;

        selectedFiles.push(files[i]);

        const fileBox = document.createElement("div");
        fileBox.classList.add("file-container");

        const anchor = document.createElement("a");
        anchor.setAttribute("target", "blank");
        anchor.href = URL.createObjectURL(files[i]);

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "2em");
        svg.setAttribute("height", "2em");
        svg.setAttribute("viewBox", "0 0 24 32");
        svg.innerHTML = `
            <g fill="currentColor">
                <path d="M1.5 32h21c.827 0 1.5-.673 1.5-1.5v-21c0-.017-.008-.031-.009-.047c-.002-.023-.008-.043-.013-.065a.488.488 0 0 0-.09-.191c-.007-.009-.006-.02-.013-.029l-8-9c-.003-.003-.007-.003-.01-.006a.494.494 0 0 0-.223-.134c-.019-.006-.036-.008-.056-.011C15.557.012 15.53 0 15.5 0h-14C.673 0 0 .673 0 1.5v29c0 .827.673 1.5 1.5 1.5M16 1.815L22.387 9H16.5c-.22 0-.5-.42-.5-.75zM1 1.5a.5.5 0 0 1 .5-.5H15v7.25c0 .809.655 1.75 1.5 1.75H23v20.5a.5.5 0 0 1-.5.5h-21c-.28 0-.5-.22-.5-.5z"/>
                <path d="M5.5 14h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0 4h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0-8h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0 0 1m0 12h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0 4h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1"/>
            </g>
        `;

        const span = document.createElement("span");
        span.textContent = fileName;

        anchor.appendChild(svg);
        anchor.appendChild(span);

        const deleteButton = document.createElement("div");
        deleteButton.classList.add("cross-icon");
        deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteButton.onclick = () => deleteFile(fileName, fileBox);

        fileBox.appendChild(anchor);
        fileBox.appendChild(deleteButton);
        fileNamesContainer.appendChild(fileBox);
    }
}

function deleteFile(fileName, fileBox) {
    const fileNamesContainer = document.getElementById("fileNames");

    selectedFiles = selectedFiles.filter(file => file.name !== fileName && file.size > 0); // Exclude empty files
    fileNamesContainer.removeChild(fileBox);

    const fileInput = document.querySelector('[name="image_path[]"]');
    const dt = new DataTransfer();

    Array.from(fileInput.files).forEach((file) => {
        if (file.name !== fileName && file.size > 0) {
            dt.items.add(file); // Add only non-empty files
        }
    });

    fileInput.files = dt.files;
}


// function handleFileSelect(event) {
//     const files = event.target.files;
//     const fileNamesContainer = document.getElementById("fileNames");

//     for (let i = 0; i < files.length; i++) {
//         const fileName = files[i].name;
//         selectedFiles.push(files[i]);

//         const fileBox = document.createElement("div");
//         fileBox.classList.add("file-container");

//         const anchor = document.createElement("a");
//         anchor.setAttribute("target", "blank");
//         anchor.href = URL.createObjectURL(files[i]);

//         const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//         svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
//         svg.setAttribute("width", "2em");
//         svg.setAttribute("height", "2em");
//         svg.setAttribute("viewBox", "0 0 24 32");
//         svg.innerHTML = `
//             <g fill="currentColor">
//                 <path d="M1.5 32h21c.827 0 1.5-.673 1.5-1.5v-21c0-.017-.008-.031-.009-.047c-.002-.023-.008-.043-.013-.065a.488.488 0 0 0-.09-.191c-.007-.009-.006-.02-.013-.029l-8-9c-.003-.003-.007-.003-.01-.006a.494.494 0 0 0-.223-.134c-.019-.006-.036-.008-.056-.011C15.557.012 15.53 0 15.5 0h-14C.673 0 0 .673 0 1.5v29c0 .827.673 1.5 1.5 1.5M16 1.815L22.387 9H16.5c-.22 0-.5-.42-.5-.75zM1 1.5a.5.5 0 0 1 .5-.5H15v7.25c0 .809.655 1.75 1.5 1.75H23v20.5a.5.5 0 0 1-.5.5h-21c-.28 0-.5-.22-.5-.5z"/>
//                 <path d="M5.5 14h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0 4h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0-8h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0 0 1m0 12h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0 4h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1"/>
//             </g>
//         `;

//         const span = document.createElement("span");
//         span.textContent = fileName;

//         anchor.appendChild(svg);
//         anchor.appendChild(span);

//         const deleteButton = document.createElement("div");
//         deleteButton.classList.add("cross-icon");
//         deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
//         deleteButton.onclick = () => deleteFile(fileName, fileBox);

//         fileBox.appendChild(anchor);
//         fileBox.appendChild(deleteButton);
//         fileNamesContainer.appendChild(fileBox);
//     }
// }

// function deleteFile(fileName, fileBox) {
//     const fileNamesContainer = document.getElementById("fileNames");

//     selectedFiles = selectedFiles.filter(file => file.name !== fileName);
//     fileNamesContainer.removeChild(fileBox);
//     const fileInput = document.querySelector('[name="image_path[]"]');
//     const dt = new DataTransfer();

//     Array.from(fileInput.files).forEach((file) => {
//         if (file.name !== fileName) {
//             dt.items.add(file);
//         }
//     });

//     fileInput.files = dt.files;
// }

function updateHiddenInput() {
    const imagePathCopy = document.getElementById('files_attached');
    const filePaths = selectedFiles.map(file => URL.createObjectURL(file));
    imagePathCopy.value = filePaths.join(',');
}
