<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\PatientInvestigation;
use App\Models\PatientProcedure;
use App\Models\PatientVisit;
use App\Models\Prescriptions;
use App\Models\PatientVisitPrice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;



class DashboardController extends Controller
{
  // Dashboard - Analytics
  public function dashboardAnalytics()
  {
    $pageConfigs = ['pageHeader' => false];
    return view('/content/dashboard/dashboard-analytics', ['pageConfigs' => $pageConfigs]);
  }

  // Dashboard - Ecommerce
  public function dashboardEcommerce()
  {
    $pageConfigs = ['pageHeader' => false];

    return view('/content/dashboard/dashboard-ecommerce', ['pageConfigs' => $pageConfigs]);
  }

    // Dashboard used for hospital
    public function index()
    {
      $pageConfigs = ['pageHeader' => false];
      return view('/dashboard/index', ['pageConfigs' => $pageConfigs]);
    }

    public function patientsAttended(Request $request)
    {    
       
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = $startDate . ' 00:00:00';
        $endDate = $endDate . ' 23:59:59';
        
        $countCB = PatientVisit::CbBranch()
        ->Hms()
        ->NotPending()
        ->whereBetween('created_at',[$startDate, $endDate])
        ->whereHas('patientType', function($query){
          $query->wherein('slug', getCBPatientType());
        })
        ->count();
      $countNonCB = PatientVisit::CbBranch()
        ->Hms()
        ->NotPending()
        ->whereBetween('created_at', [$startDate, $endDate])
        ->whereHas('patientType', function($query){
          $query->whereNotin('slug',   getCBPatientType());
        })
        ->count();

      return response()->json([
        'cb_count' => $countCB,
        'non_cb_count' => $countNonCB
      ]);
    }

    public function patientsAttendedGohawa(Request $request)
    {
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = $startDate . ' 00:00:00';
        $endDate = $endDate . ' 23:59:59';

        $countCB = PatientVisit::GohawaBranch()
        ->Hms()
        ->NotPending()
        ->whereBetween('created_at',[$startDate, $endDate])
        ->whereHas('patientType', function($query){
          $query->wherein('slug', getCBPatientType());
        })->count();

      $countNonCB = PatientVisit::GohawaBranch()
        ->Hms()
        ->NotPending()
        ->whereBetween('created_at',[$startDate, $endDate])
        ->whereHas('patientType', function($query){
          $query->whereNotin('slug',   getCBPatientType());
        })->count();

      return response()->json([
        'cb_count' => $countCB,
        'non_cb_count' => $countNonCB
      ]);
    }

    public function patientsAttendedNadirabad(Request $request)
    {
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = $startDate . ' 00:00:00';
        $endDate = $endDate . ' 23:59:59';

        $countCB = PatientVisit::NadirabadBranch()
        ->Hms()
        ->NotPending()
        ->whereBetween('created_at',[$startDate, $endDate])
        ->whereHas('patientType', function($query){
          $query->wherein('slug', getCBPatientType());
        })->count();

      $countNonCB = PatientVisit::NadirabadBranch()
        ->Hms()
        ->NotPending()
        ->whereBetween('created_at',[$startDate, $endDate])
        ->whereHas('patientType', function($query){
          $query->whereNotin('slug',   getCBPatientType());
        })->count();

      return response()->json([
        'cb_count' => $countCB,
        'non_cb_count' => $countNonCB
      ]);
    }

    public function patientsAttended28Bazar(Request $request)
    {
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = $startDate . ' 00:00:00';
        $endDate = $endDate . ' 23:59:59';
      $countCB = PatientVisit::Bazar28Branch()
        ->Hms()
        ->NotPending()
        ->whereBetween('created_at',[$startDate, $endDate])
        ->whereHas('patientType', function($query){
          $query->wherein('slug', getCBPatientType());
        })->count();

      $countNonCB = PatientVisit::Bazar28Branch()
        ->Hms()
        ->NotPending()
        ->whereBetween('created_at',[$startDate, $endDate])
        ->whereHas('patientType', function($query){
          $query->whereNotin('slug',   getCBPatientType());
        })->count();

      return response()->json([
        'cb_count' => $countCB,
        'non_cb_count' => $countNonCB
      ]);
    }

    public function patientsUnAttended(Request $request)
    {
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = $startDate . ' 00:00:00';
        $endDate = $endDate . ' 23:59:59';
        $countCB = PatientVisit::CbBranch()
        ->Hms()
        ->Pending()
        ->whereBetween('created_at', [$startDate, $endDate])
        ->whereHas('patientType', function($query){
          $query->wherein('slug', getCBPatientType());
        })->count();

      $countNonCB = PatientVisit::CbBranch()
        ->Hms()
        ->Pending()
        ->whereBetween('created_at', [$startDate, $endDate])
        ->whereHas('patientType', function($query){
          $query->whereNotin('slug',   getCBPatientType());
        })->count();

      return response()->json([
        'cb_count' => $countCB,
        'non_cb_count' => $countNonCB
      ]);
    }

    public function labTestsPerformed(Request $request)
    {
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = $startDate . ' 00:00:00';
        $endDate = $endDate . ' 23:59:59';
        $type = getCBPatientType();

      $countCB = PatientInvestigation::join('investigation', 'investigation.id', '=', 'patient_investigation.investigation_id')
        ->join('branch', 'branch.id', '=', 'patient_investigation.branch_id')
        ->join('prescriptions', 'prescriptions.id', '=', 'patient_investigation.prescription_id')
        ->join('patient_visit', 'patient_visit.id', '=', 'prescriptions.patient_visit_id')
        ->join('patients_type', 'patients_type.id', '=', 'patient_visit.patient_type_id')
        ->whereBetween('patient_visit.created_at', [$startDate, $endDate])
        ->wherein('patients_type.slug', $type)
        ->where('investigation.type', PATHIOLOGY)
        ->where('patient_investigation.status', COMPLETED)
        ->where('branch.name', CANNT_BRANCH)
        ->count();

      $countNonCB = PatientInvestigation::join('investigation', 'investigation.id', '=', 'patient_investigation.investigation_id')
        ->join('branch', 'branch.id', '=', 'patient_investigation.branch_id')
        ->join('prescriptions', 'prescriptions.id', '=', 'patient_investigation.prescription_id')
        ->join('patient_visit', 'patient_visit.id', '=', 'prescriptions.patient_visit_id')
        ->join('patients_type', 'patients_type.id', '=', 'patient_visit.patient_type_id')
        ->whereBetween('patient_visit.created_at', [$startDate, $endDate])
        ->whereNotin('patients_type.slug', $type)
        ->where('investigation.type', PATHIOLOGY)
        ->where('patient_investigation.status',COMPLETED)
        ->where('branch.name', CANNT_BRANCH)
        ->count();

      return response()->json([
        'cb_count' => $countCB,
        'non_cb_count' => $countNonCB
      ]);
    }

    public function radiologyScansPerformed(Request $request)
    {
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = $startDate . ' 00:00:00';
        $endDate = $endDate . ' 23:59:59';
        $type = getCBPatientType();
      $countCB = PatientInvestigation::join('investigation', 'investigation.id', '=', 'patient_investigation.investigation_id')
        ->join('branch', 'branch.id', '=', 'patient_investigation.branch_id')
        ->join('prescriptions', 'prescriptions.id', '=', 'patient_investigation.prescription_id')
        ->join('patient_visit', 'patient_visit.id', '=', 'prescriptions.patient_visit_id')
        ->join('patients_type', 'patients_type.id', '=', 'patient_visit.patient_type_id')
        ->whereBetween('patient_visit.created_at', [$startDate, $endDate])
        ->wherein('patients_type.slug', $type)
        ->where('investigation.type', RADIOLOGY)
        ->where('patient_investigation.status',COMPLETED)
        ->where('branch.name', CANNT_BRANCH)
        ->count();

      $countNonCB = PatientInvestigation::join('investigation', 'investigation.id', '=', 'patient_investigation.investigation_id')
        ->join('branch', 'branch.id', '=', 'patient_investigation.branch_id')
        ->join('prescriptions', 'prescriptions.id', '=', 'patient_investigation.prescription_id')
        ->join('patient_visit', 'patient_visit.id', '=', 'prescriptions.patient_visit_id')
        ->join('patients_type', 'patients_type.id', '=', 'patient_visit.patient_type_id')
        ->whereBetween('patient_visit.created_at', [$startDate, $endDate])
        ->whereNotin('patients_type.slug', $type)
        ->where('investigation.type', RADIOLOGY)
        ->where('patient_investigation.status',COMPLETED)
        ->where('branch.name', CANNT_BRANCH)
        ->count();

      return response()->json([
        'cb_count' => $countCB,
        'non_cb_count' => $countNonCB
      ]);
    }

    public function ecgPerformed(Request $request)
    {
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = $startDate . ' 00:00:00';
        $endDate = $endDate . ' 23:59:59';
        $type = getCBPatientType();

      $countCB = PatientInvestigation::join('investigation', 'investigation.id', '=', 'patient_investigation.investigation_id')
        ->join('branch', 'branch.id', '=', 'patient_investigation.branch_id')
        ->join('prescriptions', 'prescriptions.id', '=', 'patient_investigation.prescription_id')
        ->join('patient_visit', 'patient_visit.id', '=', 'prescriptions.patient_visit_id')
        ->join('patients_type', 'patients_type.id', '=', 'patient_visit.patient_type_id')
        ->whereBetween('patient_visit.created_at', [$startDate, $endDate])
        ->wherein('patients_type.slug', $type)
        ->where('investigation.type', PATHIOLOGY)
        ->where('investigation.name', ECG)
        ->where('patient_investigation.status', COMPLETED)
        ->where('branch.name', CANNT_BRANCH)
        ->count();

      $countNonCB = PatientInvestigation::join('investigation', 'investigation.id', '=', 'patient_investigation.investigation_id')
        ->join('branch', 'branch.id', '=', 'patient_investigation.branch_id')
        ->join('prescriptions', 'prescriptions.id', '=', 'patient_investigation.prescription_id')
        ->join('patient_visit', 'patient_visit.id', '=', 'prescriptions.patient_visit_id')
        ->join('patients_type', 'patients_type.id', '=', 'patient_visit.patient_type_id')
        ->whereBetween('patient_visit.created_at', [$startDate, $endDate])
        ->whereNotin('patients_type.slug', $type)
        ->where('investigation.type', PATHIOLOGY)
        ->where('investigation.name', ECG)
        ->where('patient_investigation.status', COMPLETED)
        ->where('branch.name', CANNT_BRANCH)
        ->count();

      return response()->json([
        'cb_count' => $countCB,
        'non_cb_count' => $countNonCB
      ]);
    }

    public function getDentalProcedure(Request $request)
    {
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = $startDate . ' 00:00:00';
        $endDate = $endDate . ' 23:59:59';
        $type = getCBPatientType();

      $countCB = PatientProcedure::join('procedures', 'procedures.id', '=', 'patient_procedure.procedure_id')
        ->join('branch', 'branch.id', '=', 'patient_procedure.branch_id')
        ->join('prescriptions', 'prescriptions.id', '=', 'patient_procedure.prescription_id')
        ->join('patient_visit', 'patient_visit.id', '=', 'prescriptions.patient_visit_id')
        ->join('patients_type', 'patients_type.id', '=', 'patient_visit.patient_type_id')
        ->whereBetween('patient_visit.created_at', [$startDate, $endDate])
        ->wherein('patients_type.slug', $type)
        ->where('procedures.type', DENTAL)
        ->where('patient_procedure.status', COMPLETED)
        ->where('branch.name', CANNT_BRANCH)
        ->count();
      
      $countNonCB =  PatientProcedure::join('procedures', 'procedures.id', '=', 'patient_procedure.procedure_id')
        ->join('branch', 'branch.id', '=', 'patient_procedure.branch_id')
        ->join('prescriptions', 'prescriptions.id', '=', 'patient_procedure.prescription_id')
        ->join('patient_visit', 'patient_visit.id', '=', 'prescriptions.patient_visit_id')
        ->join('patients_type', 'patients_type.id', '=', 'patient_visit.patient_type_id')
        ->whereBetween('patient_visit.created_at', [$startDate, $endDate])
        ->whereNotin('patients_type.slug', $type)
        ->where('procedures.type', DENTAL)
        ->where('patient_procedure.status', COMPLETED)
        ->where('branch.name', CANNT_BRANCH)
        ->count();

      return response()->json([
        'cb_count' => $countCB,
        'non_cb_count' => $countNonCB
      ]);
    }
    public function labTestsPerformedPrice(Request $request)
    {
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = "'" . $startDate . " 00:00:00'";
        $endDate = "'" . $endDate . " 23:59:59'";
        $type = 'pathiology';
        $CBtotal_paid_price = $this->patientInvestigationPriceCount($type, [1,3,5,6], $startDate, $endDate);
        $NonCBtotal_paid_price = $this->patientInvestigationPriceCount($type, [2,4], $startDate, $endDate);
      return response()->json([
        'cb_labTestsPrice' => $CBtotal_paid_price,
        'non_cb_labTestsPrice' => $NonCBtotal_paid_price
      ]);
    }
      public function labScansPerformedPrice(Request $request)
      {
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = "'" . $startDate . " 00:00:00'";
        $endDate = "'" . $endDate . " 23:59:59'";
        $type = 'radiology';
        $CBlabScans = $this->patientInvestigationPriceCount($type, [1,3,5,6], $startDate, $endDate);
        $NonCBlabScans = $this->patientInvestigationPriceCount($type, [2,4], $startDate, $endDate);
      return response()->json([
        'cb_labScansPrice' => $CBlabScans,
        'non_cb_labScansPrice' => $NonCBlabScans
      ]);
    }
      public function ECGPerformedPrice(Request $request)
      {
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = "'" . $startDate . " 00:00:00'";
        $endDate = "'" . $endDate . " 23:59:59'";
        $type = 'pathiology';
        $CBlabECG = $this->patientInvestigationECGPriceCount($type, [1,3,5,6], $startDate, $endDate);
        $NonCBlabECG = $this->patientInvestigationECGPriceCount($type, [2,4], $startDate, $endDate);
      return response()->json([
        'cb_labECGPrice' => $CBlabECG,
        'non_cb_labECGPrice' => $NonCBlabECG
      ]);
    }
    function patientInvestigationPriceCount($type, $patient_type_ids, $startDate, $endDate)
    {
      $investigationPrice = 0;
      $count = 0;
      $CBInvestigation = PatientInvestigation::JoinRelatedToInvestigationRecord($type, $patient_type_ids)
        ->whereRaw("prescriptions.created_at >= $startDate AND prescriptions.created_at <= $endDate")
        ->where('patient_investigation.status', COMPLETED)->get();
        if (count($CBInvestigation) > 0) {
        foreach ($CBInvestigation as $CBInvestigation) {
          if ($CBInvestigation['discount'] != null && $CBInvestigation['discount'] != '') {
            if ($CBInvestigation['price'] > 0) {
              $investigationPrice += ($CBInvestigation['price'] / 100) * $CBInvestigation['discount'];
            }
          } else {
            $investigationPrice += $CBInvestigation['price'];
          }
        }
      }
      return $investigationPrice;
    }
    function patientInvestigationECGPriceCount($type, $patient_type_ids, $startDate, $endDate)
    {
      $investigationPrice = 0;
      $count = 0;
      $CBInvestigation = PatientInvestigation::JoinRelatedToInvestigationRecordECG($type, $patient_type_ids)
        ->whereRaw("prescriptions.created_at >= $startDate AND prescriptions.created_at <= $endDate")
        ->where('patient_investigation.status', COMPLETED)->get();
        if (count($CBInvestigation) > 0) {
        foreach ($CBInvestigation as $CBInvestigation) {
          if ($CBInvestigation['discount'] != null && $CBInvestigation['discount'] != '') {
            if ($CBInvestigation['price'] > 0) {
              $investigationPrice += ($CBInvestigation['price'] / 100) * $CBInvestigation['discount'];
            }
          } else {
            $investigationPrice += $CBInvestigation['price'];
          }
        }
      }
      return $investigationPrice;
    }
    public function patientsFee(Request $request)
    {   
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = "'" . $startDate . " 00:00:00'";
        $endDate = "'" . $endDate . " 23:59:59'";
        $type = getCBPatientType();
        $countCB=0;
        $uncbPrince=0;
        $uncbPrinc=0;
        $countCBPrice=0;
        $CBInvestigation = PatientVisit::JoinWithPatientVisitPriceID($startDate, $endDate, [2,4],CANNT_BRANCH)->get();
        if (count($CBInvestigation) > 0) {
        foreach ($CBInvestigation as $CBInvestigation)
         {
            $uncbPrince=DB::select("SELECT patient_visit_price.price as price FROM patient_visit_price WHERE patient_type_id = ? AND clinical_service_id = ? AND department_type_id = ?", [
            $CBInvestigation['patient_type_id'],
            $CBInvestigation['clinical_service_type_id'],
            $CBInvestigation['department_type_id'], ]);
            $countCBPrice=preg_replace("/[^0-9.]/", "",$uncbPrince[0]->price);
            $priceString = $uncbPrince[0]->price;
            $priceString = preg_replace("/[^0-9.]/", "", $priceString);
            $priceInCents = (int)(floatval($priceString));
            if($priceInCents>0)
            {
              $uncbPrinc +=$priceInCents;    
                }
          }
        }
      return response()->json([
        'cb_CANNT' => $countCB,
        'non_cb_CANNT' => $uncbPrinc
      ]);
    }
    public function patientsFeeGOHAWA(Request $request)
    {    
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = "'" . $startDate . " 00:00:00'";
        $endDate = "'" . $endDate . " 23:59:59'";
        $type = getCBPatientType();
        $countCB=0;
        $uncbPrince=0;
        $uncbPrinc=0;
        $countCBPrice=0;
        $CBInvestigation = PatientVisit::JoinWithPatientVisitPriceID($startDate, $endDate, [2,4],GOHAWA_BRANCH)->get();
        if (count($CBInvestigation) > 0) {
        foreach ($CBInvestigation as $CBInvestigation)
        {
            $uncbPrince=DB::select("SELECT patient_visit_price.price as price FROM patient_visit_price WHERE patient_type_id = ? AND clinical_service_id = ? AND department_type_id = ?", [
            $CBInvestigation['patient_type_id'],
            $CBInvestigation['clinical_service_type_id'],
            $CBInvestigation['department_type_id'], ]); 
            $countCBPrice=preg_replace("/[^0-9.]/", "",$uncbPrince[0]->price);
            $priceString = $uncbPrince[0]->price;
            $priceString = preg_replace("/[^0-9.]/", "", $priceString);
            $priceInCents = (int)(floatval($priceString));
            if($priceInCents>0)
            {
              $uncbPrinc +=$priceInCents;  
            }
          }
        }
        return response()->json([
        'gOHAWA_cb' => $countCB,
        'gOHAWA_non_cb' => $uncbPrinc
        ]);
    }
    public function patientsFeeNADIRABAD(Request $request)
    {    
       
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = "'" . $startDate . " 00:00:00'";
        $endDate = "'" . $endDate . " 23:59:59'";
        $type = getCBPatientType();
        $countCB=0;
        $uncbPrince=0;
        $uncbPrinc=0;
        $countCBPrice=0;
        $CBInvestigation = PatientVisit::JoinWithPatientVisitPriceID($startDate, $endDate, [2,4],NADIRABAD_BRANCH)->get();
        if (count($CBInvestigation) > 0) {
        foreach ($CBInvestigation as $CBInvestigation)
        {
          $uncbPrince=DB::select("SELECT patient_visit_price.price as price FROM patient_visit_price WHERE patient_type_id = ? AND clinical_service_id = ? AND department_type_id = ?", [
          $CBInvestigation['patient_type_id'],
          $CBInvestigation['clinical_service_type_id'],
          $CBInvestigation['department_type_id'], ]);
          $countCBPrice=preg_replace("/[^0-9.]/", "",$uncbPrince[0]->price);
          $priceString = $uncbPrince[0]->price;
          $priceString = preg_replace("/[^0-9.]/", "", $priceString);
          $priceInCents = (int)(floatval($priceString));
          if($priceInCents>0)
            {
              $uncbPrinc +=$priceInCents;    
            }
          }
        }
        return response()->json([
        'cb_NADIRABAD' => $countCB,
        'non_cb_NADIRABAD' => $uncbPrinc
        ]);
      }
      public function patientsFee28Bazar(Request $request)
      {    
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = "'" . $startDate . " 00:00:00'";
        $endDate = "'" . $endDate . " 23:59:59'";
        $type = getCBPatientType();
        $countCB=0;
        $uncbPrince=0;
        $uncbPrinc=0;
        $countCBPrice=0;
        $CBInvestigation = PatientVisit::JoinWithPatientVisitPrice28Bazar($startDate, $endDate, [2,4],4)->get();
        if (count($CBInvestigation) > 0) {
        foreach ($CBInvestigation as $CBInvestigation)
        {
           $uncbPrince=DB::select("SELECT patient_visit_price.price as price FROM patient_visit_price WHERE patient_type_id = ? AND clinical_service_id = ? AND department_type_id = ?", [
           $CBInvestigation['patient_type_id'],
           $CBInvestigation['clinical_service_type_id'],
           $CBInvestigation['department_type_id'], ]);
           $countCBPrice=preg_replace("/[^0-9.]/", "",$uncbPrince[0]->price);
           $priceString = $uncbPrince[0]->price;
           $priceString = preg_replace("/[^0-9.]/", "", $priceString);
           $priceInCents = (int)(floatval($priceString));
          if($priceInCents>0)
          {
            $uncbPrinc +=$priceInCents;
                    
          }
        }
      }
      return response()->json([
        'cb_28Bazar' => $countCB,
        'non_cb_28Bazar' => $uncbPrinc
      ]);
    }
    public function patientsFeeSum(Request $request)
    {   
        $startDate = $request->start_date;
        $endDate = $request->end_date;
        $startDate = "'" . $startDate . " 00:00:00'";
        $endDate = "'" . $endDate . " 23:59:59'";
        $type = getCBPatientType();
        $types = 'pathiology';
        $typess = 'radiology';
        $uncbPrincCANNT=0;
        $uncbPrincGOHAWA=0;
        $uncbPrincNADIRABAD=0;
        $uncbPrinc28Bazar=0;
        $CBtotal_paid_price = $this->patientInvestigationPriceCount($types, [1,3,5,6], $startDate, $endDate);
        $NonCBtotal_paid_price = $this->patientInvestigationPriceCount($types, [2,4], $startDate, $endDate);
        $CBlabECG = $this->patientInvestigationECGPriceCount($types, [1,3,5,6], $startDate, $endDate);
        $NonCBlabECG = $this->patientInvestigationECGPriceCount($types, [2,4], $startDate, $endDate);
        $CBlabScans = $this->patientInvestigationPriceCount($typess, [1,3,5,6], $startDate, $endDate);
        $NonCBlabScans = $this->patientInvestigationPriceCount($typess, [2,4], $startDate, $endDate);
        $CBInvestigationCANNT = PatientVisit::JoinWithPatientVisitPriceID($startDate, $endDate, [2,4],CANNT_BRANCH)->get();
        if (count($CBInvestigationCANNT) > 0) {
        foreach ($CBInvestigationCANNT as $CBInvestigationCANNT)
        {
          $uncbPrinceCANNT=DB::select("SELECT patient_visit_price.price as price FROM patient_visit_price WHERE patient_type_id = ? AND clinical_service_id = ? AND department_type_id = ?", [
          $CBInvestigationCANNT['patient_type_id'],
          $CBInvestigationCANNT['clinical_service_type_id'],
          $CBInvestigationCANNT['department_type_id'], ]);
          $countCBPriceCANNT=preg_replace("/[^0-9.]/", "",$uncbPrinceCANNT[0]->price);
          $priceStringCANNT = $uncbPrinceCANNT[0]->price;
          $priceStringCANNT = preg_replace("/[^0-9.]/", "", $priceStringCANNT);  
          $priceInCentsCANNT = (int)(floatval($priceStringCANNT));
          if($priceInCentsCANNT>0)
          {
            $uncbPrincCANNT +=$priceInCentsCANNT;
          }
        }
      }
          $CBInvestigationGOHAWA = PatientVisit::JoinWithPatientVisitPriceID($startDate, $endDate, [2,4],GOHAWA_BRANCH)->get();
           if (count($CBInvestigationGOHAWA) > 0) {
           foreach ($CBInvestigationGOHAWA as $CBInvestigationGOHAWA)
          {
            $uncbPrinceGOHAWA=DB::select("SELECT patient_visit_price.price as price FROM patient_visit_price WHERE patient_type_id = ? AND clinical_service_id = ? AND department_type_id = ?", [
            $CBInvestigationGOHAWA['patient_type_id'],
            $CBInvestigationGOHAWA['clinical_service_type_id'],
            $CBInvestigationGOHAWA['department_type_id'], ]);
            $countCBPriceGOHAWA=preg_replace("/[^0-9.]/", "",$uncbPrinceGOHAWA[0]->price);
            $priceStringGOHAWA = $uncbPrinceGOHAWA[0]->price;
            $priceStringGOHAWA = preg_replace("/[^0-9.]/", "", $priceStringGOHAWA);
            $priceInCentsGOHAWA = (int)(floatval($priceStringGOHAWA));
            if($priceInCentsGOHAWA>0)
            {
               $uncbPrincGOHAWA +=$priceInCentsGOHAWA;
            }
          }
        }
            $CBInvestigationNADIRABAD = PatientVisit::JoinWithPatientVisitPriceID($startDate, $endDate, [2,4],NADIRABAD_BRANCH)->get();
            if (count($CBInvestigationNADIRABAD) > 0) {
            foreach ($CBInvestigationNADIRABAD as $CBInvestigationNADIRABAD)
            {
              $uncbPrinceNADIRABAD=DB::select("SELECT patient_visit_price.price as price FROM patient_visit_price WHERE patient_type_id = ? AND clinical_service_id = ? AND department_type_id = ?", [
              $CBInvestigationNADIRABAD['patient_type_id'],
              $CBInvestigationNADIRABAD['clinical_service_type_id'],
              $CBInvestigationNADIRABAD['department_type_id'], ]);
              $countCBPriceNADIRABAD=preg_replace("/[^0-9.]/", "",$uncbPrinceNADIRABAD[0]->price);
              $priceStringNADIRABAD = $uncbPrinceNADIRABAD[0]->price;
              $priceStringNADIRABAD = preg_replace("/[^0-9.]/", "", $priceStringNADIRABAD); 
              $priceInCentsNADIRABAD = (int)(floatval($priceStringNADIRABAD));
              if($priceInCentsNADIRABAD>0)
              {
                $uncbPrincNADIRABAD +=$priceInCentsNADIRABAD;   
              }
            }
          }
               $CBInvestigation28Bazar = PatientVisit::JoinWithPatientVisitPrice28Bazar($startDate, $endDate, [2,4],4)->get();
               if (count($CBInvestigation28Bazar) > 0) {
               foreach ($CBInvestigation28Bazar as $CBInvestigation28Bazar)
               {
                $uncbPrince28Bazar=DB::select("SELECT patient_visit_price.price as price FROM patient_visit_price WHERE patient_type_id = ? AND clinical_service_id = ? AND department_type_id = ?", [
                $CBInvestigation28Bazar['patient_type_id'],
                $CBInvestigation28Bazar['clinical_service_type_id'],
                $CBInvestigation28Bazar['department_type_id'], ]);
                $countCBPrice28Bazar=preg_replace("/[^0-9.]/", "",$uncbPrince28Bazar[0]->price);
                $priceString28Bazar = $uncbPrince28Bazar[0]->price;
                $priceString28Bazar = preg_replace("/[^0-9.]/", "", $priceString28Bazar);
                $priceInCents28Bazar = (int)(floatval($priceString28Bazar));
                if($priceInCents28Bazar>0)
                 {
                    $uncbPrinc28Bazar +=$priceInCents28Bazar; 
                 }
               }
            }
            return response()->json([
            'tOTAL_cb' => $CBtotal_paid_price+$CBlabECG+$CBlabScans,
            'tOTAL_non_cb' => $NonCBtotal_paid_price+$NonCBlabECG+$NonCBlabScans+$uncbPrincCANNT+$uncbPrincGOHAWA+$uncbPrincNADIRABAD+$uncbPrinc28Bazar,
            ]);
          }
          
}
