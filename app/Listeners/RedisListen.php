<?php

namespace App\Listeners;

use App\Events\RedisEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class RedisListen
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\TestEvent  $event
     * @return void
     */
    public function handle(RedisEvent $event)
    {
        info($event->result);
    }
}
