<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PookieURL Shortener</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    header {
        text-align: center;
        padding: 20px;
    }

    h1 {
        font-size: 2em;
        margin-bottom: 20px;
    }

    main {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        flex: 1;
    }

    section {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        margin-bottom: 20px;
        flex: 1 1 45%;
    }

    h2 {
        font-size: 1.5em;
        margin-bottom: 10px;
    }

    p {
        line-height: 1.5;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-bottom: 5px;
    }

    a {
        color: #007bff;
        text-decoration: none;
        padding: 5px 10px;
        border: 1px solid #007bff;
        border-radius: 3px;
        margin-top: 10px;
        display: inline-block;
    }

    a:hover {
        background-color: #007bff;
        color: #fff;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        margin-bottom: 5px;
    }

    input[type="url"] {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-bottom: 10px;
    }

    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    #short-url {
        margin-top: 10px;
        display: none;
    }

    #copy-message {
        margin-top: 10px;
        color: green;
        display: none;
    }

    footer {
        text-align: center;
        padding: 10px 0;
        background-color: #fff;
        width: 100%;
        position: relative;
        bottom: 0;
    }
</style>

<body>
    <header>
        <h1>PookieURL Shortener</h1>
    </header>

    <main>
        <section class="url-shortener">
            <h2>Shorten Your URLs with Ease</h2>
            <p>Make long, unwieldy URLs a thing of the past! Our URL shortener creates clean, memorable links for you to
                share.</p>
            <form id="shorten-form">
                <label for="url">Enter your long URL:</label>
                <input type="url" id="url" name="url" placeholder="https://example.com/long/url/here">
                <button type="submit">Shorten</button>
            </form>
            <div id="short-url">
                <p>Short URL: <span id="short-url-link"></span> <button id="copy-button">Copy</button></p>
                <p id="copy-message">Copied!</p>
            </div>
        </section>

        <section class="service-rewards">
            <h2>Big URLs? Make them tiny.</h2>
            <p>Tired of those long, unwieldy links cramping your style? We get it. Here through this service, you can
                transform those monsters into bite-sized wonders. Simply paste your link, and we'll whip you up a short,
                sweet, and shareable version. It's fast, free, and makes your online life a whole lot easier.</p>
            <a href="#">Learn More About Pookie</a>
        </section>

    </main>

    <footer>
        <p>&copy; 2024 Pookie</p>
    </footer>

    <script>
        $(document).ready(function() {
            $('#shorten-form').submit(function(event) {
                event.preventDefault();
                const longUrl = $('#url').val();
                $.ajax({
                    url: '/api/shorten',
                    method: 'POST',
                    data: {
                        long_url: longUrl
                    },
                    success: function(response) {
                        $('#short-url-link').text(response.short_url).attr('href', response
                            .short_url);
                        $('#short-url').show();
                    },
                    error: function() {
                        alert('An error occurred. Please try again.');
                    }
                });
            });

            $('#copy-button').click(function() {
                const shortUrl = $('#short-url-link').text();
                navigator.clipboard.writeText(shortUrl).then(function() {
                    $('#copy-message').show().delay(2000).fadeOut();
                }, function() {
                    alert('Failed to copy text.');
                });
            });
        });
    </script>
</body>

</html>
