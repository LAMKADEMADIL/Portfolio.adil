$content = [System.IO.File]::ReadAllText('index.html', [System.Text.Encoding]::UTF8)

# Find and fix the broken scroll-arrow area
$idx = $content.IndexOf('<div class="scroll-arrow"><')
if ($idx -ge 0) {
    Write-Host "Found broken area at index: $idx"
    
    # Find the end of the bad area (before Experience section comment)
    $expIdx = $content.IndexOf('<!-- ===== EXPERIENCE SECTION')
    Write-Host "Experience section at index: $expIdx"
    
    if ($expIdx -gt $idx) {
        # Extract what comes before and after
        $before = $content.Substring(0, $idx)
        $after = $content.Substring($expIdx)
        
        # Build proper replacement
        $goodChunk = "<div class=""scroll-arrow""></div>`r`n      </a>`r`n    </section>`r`n`r`n    "
        
        $content = $before + $goodChunk + $after
        [System.IO.File]::WriteAllText('index.html', $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed and saved!"
    }
} else {
    Write-Host "Broken area not found"
    Write-Host "Searching for scroll-arrow..."
    $idx2 = $content.IndexOf('scroll-arrow')
    Write-Host "scroll-arrow found at: $idx2"
    if ($idx2 -ge 0) {
        Write-Host $content.Substring($idx2, 200)
    }
}
