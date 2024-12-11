//const { received } = require("laravel-mix/src/Log");

/*=========================================================================================
    File Name: app-user-view.js
    Description: User View page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var locations;
var baseurl = window.location.origin;
var url = window.location.href;
var patient_id = url.substring(url.lastIndexOf('/') + 1);
var dtUserTable = $('.prescription-list-table');
$(function () {
    ('use strict');
    $(document).on('click', '.addPrescription', function () {
        window.location.href = '/private-clinic/patient/prescription/create/' + patient_id;
    });

    var assetPath = '../../../app-assets/',
        userView = 'app-user-view-account.html';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
        userView = assetPath + 'private-clinic/patient/prescription/';
    }

    if (dtUserTable.length) {

        dtUserTable.DataTable({
            ajax: assetPath + 'private-clinic/patient/prescription/get-list/' + patient_id, // JSON file to add data
            columns: [
                { data: 'id' },
                { data: 'Date' },
                { data: 'Prescription Date' },
                { data: '' }
            ],
            columnDefs: [
                {
                    targets: 0,
                    responsivePriority: 1,
                    render: function (data, type, full, meta) {
                        return '<a href="' + baseurl + '/private-clinic/patient/prescription/edit/' + full.patient_id + '/' + full.id + '" class="dropdown-item" data-examination_id="' + full.id + '">' + (meta.row + 1) + '</a>';
                    }
                  },
                {
                    targets: 1,
                    responsivePriority: 3,
                    render: function (data, type, full, meta) {
                        var date = new Date(full['follow_up_date']);
                        var year = date.getFullYear();
                        var month = ("0" + (date.getMonth() + 1)).slice(-2);
                        var day = ("0" + date.getDate()).slice(-2);
                        var formattedDate = day + '-' + month + '-' + year;
                        return '<a href="' + baseurl + '/private-clinic/patient/prescription/edit/' + patient_id + '/' + full.id + '" class="dropdown-item" data-examination_id="' + full.id + '">' + formattedDate + '</a>';

                    }
                },
                {
                    targets: 2,
                    responsivePriority: 2,
                    render: function (data, type, full, meta) {
                        var date = new Date(full['created_at']);
                        var year = date.getFullYear();
                        var month = ("0" + (date.getMonth() + 1)).slice(-2);
                        var day = ("0" + date.getDate()).slice(-2);
                        var formattedDate = day + '-' + month + '-' + year;
                        var routeUrl = 'javascript:;';
                        return '<a href="' + routeUrl + '" class="dropdown-item prescription-download text-nowrap" id="prescription-download" data-id="' + full.id + '" data-patient-id="' + patient_id + '">PR-' + formattedDate + '</a>';

                    }
                },
                {
                    // Actions
                    targets: -1,
                    title: 'Actions',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return (
                            '<div class="btn-group">' +
                            '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
                            feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
                            '</a>' +
                            '<div class="dropdown-menu dropdown-menu-end">' +
                            '<a href="javascript:;" class="dropdown-item view-prescription" id="view-prescription" data-id="' + full.id + '" data-patient-id="' + patient_id + '">' +
                            feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) +
                            'View' +
                            '</a>' +
                            '<a href="' + baseurl + '/private-clinic/patient/prescription/edit/' + patient_id + '/' + full.id + '" class="dropdown-item" data-examination_id="' + full.id + '">' +
                            feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
                            'Edit' +
                            '</a>' +
                            '<a href="javascript:;" class="dropdown-item prescription-download" id="prescription-download" data-id="' + full.id + '" data-patient-id="' + patient_id + '">' +
                            feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) +
                            'Print' +
                            '</a>' +
                            '<a href="#" class="dropdown-item" dat_id="' + full.id + '" onclick="confirmRepeatPrescription(' + patient_id + ', ' + full.id + ')">' +
                            feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) +
                            'Repeat' +
                            '</a>' +
                            '<a href="javascript:;" class="dropdown-item delete-record" data-id="' + full.id + '">' +
                            feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
                            'Delete' +
                            '</a>' +
                            '</div>' +
                            '</div>'
                        );
                    }

                }
            ],
            order: [[0, 'desc']],
            dom:
                '<"d-flex justify-content-between align-items-center header-actions mx-0 row mt-0"' +
                '<"col-sm-12 col-lg-4 col-md-4 d-flex justify-content-center justify-content-lg-start heading-wrapper" >' + 
                '<"col-sm-12 col-lg-3 col-md-3 d-flex justify-content-center justify-content-lg-start" l>' +
                '<"col-sm-12 col-lg-5 col-md-5 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
                '>t' +
                '<"d-flex justify-content-between mx-2 row mb-1"' +
                '<"col-sm-12 col-md-6"i>' +
                '<"col-sm-12 col-md-6"p>' +
                '>',      
            language: {
                sLengthMenu: 'Show _MENU_',
                search: 'Search',
                searchPlaceholder: 'Search..'
            },
            buttons: [
                {
                text: 'Add Prescription',
                className: 'float-end border-0 text-white rounded-pill px-3 bg-primary addPrescription btn btn-primary waves-effect waves-float waves-light',
                id: '#prescriptionModal'
                }
            ],
        });
        $(document).on('click', '.open-modal', function () {
            $('#prescriptionModal').modal('show');
        });
        $('.heading-wrapper').html('<h3 class="fw-bolder mb-0"> Prescription</h3>');

    }

});



$(document).on('click', '.delete-record', function (e) {
    e.preventDefault();
    var dtUserTable = $('.prescription-list-table');
    var prescription_id = $(this).data('id');
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this user!",
        icon: 'warning', // Changed 'type' to 'icon'
        showCancelButton: true, // Ensure this is set to true
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel', // Added cancel button text
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn btn-danger ms-1',
        buttonsStyling: true // Set to true to use default button styles
    }).then(function (result) {
        if (result.isConfirmed) { // Check if the confirm button was clicked
            var csrfToken = $('meta[name="csrf-token"]').attr('content');
            $.ajax({
                url: baseurl + '/private-clinic/patient/prescription/delete/' + patient_id + '/' + prescription_id,
                method: 'delete',
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                },
                success: function (response) {
                    if (response.status == 'success') {
                        Swal.fire({
                            title: 'Success',
                            text: 'User has been deleted successfully',
                            icon: 'success',
                            // confirmButtonText: 'OK'
                            showConfirmButton: false,
                            timer: 800
                        });
                        // location.reload();
                        dtUserTable.DataTable().ajax.reload(null, false);
                    } else {
                        Swal.fire({
                            title: 'Failure',
                            text: response.message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                },
                error: function (xhr, status, error) {
                    Swal.fire({
                        title: 'Error',
                        text: error,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });
        }
    });
});


$(document).on('click', '.prescription-download', function (e) {
    e.preventDefault();
    var prescription_id = $(this).data('id');
    var printUrl = baseurl + '/private-clinic/patient/prescription/download-prescription/' + patient_id + '/' + prescription_id;
    var printWindow = window.open(printUrl, '_blank');
    printWindow.onload = function () {
        printWindow.print();
        setTimeout(function () {
            printWindow.close();
        }, 1500);
    };

    $(document).on('click', '.swal2-cancel', function () {
        printWindow.close();
    });
});

$(document).on('click', '.view-prescription', function (e) {
    e.preventDefault();
    $('#prescriptionModal').modal('show');
    var prescription_id = $(this).data('id');
    var printUrl = baseurl + '/private-clinic/patient/prescription/view-prescription/' + patient_id + '/' + prescription_id;

    $.ajax({
        url: printUrl,
        type: 'GET',
        success: function (response) {
            var medicines = response.data;
            var modalBody = $('#prescriptionContent');
            modalBody.empty(); // Clear previous content

            if (medicines.length === 0) {
                modalBody.append('<p>No medicines found</p>');
            } else {
                medicines.forEach(function (medicine) {
                    var medicineInfo = '<div class="medicine-info">' +
                        '<p><strong>Medicine Name:</strong> ' + medicine.medicine.drug_name + ' ' + medicine.medicine.strength + '</p>' +
                        '<p><strong>Frequency:</strong> ' + medicine.frequency + '</p>' +
                        '<p><strong>Duration:</strong> ' + medicine.duration + '</p>' +
                        '</div>' +
                        '<hr>';
                    modalBody.append(medicineInfo);
                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
            $('#prescriptionContent').html('<p>Error loading prescription data.</p>');
        }
    });
});
function confirmRepeatPrescription(patientId, prescriptionId) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to repeat this prescription?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            repeatPrescription(patientId, prescriptionId);
        }
    });
}

function repeatPrescription(patientId, prescriptionId) {
    $.ajax({
        url: baseurl + '/private-clinic/patient/prescription/repeat/' + patientId + '/' + prescriptionId,
        method: 'POST', // or 'POST' if your request is of type POST
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
        success: function (response) {
            var message = response.message || 'Operation successful';
            var icon = response.status === 'success' ? 'success' : 'error';
            Swal.fire({
              title: response.status,
              text: message,
              icon: icon,
              confirmButtonText: 'OK'
            }).then(function (result) {
              if (response.status === 'success') {
                window.location.href = baseurl + '/private-clinic/patient/prescription/' + patient_id;
              }
            });
          },
        error: function(error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error repeating prescription'
            });
            
        }
    });
}
