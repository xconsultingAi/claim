<!-- BEGIN: Vendor CSS-->
@if ($configData['direction'] === 'rtl' && isset($configData['direction']))
<link rel="stylesheet" href="{{ asset(mix('vendors/css/vendors-rtl.min.css')) }}" />
@else
<link rel="stylesheet" href="{{ asset(mix('vendors/css/vendors.min.css')) }}" />
@endif

@yield('vendor-style')
<!-- END: Vendor CSS-->
<style>
  div.dataTables_wrapper div.dataTables_filter label, div.dataTables_wrapper div.dataTables_length label {
    display: block ruby !important;
  }
  /* A Frontend CSS */

.dataTables_length label {
    display: block ruby !important;
}

.dataTables_filter label {
    display: block ruby;
}

.dataTables_filter label input {
    width: 75%;
}
/* .fc .fc-daygrid-day-number {
  font-weight: bold;
} */
.fc .fc-daygrid-day.fc-day-today {
    background: rgba(115, 103, 240, 0.2) !important;
    background-color: rgba(115, 103, 240, 0.1) !important;
    border-color: #7367f0 !important;
}

.fc-day-today .fc-daygrid-day-number {
    font-weight: bold;
    /* font-size:1.2em; */
    color: #7367f0 !important;
}

.app-calendar .fc-day-past .fc-daygrid-day-number,
.app-calendar .fc-day-future .fc-daygrid-day-number {
    color: #5c5470 !important;
}

#calendar .fc .fc-view-harness {
      min-height: auto !important;
      height: auto !important;
      overflow-y: auto !important;
    } 



 /* Large devices (desktops, 992px and up)  */
 @media (min-width: 768px) and (max-width: 991.98px) {
  #calendar .fc .fc-view-harness {
      min-height: auto !important;
      height: auto !important;
      overflow-y: auto !important;
    } 
    .fc .fc-view-harness {
      min-height: 500px !important;
      height: 500px !important;
    }
  }

  /* X-Large devices (large desktops, 1200px and up)  */
  @media (min-width: 992px) and (max-width: 1199.98px) {
    
    #calendar .fc .fc-view-harness {
      min-height: auto !important;
      height: auto !important;
      overflow-y: auto !important;
    } 
    .fc .fc-view-harness {
      min-height: 550px !important;
      height: 550px !important;
    }
  }

  /* X-Large devices (large desktops, 1200px and up)  */
  @media (min-width: 1200px) and (max-width: 1399.98px) {
    #calendar .fc .fc-view-harness {
      min-height: auto !important;
      height: auto !important;
      overflow-y: auto !important;
    } 
    .fc .fc-view-harness {
      min-height: 550px !important;
      height: 550px !important;
    }

  }


  /* XX-Large devices (larger desktops, 1400px and up)  */
  @media (min-width: 1400px) and (max-width: 1599.98px) {
    #calendar .fc .fc-view-harness {
      min-height: auto !important;
      height: auto !important;
      overflow-y: auto !important;
    } 
    .fc .fc-view-harness {
      min-height: 650px !important;
      height: 650px !important;
    }
  }

  /* XX-Large devices (larger desktops, 1400px and up)  */
  @media (min-width: 1600px) and (max-width: 1999.98px) {
    #calendar .fc-view-harness {
      /* min-height: auto !important;
      height: auto !important; */
      overflow-y: auto !important;
    } 
    .fc .fc-view-harness {
      min-height: 600px !important;
      height: 600px !important;
    }
  }

  @media (min-width: 1900px) {
    #calendar .fc-view-harness {
      /* min-height: auto !important;
      height: auto !important; */
      overflow-y: auto !important;
    } 
    .fc .fc-view-harness {
      min-height: 600px !important;
      height: 600px !important;
    }
  }
</style>
<!-- BEGIN: Theme CSS-->
<link rel="stylesheet" href="{{ asset(mix('css/core.css')) }}" />
<link rel="stylesheet" href="{{ asset(mix('css/base/themes/dark-layout.css')) }}" />
<link rel="stylesheet" href="{{ asset(mix('css/base/themes/bordered-layout.css')) }}" />
<link rel="stylesheet" href="{{ asset(mix('css/base/themes/semi-dark-layout.css')) }}" />

@php $configData = Helper::applClasses(); @endphp

<!-- BEGIN: Page CSS-->
@if ($configData['mainLayoutType'] === 'horizontal')
<link rel="stylesheet" href="{{ asset(mix('css/base/core/menu/menu-types/horizontal-menu.css')) }}" />
@else
<link rel="stylesheet" href="{{ asset(mix('css/base/core/menu/menu-types/vertical-menu.css')) }}" />
@endif

{{-- Page Styles --}}
@yield('page-style')

<!-- laravel style -->
<link rel="stylesheet" href="{{ asset(mix('css/overrides.css')) }}" />

<!-- BEGIN: Custom CSS-->

@if ($configData['direction'] === 'rtl' && isset($configData['direction']))
<link rel="stylesheet" href="{{ asset(mix('css-rtl/custom-rtl.css')) }}" />
<link rel="stylesheet" href="{{ asset(mix('css-rtl/style-rtl.css')) }}" />

@else
{{-- user custom styles --}}
<link rel="stylesheet" href="{{ asset(mix('css/style.css')) }}" />
@endif