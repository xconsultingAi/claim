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

Route::middleware(['auth','has_permission:shop','has_permission:roles_read','has_permission:roles_write','has_permission:roles_create','has_permission:roles_delete'])->group(function () {
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
Route::middleware(['auth','has_permission:private-user'])->group(function () {
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
});
     // Route Claim Page
	 Route::middleware(['auth','has_permission:claim'])->group(function () {
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
	/* Route User */
	    Route::group(['prefix' => 'user', 'name' => 'user.', 'as' => 'user.'], function () {
		    Route::get('add-user/{id?}', [UserController::class, 'addUser'])->name('add-user');
			Route::put('update', [UserController::class, 'update'])->name('update');			
		});
 });
    // Route QA Page
	 Route::middleware(['auth','has_permission:QA'])->group(function () {	
    Route::group(['prefix' => 'qa', 'name' => 'qa.', 'as' => 'qa.'], function () {
        Route::get('/', [QAController::class, 'index'])->name('index');
        Route::delete('/delete/{id}', [QAController::class, 'destroy'])->name('destroy');
        Route::get('/get-qa-claim-list', [QAController::class, 'getclaimList'])->name('getQaClaimList');
        Route::put('/submit-record/{id}', [QAController::class, 'submitRecord'])->name('qaSubmitRecord');
        Route::put('/received-claim/{id}', [QAController::class, 'receivedClaim'])->name('qaReceivedClaim');
        Route::get('/gallary/{id}', [QAController::class, 'gallary'])->name('gallary');
    });
	/* Route User */
		Route::group(['prefix' => 'user', 'name' => 'user.', 'as' => 'user.'], function () {
		    Route::get('add-user/{id?}', [UserController::class, 'addUser'])->name('add-user');
			Route::put('update', [UserController::class, 'update'])->name('update');			
		});
    });
    // Route Distribution Page
	 Route::middleware(['auth','has_permission:Distribution'])->group(function () {	
    Route::group(['prefix' => 'distribution', 'name' => 'distribution.', 'as' => 'distribution.'], function () {
        Route::get('/', [DistributionController::class, 'index'])->name('index');
        Route::get('/repairs', [DistributionController::class, 'repair'])->name('repairs');
        Route::delete('/delete/{id}', [DistributionController::class, 'destroy'])->name('destroy');
        Route::get('/get-distribution-claim-list', [DistributionController::class, 'getclaimList'])->name('getDistributionClaimList');
        Route::get('/get-distribution-repair-list', [DistributionController::class, 'getRepairList'])->name('getDistributionRepairList');
        Route::put('/submit-record/{id}', [DistributionController::class, 'submitRecord'])->name('distributionSubmitRecord');
	/* Route User */
		Route::group(['prefix' => 'user', 'name' => 'user.', 'as' => 'user.'], function () {
		    Route::get('add-user/{id?}', [UserController::class, 'addUser'])->name('add-user');
			Route::put('update', [UserController::class, 'update'])->name('update');			
		});
    });
});
<<<<<<< Updated upstream
if(url()->full() == 'http://127.0.0.1:8000/login'){
    Route::get('/login',function(){
        return redirect()->route('auth-login');
    });
}
=======
if(url()->full() == 'http://127.0.0.1:8000/login')
{
	 Route::get('/login', function () {
        return redirect()->route('auth-login');
    });
};
>>>>>>> Stashed changes


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
           