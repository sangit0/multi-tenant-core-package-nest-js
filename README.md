## Description
### This package is for controlling multi-tenant services and database using NEST.JS.

Suppose you have created reusable micro services for authentication, data manipulation in the DB (insert, update, delete), PDF generate, chart generate, GraphQL etc. This particular module can help to build these services.

This service will automatically handle DB connection and connect to the respective DB depending on the requests origin from tenant registration table.

Example TenantRegistration table 

```
{
  "origin": "test.test.com",
  "jwtSecret": "Xfafhjhsdfjh23232832732hsdfa",
  "jwtSecretRefresh": "aCfafhjhsdfjh23232832732hsdfa",
  "dbUri": "mongodb://localhost/service1",
  "referenceOrigin": "test.test.com",
  "isActive": true,
  "tenantId": "874A6A2B-F0F5-43EB-A458-47C2C1A21231",
  "baseUrl": "test.test.com",
  "accountActivation": false,
  "accountActivationExpires": 3
}
```

#### If requests comes from 

  * ServiceA (domain1) -> connect to  DB1  
  * ServiceA (domain2) -> connect to  DB2
  * ServiceC (domain3) -> connect to  DB3

  * ServiceB (domain1) -> connect to  DB1  
  * ServiceB (domain2) -> connect to  DB2
  * ServiceC (domain3) -> connect to  DB3
## Features
 1. Tenant management 
 2. Row level and column level permission management while using repository provided by this package to insert, update and delete data.
 3. Origin/Domain based DB connection controlling
 4. Global token service for refreshing , signing and deleting token from any service
 5. Role management
 6. Dynamic role management
 7. Decorator for Get Tenant information (@Tenant), Get User Information (@GetUser), Get Roles (@Roles)
 8. Will create below columns while inserting and deleting with repository abstract service and register modal with this service "RegisterModelsProviders". 

    ``rolesAllowedToEdit?: string[];
    rolesAllowedToDelete?: string[]
    rolesAllowedToAdd?: string[];
    rolesAllowedToRead?: string[];
    isMarkedToDelete?: boolean;``

9. By default it supports soft delete.    

## More Information and auth service using this package is coming soon.
## Support

Multi-tenant module

## Stay in touch

- Author - Sangit

