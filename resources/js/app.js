import './bootstrap';

import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
window.Alpine = Alpine;

Alpine.plugin(focus);

Alpine.start();


import Echo from "laravel-echo";
window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true
});

// Listening to events
window.Echo.channel('chat')
    .listen('.message.sent', (e) => {
        console.log(e.message);
        // Update UI with the received message
        document.getElementById('messages').innerHTML += `<p>${e.message}</p>`;
    });
