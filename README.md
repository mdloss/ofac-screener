# ofac-screener

OFAC Screener is a simple utility that takes user inputs and determines if if a given set of personal data matches individuals in the OFAC screening database.

# installation
```
npm i
npm run start
```

Navigate to [localhost:4200](http://localhost:4200) to browse application.

# usage

Provide all of Full Name, Date of Birth, and Country:

![image](https://github.com/user-attachments/assets/5fabc9fa-3d23-4080-81a3-86c2faefaf80)

Any matches on the OFAC data set will be noted, per field:

![image](https://github.com/user-attachments/assets/7ecd79d7-ba26-4b75-9cf3-a63446cc876c)

User inputs that do not match any OFAC data parameters will have a "Clear" status:

![image](https://github.com/user-attachments/assets/42162479-06ab-400a-bf15-069256d13f83)
