curl https://api.magicbell.io/notifications \
  --request POST \
  --header 'X-MAGICBELL-API-KEY: 8b2ce7b8e6f6e63c19ef8266c82cf91bc3aaada0' \
  --header 'X-MAGICBELL-API-SECRET: 5db2d3607e2df93b9723ef75a96457b159dd7b2a' \
  --data '{
    "notification": {    
        "title": "Task assigned to you: Upgrade to Startup plan",
        "content": "Hello, can you upgrade us to the Startup plan. Thank you.",
        "category": "new_message",
        "action_url": "https://magicbell.io/pricing",
        "recipients": [{
            "email": "gauravtiwari5050@gmail.com"
        }]
    }
  }'