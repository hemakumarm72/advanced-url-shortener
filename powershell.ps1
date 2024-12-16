# PowerShell Script Equivalent

function Convert-String {
    param (
        [string]$input
    )
    $result = -join ($input.Split('-') | ForEach-Object { ($_ -ne '') -replace '^(.)(.*)$', { $_.Groups[1].Value.ToUpper() + $_.Groups[2].Value.ToLower() } })
    return $result
}

# Array of folder names
$folders = @('auth', 'shorten', 'analytics')

# Loop through each folder in the array
foreach ($folder in $folders) {
    # Create the folder (uncomment the mkdir line to actually create the folders)
    # New-Item -ItemType Directory -Path $folder

    # Generate the index.ts file
    $indexTsContent = @"
import express from 'express';
import * as controller from './$folder.controller';
import { checkSchema } from 'express-validator';
import { } from './$folder.validation';

const router = express.Router();

export default router;
"@

    # Generate the $folder.controller.ts file
    $controllerTsContent = @"
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../../utils/log4';
import * as service from './$folder.service';
import { handleResponse } from '../../../middleware/requestHandle';
"@

 $validationTsContent = @"
import { Schema } from 'express-validator';
"@

    # Ensure the folder exists before creating files
    If (!(Test-Path -Path $folder)) {
        New-Item -ItemType Directory -Path $folder
    }

    # Write the contents to files
    $indexTsContent | Out-File -FilePath "$folder/index.ts" -Encoding UTF8
    $controllerTsContent | Out-File -FilePath "$folder/$folder.controller.ts" -Encoding UTF8
		New-Item -Path "$folder/$folder.service.ts" -ItemType File
		$validationTsContent | Out-File -FilePath "$folder/$folder.validation.ts" -Encoding UTF8

}