<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PatientVisit;
use Carbon\Carbon;

class PatientVisitStatusIncomplete extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'patient_visit_status_incomplete:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        info("Cron Job running at ". now());
        $currentDate = Carbon::now();
        $thresholdTime = $currentDate->copy()->subHours(12);
        $updatePatientVisit = PatientVisit::where('status', 'inprocess')
            ->where('created_at', '<', $thresholdTime)
            ->update([
                'status' => 'completed'
            ]);
            
    }
}
