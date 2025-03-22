export interface CustomerWithoutPassword {
    customerId: string;
    name: string;
    email: string;
    phone: string;
    nic: string | null;
    nicPhoto1: string | null;
    nicPhoto2: string | null;
    driverLicenseNum: string | null;
    driverLicensePhoto: string | null;
}