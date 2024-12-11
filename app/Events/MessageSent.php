<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $verified,$unverified, $doctor_count,$secretary_count;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($verified, $unverified, $doctor_count,$secretary_count)
    {
        // dd($unverified);
        $this->verified = $verified;
        $this->unverified = $unverified;
        $this->doctor_count = $doctor_count;
        $this->secretary_count = $secretary_count;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('surjX');
    }

    public function broadcastAs()
    {
        return 'message-sent';
    }
}
