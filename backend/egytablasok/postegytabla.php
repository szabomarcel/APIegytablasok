
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST["autoversenyzid"]) && isset($_POST["csapat"]) && isset($_POST["versenyzo"]) && isset($_POST["eletkor"]) && isset($_POST["palya"]) && isset($_POST["koridoS"]) && isset($_POST["kor"]) && isset($_POST["koridoN"])) {
        require_once 'databaseconnection.php';
        if ($conn->connect_error) {
            die("Sikertelen kapcsolódás az adatbázishoz: " . $conn->connect_error);
        }
        $sql = "INSERT INTO dolgozok (autoversenyzid, csapat, versenyzo, eletkor, palya, koridoS, kor, koridoN) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("sssii", $autoversenyzid, $csapat, $versenyzo, $eletkor, $palya, $koridoS, $kor, $koridoN);
            $autoversenyzid = $_POST["autoversenyzid"];
            $csapat = $_POST["csapat"];
            $versenyzo = $_POST["versenyzo"];
            $eletkor = $_POST["eletkor"];
            $palya = $_POST["palya"];
            $koridoS = $_POST["koridoS"];
            $kor = $_POST["kor"];
            $koridoN = $_POST["koridoN"];
            if ($stmt->execute()) {
                http_response_code(201);
                echo "Sikeresen lett hozzáadva";
            } else {
                http_response_code(404);
                echo 'Sikertelen hozzáadás';
            }
            $stmt->close();
        } else {
            echo "Hiba a lekérés előkészítésekor: " . $conn->error;
        }
        $conn->close();
    } else {
        echo "Hiányzó mezők!";
    }
} else {
    echo "Érvénytelen kérés!";
}