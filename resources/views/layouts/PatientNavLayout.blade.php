<style>
  .quick-add {
    color: #7367f0 !important;
  }

  .quick-add:hover {
    color: #7367f0 !important;
    font-weight: 600;
  }

  @media only screen and (max-width: 600px) {
    .nav-pills .nav-link {
      padding: 0.4rem 1rem;
      font-size: 13px;
      /* line-height: 1rem; */
      /* border: 1px solid transparent; */
      color: #5e5873;
    }
  }

  @media only screen and (min-width: 1200px) and (max-width: 1300px) {
    .nav-pills .nav-link {
      padding: 0.4rem 0.4rem;
      font-size: 11px;
      color: #5e5873;
    }
    .btn-outline-primary{
      font-size: 11px!important;
      padding: 5px!important;
    }
  }
  @media only screen and (min-width: 1301px) and (max-width: 1570px) {
    .nav-pills .nav-link {
      padding: 0.4rem 0.7rem;
      font-size: 13px;
      color: #5e5873;
    }
    .btn-outline-primary{
      font-size: 11px!important;
      padding: 7px!important;
    }
  }
</style>
<div class="card mb-1 mt-0">
  <input type="hidden" id="patient_id" name="patient_id" value="{{$patient['id']}}" />

  <div class="card-header ">
    <!-- Nav Pills: Use flex utilities for better responsiveness -->
    <ul class="nav nav-pills flex-column flex-sm-row card-header-pills patient-details-navbar my-0 mx-lg-2">
      <li class="nav-item">
        <a class="nav-link active" href="{{url('/private-clinic/patient/profile-view/'.$patient['id'])}}">Details</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{url('/private-clinic/patient/prescription/'.$patient['id'])}}">Prescriptions</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{url('/private-clinic/patient/patient-appointment/show/'. $patient['id'])}}">Appointments</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{url('/private-clinic/patient/patient-clinical-notes/get/'.$patient['id'])}}">Notes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{url('/private-clinic/patient/scanned-document/get/'.$patient['id'])}}">Documents</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{url('/private-clinic/patient/forms/get/'. $patient['id'])}}">Forms</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{url('/private-clinic/patient/patient-letters/list/'. $patient['id'])}}">Letters</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{url('/private-clinic/patient/patient-accounts/get/'.$patient['id'])}}">Accounts &nbsp <span class="badge rounded-pill" style="background-color:#FF9900;">€ {{$balance}}</span></a>
      </li>
      <!-- </ul>
    <ul class="nav flex-column flex-sm-row mt-1 justify-content-end"> -->
      <li class="nav-item float-right">
        @if($gdpr->is_gdpr == 0)
        <button class="btn btn-outline-primary waves-effect waves-light btn-sm float-right" id="gdprButton" onclick="gdprButton()">Add GDPR</button>
        @elseif($gdpr->is_gdpr == 1)
        <button class="btn btn-outline-primary waves-effect waves-light btn-sm d-none" id="gdprButton" onclick="gdprButton()">Add GDPR</button>
        @endif
      </li>
      <li class="nav-item float-right ms-2">
        <button type="button" class="btn btn-outline-primary waves-effect waves-light btn-sm float-right" id="openModalBtn">Quick Add</button>
      </li>
    </ul>
  </div>

</div>

<!--------------modal------------>
<div class="modal fade" id="modalToggle" aria-labelledby="modalToggleLabel" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content px-3 py-3">
      <div class="modal-body text-center">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <h4 class="modal-title my-3" id="modalToggleLabel"><b>Quick Add</b></h4>
        <hr>
        <a class="quick-add" href="{{url('/private-clinic/patient/prescription/create/'.$patient['id'])}}">Prescription</a>
        <hr>
        <a class="quick-add" href="{{url('/private-clinic/patient/patient-appointment/create-appointment/'.$patient['id'])}}">Appointments</a>
        <hr>
        <a class="quick-add" href="{{url('/private-clinic/patient/patient-clinical-notes/create/'.$patient['id'])}}">Notes</a>
        <hr>
        <a class="quick-add" href="{{url('/private-clinic/patient/scanned-document/create/'.$patient['id'])}}">Documents</a>
        <hr>
        <a class="quick-add" href="{{url('/private-clinic/patient/forms/create/'. $patient['id'])}}">Forms</a>
        <hr>
        <a class="quick-add" href="{{url('private-clinic/patient/patient-letters/create/'. $patient['id'])}}">Letters</a>
        <hr>
      </div>

    </div>
  </div>
</div>

<script src="{{ asset(mix('vendors/js/jquery/jquery.min.js')) }}"></script>

<!---------------------End Modal-------------------->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="{{ asset(mix('vendors/js/jquery/jquery.min.js')) }}"></script>
<script>
  $(document).ready(function() {
    $('#openModalBtn').click(function() {
      $('#modalToggle').modal('show');
    });
  });
</script>
<!-- Include Bootstrap JavaScript and jQuery -->

<script>
  var tabs = document.querySelectorAll('.patient-details-navbar a');

  tabs.forEach(function(tab) {
    var href = tab.getAttribute('href'); // Get href attribute
    var page_path = '//' + window.location.host + window.location.pathname;

    // Compare href with window.location.pathname
    if (page_path == href) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });



  $(function($) {
    let url = window.location.href;
    $('ul.patient-details-navbar li a').each(function() {
      if (this.href === url) {
        $(this).addClass('active');
      }
    });
  });

  function gdprButton() {
    var isGdpr = 1;
    $('#is_gdpr').val(isGdpr);
    console.log('GDPR button clicked, is_gdpr set to:', isGdpr);
    var patientId = $('#patient_id').val();
    var url = "/private-clinic/patient/scanned-document/create/" + patientId + "?is_gdpr=" + isGdpr;
    window.location.href = url;
  }
</script>