<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
use App\Http\Controllers\{
    CompanyController,
    ShopController,
    VehicleController,
    DriverController,
    DashboardController,
    UserController,
    AuthenticationController,
    RoleController,
    PermissionController,
    LocationController,
    SearchLocationController,
    SuperPermissionsController,
    ClaimController,
    ClaimSettlementController,
    DistributionController,
    QAController
};
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/* CGH ROUTE START */

/* Route Dashboards */

Route::middleware(['auth'])->group(function () {
    // Route::get('/', [DashboardController::class, 'index'])->name('/');
    // Route::get('/get-patients-attended', [DashboardController::class, 'patientsAttended']);
    // Route::get('/get-patients-attended-gohawa', [DashboardController::class, 'patientsAttendedGohawa']);
    // Route::get('/get-patients-attended-nadirabad', [DashboardController::class, 'patientsAttendedNadirabad']);
    // Route::get('/get-patients-attended-bazar28', [DashboardController::class, 'patientsAttended28Bazar']);
    // Route::get('/get-patients-unattended', [DashboardController::class, 'patientsUnAttended']);
    // Route::get('/get-lab-tests-performed', [DashboardController::class, 'labTestsPerformed']);
    // Route::get('/get-radiology-scans-performed', [DashboardController::class, 'radiologyScansPerformed']);
    // Route::get('/get-ecg-performed', [DashboardController::class, 'ecgPerformed']);
    // Route::get('/get-dental-procedure', [DashboardController::class, 'getDentalProcedure']);

    // Route::get('/get-lab-tests-price', [DashboardController::class, 'labTestsPerformedPrice']);
    // Route::get('/get-lab-Scans-price', [DashboardController::class, 'labScansPerformedPrice']);
    // Route::get('/get-lab-ECG-price', [DashboardController::class, 'ECGPerformedPrice']);
    // Route::get('/get-patientsFee-price', [DashboardController::class, 'patientsFee']);
    // Route::get('/get-patientsFeeGOHAWA-price', [DashboardController::class, 'patientsFeeGOHAWA']);
    // Route::get('/get-patientsFeeNADIRABAD-price', [DashboardController::class, 'patientsFeeNADIRABAD']);
    // Route::get('/get-patientsFee28Bazar-price', [DashboardController::class, 'patientsFee28Bazar']);
    // Route::get('/get-patientsFeeSum-price', [DashboardController::class, 'patientsFeeSum']);


    // Route company Page
    // Route::group(['prefix' => 'company', 'name' => 'company.', 'as' => 'company.'], function () {
    //     Route::get('/', [CompanyController::class, 'index'])->name('index');
    //     Route::get('/create', [CompanyController::class, 'create'])->name('create');
    //     Route::post('/', [CompanyController::class, 'store'])->name('store');
    //     Route::get('/{id}/edit', [CompanyController::class, 'edit'])->name('edit');
    //     Route::put('/', [CompanyController::class, 'update'])->name('update');
    //     Route::delete('/delete/{id}', [CompanyController::class, 'destroy'])->name('destroy');
    //     Route::get('/get-company-list', [CompanyController::class, 'getcompanyList'])->name('getcompanyList');
    // });
    // Route shop Page
    Route::group(['prefix' => 'shop', 'name' => 'shop.', 'as' => 'shop.'], function () {
            Route::get('/', [ShopController::class, 'index'])->name('index');
            Route::get('/create', [ShopController::class, 'create'])->name('create');
            Route::post('/', [ShopController::class, 'store'])->name('store');
            Route::get('/{id}/edit', [ShopController::class, 'edit'])->name('edit');
            Route::put('/', [ShopController::class, 'update'])->name('update');
            Route::put('/updateStatus/{id}', [ShopController::class, 'updateStatus'])->name('update');
            Route::delete('/delete/{id}', [ShopController::class, 'destroy'])->name('destroy');
            Route::get('/get-shop-list', [ShopController::class, 'getshopList'])->name('getshopList');
        });
            // Route Vehicle Page
    // Route::group(['prefix' => 'vehicle', 'name' => 'vehicle.', 'as' => 'vehicle.'], function () {
    //             Route::get('/', [VehicleController::class, 'index'])->name('index');
    //             Route::get('/create', [VehicleController::class, 'create'])->name('create');
    //             Route::post('/', [VehicleController::class, 'store'])->name('store');
    //             Route::get('/{id}/edit', [VehicleController::class, 'edit'])->name('edit');
    //             Route::put('/', [VehicleController::class, 'update'])->name('update');
    //             Route::delete('/delete/{id}', [VehicleController::class, 'destroy'])->name('destroy');
    //             Route::get('/get-vehicle-list', [VehicleController::class, 'getvehicleList'])->name('getvehicleList');
    //         });

    //          // Route Driver Page
    //          Route::group(['prefix' => 'driver', 'name' => 'driver.', 'as' => 'driver.'], function () {
    //             Route::get('/', [DriverController::class, 'index'])->name('index');
    //             Route::get('/create', [DriverController::class, 'create'])->name('create');
    //             Route::post('/', [DriverController::class, 'store'])->name('store');
    //             Route::get('/{id}/edit', [DriverController::class, 'edit'])->name('edit');
    //             Route::put('/', [DriverController::class, 'update'])->name('update');
    //             Route::delete('/delete/{id}', [DriverController::class, 'destroy'])->name('destroy');
    //             Route::get('/get-driver-list', [DriverController::class, 'getdriverList'])->name('getdriverList');
    //         });
    //            // Route Location Page
    //     Route::group(['prefix' => 'location', 'name' => 'location.', 'as' => 'location.'], function () {
    //             Route::get('/', [LocationController::class, 'index'])->name('index');
    //             Route::get('/get-location-list/{latitude}/{longitude}', [LocationController::class, 'getlocationList'])->name('getlocationList');
    //         });
    //            // Route Location Page
    //         Route::group(['prefix' => 'searchlocation', 'name' => 'searchlocation.', 'as' => 'searchlocation.'], function () {
    //             Route::get('/', [SearchLocationController::class, 'index'])->name('index');
    //             Route::get('/get-searchlocation-list/{latitude}/{longitude}', [SearchLocationController::class, 'getsearchlocationList'])->name('getsearchlocationList');
    //         });
    // Route Roles Page
    Route::group(['prefix' => 'roles', 'name' => 'roles.', 'as' => 'roles.'], function () {
        Route::get('/', [RoleController::class, 'index'])->name('index');
        Route::get('/create', [RoleController::class, 'create'])->name('create');
        Route::post('/', [RoleController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [RoleController::class, 'edit'])->name('edit');
        Route::put('/{id}', [RoleController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [RoleController::class, 'destroy'])->name('destroy');
        Route::get('/users-list', [RoleController::class, 'getUsersList'])->name('getUsersList');
    });

    // Route Permissions Page
    Route::group(['prefix' => 'permissions', 'name' => 'permissions.', 'as' => 'permissions.'], function () {
        Route::get('/', [PermissionController::class, 'index'])->name('index');
        Route::get('/create', [PermissionController::class, 'create'])->name('create');
        Route::post('/', [PermissionController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [PermissionController::class, 'edit'])->name('edit');
        Route::put('/{id}', [PermissionController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [PermissionController::class, 'destroy'])->name('destroy');
        Route::get('/get-permissions-list', [PermissionController::class, 'getpermissionsList'])->name('getpermissionsList');
    });
});
//Route Authentication Pages
Route::group(['prefix' => 'auth'], function () {
    Route::get('register', [AuthenticationController::class, 'register'])->name('auth-register');

    Route::get('login', [AuthenticationController::class, 'login'])->name('auth-login');
    Route::post('login-verify', [AuthenticationController::class, 'loginVerify'])->name('login-verify');
});

/* Route User */
Route::middleware(['auth'])->group(function () {
    Route::group(['prefix' => 'user', 'name' => 'user.', 'as' => 'user.'], function () {
        Route::get('add-user/{id?}', [UserController::class, 'addUser'])->name('add-user');
        Route::post('add-user', [UserController::class, 'addUser'])->name('add-user');
        Route::post('create', [UserController::class, 'create'])->name('create');
        Route::put('update', [UserController::class, 'update'])->name('update');
        Route::delete('delete/{id?}', [UserController::class, 'delete'])->name('delete');
        Route::get('list', [UserController::class, 'userList'])->name('user-list');
        Route::get('get-user-count', [UserController::class, 'userCountDetail'])->name('get-user-count');
        Route::get('get-user-list', [UserController::class, 'getUserList'])->name('get-user-list');
        Route::get('get-user-by-id', [UserController::class, 'getUserById'])->name('get-user-by-id');
    });

  






    /* Route Super Permissions [has_permission] */
    Route::group(['prefix' => 'has-permission', 'name' => 'has-permission.', 'as' => 'has-permission.'], function () {
        Route::get('/', [SuperPermissionsController::class, 'index'])->name('index');
        Route::get('/get-permission-list', [SuperPermissionsController::class, 'getpermissionList'])->name('getpermissionList');
        Route::put('/enable/{id}', [SuperPermissionsController::class, 'update'])->name('update');
        Route::delete('/disable/{id}', [SuperPermissionsController::class, 'disable'])->name('disable');
        Route::post('/check-existing-value/{id}', [SuperPermissionsController::class, 'checkExistingValue'])->name('check-existing-value');
    });

     // Route Claim Page
     Route::group(['prefix' => 'claim', 'name' => 'claim.', 'as' => 'claim.'], function () {
        Route::get('/', [ClaimController::class, 'index'])->name('index');
        Route::get('/claim-settlement-form/{id}', [ClaimSettlementController::class, 'index'])->name('claim.settlement.form');
        Route::get('/closed', [ClaimController::class, 'closedClaim'])->name('closed.claim');
        Route::get('/create', [ClaimController::class, 'create'])->name('create');
        Route::post('/', [ClaimController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [ClaimController::class, 'edit'])->name('edit');
        Route::put('/', [ClaimController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [ClaimController::class, 'destroy'])->name('destroy');
        Route::get('/get-claim-list', [ClaimController::class, 'getclaimList'])->name('getclaimList');
        Route::get('/get-closed-claim-list', [ClaimController::class, 'getclosedclaimList'])->name('getclosedclaimList');
        Route::put('/submit-record/{id}', [ClaimController::class, 'submitRecord'])->name('submitRecord');
        
    });

    // Route QA Page
    Route::group(['prefix' => 'qa', 'name' => 'qa.', 'as' => 'qa.'], function () {
        Route::get('/', [QAController::class, 'index'])->name('index');
        Route::delete('/delete/{id}', [QAController::class, 'destroy'])->name('destroy');
        Route::get('/get-qa-claim-list', [QAController::class, 'getclaimList'])->name('getQaClaimList');
        Route::put('/submit-record/{id}', [QAController::class, 'submitRecord'])->name('qaSubmitRecord');
        Route::put('/received-claim/{id}', [QAController::class, 'receivedClaim'])->name('qaReceivedClaim');
        Route::get('/gallary/{id}', [QAController::class, 'gallary'])->name('gallary');
    });

    // Route Distribution Page
    Route::group(['prefix' => 'distribution', 'name' => 'distribution.', 'as' => 'distribution.'], function () {
        Route::get('/', [DistributionController::class, 'index'])->name('index');
        Route::get('/repairs', [DistributionController::class, 'repair'])->name('repairs');
        Route::delete('/delete/{id}', [DistributionController::class, 'destroy'])->name('destroy');
        Route::get('/get-distribution-claim-list', [DistributionController::class, 'getclaimList'])->name('getDistributionClaimList');
        Route::get('/get-distribution-repair-list', [DistributionController::class, 'getRepairList'])->name('getDistributionRepairList');
        Route::put('/submit-record/{id}', [DistributionController::class, 'submitRecord'])->name('distributionSubmitRecord');
    });
});
if(url()->full() == 'http://127.0.0.1:8000/login'){
    Route::get('/login',function(){
        return redirect()->route('auth-login');
    });
}


/* Route Dashboards */
Route::group(['prefix' => 'dashboard'], function () {
    Route::get('analytics', [DashboardController::class, 'dashboardAnalytics'])->name('dashboard-analytics');

});
/* Route Dashboards */

Route::get('/clear-cache', function () {
    Cache::flush();
    Artisan::call('cache:clear');
    Artisan::call('route:clear');
    Artisan::call('config:clear');
    Artisan::call('view:clear');
    Artisan::call('event:clear');
    Artisan::call('optimize');
    return "All Cache was cleared";
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('/', function () {
        return view('dashboard');
    })->name('dashboard');
});
           