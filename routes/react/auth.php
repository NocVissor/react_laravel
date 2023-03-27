<?
use Illuminate\Support\Facades\Route;
use App\Services\Soft\Http;
use App\Http\Controllers\System\AuthController;

Route::get('/login', function(){ return Http::success(); })->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', function(){ return Http::success(); });
Route::post('/register', [AuthController::class, 'register']);
Route::post('/confirm-phone', [AuthController::class, 'confirmPhone']);
Route::post('/send-phone-code', [AuthController::class, 'SendPhoneCode']);
Route::get('/logout', [AuthController::class, 'logout']);

Route::get('/password/forgot', function(){ return Http::success(); });
Route::post('/password/forgot', [AuthController::class, 'forgot']);

Route::get('/password/resend',function(){ return Http::success(); } )->name('password.reset');
Route::post('/password/resend', [AuthController::class, 'resend']);


Route::get('/email/verify/{id}/{hash}', [AuthController::class,'verify'])->middleware(['auth', 'signed'])->name('verification.verify');
Route::post('/email/verify/resend', [AuthController::class,'send'])->middleware(['auth', 'throttle:6,1'])->name('verification.send');
