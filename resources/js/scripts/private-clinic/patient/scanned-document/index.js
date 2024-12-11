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
$(function () {
  ('use strict');

  // $(document).on('click', '#document-popover', function () {
  //   var offset = $(this).offset();
  //   var top = offset.top + window.scrollY;
  //   var left = offset.left + window.scrollX;
  //   var width = $(this).width();
  //   $('#popover').css({
  //     'top': top + 'px',
  //     'left':   (left- top/2) + 'px',
  //     'width': width * 10,
  //     'background-color': '#fff',
  //     'border': '1px solid #7367f0',
  //     'color': '#7367f0',
  //     'padding': '20px'
  //   }).fadeIn();
  // });
  $(document).on('click', '#document-popover', function () {
    let images = $(this).data('images');
    if (typeof images === 'string') {
      images = images.split(',');
    }
    if (images && Array.isArray(images)) {
      let baseUrl = "https://cghlahore.s3.ap-southeast-1.amazonaws.com/PCM/Patient/Scanned-Document/";
      let popoverContent = images.map(function (image) {
        let fileName = image.replace(baseUrl, '');
        return `<a href="${image}" target="_blank">${fileName}</a>`;
      }).join('<br>');
      var offset = $(this).offset();
      var top = offset.top + window.scrollY;
      var left = offset.left + window.scrollX;
      var width = $(this).width();
      $('#popover').html(popoverContent).css({
        'top': top + 'px',
        'left': (left - top / 2) + 'px',
        'width': '300px',
        'background-color': '#fff',
        'border': '1px solid #7367f0',
        'color': '#7367f0',
        'font-size':'12px',
        'padding': '20px'
      }).fadeIn();
    } else {
      console.error("No images to display in popover.");
    }
  });
  $(document).click(function (event) {
    if (!$(event.target).closest('#document-popover, #popover').length) {
      $('#popover').fadeOut();
    }
  });


  // Extract the ID from the URL
  var url = window.location.href;
  var patient_id = url.substring(url.lastIndexOf('/') + 1);




  var dtUserTable = $('.user-list-table');
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf('/') + 1);
  statusObj = {
    'pending': { title: 'pending', class: 'badge-light-info' },
    'active': { title: 'active', class: 'badge-light-success' },
    'suspend': { title: 'suspend', class: 'badge-light-warning' },
    'in_active': { title: 'in_active', class: 'badge-light-secondary' },
    'trash': { title: 'trash', class: 'badge-light-danger' },
  };

  $(".addNew").click(function () {
    window.location.pathname = '/private-clinic/patient/scanned-document/create/' + patient_id;
  });
  //   $(document).on('click', '.addExamination', function() {
  //     window.location.href = '/private-clinic/patient/examination-history/create/' + patient_id;
  //   });

  var baseurl = window.location.origin;
  var assetPath = '../../../app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'private-clinic/patient/scanned-document/get/';
  }

  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetPath + 'private-clinic/patient/scanned-document/get-list/' + patient_id, // JSON file to add data
      columns: [
        // columns according to JSON
        { data: 'doc_date' },
        { data: 'name' },
        { data: 'description' },
        { data: 'document' },
        { data: '' }
      ],
      columnDefs: [
        {
          targets: 0,
          responsivePriority: 2,
          render: function (data, type, full, meta) {

            var date = new Date(full['doc_date']);
            // Get the parts of the date (year, month, day)
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-based
            var day = ("0" + date.getDate()).slice(-2);
            // Construct the formatted date string (YYYY-MM-DD)
            var doc_date = day + '-' + month + '-' + year;

            return '<span class="text-nowrap">' + doc_date + '</span>';
          }
        },
        {
          targets: 1,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            return '<span class="text-wrap">' + full['name'] + '</span>';
          }
        },
        {
          targets: 2,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            return '<span class="text-center text-wrap">' + full['description'] + '</span>';
          }
        },
        {
          targets: 3,
          responsivePriority: 2,
          render: function (data, type, full, meta) {
            let images = full["image_path"]?.split(",");
            if (images?.length > 1) {
              // console.log("images====>", images);
              return (
                '<a href="' + images[0] + '" target="_blank">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 32">' +
                '<g fill="currentColor">' +
                '<path d="M1.5 32h21c.827 0 1.5-.673 1.5-1.5v-21c0-.017-.008-.031-.009-.047c-.002-.023-.008-.043-.013-.065a.488.488 0 0 0-.09-.191c-.007-.009-.006-.02-.013-.029l-8-9c-.003-.003-.007-.003-.01-.006a.494.494 0 0 0-.223-.134c-.019-.006-.036-.008-.056-.011C15.557.012 15.53 0 15.5 0h-14C.673 0 0 .673 0 1.5v29c0 .827.673 1.5 1.5 1.5M16 1.815L22.387 9H16.5c-.22 0-.5-.42-.5-.75zM1 1.5a.5.5 0 0 1 .5-.5H15v7.25c0 .809.655 1.75 1.5 1.75H23v20.5a.5.5 0 0 1-.5.5h-21c-.28 0-.5-.22-.5-.5z"/><path d="M5.5 14h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0 4h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0-8h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0 0 1m0 12h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0 4h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1"/></g>' +
                '</svg>' +
                '</a>' +
                '<a href="#" id="document-popover" data-images="' + images.join(',') + '">' +
                '+' + (images.length - 1) +
                '</a>'
              );
            }
            return (
              full["image_path"] &&
              '<a target="blank" href="' +
              full["image_path"]?.split(",")[0] +
              '"> <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 32"><g fill="currentColor"><path d="M1.5 32h21c.827 0 1.5-.673 1.5-1.5v-21c0-.017-.008-.031-.009-.047c-.002-.023-.008-.043-.013-.065a.488.488 0 0 0-.09-.191c-.007-.009-.006-.02-.013-.029l-8-9c-.003-.003-.007-.003-.01-.006a.494.494 0 0 0-.223-.134c-.019-.006-.036-.008-.056-.011C15.557.012 15.53 0 15.5 0h-14C.673 0 0 .673 0 1.5v29c0 .827.673 1.5 1.5 1.5M16 1.815L22.387 9H16.5c-.22 0-.5-.42-.5-.75zM1 1.5a.5.5 0 0 1 .5-.5H15v7.25c0 .809.655 1.75 1.5 1.75H23v20.5a.5.5 0 0 1-.5.5h-21c-.28 0-.5-.22-.5-.5z"/><path d="M5.5 14h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0 4h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0-8h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0 0 1m0 12h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1m0 4h13a.5.5 0 0 0 0-1h-13a.5.5 0 0 0 0 1"/></g></svg></a>'
            );
          },
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
              '<a href="' +
              baseurl + '/private-clinic/patient/scanned-document/edit/' + patient_id + '/' + full.id +
              '" class="dropdown-item" data-examination_id="' + full.id + '">' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item delete-record" data-id="' + full.id + '">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a></div>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[0, 'asc']],
      orderCellsTop: true,
      dom:
       '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-2"f>B>>' +
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
          text: '',
          className: ''
        }
      ],
      language: {
        paginate: {
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
    });
  }
});


$(document).on('click', '.delete-record', function (e) {
  e.preventDefault();
  var dtUserTable = $('.user-list-table');
  var user_id = $(this).data('id');
  
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this user!",
    icon: 'warning', // Changed 'type' to 'icon'
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    confirmButtonClass: 'btn btn-primary',
    cancelButtonClass: 'btn btn-danger ms-1',
    buttonsStyling: false
  }).then((result) => {
    // Check if the user confirmed the action
    if (result.isConfirmed) {
      var csrfToken = $('meta[name="csrf-token"]').attr('content');
      $.ajax({
        url: baseurl + '/private-clinic/patient/scanned-document/delete/' + user_id,
        method: 'DELETE', // Ensure the method is uppercase
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        success: function (response) {
          if (response.status == 'success') {
            Swal.fire({
              title: 'Success',
              text: 'User has been deleted successfully',
              icon: 'success',
              showConfirmButton: false,
              timer: 800
            });

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
