/*=========================================================================================
    File Name: Status Definition.js
    Description: Status Definition List page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent

==========================================================================================*/
$(function () {
    ('use strict');

    var dtUserTable = $('.contact-list-table'),
        select = $('.select2'),
        statusObj = {
            'pending': { title: 'pending', class: 'badge-light-info' },
            'active': { title: 'active', class: 'badge-light-success' },
            'suspend': { title: 'suspend', class: 'badge-light-warning' },
            'in_active': { title: 'in_active', class: 'badge-light-secondary' },
            'trash': { title: 'trash', class: 'badge-light-danger' },
        };

    var baseurl = window.location.origin;
    var assetPath = '../../../app-assets/',
        userView = 'app-user-view-account.html';

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
        userView = assetPath + 'app/user/view/account';
    }
    if (dtUserTable.length) {

        $('.contact-list-table thead tr').clone(true).appendTo('.contact-list-table thead');
        $('.contact-list-table thead tr:eq(1) th').each(function (i) {
            if (i < $('.contact-list-table thead tr:eq(1) th').length - 1) {
                var title = $(this).text();
                $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Search ' + title + '" />');

                $('input', this).on('keyup change', function () {
                    if (dt_filter.column(i).search() !== this.value) {
                        dt_filter.column(i).search(this.value).draw();
                    }
                });
            } else {
                var title = $(this).text();
                $(this).html('');
            }
        });

        var dt_filter = dtUserTable.DataTable({
            ajax: assetPath + 'private-clinic/contacts/list', // JSON file to add data
            columns: [
                // columns according to JSON
                { data: 'contact_type' },
                { data: 'display_name' },
                { data: 'entity_name' },
                { data: 'email' },
                { data: 'website' },
                { data: '' }
            ],
            columnDefs: [
                {
                    targets: 0,
                    render: function (data, type, full, meta) {
                        var contactType = full.contact_type; // Get the string
                        var capitalizedContactType = contactType.charAt(0).toUpperCase() + contactType.slice(1);
                        return '<span class="text-nowrap">' + capitalizedContactType + '</span>';
                    }
                },
                {
                    targets: 1,
                    render: function (data, type, full, meta) {
                        return '<span class="text-nowrap">' + full.display_name + '</span>';
                    }
                },
                {
                    targets: 2,
                    render: function (data, type, full, meta) {
                        return '<span class="text-nowrap">' + full.entity_name + '</span>';
                    }
                },
                {
                    targets: 3,
                    render: function (data, type, full, meta) {
                        return '<span class="text-nowrap">' + full.email + '</span>';
                    }
                },
                {
                    targets: 4,
                    render: function (data, type, full, meta) {
                        return '<span class="text-nowrap">' + full.website + '</span>';
                    }
                },
                {
                    // Actions
                    targets: -1,
                    title: 'Actions',
                    orderable: false,
                    render: function (data, type, full, meta) {
                        //start from this
                        return (
                            '<div class="btn-group">' +
                            '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
                            feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
                            '</a>' +
                            '<div class="dropdown-menu dropdown-menu-end">' +
                            '<a href="javascript:void(0);" class="dropdown-item edit-record" data-contact_id="' + full.id + '">' +
                            feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
                            'Edit</a>' +
                            '<a href="javascript:void(0);" class="dropdown-item delete-record" data-contact_id="' + full.id + '">' +
                            feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
                            'Delete</a></div>' +
                            '</div>'
                        );
                    }
                }
            ],
            order: [[1, 'desc']],
            orderCellsTop: true,
            dom:
                '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
                '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
                '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
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
            // Buttons with Dropdown
            buttons: [
                {
                    extend: 'collection',
                    className: 'btn btn-outline-secondary dropdown-toggle me-2',
                    text: feather.icons['external-link'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
                    buttons: [
                        {
                            extend: 'print',
                            text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
                            className: 'dropdown-item',
                            exportOptions: { columns: [0, 1, 2] }
                        },
                        {
                            extend: 'csv',
                            text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
                            className: 'dropdown-item',
                            exportOptions: { columns: [0, 1, 2] }
                        },
                        {
                            extend: 'excel',
                            text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
                            className: 'dropdown-item',
                            exportOptions: { columns: [0, 1, 2] }
                        },
                        {
                            extend: 'pdf',
                            text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
                            className: 'dropdown-item',
                            exportOptions: { columns: [0, 1, 2] }
                        },
                        {
                            extend: 'copy',
                            text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
                            className: 'dropdown-item',
                            exportOptions: { columns: [0, 1, 2] }
                        }
                    ],
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                        $(node).parent().removeClass('btn-group');
                        setTimeout(function () {
                            $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex mt-50');
                        }, 50);
                    }
                },
                {
                    text: 'Add New Contact',
                    className: 'add-type btn btn-primary'
                }
            ],
            language: {
                paginate: {
                    // remove previous & next text from pagination
                    previous: '&nbsp;',
                    next: '&nbsp;'
                }
            },
        });
    }

    $(document).on('click', '.delete-record', function (e) {
        e.preventDefault();
        var dtUserTable = $('.contact-list-table');
        var contact_id = $(this).data('contact_id');
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this doctor type!",
            type: 'warning',
            showCancelButton: !0,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-danger ms-1',
            buttonsStyling: !1
        }).then(function (result) {
            if (result.isConfirmed) {
                $.ajax({
                    url: assetPath + 'private-clinic/contacts/delete/' + contact_id,
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        if (response.status == 'success') {
                            Swal.fire({
                                title: response.status,
                                text: response.message,
                                icon: response.status,
                                // confirmButtonText: 'OK'
                                showConfirmButton: false,
                                timer: 800
                            }).then(function (result) {
                                dtUserTable.DataTable().ajax.reload(null, false);
                            });
                        } else {
                            Swal.fire({
                                title: response.status,
                                text: response.message,
                                icon: 'success',
                                // confirmButtonText: 'OK'
                                showConfirmButton: false,
                                timer: 800
                            });
                        }

                    },
                    error: function (xhr, status, error) {
                        Swal.fire({
                            title: 'error',
                            text: error,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                });
            }
        });
    });

    $(".add-type").click(function () {
        window.location.pathname = '/private-clinic/contacts/create';
    });

    $(document).on('click', '.edit-record', function (e) {
        e.preventDefault();
        var contact_id = $(this).data('contact_id');
        window.location.href = baseurl + `/private-clinic/contacts/${contact_id}/edit`;
    });

});
