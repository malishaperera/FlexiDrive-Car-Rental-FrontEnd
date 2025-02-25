export class CustomerModel {
    customerId: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    nic: string;
    nicPhoto1: string | null;
    nicPhoto2: string | null;
    driverLicenseNum: string | null;
    driverLicensePhoto: string | null;

    constructor(
        customerId: string,
        name: string,
        email: string,
        password: string,
        phone: string,
        address: string,
        nic: string,
        nicPhoto1: string | null,
        nicPhoto2: string | null,
        driverLicenseNum: string | null,
        driverLicensePhoto: string | null
    ) {
        this.customerId = customerId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.nic = nic;
        this.nicPhoto1 = nicPhoto1;
        this.nicPhoto2 = nicPhoto2;
        this.driverLicenseNum = driverLicenseNum;
        this.driverLicensePhoto = driverLicensePhoto;
    }
}
