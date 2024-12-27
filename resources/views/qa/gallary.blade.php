<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <!-- Add Bootstrap for styling (Optional) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            padding: 20px;
        }
        .gallery img {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }
        .gallery-item {
            overflow: hidden;
            position: relative;
        }
    </style>
</head>
<body style="background-image: url(https://www.urbansole.com.pk/cdn/shop/files/Water_Resistant_4_v2_1880x.jpg?v=1733924785); background-size: cover; background-repeat: repeat; background-position: center;">
    <div class="container mt-4">
        <h1 class="text-center">Image Gallery</h1>
        <div class="gallery">
            @foreach ($defect_images as $key=> $image)
                <div class="gallery-item">
                    <h3>Defect Image {{$key+1}} </h3>
                    <img src="{{ asset('storage/' . $image->defect_image) }}" alt="Gallery Image">
                </div>
            @endforeach
        </div>
    </div>
    <!-- Add Bootstrap JS (Optional) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
