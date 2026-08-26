# Email Site Admin when Error Status Codes are Given to Users

## Outcome

- Reduce time to from weeks to hours
- Tracability for error status codes

## Stakeholders

### Users

- Hiring managers and software engineers
- Target users are UK based
- Catastrophic loss of opportunity if site is not served

### Admin

- Willing to use comms:
    - Telegram
    - Email
    - Whatsapp
- Sole owner of site
- Wants to answer metrics queries from other engineers

## Requirements

- Report sent to Admin when error status are present
- Report sent daily at same time
- Report states severity of issue
- Report does not give traige or diagnosis information
- Provide enough access to logs to allow troubleshooting

## Decisions

- Comms over email
