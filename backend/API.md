#  Traideas Contact Management System — API Documentation

##  Authentication

### POST /api/register

Registers a new user and creates a profile + initial contacts.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "123456",
  "firstName": "John",
  "lastName": "Doe",
  "otherEmails": ["john.alt@example.com"],
  "initialContacts": ["1234567890", "0987654321"]
}
