FreeCodeCamp API Basejump: URL Shortener Microservice
=====================================================

User stories:
=============

I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
When I visit that shortened URL, it will redirect me to my original link.
**Example** creation usage:
https://urlshortenermyapp.glitch.me/new/https://www.google.com
https://urlshortenermyapp.glitch.me/new/http://foo.com:80

**Example** creation output
{"original_url":"https://www.google.com","shorten_url":"https://urlshortenermyapp.glitch.me/1516119244000"}

Usage:
------
https://urlshortenermyapp.glitch.me/1516119244000

Will redirect to:
-----------------
https://www.google.com
