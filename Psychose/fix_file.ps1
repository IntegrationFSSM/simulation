$file = "c:\Users\bella\Desktop\Psychologue\Psychose\static\exercises_config.js"
$content = Get-Content $file
$newContent = $content[0..579] + @('];', '') + $content[979..($content.Length-1)]
$newContent | Set-Content $file -Encoding UTF8
Write-Host "Done. Lines before: $($content.Length), Lines after: $($newContent.Length)"
