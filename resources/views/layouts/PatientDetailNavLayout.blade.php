<style>
    input[type="checkbox"] {
        width: 1.4em;
        height: 1.4em;
    }

    .table td,
    th {
        border: none;
    }

    .w-20 {
        width: 20%;
    }

    .w-80 {
        width: 80%;
    }

    .table tr {
        margin: 0;
        padding: 0;
        border-spacing: 0;
    }

    .table td {
        padding: 0;
        margin: 0;
    }

    .font-14 {
        font-size: 14px;
    }

    .w-10 {
        width: 10%;
    }

    .w-15 {
        width: 15%;
    }

    .w-20 {
        width: 20%;
    }

    .w-30 {
        width: 30%;
    }

    .bg-custom {
        background-color: #7367f0 !important;
    }

    .bg-blue-dark {
        background-color: #f6f6f7
    }
    @media (min-width: 300px) and (max-width: 450px) {
    .btn {
        font-size: 5px;
        padding: 4px 5px;
        margin: 2px;
    }
}
@media (min-width: 450px) and (max-width: 600px) {
    .btn {
        font-size: 8px;
        padding: 4px 5px;
        margin: 2px;
    }
}
@media (min-width: 600px) and (max-width: 710px) {
    .btn {
        font-size: 10px;
        padding: 4px 5px;
        margin: 3px 3px;
    }
}
@media (min-width: 710px) and (max-width: 850px) {
    .btn {
        font-size: 14px;
        padding: 4px 5px;
        margin: 3px 3px;
    }
}
@media (min-width: 850px) and (max-width: 1200px) {
    .btn {
            font-size: 15px;
            padding: 6px 10px 4px 10px;
            margin: 4px 4px;
        }
}
</style>
<div id="profile_{{ $patient['id'] }}" class="col-xl-12 col-lg-12 col-md-12 order-0 order-md-1 patient-detail-child-nav">
    <div class="card px-lg-3  py-1 mb-1 mt-0">
        <div class="">
            <div class="card-body p-0">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb d-flex flex-nowrap text-nowrap mb-0 mx-sm-1">
                        <li class="">
                            <a class='btn btn-outline-primary waves-effect waves-light btn-lg text-nowrap'
                                href="{{ url('/private-clinic/patient/profile-view/' . $patient['id']) }}">Patient
                                Details</a>
                        </li>
                        <li class="">
                            <a class='btn btn-outline-primary waves-effect waves-light mx-lg-1 btn-lg text-nowrap'
                                href="{{ url('/private-clinic/patient/personal-history/get/' . $patient['id']) }}">Personal
                                History</a>
                        </li>
                        <li class=""><a
                                class='btn btn-outline-primary waves-effect waves-light mx-lg-1 btn-lg text-nowrap'
                                href="{{ url('/private-clinic/patient/patient-medical-history/get/' . $patient['id']) }}">Medical
                                History</a></li>
                        <li class=""><a
                                class='btn btn-outline-primary waves-effect waves-light mx-lg-1 btn-lg text-nowrap'
                                href="{{ url('/private-clinic/patient/examination-history/get/' . $patient['id']) }}">Examination
                                History</a></li>
                        <div class="ms-auto ">
                            <button type="button" class="btn btn-secondary px-lg-3 px-50 " data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop">Export Patient</button>
                        </div>
                    </ol>
                </nav>

            </div>

        </div>
    </div>
    <!-- /Activity Timeline -->
</div>
<!-- Modal -->
<div class="modal fade  " id="staticBackdrop" aria-hidden="true" aria-labelledby="exampleModalLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-custom">
                <div class="text-center ms-auto">
                    <h5 class="modal-title ms-auto text-white fw-bolder" id="exampleModalLabel">Patient Report</h5>
                </div>
                <button class="btn-close" data-bs-dismiss="modal" type="button" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-check my-2 ">
                    <input class="form-check-input align-self-center" id="patienthistory" name="recordType"
                        type="checkbox">
                    <label class="fs-5 align-self-center" for="patienthistory">Patient History</label>
                </div>
                <div class="form-check my-2">
                    <input class="form-check-input align-self-center" id="appointment" name="recordType"
                        type="checkbox">
                    <label class="fs-5 align-self-center" for="appointment">Appointment</label>
                </div>
                <div class="form-check my-2">
                    <input class="form-check-input align-self-center" id="accounts" name="recordType" type="checkbox">
                    <label class="fs-5 align-self-center" for="accounts">Accounts</label>
                </div>
                <div class="form-check my-2">
                    <input class="form-check-input align-self-center" id="prescriptions" name="recordType"
                        type="checkbox">
                    <label class="fs-5 align-self-center" for="prescriptions">Prescriptions</label>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary" id="print" type="button">Print</button>
                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Cancel</button>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function() {

        var tabs = document.querySelectorAll('.patient-detail-child-nav a');

        tabs.forEach(function(tab) {
            var href = tab.getAttribute('href'); // Get href attribute
            var page_path = '//' + window.location.host + window.location.pathname;

            // Compare href with window.location.pathname
            if (page_path == href) {
                tab.classList.add('btn-primary');
            } else {
                tab.classList.add('btn-outline-primary');
            }
        });

        document.getElementById("print").onclick = function() {
            var url = window.location.href; // Get the full URL
            var segments = url.split('/'); // Split the URL by '/'
            var patientId = segments.pop();
            $('#staticBackdrop .btn-secondary').hide();
            // Get the last segment which is the
            var isPatienthistory = $('#patienthistory').is(':checked');

            var isAppointment = $('#appointment').is(':checked');

            var isAccounts = $('#accounts').is(':checked');

            var isPrescriptions = $('#prescriptions').is(':checked');

            const routeUrl = '/private-clinic/patient/patientdetailreport/' + patientId + '/' +
                isPatienthistory + '/' + isAppointment + '/' + isAccounts + '/' +
                isPrescriptions; // Update this with your actual route
            window.open(routeUrl, '_blank');
            $('#patienthistory').prop('checked', false);
            $('#appointment').prop('checked', false);
            $('#accounts').prop('checked', false);
            $('#prescriptions').prop('checked', false);

            $('#staticBackdrop .btn-close').click();
        };
    });



    $(function($) {
        let url = window.location.href;
        $('.patient-detail-child-nav ol.breadcrumb li a').each(function() {
            if (this.href === url) {
                $(this).addClass('active');
            }
        });
    });
</script>
