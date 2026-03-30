$file = "c:\Users\bella\Desktop\Psychologue\Psychose\static\exercises_config.js"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$content = [System.IO.File]::ReadAllText($file, $utf8NoBom)
$rc = [string][char]0xFFFD

# Fix remaining specific patterns based on diagnostic output
$content = $content.Replace("N'" + $rc + "STES PAS", "N'" + [char]0x00CA + "TES PAS")  # N'ÊTES PAS
$content = $content.Replace("c" + $rc + '"ur', 'c' + [char]0x0153 + 'ur')  # cœur
$content = $content.Replace("CO" + $rc + ">T", "CO" + [char]0x00DB + "T")  # COÛT
$content = $content.Replace("L" + $rc + ",CHER", "L" + [char]0x00C2 + "CHER")  # LÂCHER
$content = $content.Replace("BIEN-" + $rc + "STRE", "BIEN-" + [char]0x00CA + "TRE")  # BIEN-ÊTRE
$content = $content.Replace("s" + $rc + '"ur', 's' + [char]0x0153 + 'ur')  # sœur
$content = $content.Replace($rc + 'o"', [string][char]0x2713)  # ✓
$content = $content.Replace($rc + "s" + [char]0xA0, [string][char]0x26A0 + " ")  # ⚠ (warning sign + space)
$content = $content.Replace($rc + "o-", [string][char]0x2717)  # ✗
$content = $content.Replace("APR" + $rc + "^S", "APR" + [char]0x00C8 + "S")  # APRÈS

# Check remaining
$remaining = ($content.ToCharArray() | Where-Object { $_ -eq [char]0xFFFD }).Count
Write-Host "Remaining replacement chars: $remaining"

if ($remaining -gt 0) {
    for ($i = 0; $i -lt $content.Length; $i++) {
        if ($content[$i] -eq [char]0xFFFD) {
            $start = [Math]::Max(0, $i - 5)
            $end = [Math]::Min($content.Length, $i + 15)
            $ctx = $content.Substring($start, $end - $start) -replace "`r`n", " "
            # Show hex of surrounding chars
            $hexCtx = ""
            for ($j = [Math]::Max(0, $i-2); $j -lt [Math]::Min($content.Length, $i+5); $j++) {
                $hexCtx += "U+" + [string]::Format("{0:X4}", [int]$content[$j]) + " "
            }
            Write-Host "  Pos $i : [$ctx] | hex: $hexCtx"
        }
    }
}

[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)
Write-Host "File saved."
