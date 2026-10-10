# Email Trigger Configuration Guide

## Overview
This document explains how to configure and use the email trigger functionality in the Vellammal Campus Connect application.

## Database Configuration

### H2 Database (Development)
The application uses H2 in-memory database for development:
- **Console URL**: http://localhost:8081/h2-console
- **JDBC URL**: jdbc:h2:mem:campusdb
- **Username**: sa
- **Password**: (empty)

### MySQL Database (Production)
To use MySQL in production, update `application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/campus_connect
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: your_username
    password: your_password
  jpa:
    database-platform: org.hibernate.dialect.MySQLDialect
```

## Email Configuration

### Gmail SMTP Setup

1. **Enable 2-Factor Authentication** on your Gmail account

2. **Generate App Password**:
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Go to App Passwords
   - Generate a new app password for "Mail"

3. **Set Environment Variables**:
   ```bash
   # Windows PowerShell
   $env:EMAIL_USERNAME="your-email@gmail.com"
  $env:EMAIL_APP_PASSWORD="your-app-password"
   
   # Linux/Mac
   export EMAIL_USERNAME="your-email@gmail.com"
  export EMAIL_APP_PASSWORD="your-app-password"
   ```

4. **Or update application.yml directly** (not recommended for production):
   ```yaml
   spring:
     mail:
       username: your-email@gmail.com
       password: your-app-password
   ```

### Other SMTP Providers

For other providers, update in `application.yml`:

```yaml
spring:
  mail:
    host: smtp.yourprovider.com
    port: 587
    username: your-username
    password: your-password
```

## Database Tables

### email_triggers
Stores email trigger configurations:
- `id`: Primary key
- `trigger_name`: Descriptive name
- `event_type`: Event identifier (e.g., "NEW_NOTIFICATION", "ASSIGNMENT_DUE")
- `recipient`: Email or role
- `subject`: Email subject
- `template`: Email body template (supports HTML)
- `is_active`: Enable/disable trigger
- `created_at`, `updated_at`: Timestamps

### email_logs
Stores email sending history:
- `id`: Primary key
- `recipient`: Recipient email
- `subject`: Email subject
- `body`: Email content
- `status`: SENT, FAILED, or PENDING
- `error_message`: Error details if failed
- `trigger_id`: Foreign key to email_triggers
- `sent_at`: When email was sent
- `created_at`: Log creation time

## API Endpoints

### Get Active Email Triggers
```http
GET /api/email/triggers
```

### Get Email Logs
```http
GET /api/email/logs?status=SENT
```

### Send Test Email
```http
POST /api/email/send-test
Content-Type: application/json

{
  "recipient": "user@example.com",
  "subject": "Test Email",
  "body": "<h1>Hello</h1><p>This is a test.</p>"
}
```

### Trigger Email by Event
```http
POST /api/email/trigger
Content-Type: application/json

{
  "eventType": "NEW_NOTIFICATION",
  "recipient": "student@example.com"
}
```

## Usage Example

### 1. Create Email Trigger (via database or admin API)
```sql
INSERT INTO email_triggers (trigger_name, event_type, recipient, subject, template, is_active, created_at, updated_at)
VALUES (
  'New Notification Email',
  'NEW_NOTIFICATION',
  'student@example.com',
  'New Notification from Campus Connect',
  '<h2>New Notification</h2><p>You have a new notification: %s</p>',
  true,
  NOW(),
  NOW()
);
```

### 2. Trigger Email from Code
```java
@Autowired
private EmailService emailService;

// Send email based on event type
emailService.sendEmailByEvent("NEW_NOTIFICATION", "student@example.com", "Your assignment is due tomorrow");

// Or send custom email
emailService.sendEmail(
    "student@example.com",
    "Custom Subject",
    "<h1>Custom HTML Body</h1>",
    null
);
```

## Testing

1. **Start the application**
2. **Access H2 Console**: http://localhost:8081/h2-console
3. **Insert test trigger** using SQL above
4. **Send test email** via Postman or curl:
   ```bash
   curl -X POST http://localhost:8081/api/email/send-test \
     -H "Content-Type: application/json" \
     -d '{"recipient":"your-email@gmail.com","subject":"Test","body":"<h1>Test</h1>"}'
   ```

## Troubleshooting

### Email not sending
- Check EMAIL_USERNAME and EMAIL_APP_PASSWORD environment variables
- Verify Gmail App Password is correct
- Check firewall settings for port 587
- Review email logs: `http://localhost:8081/api/email/logs?status=FAILED`

### Database issues
- Verify database connection in application.yml
- Check H2 console if tables are created
- Review application logs for JPA/Hibernate errors

## Production Considerations

1. **Use environment variables** for sensitive data
2. **Switch to persistent database** (MySQL/PostgreSQL)
3. **Implement email queue** for better performance
4. **Add retry logic** for failed emails
5. **Monitor email logs** regularly
6. **Set up email templates** in database
7. **Implement rate limiting** to prevent spam
