
### Run on Google cloud run

[![Run on Google Cloud](https://storage.googleapis.com/cloudrun/button.svg)](https://console.cloud.google.com/cloudshell/editor?shellonly=true&cloudshell_image=gcr.io/cloudrun/button&cloudshell_git_repo=https://github.com/Appziaa-Softlabs-RP/recurit-ai-backend.git)

# Welcome to Rewards Auth Project starter template

## Main Server's compulsory fields required for authentication

- `company_id`
- `salutation` (nullable)
- `first_name` (required)
- `last_name` (nullable)
- `email` (nullable)
- `phone` (nullable)
- `image` (nullable)
- `password` (nullable)

### Note: At least one is required from phone or email for authentication. In case of no password otp method will be used for authentication

## Auth Flow

- `User Verification` Register verification will be done in this project. And after verification otp_id and other details will be sent on the main server for user registration.
