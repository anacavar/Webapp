NestJS Documentation: https://docs.nestjs.com/

Use Postman to test the endpoints > ako ti ne mappa neki probaj samo restartat

- enter username, password into body
- "x-www-form-urlencoded" this is important - why?

Learn about HTTP Request structure: https://sematext.com/glossary/http-requests/#:~:text=HTTP%20Request%20Structure,line%2C%20headers%20and%20message%20body.

- Request line / Status line
- Headers -> cookie je jedan od (opcionalni)
- Body

AUTH GUARD:: ==> assumes an authenticated user (that a token is attached to the request headers)
HTTP headers are used to pass additional information with HTTP response or HTTP requests. A cookie is an HTTP request header i.e. used in the requests sent by the user to the server. It contains the cookies previously sent by the server using one or more set-cookie headers. It is an optional header.

Tutorials used:

> 18/09/2023: "NextJs & NestJS JWT Authentication" by Scalable Scripts - https://www.youtube.com/watch?v=5rlsUfQTRzs&list=PLlameCF3cMEu8KAN-02n3CtToO5iYELTV&ab_channel=ScalableScripts

> još neisprobani: https://www.learmoreseekmore.com/2021/05/nestjs-jwt-auth-cookie-series-part3-refresh-token.html

> KRENI S OVIM SUTRA (20/9/2023): https://www.youtube.com/watch?v=_L225zpUK0M&ab_channel=MariusEspejo - odlično objašnjeno u zadnjem dijelu

> > vraćalo je 401 zato što token nije u authorization header smješten (moraš ga ručno zalijepiti u bearer token u odgovarajućem protected requestu)

> možda ga samo spremim u cookie i tu je backend gotov??

WHY ARE THERE NO COOKIES RECEIVED FROM THE SERVER? > start here: https://learning.postman.com/docs/sending-requests/cookies/
