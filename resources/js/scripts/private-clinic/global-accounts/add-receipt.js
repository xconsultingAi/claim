/*=========================================================================================
  File Name: create.js
  Description: Auth register js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var patient_id = $('#patient_id').val();

$(function () {
    ('use strict');
    var assetPath = '../../../app-assets/',
        userView = 'app-user-view-account.html';
    var baseurl = window.location.origin;
    var receipt_date = $('#receipt_date');
    var insurance_div = $('#insurance_div');
    var solicitor_div = $('#solicitor_div');
    var invoiceAmount = $('#invoice_amount');
    var cheque_date = $('#cheque_date');
    var invoice_id = $('#invoice_id');
    const balanceText = $('#invoice_balance').text();
    const invoiceBalance = parseNumberWithCommas(balanceText);
    $("#mode_of_payment").trigger('change');

    function parseNumberWithCommas(numberString) {
        const cleanedString = numberString.replace(/,/g, '');
        return parseFloat(cleanedString);
    }

    $('#bill_to').change(function () {
        var selectedOption = $(this).val();
        if (selectedOption === "insurance_company") {
            insurance_div.show();
            $('#insurance_company').prop('disabled', false);
            $('#insurance_number').prop('disabled', false);
        } else {
            insurance_div.hide();
            $('#insurance_company').prop('disabled', true);
            $('#insurance_number').prop('disabled', true);
        }

        if (selectedOption === "third_party") {
            solicitor_div.show();
        } else {
            solicitor_div.hide();
        }
    });

    function getIDsFromTable() {
        var ids = [];
        $('#procedure_table tbody tr:not(.total-row, .payable-row)').each(function () {
            var id = $(this).find('td:eq(0)').text().trim(); // Get ID from first column
            ids.push(id);
        });
        return ids;
    }

    function getwaivedamount() {
        var waived_amount = [];
        $('#procedure_table tbody tr:not(.total-row, .payable-row)').each(function () {
            var waivedamountText = $(this).find('td:eq(4)').text().trim();
            var waivedamount = parseFloat(waivedamountText.replace('€', ''));
            waived_amount.push(waivedamount);
        });
        return waived_amount;
    }

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
        userView = assetPath + 'app/user/view/account';
    }

    if (receipt_date.length) {
        var receipt_date = receipt_date.flatpickr({
            enableTime: false,
            altInput: true,
            altFormat: 'd-m-Y',
            dateFormat: 'd-m-Y',
            allowInput: true,
            onReady: function (selectedDates, dateStr, instance) {
                if (instance.isMobile) {
                    $(instance.mobileInput).attr('step', null);
                }
            }
        });
    }

    if (cheque_date.length) {
        var cheque_date = cheque_date.flatpickr({
            enableTime: false,
            altInput: true,
            altFormat: 'd-m-Y',
            dateFormat: 'd-m-Y',
            allowInput: true,
            onReady: function (selectedDates, dateStr, instance) {
                if (instance.isMobile) {
                    $(instance.mobileInput).attr('step', null);
                }
            }
        });
    }

    var form = $('#dataForm');

    if (form.length) {
        form.validate({
            rules: {
                'procedure_select': {
                    required: false
                }
            },

            submitHandler: function (form) {
                var formData = $(form).serialize();
                var receipt_id = $('#receipt_id').val();
                var invoice_id = $('#invoice_id').val();
                var route = 'private-clinic/global-accounts/';
                var routeforsave = 'private-clinic/global-accounts/save_receipt/';
                var routeforupdate = 'private-clinic/global-accounts/update-receipt/';
                var url = receipt_id ? assetPath + routeforsave : assetPath + route;
                var method = 'POST'; // Default to POST method
                var ids = getIDsFromTable();
                var waived_amount = getwaivedamount();
                // var idsString = ids.join(',');
                formData += '&procedureIds=' + ids.join(',');
                formData += '&waivedAmount=' + waived_amount.join(',');

                // console.log(formData);
                // console.log(idsString);
                // Detect which button was clicked and adjust the URL accordingly
                var clickedButtonId = $(form).find(':submit:focus').attr('id');
                if (clickedButtonId === 'btn_save') {
                    url = assetPath + routeforsave + patient_id + '/' + invoice_id;
                }
                else if (clickedButtonId === 'btn_update') {
                    url = assetPath + routeforupdate + patient_id + '/' + invoice_id + '/' + receipt_id;
                    // console.log(url);
                    var method = 'PUT';
                }

                $.ajax({
                    url: url,
                    method: method,
                    data: formData,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {
                        // console.log(response.data);
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


                                Swal.fire({
                                    title: "Do you want to print this Receipt?",
                                    text: "This will redirect to the print page!",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, print it!"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                    
                                    
                                    window.open(baseurl + '/private-clinic/patient/patient-accounts/receipt-print/' + response.data.patient_id + '/' + response.data.invoice_id + '/' + response.data.id, '_blank');

                                    setTimeout(function() {
                                        window.location.href = assetPath + route + 'get-receipt';
                                    }, 3500);
                                    
                                    }
                                    else {
                                        window.location.href = assetPath + route + 'get-receipt';
                                    }
                                });

                                
                            });
                        } else {
                            Swal.fire(swalConfig);
                        }
                    },
                    error: function (xhr, status, error) {
                        // Handle the error response
                        // Display an error message or perform any other error handling
                        console.error(error);
                        Swal.fire({
                            title: error.status,
                            text: error.statusText,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                });

                return false; // Prevent the form from being submitted
            }




        });
    }

    $('#procedure_select').select2();
    $('#insurance_company').select2();
    $('#bill_to').select2();
    $('#income_category').select2();
    $('#Procedure_list').DataTable();
});

$(document).ready(function () {
    // $("#mode_of_payment").trigger('change');
    // $("#mode_of_payment").trigger("change");
    // $('#invoice_amount').trigger('input');

    $('#bill_to').on('change', function () {

        if ($('#bill_to').val() === 'insurance_company') {
            $('.insurance_div').show();
        } else {
            $('.insurance_div').hide();
        }

        if ($('#bill_to').val() === 'third_party') {
            $('.solicitor_div').show();
        } else {
            $('.solicitor_div').hide();
        }

        var selectedValue = $('#patient_id').val();

        if (selectedValue) {
            var url = '/private-clinic/global-accounts/get-patient-data/' + selectedValue;

            $.ajax({
                url: url,
                type: 'GET',
                success: function (response) {
                    if (response.error) {
                        console.error('Error fetching patient data:', response.error);
                        return;
                    }

                    var responseData = response.patientData;
                    var solicitor = response.solicitor;
                    var insurance_detail = response?.insurance_detail ?? "";
                    var id = responseData.id;
                    var address_line_1 = responseData.address;
                    var address_line_2 = responseData.address_line_2;
                    var address_line_3 = responseData.address_line_3;
                    var zipcode = responseData.zipcode;
                    var insurance_company = responseData.insurance_company;
                    var insurance_company_plan = responseData.insurance_company_plan;
                    var insurance_no = responseData.insurance_no;
                    var solicitor_name = solicitor?.display_name ?? "Solicitor not found";
                    var solicitor_id = solicitor?.id ?? "Solicitor not found";
                    var solicitor_address_1 = solicitor?.address_1 ?? "";
                    var solicitor_address_2 = solicitor?.address_2 ?? "";
                    var solicitor_address_3 = solicitor?.address_3 ?? "";
                    var solicitor_zipcode = solicitor?.zipcode ?? "";
                    var insuranceCompany = insurance_detail.name;
                    combined_address = address_line_1 + " " + address_line_2 + " " + address_line_3 + ", " + zipcode;
                    combined_solicitor_address = solicitor_address_1 + " " + solicitor_address_2 + " " + solicitor_address_3 + ", " + solicitor_zipcode;

                    // console.log(insurance_detail.name);

                    $('#patient_id').val(id);
                    $('#patient_id_hidden').val(id);
                    $('#patient_address').val(combined_address);
                    $('#insurance_number').val(insurance_no);
                    $('#insurance_company').val(insurance_company).prop('disabled', false).trigger('change');
                    $('#insurance_company').prop('disabled', true).trigger('change');
                    $('#solicitor_name').val(solicitor_name);
                    $('#solicitor_id').val(solicitor_id);
                    $('#solicitor_address').val(combined_solicitor_address);
                    // $('#insurance_company').val(insurance_company).prop('disabled', false).trigger('change');
                    // $('#insurance_company').val(insuranceCompany);
                },
                error: function (xhr, status, error) {
                    console.error('Error fetching patient data:', error);
                }
            });
        }

    });

    $('#bill_to').trigger('change');

    function parseNumberWithCommas(numberString) {
        const cleanedString = numberString.replace(/,/g, '');
        return parseFloat(cleanedString);
    }
    

    function formatNumberWithCommas(number) {
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "500",
        "timeOut": "3500",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    const balanceText = $('#invoice_balance').text();
    const totalBalance = parseNumberWithCommas(balanceText);
    const revertedBalance = $('#revertedBalance').val();
    var isreceiptSet = null;

    $('#invoice_amount').on('input', function () {
        let invoiceAmount = parseFloat($(this).val());
        if (isNaN(invoiceAmount)) {
            invoiceAmount = 0;
        }
        // if (invoiceAmount > totalBalance) {
        //     toastr.error("Amount cannot be more than the invoice balance", "Action Not Allowed");
        //     $(this).val(totalBalance);
        //     invoiceAmount = totalBalance;
        // }

        // console.log(isreceiptSet);
        isreceiptSet = $('#receipt_id').val();
        if (!isreceiptSet) {
            const updatedBalance = totalBalance - invoiceAmount;
            // isreceiptSet = $('#receipt_id').val();
            $('#remaining_balance').val(updatedBalance.toFixed(2));
            $('#invoice_balance').text(updatedBalance.toFixed(2));

            if (invoiceAmount > totalBalance) {
                toastr.error("Amount cannot be more than the invoice balance", "Action Not Allowed");
                $(this).val(totalBalance);
                invoiceAmount = totalBalance;
                $('#invoice_balance').text((0).toFixed(2));
            }

        }
        else {
            const updatedBalance = revertedBalance - invoiceAmount;
            $('#remaining_balance').val(updatedBalance.toFixed(2));
            $('#invoice_balance').text(updatedBalance.toFixed(2));

            if (invoiceAmount > revertedBalance) {
                toastr.error("Amount cannot be more than the invoice balance", "Action Not Allowed");
                $(this).val(revertedBalance);
                invoiceAmount = revertedBalance;
                $('#invoice_balance').text((0).toFixed(2));
                $('#invoice_amount').val(revertedBalance.toFixed(2));
            }
        }
    });

    $('#pay_full').on('click', function () {
        var isEdit = $('#isEdit').val();
        let invoiceAmount = parseFloat($('#invoice_amount').val());
        var editAmount = $('#editAmount').val();
        const editAmountNumber = parseFloat(editAmount);
        const validEditAmount = isNaN(editAmountNumber) ? 0 : editAmountNumber;
        const bText = parseFloat(balanceText);
        const updatedBalance = bText + validEditAmount;
        if (isEdit) {
            if (invoiceAmount > totalBalance) {
                toastr.error("Amount cannot be more than the invoice balance", "Action Not Allowed");
                $(this).val(totalBalance);
                invoiceAmount = totalBalance;
                $('#invoice_balance').text((0).toFixed(2));
            }
            else{

                $('#invoice_amount').val(updatedBalance.toFixed(2));
                $('#invoice_balance').text((0).toFixed(2));
                $('#remaining_balance').val((0).toFixed(2));
            }
        }
        else {
            if (invoiceAmount > totalBalance) {
                toastr.error("Amount cannot be more than the invoice balance", "Action Not Allowed");
                $(this).val(totalBalance);
                invoiceAmount = totalBalance;
                $('#invoice_balance').text((0).toFixed(2));
            }
            else{

                if (invoiceAmount <= totalBalance) {
                    $('#invoice_amount').val(totalBalance.toFixed(2));
                } else {
                    $('#invoice_amount').val(invoiceAmount.toFixed(2));
                }
                $('#invoice_balance').text((0).toFixed(2));
                $('#remaining_balance').val((0).toFixed(2));
            }
        }

    });

    $('#mode_of_payment').change(function () {
        // console.log("ho gaya");
        var selectedValue = $(this).val();
        if (selectedValue === "cheque") {
            $('.cheque_div').show();
            $('#cheque_date, #cheque_number, #bank_name').prop({
                disabled: false,
                required: true
            });
        } else {
            $('.cheque_div').hide();
            $('#cheque_date, #cheque_number, #bank_name').prop({
                disabled: true,
                required: false
            });
        }
    });


    function toggleChequeDiv() {
        if ($('#mode_of_payment').val() === 'cheque') {
            $('.cheque_div').show();
        } else {
            $('.cheque_div').hide();
        }
    }

    // Initial check on page load
    toggleChequeDiv();

    // Event listener for change event
    $('#mode_of_payment').change(function () {
        toggleChequeDiv();
    });



});



