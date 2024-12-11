<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LetterTemplatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('letter_templates')->insert([
            [
                'name' => 'Admission Template',
                'letter_id' => 1,
                'body'      => 'Enclosed is a leaflet about the clinic for your information.  On arrival at the clinic, please give your name in at the main reception desk and you will be directed to the admissions desk.  <br />
<br />
Should you have any queries, please feel free to contact me at the above number. <br />
<br />
Yours sincerely,<br />
<br />
<br />
_____________<br />
  Secretary',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'          => 'OGD Admission Template',
                'body'          => 'Enclosed is a leaflet about the clinic for your information.  On arrival at the clinic, please give your name in at the main reception desk and you will be directed to the admissions office.  It is not advisable to drive home yourself after the procedure, so please arrange for someone to collect you in the evening and bring their contact number with you.  Please bring slippers and a dressing gown on the day.  <br />
<br />
Please note: you are advised to contact your insurance company to confirm your cover for this procedure by quoting the code above prior to admission.
<br />
<br />
Should you have any queries, please feel free to contact me at the above number.
<br />
Yours sincerely,
<br />
<br />
_______________<br />
    Secretary',
                'letter_id'     => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'name' => 'Appointment Template',
                'body'          => 'Consultation Fee for new patient is €250. Subsequent consultations and return in-patients fees are €150.<br />
If for any reason you are unable to keep this appointment, we would greatly appreciate it if you could let us know at your earliest convenience so that it can be offered to another patient<br />
<br />
Many thanks.<br />
<br />
<br />
Yours sincerely,<br />
<br />
<br />
_______________<br />
  Secretary',
                'letter_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Appointment Template - Blackrock',
                'body'          => 'Consultation Fee for new patient is €250. Subsequent consultations and return in-patients fees are €150.<br />
Fees are payable on the day and payment can be accepted by cash or cheque only as we do not have debit or credit card facilities in Blackrock Clinic. <br />
If for any reason you are unable to keep this appointment, we would greatly appreciate it if you could let us know at your earliest convenience so that it can be offered to another patient<br />
<br />
Many thanks.<br />
<br />
Yours sincerely,<br />
<br />
<br />
_______________<br />
   Secretary',
                'letter_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'PFT Appointment Template',
                'body'          => 'Consultation Fee for new patient is €250. Subsequent consultations and return in-patients fees are €150.<br />
If for any reason you are unable to keep this appointment, we would greatly appreciate it if you could let us know at your earliest convenience so that it can be offered to another patient<br />
<br />
Many thanks.<br />
<br />
<br />
Yours sincerely,<br />
<br />
<br />
______________<br />
   Secretary',
                'letter_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'PFT Request Template',
                'body'          => '', //not required
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Blood for ST James (For Patient)',
                'body'          => 'Dr Rizwan would like you to have some blood tests before he sees you for your next consultation. These can be done in St James’s Private Clinic by presenting the enclosed laboratory request form to the Phlebotomy Department. <br />
<br />
Please contact St James’s Clinic directly on 01-474-2459 for more information regarding opening hours and prices.<br />
<br />
Many thanks.<br />
<br />
<br />
Yours sincerely,<br />
<br />
<br />
_____________<br />
  Secretary',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'          => 'Blood for ST James Institute',
                'body'          => 'Yours sincerely <br />
                <br />
<br />
',
                'letter_id'     => 3,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'name' => 'Certificate for Work',
                'body'          => 'Yours sincerely,',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Note for Work',
                'body' => 'Yours sincerely',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Consent for Scramble Therapy',
                'body'          => '',   // not required
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Convalescence Letter for Insurance',
                'body'          => 'Yours sincerely <br />
<br />
<br />
',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'DEXA Referral',
                'body'          => 'Yours sincerely <br />
<br />
<br />
',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Doctor Reference',
                'body'          => '<br />
<br />
Yours sincerely <br />
<br />
<br />
',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'GDPR Consent Form',
                'body'          => '',  //not required
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'GP Letter',
                'body'          => 'With kind regards and best wishes.<br />
<br />
<br />
<br />
Yours sincerely <br />
<br />
<br />
',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Letter for DNA/Cancellation',
                'body'          => 'This is to inform you that the above patient was due to attend my rooms for a follow up consultation, however, the patient indicated that they do not wish to attend at present.  I have therefore not sent any further appointment, but I would be happy to see them again in the future at your request.<br />
<br />
<br />
<br />
Yours sincerely <br />
<br />
<br />
',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Letter for Patches',
                'body'          => '<br />
<br />
Yours sincerely <br />
<br />
<br />
',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Injection Referral',
                'body'          => '',  //not required
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Nursing Home Referral',
                'body'          => '<br />
<br />
Yours sincerely <br />
<br />
<br />
<br />
',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Outstanding Fee Letter',
                'body'          => '<br />This account is now overdue and we would appreciate you forwarding the relevant fee.  Payment can be made by posting cheque or cash to Dr Rizwan’s office, or alternatively payment can be made by credit card or Laser over the phone by calling the number above.  <br />
<br />
All payments should be settled within 30 days of receipt of invoice.
<br />
Should you have any queries, please feel free to contact me at the above number.
<br />
Yours sincerely,
<br />
<br />
____________<br />
 Secretary',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Release of Medical Record',
                'body'          => '<br />
Yours sincerely<br />
<br />
<br />
',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Info Letter Bloods',
                'body'          => 'Please find enclosed an appointment for you for Dr Rizwan’s rooms in the Hermitage Clinic. Dr Rizwan would like you to have blood tests repeated before he sees you for your consultation.  This can be done in the Hermitage Clinic on the day of your visit by presenting the enclosed laboratory request form to the Phlebotomy Department.  You do not need an appointment for the tests.  Please arrive to the clinic approximately an hour before your appointment with Dr Rizwan to allow time to check in and to have the tests done.  The fee for the blood tests is €50 which is payable by you on the day.  <br />
<br />
Should you have any queries, please feel free to contact me at the above number. <br />
<br />
<br />
Yours sincerely,<br />
<br />
<br />
<br />
_______________<br />
  Secretary',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Info Letter CXR',
                'body'          => 'Please find enclosed an appointment for you for Dr Rizwan’s rooms in the Hermitage Clinic.   Dr Rizwan would like you to have a chest x-ray repeated before he sees you for your consultation.  This can be done in the Hermitage Clinic on the day of your visit by presenting the enclosed x-ray request card to the Radiology Department.  You do not need an appointment for this.  Please arrive to the clinic approximately an hour before your appointment with Dr Rizwan to allow time to check in and to have the x-ray done.  The fee for the x-ray is €130 which is payable by you on the day.<br />
<br />
Should you have any queries, please feel free to contact me at the above number. <br />
<br />
<br />
Yours sincerely,<br />
<br />
<br />
<br />
_____________<br />
  Secretary',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Info Letter Bloods and CXR',
                'body'          => 'Please find enclosed an appointment for you for Dr Rizwan’s rooms in the Hermitage Clinic. Dr Rizwan would like you to have a chest x-ray and blood test repeated before he sees you for your consultation.  This can be done in the Hermitage Clinic on the day of your visit by presenting the enclosed x-ray request card to the Radiology Department and the laboratory request form to the Phlebotomy Department.  You do not need an appointment for either test.  Please arrive to the clinic approximately an hour to an hour and a half before your appointment with Dr Rizwan to allow time to check in and to have the tests done.  The fee for the x-ray is €130 and the fee for the blood test is €50 which is payable by you on the day.  <br />
<br />
Should you have any queries, please feel free to contact me at the above number. <br />
<br />
<br />
Yours sincerely,<br />
<br />
<br />
<br />
____________<br />
 Secretary',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ML Report Appointment Fee',
                'body'          => 'Should you have any queries, please do not hesitate to contact my secretary on the number above.   <br />
<br />
<br />
Yours faithfully, <br />
<br />
<br />
<br />
<br />
               ',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ML Report Appointment',
                'body'          => '<br />
Yours faithfully, <br />
<br />
<br />', 
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ML Solicitor Letter Standby',
                'body'          => 'My fee for standby is €600 and I require prior confirmation that this will be paid once I have been kept on standby, unless a minimum of 72 hours notice of cancellation of the court hearing is given.  My fee for court attendance is €1200 plus travel expenses.  If it arises that the officers of the court award a lesser amount for standby or court appearance, a commitment is required that either you or your client will be responsible for the balance of my fee.  <br />
<br />
On receipt of this commitment, I will be happy to confirm my availability.  This letter is not a confirmation of my availability.  Confirmation will be sent upon receipt of a response to this letter.  I will not be available as standby any Tuesday, Wednesday or Thursday.  I am available for standby on Monday or Friday with prior notice.  <br />
<br />
If you have any queries regarding this matter, please do not hesitate to contact my secretaries on 01-6459560.  <br />
<br />
<br />
Yours faithfully,
<br />
<br />',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ML Release of Medical Record',
                'body'          => '<br />
There is an admin fee of €120 for the copying of information that I hold, and the information will be forwarded to you on receipt of payment.  <br />
<br />
<br />
Yours faithfully,
<br />
<br />',
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Infusion Referral',
                'body'          => '', // not required
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'MedicoLegal Report Letter',
                'body'          => '', // not required
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Discharge Letter',
                'body'          => '', // not required
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Request for Discs HMC',
                'body'          => '', // not required
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Custom Template',
                'body'          => '', // not required
                'letter_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            

        ]);
    }
}
