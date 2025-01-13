{{-- resources/views/errors/403.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 Forbidden</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f9f9f9;
            color: #333;
        }
        .error-container {
            text-align: center;
        }
        .error-container h1 {
            font-size: 120px;
            margin: 0;
            color: #ff6b6b;
        }
        .error-container p {
            font-size: 20px;
            margin: 10px 0;
        }
        .error-container a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 25px;
            font-size: 16px;
            background-color: #ff6b6b;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .error-container a:hover {
            background-color: #d95555;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>403</h1>
        <p>Access Denied: You do not have permission to access this page.</p>
        <a href="{{ route('dashboard') }}">Back</a>
    </div>
</body>
</html>
