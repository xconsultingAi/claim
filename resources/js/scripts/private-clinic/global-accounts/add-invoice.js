/*=========================================================================================
  File Name: create.js
  Description: Auth register js file.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
var patient_id = $('#patient_id_hidden').val();

$(function () {
    ('use strict');
    var assetPath = '../../../app-assets/',
        userView = 'app-user-view-account.html';
    var baseurl = window.location.origin;
    var invoice_date = $('#invoice_date');
    var insurance_div = $('#insurance_div');
    var solicitor_div = $('#solicitor_div');
    var tableBody = $('#procedure_table tbody');
    var patient_name = $('#patient_name');
 


    $('#bill_to').change(function () {
        var selectedOption = $(this).val();
        if (selectedOption === "insurance_company") {
            insurance_div.show();
        } else {
            insurance_div.hide();
            
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
            var waivedamountText = $(this).find('td:nth-child(5) input').val();
            var waivedamount = parseFloat(waivedamountText);
            // var waivedamount = parseFloat(waivedamountText.replace('€', ''));
            waived_amount.push(waivedamount);

            // console.log(waivedamountText);
        });


        return waived_amount;
    }

    if ($('body').attr('data-framework') === 'laravel') {
        assetPath = $('body').attr('data-asset-path');
        userView = assetPath + 'app/user/view/account';
    }



    if (invoice_date.length) {
        var invoice_date = invoice_date.flatpickr({
            enableTime: false,
            altFormat: 'Y-m-d',
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
                    patient_id = $('#patient_id').val();
                var invoice_id = $("#invoiceID").val();
                var route = 'private-clinic/global-accounts/';
                var routeforsave = 'private-clinic/global-accounts/save/';
                var routeforsaveandpay = 'private-clinic/global-accounts/saveandpay/';
                var routeforupdate = 'private-clinic/global-accounts/update/';
                var routeforupdateandpay = 'private-clinic/global-accounts/updateandpay/';
                var url = assetPath + route;
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
                    url = assetPath + routeforsave + patient_id;
                } else if (clickedButtonId === 'btn_save_pay') {
                    url = assetPath + routeforsave + patient_id;
                }
                else if (clickedButtonId === 'btn_update' || clickedButtonId === 'btn_update_pay') {
                    method = 'PUT';
                    url = assetPath + routeforupdate + patient_id + '/' + invoice_id; 
                }
                // else if (clickedButtonId === 'btn_update_pay') {
                //     method = 'PUT';
                //     url = assetPath + routeforupdateandpay + patient_id + '/' + invoice_id; 
                // }


                $.ajax({
                    url: url,
                    method: method,
                    data: formData,
                    // data:  idsString,
                    // data: mergeFormDataWithIDs(formData, ids),
                    // data: { ids: idsString },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (response) {

                        // console.log(response.data.patient_id);return;
                        let invID = response.data.id;
                        console.log(invID);

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
                            // console.log(response.data.id);
                            Swal.fire(swalConfig).then(function (result) {
                                if (clickedButtonId === 'btn_update' || clickedButtonId === 'btn_save'){
                                   if(clickedButtonId === 'btn_save')
                                    {
                                        
                                        Swal.fire({
                                            title: "Do you want to print this Invoice?",
                                            text: "This will redirect to the print page!",
                                            icon: "question",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Yes, print it!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                            
                                            //  console.log(letter_id); baseurl + '/private-clinic/patient/patient-accounts/invoice-print/' + patient_id + '/' + invoice_id
                                            // window.location.href = baseurl + '/private-clinic/patient/patient-accounts/invoice-print/' + response.data.patient_id + '/' + response.data.id
                            
                                            window.open(baseurl + '/private-clinic/patient/patient-accounts/invoice-print/' + response.data.patient_id + '/' + response.data.id, '_blank');

                                            setTimeout(function() {
                                                window.location.href = '/private-clinic/global-accounts/get';
                                            }, 3500);
                                            
                                            }
                                            else {
                                                window.location.href = '/private-clinic/global-accounts/get';
                                            }
                                        });
                                        
                                    } 
                                    else if(clickedButtonId === 'btn_update')
                                        {
                                            Swal.fire({
                                                title: "Do you want to print this Invoice?",
                                                text: "This will redirect to the print page!",
                                                icon: "question",
                                                showCancelButton: true,
                                                confirmButtonColor: "#3085d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText: "Yes, print it!"
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                
                                                //  console.log(letter_id);
                                                // window.location.href = baseurl + '/private-clinic/patient/patient-letters/print/' + patient_id + '/' + letter_id + '?templateid=' + template_id
                                
                                                window.open(baseurl + '/private-clinic/patient/patient-accounts/invoice-print/' + response.data.patient_id + '/' + response.data.id, '_blank');

                                                setTimeout(function() {
                                                    window.location.href = '/private-clinic/global-accounts/get';
                                                }, 3500);
                                                

                                                }
                                                else {
                                                    window.location.href = '/private-clinic/global-accounts/get';
                                                }
                                            });
                                        }
                                
                                }
                                else if (clickedButtonId === 'btn_update_pay'  || clickedButtonId === 'btn_save_pay' ){
                                    if(clickedButtonId === 'btn_update_pay')
                                        {
                                            window.location.href = assetPath + 'private-clinic/global-accounts/create-receipt/' + response.data.patient_id + '/' + response.data.id;
                                        }
                                        else if (clickedButtonId === 'btn_save_pay' )
                                        {
                                            // console.log(response.data.id);return;
                                             window.location.href = assetPath + 'private-clinic/global-accounts/create-receipt/' + patient_id + '/' + response.data.id;
                                        }
                                    
                                }
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
    $('#patient_name').select2();
    $('#insurance_company').select2();
    $('#bill_to').select2();
    $('#income_category').select2();
    $('#Procedure_list').DataTable();

});

$(document).ready(function () {

    var totalAmount = 0;
    var totaldiscount = 0;
    var removedOptions = [];
    var is_insurance = false;
    
    $("#bill_to").trigger('change');
    $("#patient_name").trigger('change');

    $("#bill_to").on('change', function() {
        var selectedValue = $(this).val();
    
        if(selectedValue === "insurance_company")
        {
            is_insurance = true;
        }
        else
        {
            is_insurance = false;
        }
        // var selectedText = $(this).find("option:selected").text();
    
        // console.log("Selected Value: ", selectedValue);
        // console.log("Selected Text: ", selectedText);
    });

    //--------------------------------------------------
    //              Load Procedure in Edit - START
    //--------------------------------------------------
    procedureID = $("#procedure_ids").val();
    waivedAmountfromdb = $("#waivedAmountfromdb").val();
    var baseurl = window.location.origin;
 


    if (procedureID != '') {
        var procedureIDs = procedureID.split(',');
        var waivedAmountfromdb = waivedAmountfromdb.split(',');
        var promises = [];
    
        $.each(procedureIDs, function (index, value) {
            var id = value;
            // Store each promise
            promises.push(getProcedureInfo(id));
        });
    
        // Handle all promises
        Promise.all(promises)
            .then(results => {
                $.each(results, function (index, result) {
                    var id = procedureIDs[index];
                    var waivedAmount = waivedAmountfromdb[index];
                    var code = result.data.code;
                    var name = result.data.name;
                    var price =  result.price;
                    addRowToTable(id, code, name, price, waivedAmount);
                });
    
                $('#procedure_table').show();
                $('#btn_clear_all').show();
                $('#btn_save_pay').show();
                $('#btn_save').show();
                $('#btn_update').show();
                $('#btn_update_pay').show();
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    function getProcedureInfo(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: baseurl + '/private-clinic/global-accounts/get-procedure-info/' + id,
                type: 'GET',
                data: { procedure_id: id },
                success: function (response) {
                    if (response.status == 'success') {
                        resolve({
                            data: response.data,
                            price: response.price
                        });
                    } else {
                        reject('Error fetching procedure data: ' + response.message);
                    }
                },
                error: function (xhr, status, error) {
                    reject('Error fetching procedure data: ' + xhr.status + ' ' + xhr.statusText + ' ' + error);
                }
            });
        });
    }
    

    //--------------------------------------------------
    //              Load Procedure in Edit - END
    //--------------------------------------------------

    function addRowToTable(id, code, name, price, waived) {
        var overall_discount = $('#overall_discount').val();
        var discount = 0.00;
        var after_tax = null;
        var deduct_tax = $("#deduct_tax").val();
        var waivedAmountfromdb = (waived !== undefined) ? waived : overall_discount;
        // var inputValue = (waivedAmountfromdb !== null && waivedAmountfromdb !== "") ? waivedAmountfromdb : overall_discount;
        var inputValue = (waivedAmountfromdb !== null && waivedAmountfromdb !== "" && !isNaN(waivedAmountfromdb)) ? parseFloat(waivedAmountfromdb) : (overall_discount !== null && overall_discount !== "" && !isNaN(overall_discount)) ? parseFloat(overall_discount) : 0;

        if (overall_discount !== null && overall_discount !== "") {
            discount = overall_discount;
        }

        if(is_insurance && deduct_tax === "1")
        {
            var tax = $("#tax").val();
            var total_tax = $("#total_tax").val();
            var tax_in_percent = price * (tax/100);
            var currentTotalTax = parseFloat($("#total_tax").val()) || 0;
            var newTotalTax = currentTotalTax + tax_in_percent;
            // console.log(tax_in_percent);
             after_tax = price - tax_in_percent;
            $("#total_tax").val(newTotalTax);

        }
        else
        {
            var after_tax = price;
        }



        var row = '<tr>' +
            '<td>' + id + '</td>' +
            '<td>' + code + '</td>' +
            '<td>' + name + '</td>' +
            '<td>€ ' + after_tax + '</td>' +
            // '<td> <input class="form-control" id="discount_text" type="text" value="€' + price + '"/></td>' +
            '<td>  ' + '<input class="form-control discount-input" name="totaldiscount[]" id="discount_text" type="text" value="' + inputValue + '" onchange="" /></td>' +
            //   '<td>€ ' + discount + '</td>' +
            '<td><button class="btn btn-danger btn-remove" id="deleteRowBtn">Delete</button></td>' +
            '</tr>';
        $('#procedure_table tbody').append(row);
        $('#procedure_table tbody tr.total-row').remove();
        $('#procedure_table tbody tr.payable-row').remove();

        // $('input.form-control').on('change', function() {
        //     console.log('test');
        //     totaldiscount   = calculateTotalDiscount();
        //   });

        $(document).on('change', '.discount-input', function () {
            var newValue = $(this).val();

            $('#procedure_table tbody tr.total-row').remove();
            $('#procedure_table tbody tr.payable-row').remove();

            totalAmount = calculateTotalAmount();
            totaldiscount = calculateTotalDiscount();
            payable_amount = totalAmount - totaldiscount;
            $('#balance').val(payable_amount.toFixed(2));

            var totalRow = '<tr class="total-row">' +
                '<td colspan="2"></td>' +
                '<td>Total:</td>' +
                '<td>€ ' + totalAmount + '</td>' +
                '<td>€ ' + totaldiscount.toFixed(2) + '</td>' +
                '</tr>';
            var payableRow = `
                    <tr class="payable-row">
                        <td colspan="2"></td>
                        <td>Payable amount:</td>
                        <td>€ `+ payable_amount.toFixed(2) + `</td>
                    </tr>
                `;
            $('#procedure_table tbody').append(totalRow);
            $('#procedure_table tbody').append(payableRow);

        });

        totalAmount = calculateTotalAmount();
        totaldiscount = calculateTotalDiscount();
        payable_amount = totalAmount - totaldiscount;
        $('#balance').val(payable_amount.toFixed(2));
        // console.log($('#balance').val());


        var totalRow = '<tr class="total-row">' +
            '<td colspan="2"></td>' +
            '<td>Total:</td>' +
            '<td>€ ' + totalAmount + '</td>' +
            '<td>€ ' + totaldiscount.toFixed(2) + '</td>' +
            '</tr>';
        var payableRow = `
                <tr class="payable-row">
                    <td colspan="2"></td>
                    <td>Payable amount:</td>
                    <td>€ `+ payable_amount.toFixed(2) + `</td>
                </tr>
            `;
        $('#procedure_table tbody').append(totalRow);
        $('#procedure_table tbody').append(payableRow);
    }

    function calculateTotalAmount() {
        var total = 0;
        $('#procedure_table tbody tr').each(function () {
            var price = parseFloat($(this).find('td:nth-child(4)').text().replace('€ ', ''));
            total += price;
        });
        return total.toFixed(2);
    }

    function calculateTotalDiscount() {
        // var total_waived = 0;
        // $('#procedure_table tbody tr').each(function() {
        //     var total_waivedprice = parseFloat($(this).find('td:nth-child(5) input').val().replace('€ ', ''));
        //     total_waived += total_waivedprice;
        // });
        // return total_waived.toFixed(2); 

        var totalDiscount = 0;
        $('#procedure_table tbody tr').each(function () {
            var discountValue = $(this).find('td:nth-child(5) input').val();
            if (discountValue !== '' && !isNaN(parseFloat(discountValue))) {
                totalDiscount += parseFloat(discountValue);
            }
        });
        // console.log(totalDiscount);
        return totalDiscount;

    }


    $('#patient_name').on('change', function() {
        var selectedValue = $('#patient_name').val();

        if (selectedValue) {
            var url = '/private-clinic/global-accounts/get-patient-data/' + selectedValue;

            $.ajax({
                url: url,
                type: 'GET',
                success: function(response) {
                    if (response.error) {
                        console.error('Error fetching patient data:', response.error);
                        return;
                    }

                    // var responseData            = response.patientData;
                    // var solicitor               = response.solicitor;
                    // var id                      = responseData.id;
                    // var address_line_1          = responseData.address;
                    // var address_line_2          = responseData.address_line_2;
                    // var address_line_3          = responseData.address_line_3;
                    // var zipcode                 = responseData.zipcode;
                    // var insurance_company       = responseData.insurance_company;
                    // var insurance_company_plan  = responseData.insurance_company_plan;
                    // var insurance_no            = responseData.insurance_no;
                    // var solicitor_name          = solicitor.display_name;
                    // var solicitor_id            = solicitor.id;
                    // var solicitor_address_1     = solicitor.address_1;
                    // var solicitor_address_2     = solicitor.address_2;
                    // var solicitor_address_3     = solicitor.address_3;
                    // var solicitor_zipcode       = solicitor.zipcode;

                    var responseData            = response.patientData;
                    var responseInsurance       = response.insurance_detail;
                    var solicitor               = response.solicitor || {}; // Default to an empty object if solicitor is null/undefined
                    var id                      = responseData.id;
                    var address_line_1          = responseData.address;
                    var address_line_2          = responseData.address_line_2;
                    var address_line_3          = responseData.address_line_3;
                    var zipcode                 = responseData.zipcode;
                    var insurance_company       = responseData.insurance_company;
                    var insurance_company_plan  = responseData.insurance_company_plan;
                    var insurance_no            = responseData.insurance_no;
                    var insurance_tax           = responseInsurance?.tax ?? 0.00;
                    var deduct_tax              = responseInsurance?.deduct_tax ?? 0.00;
                    var solicitor_name          = solicitor.display_name    || 'Solicitor not found';
                    var solicitor_id            = solicitor.id              || '';
                    var solicitor_address_1     = solicitor.address_1       || 'Address not available';
                    var solicitor_address_2     = solicitor.address_2       || '';
                    var solicitor_address_3     = solicitor.address_3       || '';
                    var solicitor_zipcode       = solicitor.zipcode         || 'Zipcode not available';
                    combined_address            = address_line_1 + " " + address_line_2 + " "  + address_line_3 + ", "  + zipcode;
                    combined_solicitor_address  = solicitor_address_1 + " " + solicitor_address_2 + " "  + solicitor_address_3 + ", "  + solicitor_zipcode;
                    
                    // console.log(responseInsurance?.deduct_tax ?? 0.00);

                    $('#patient_id').val(id);
                    $('#patient_id_hidden').val(id);
                    $('#patient_address').val(combined_address);
                    $('#insurance_number').val(insurance_no);
                    $('#tax').val(insurance_tax);
                    $('#deduct_tax').val(deduct_tax);
                    // $('#tax').val(insurance_tax).prop('disabled', false).trigger('change');
                    // $('#tax').prop('disabled', false).trigger('change');
                   

                    $('#insurance_company').val(insurance_company).prop('disabled', false).trigger('change');
                    $('#insurance_company').prop('disabled', true).trigger('change');
                    $('#solicitor_name').val(solicitor_name);
                    $('#solicitor_id').val(solicitor_id);
                    $('#solicitor_address').val(combined_solicitor_address);
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching patient data:', error);
                }
            });
        }
    });

    $('#patient_name').trigger('change');

    $('#procedure_select').change(function () {

        var selectedOption = $(this).find('option:selected');
        var id = selectedOption.val();
        var code = $(this).find('option:selected').data('code');
        var optionText = selectedOption.text();
        var lastHyphenIndex = optionText.lastIndexOf('-');
        var name = optionText.substring(0, lastHyphenIndex).trim();
        var priceText = optionText.substring(lastHyphenIndex + 1).trim();
        var price = parseFloat(priceText.replace('€', ''));
        var selectedOption = $(this).find('option:selected');
        // var selectedPrice                   = selectedOption.data('price');
        // addRowToTable(selectedOption.val(), selectedOption.text(), selectedPrice);
        // selectedOption.remove();
        addRowToTable(id, code, name, price);
        $('#procedure_table').show();
        $('#btn_clear_all').show();
        $('#btn_save_pay').show();
        $('#btn_save').show();
        $('#btn_update').show();
        $('#btn_update_pay').show();
        $(this).val('').trigger('change.select2');
        // removedOptions.push(selectedOption);
        var tableOffset = $('#procedure_table').offset().top;
        $('html, body').animate({
            scrollTop: tableOffset
        }, 500);
    });

    var totalAmount = 0;
    var totalDiscount = 0;

    $('#procedure_table').on('click', '.btn-remove', function () {
        var removedRow = $(this).closest('tr');
        var price = parseFloat(removedRow.find('td:nth-child(4)').text().replace('€ ', ''));
        var total_waivedprice = parseFloat(removedRow.find('td:nth-child(5)  input').val().replace('€', ''));
        var $rows = $(this).find('tbody tr').not('.total-row, .payable-row'); 

        if ($rows.length === 0) {
            $('#procedure_table tbody tr.total-row').remove();
            $('#procedure_table tbody tr.payable-row').remove();
        }
        // var total_waivedprice = parseFloat(removedRow.find('td:nth-child(5)').text().replace('$ ', ''));
        // var priceText = removedRow.find('td:nth-child(4)').text().trim(); // Get the text content and remove leading/trailing spaces
        // console.log("Price text:", priceText);
        // var price = parseFloat(priceText.replace('$', '').trim());
        // console.log(price);
        removedRow.remove();
        updateTotalAmount(-price, -total_waivedprice);

        // if (removedOptions.length > 0) {
        //     var restoredOption = removedOptions.pop();
        //     $('#procedure_select').append(restoredOption);
        //     $('#procedure_select').trigger('change.select2');
        // }

        if ($('#procedure_table tbody tr:not(.total-row, .payable-row)').length === 0) {
            $('#procedure_table').hide();
            $('#btn_clear_all').hide();
            $('#btn_save_pay').hide();
            $('#btn_save').hide();
            $('#btn_update_pay').hide();
            $('#btn_update').hide();
        }
    });


    $('#procedure_select').on('mousedown', 'option', function () {
        removedOptionData = {
            value: $(this).val(),
            text: $(this).text()
        };
    });


    function updateTotalAmount(change, discount) {
        totalAmount = parseFloat(totalAmount) + change;
        totaldiscount = parseFloat(totaldiscount) + discount;

        var payable_amount = totalAmount - totaldiscount;
        $('#balance').val(payable_amount.toFixed(2));
        // console.log(totalDiscount);
        // console.log(typeof totalAmount);
        // if ($('.total-row').length === 0) {
        //     $('#procedure_table tbody').append(
        //         '<tr class="total-row"><td colspan="2"></td><td>Total:</td><td></td></tr> <tr class="payable-row"><td colspan="2"></td><td>Payable amount:</td><td></td></tr>'

        //     );
        // }

        if ($('.total-row').length === 0) {
            $('#procedure_table tbody').append(`
                <tr class="total-row">
                    <td colspan="2"></td>
                    <td>Total:</td>
                    <td></td>
                </tr>
            `);
        }

        if ($('.payable-row').length === 0) {
            $('#procedure_table tbody').append(`
                <tr class="payable-row">
                    <td colspan="2"></td>
                    <td>Payable amount:</td>
                    <td></td>
                </tr>
            `);
        }

        $('.total-row td:nth-child(3)').text('€ ' + totalAmount.toFixed(2));
        $('.total-row td:nth-child(4)').text('€ ' + totaldiscount.toFixed(2));
        $('.payable-row td:nth-child(3)').text('€ ' + payable_amount.toFixed(2));
    }


    $('#btn_clear_all').on('click', function (event) {
        event.preventDefault();
        $('#procedure_table tbody').empty();
        $('#btn_clear_all').hide();
        $('#btn_save_pay').hide();
        $('#btn_save').hide();
        $('#procedure_table').hide();
        $('#btn_update_pay').hide();
        $('#btn_update').hide();

    });
   
  // Prevent form Enter to delete the row
    $('#procedure_table').on('keypress', '#discount_text', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });

   
   

    function toggleChequeDiv() {
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
    }

    // Initial check on page load
    toggleChequeDiv();

    // Event listener for change event
    $('#bill_to').change(function () {
        toggleChequeDiv();
    });

  
});


