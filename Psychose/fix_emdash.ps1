$file = "c:\Users\bella\Desktop\Psychologue\Psychose\static\exercises_config.js"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$content = [System.IO.File]::ReadAllText($file, $utf8NoBom)
$rc = [char]0xFFFD
# Find all instances and show surrounding chars
for ($i = 0; $i -lt $content.Length; $i++) {
    if ($content[$i] -eq $rc) {
        $start = [Math]::Max(0, $i - 3)
        $end = [Math]::Min($content.Length, $i + 6)
        $context = $content.Substring($start, $end - $start)
        $hexChars = ""
        for ($j = $i; $j -lt [Math]::Min($content.Length, $i + 4); $j++) {
            $hexChars += "U+" + [string]::Format("{0:X4}", [int]$content[$j]) + " "
        }
        Write-Host "Pos $i : [$context] | hex: $hexChars"
        if ($i -gt 20) { break }  # just show a few
    }
}
