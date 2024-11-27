<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "task_dashboard";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $result = $conn->query("SELECT video_link FROM tasks ORDER BY created_at DESC LIMIT 1");
    echo json_encode($result->fetch_assoc());
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['postTask'])) {
        $video_link = $_POST['video_link'];
        $task_code = $_POST['task_code'];

        $conn->query("DELETE FROM tasks");

        $stmt = $conn->prepare("INSERT INTO tasks (video_link, task_code, created_at) VALUES (?, ?, NOW())");
        $stmt->bind_param("ss", $video_link, $task_code);

        echo $stmt->execute() ? "Task posted successfully." : "Error: " . $stmt->error;

        $stmt->close();
    }

    if (isset($_POST['submitCode'])) {
        $input_code = $_POST['input_code'];
        $result = $conn->query("SELECT task_code FROM tasks LIMIT 1");
        $row = $result->fetch_assoc();

        echo json_encode(["status" => $row && $input_code === $row['task_code'] ? "correct" : "wrong"]);
    }
}

$conn->close();
?>
