<?php

namespace App\Http\Controllers\v1\User;

use App\Http\Controllers\Controller;
use App\Http\Traits\HttpResponse;
use App\Models\QrCode;
use App\Repositories\QrCodeRepository;
use App\Services\QrCodeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class QrCodeController extends Controller
{
    use HttpResponse;

    protected $qrCodeService;
    protected $qrCodeRepository;

    public function __construct(QrCodeService $qrCodeService, QrCodeRepository $qrCodeRepository)
    {
        $this->qrCodeService = $qrCodeService;
        $this->qrCodeRepository = $qrCodeRepository;
    }

    public function index()
    {
        $data = $this->qrCodeRepository->getForUserId(auth()->id());
        return $this->success(
            data: $data,
            message: "QR Codes fetched successfully!"
        );
    }

    /**
     * Store a new QR Code
     */
    public function store(Request $request)
    {
        $request->validate([
            'long_url' => 'required|url'
        ]);

        $longUrl = $request->input('long_url');
        $userId = Auth::id();

        // Generate QR Code
        $qrCodeFileName = $this->qrCodeService->generateQrCode($longUrl, $userId);

        // Save to the database
        $qrCode = $this->qrCodeRepository->createQrCode($userId, $longUrl, $qrCodeFileName);

        // Return the URL for accessing the QR code
        $qrCodeUrl = url('storage/qr_codes/' . $qrCodeFileName);

        return $this->success(
            data: $qrCode,
            message: "QR Code Generated Successfully"
        );
    }

    public function destroy($id)
    {
        // Fetch the authenticated user ID
        $userId = Auth::id();

        // Fetch the QR code by ID and user ID
        $qrCode = QrCode::where('id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$qrCode) {
            return $this->error(
                message: 'QR Code not found or does not belong to the authenticated user.',
                code: 404
            );
        }

        // Delete the QR code file from storage
        $qrCodePath = 'public/qr_codes/' . $qrCode->qr_code_path;
        if (Storage::exists($qrCodePath)) {
            Storage::delete($qrCodePath);
        }

        // Delete the QR code record from the database
        $qrCode->delete();

        return $this->success(
            message: 'QR Code deleted successfully.'
        );
    }

    /**
     * Update a QR Code
     */
    public function update(Request $request)
    {
        $request->validate([
            'long_url' => 'required|url'
        ]);

        $longUrl = $request->input('long_url');
        $userId = Auth::id();

        // Find and delete the old QR Code
        $this->qrCodeRepository->deleteByUserId($userId);

        // Generate new QR Code
        $qrCodeFileName = $this->qrCodeService->generateQrCode($longUrl, $userId);

        // Save to the database
        $qrCode = $this->qrCodeRepository->createQrCode($userId, $longUrl, $qrCodeFileName);

        // Return the new QR code URL
        $qrCodeUrl = url('storage/qr_codes/' . $qrCodeFileName);

        return $this->success(
            data: [
                'message' => 'QR Code updated successfully.',
                'qr_code_url' => $qrCodeUrl,
                'long_url' => $longUrl
            ],
            message: "QR Code Updated Successfully"
        );
    }

    public function show(Request $request, $id)
    {
        // Fetch the authenticated user ID
        $userId = Auth::id();

        // Fetch QR code by ID and ensure it belongs to the authenticated user
        $qrCode = QrCode::where('id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$qrCode) {
            return $this->error(
                message: 'QR Code not found or does not belong to the authenticated user.',
                code: 404
            );
        }

        return $this->success(
            data: $qrCode,
            message: 'QR Code fetched successfully.'
        );
    }

    /**
     * Get a QR Code by long URL
     */
    public function getByLongUrl(Request $request)
    {
        logger()->info($request->all());
        $request->validate([
            'long_url' => 'required|url'
        ]);

        $longUrl = $request->input('long_url');
        $userId = Auth::id();

        // Retrieve QR Code
        $qrCode = $this->qrCodeRepository->getByUserIdAndLongUrl($userId, $longUrl);

        if (!$qrCode) {
            return $this->error('QR Code not found.', 404);
        }

        return $this->success(
            data: [
                'qr_code_url' => $qrCode->qr_code,
                'long_url' => $qrCode->long_url
            ],
            message: "QR Code Retrieved Successfully"
        );
    }
}
