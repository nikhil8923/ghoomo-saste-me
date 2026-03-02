

<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);


$prompt = $_POST['prompt'] ?? '';

if (!$prompt) {
    echo "⚠️ Please enter a prompt.";
    exit;
}

$data = [
    "model" => "gpt-3.5-turbo",
    "messages" => [["role" => "user", "content" => $prompt]],
    "temperature" => 0.7
];

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Bearer $apiKey"
    ],
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo "Curl Error: " . curl_error($ch);
    exit;
}

curl_close($ch);

$result = json_decode($response, true);

// ✅ Check if response has expected data
if (isset($result['choices'][0]['message']['content'])) {
    echo trim($result['choices'][0]['message']['content']);
} else {
    // 🔍 Show raw response for debugging
    echo "⚠️ API Error: " . ($result['error']['message'] ?? 'Invalid response from OpenAI');

