import * as z from "zod";

const commonStringMinLength3 = z.string().min(3, "Must be at least 3 characters");
const commonEmail = z.string().email("Invalid email format");
const commonNumber = z.coerce.number();

export const basicInfoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  firstname: commonStringMinLength3,
  lastname: commonStringMinLength3,
  emp_id: commonStringMinLength3.min(3, "Employee ID must be at least 3 characters"),
  date_of_joining: z.date().max(new Date(), "Date of Joining cannot be in the future"),
  work_email: commonEmail,
  contactno: commonNumber.min(1000000000, "Invalid Phone Number format").max(9999999999, "Invalid Phone Number format"),
  gender: z.string().min(1, "Please select Gender"),
  work_location: z.string().min(1, "Work location is required"),
  designation: z.string().min(1, "Designation is required"),
  department: z.string().min(1, "Department is required"),
  // reporting_manager: z.string().min(1, "Reporting Manager is required"),
  is_director: z.boolean().optional(),
  is_portal_access: z.boolean().optional(),
});

export const salaryInfoSchema = z.object({
  salary_template: z.string().min(1, "Please select Salary Template"),
  annual_ctc: commonNumber,
  basic: z.coerce.number().min(20, "Basic must be at least 20%").max(100, "Basic cannot be more than 100%"),
  hra: z.coerce.number().max(100, "Basic cannot be more than 100%").optional(),
  conveyance_allowance: z.coerce.number().optional(),
});

export const personalInfoSchema = z.object({
  personal_email: commonEmail,
  personal_mobile_number: commonNumber.min(1000000000, "Invalid Phone Number format").max(9999999999, "Invalid Phone Number format"),
  blood_group: z.string().min(1, "Please select a Blood Group"),
  marital_status: z.string().min(1, "Please select a Marital Status"),
  emergency_contact_person: commonStringMinLength3,
  emergency_contact_number: commonNumber.min(1000000000, "Invalid Phone Number format").max(9999999999, "Invalid Phone Number format"),
  father_name: commonStringMinLength3,
  date_of_birth: z.date().max(new Date(), "Date of Birth cannot be in the future"),
  pan: z.string().regex(
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    "Please enter a valid PAN Card Number"
  ),
  employee_image: z.any(),
  residential_address: commonStringMinLength3,
  personal_address_1: z.string().min(3, "Please enter Address Line 1 (min. 3 characters)"),
  personal_address_2: z.string().optional(),
})


export const bankInfoSchema = z.object({
  transfer_type: z.enum(["bank_transfer", "cheque", "cash"]),
})

export const accountDetailsSchema = z.object({
  account_holder_name: commonStringMinLength3,
  bank_name: commonStringMinLength3,
  account_number: z.string().min(10, "Please enter a valid Account Number (min. 10 digits)"),
  reenter_account_number: z.string()
    .min(10, "Please re-enter Account Number (min. 10 digits)"),
  ifsc_code: z.string().min(6, "Please enter a valid IFSC Code (min. 6 digits)"),
  account_type: z.string().min(1, "Please select Account Type")
}).refine(data => data.account_number === data.reenter_account_number, {
  message: "Account Number does not match",
  path: ["reenter_account_number"],
});

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
export type SalaryFormValues = z.infer<typeof salaryInfoSchema>;
export type BankFormValues = z.infer<typeof bankInfoSchema>;
export type AccountDetailsFormValues = z.infer<typeof accountDetailsSchema>;
