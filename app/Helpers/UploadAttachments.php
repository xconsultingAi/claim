<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

function getFileName($file): string
{
    return $path . Carbon::now()->timestamp . "-" . $file->getClientOriginalName();
}
class UploadAttachments
{
    public static function uploadAttachments($request, $path, $key)
    {
        $filename = UploadAttachments::__getTempFileName($request, $path, $key);

        if (is_array($filename)) {
            $returnUrls = [];
            $files = $request->file($key);
            for ($i = 0; $i < count($filename); $i++) {
                $content = file_get_contents($files[$i]);
                Storage::disk('s3')->put($filename[$i], $content);
                array_push($returnUrls, Storage::disk('s3')->url($filename[$i]));
            }
            return implode(",", $returnUrls);
        }
        $content = file_get_contents($request->file($key));
        Storage::disk('s3')->put($filename, $content);
        return Storage::disk('s3')->url($filename);
    }

    /**
     * @param Request $requestimage_path
     * @return string
     */
    protected static function __getTempFileName(Request $request, $path, $key)
    {
        $file = $request->$key;
        if (is_array($file)) {
            $names = [];
            foreach ($file as $f) {
                array_push($names, $path . Carbon::now()->timestamp . "-" . $f->getClientOriginalName());
            }
            return $names;
        }
        return $path . Carbon::now()->timestamp . "-" . $file->getClientOriginalName();
    }

    public static function deleteAttachmentFromS3($path)
    {
        if (Storage::disk('s3')->exists($path)) {
            return Storage::disk('s3')->delete($path);
        }
    }
}
