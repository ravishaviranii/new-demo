import * as Yup from "yup";
const numeric = /^[0-9]+$/;
const decimal = /^[0-9]+(\.[0-9]+)?$/;
const email =
  /^[a-z0-9]([a-z0-9_\-\.]*)@([a-z0-9_\-\.]*)(\.[a-z]{2,4}(\.[a-z]{2}){0,2})$/i;

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("email is required")
    .matches(email, "Please check your email ")
    .nullable(),

  password: Yup.string().required("Password is required").nullable(),
});

export const campaignProductsSchema = Yup.object().shape({
  dailyBudget: Yup.string().matches(numeric, "Enter valid budget").nullable(),
});

export const campaignBrandsSchema = Yup.object().shape({
  campaignName: Yup.string().required("Campaign name is required").nullable(),
  dailyBudget: Yup.string()
    .required("Daily budget is required")
    .matches(numeric, "Enter valid budget")
    .test(
      "minimumValue",
      "Minimum value for daily budget is 100",
      (value) => Number(value) >= 100
    )
    .nullable(),

  budgetType: Yup.string().required("Budget type is required").nullable(),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .when("budgetType", {
      is: "LIFETIME",
      then: () => Yup.date().required("End date is required"),
    })
    .min(Yup.ref("startDate"), "End date should be greater than the start date")
    .nullable(),
});

export const campaignDisplaySchema = Yup.object().shape({
  campaignName: Yup.string().required("Campaign name is required").nullable(),
  dailyBudget: Yup.string()
    .required("Daily budget is required")
    .matches(numeric, "Enter valid budget")
    .nullable(),

  costType: Yup.string().required("Cost type is required").nullable(),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date should be greater than the start date")
    .nullable(),
});

export const campaignBrandsEditSchema = Yup.object().shape({
  campaignName: Yup.string().required("Campaign name is required").nullable(),
  dailyBudget: Yup.string()
    .required("Daily budget is required")
    .matches(numeric, "Enter valid budget")
    .test(
      "minimumValue",
      "Minimum value for daily budget is 100",
      (value) => Number(value) >= 100
    )
    .nullable(),
  budgetType: Yup.string().required("Budget type is required").nullable(),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .when("budgetType", {
      is: "LIFETIME",
      then: () => Yup.date().required("End date is required"),
    })
    .min(Yup.ref("startDate"), "End date should be greater than the start date")
    .nullable(),
  status: Yup.string().required("Status is required").nullable(),
});

export const campaignProductsEditSchema = Yup.object().shape({
  campaignName: Yup.string().required("Campaign name is required").nullable(),
  dailyBudget: Yup.string()
    .required("Daily budget is required")
    .matches(numeric, "Enter valid budget")
    .nullable(),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date should be greater than the start date")
    .nullable(),
  target: Yup.string().required("Targeting is required").nullable(),
  status: Yup.string().required("Status is required").nullable(),
});

export const campaignDisplayEditSchema = Yup.object().shape({
  campaignName: Yup.string().required("Campaign name is required").nullable(),
  dailyBudget: Yup.string()
    .required("Daily budget is required")
    .matches(numeric, "Enter valid budget")
    .nullable(),
  costType: Yup.string().required("Cost type is required").nullable(),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date should be greater than the start date")
    .nullable(),
  status: Yup.string().required("Status is required").nullable(),
});

export const addScheduleSchema = Yup.object().shape({
  scheduleName: Yup.string().required("Schedule Name is required"),
});

export const addTimeSchema = Yup.object().shape({
  dayName: Yup.mixed().required("Please select a day"),
  startTime: Yup.string().required("Please select a start time"),
  endTime: Yup.string().required("Please select a end time"),
});
export const adGroupSPSchema = Yup.object().shape({
  adGroupName: Yup.string().required("AdGroup name is required").nullable(),
  campaign: Yup.string().required("Campaign is required").nullable(),
  defaultBid: Yup.string()
    .matches(decimal, "Enter valid bid")
    .required("Bid is required")
    .nullable(),
  status: Yup.string().required("Status is required").nullable(),
});

export const adGroupSBSchema = Yup.object().shape({
  adGroupName: Yup.string().required("AdGroup name is required").nullable(),
  campaign: Yup.string().required("Campaign is required").nullable(),
  status: Yup.string().required("Status is required").nullable(),
});

export const adGroupSDSchema = Yup.object().shape({
  adGroupName: Yup.string().required("AdGroup name is required").nullable(),
  campaign: Yup.string().required("Campaign is required").nullable(),
  status: Yup.string().required("Status is required").nullable(),
});
export const addKeywordSPschema = Yup.object().shape({
  status: Yup.string().required("Status is required").nullable(),
  bid: Yup.string()
    .matches(decimal, "Enter valid bid")
    .required("Bid is required")
    .nullable(),
  matchType: Yup.string().required("MatchType is required"),
  adGroupName: Yup.string().required("AdGroup name is required").nullable(),
  keywordName: Yup.string().required("keywordName is required"),
});

export const addKeywordSBschema = Yup.object().shape({
  bid: Yup.string().matches(decimal, "Enter valid bid").nullable(),
  matchType: Yup.string().required("MatchType is required"),
  campaign: Yup.string().required("Campaign is required").nullable(),
  adGroupName: Yup.string().required("AdGroup name is required").nullable(),
  keywordName: Yup.string().required("keywordName is required"),
});
export const UpdateKeywordSBschema = Yup.object().shape({
  status: Yup.string().required("Status is required").nullable(),
  bid: Yup.string()
    .matches(decimal, "Enter valid bid")

    .nullable(),
  matchType: Yup.string().required("MatchType is required"),
  campaign: Yup.string().required("Campaign is required").nullable(),
  adGroupName: Yup.string().required("AdGroup name is required").nullable(),
  keywordName: Yup.string().required("keywordName is required"),
  type: Yup.string().required("Type is required"),
});

export const AddDirectAccessSchema = Yup.object().shape({
  vendorName: Yup.string().required("Vendor name is required"),
  package: Yup.string().required("Package is required"),
  packageType: Yup.string().required("Package type is required"),
  amount: Yup.string().required("Amount is required"),
  endDate: Yup.string().required("Due date is required"),
});

export const changePWDSchema = Yup.object().shape({
  password: Yup.string()
      .required('New Password is required')
      .matches(/(?=^.{8,}$).*$/, "Password must contain at least 8 characters")
      .matches(/(?=.*\d).*$/, "Password must contain at least 1 digit")
      .matches(/(?=.*[!@#$%^&*]+).*$/, "Password must contain at least 1 special character")
      .matches(/(?![.\n]).*$/, "Password format not proper")
      .matches(/(?=.*[A-Z]).*$/, "Password must contain at least 1 uppercase letter")
      .matches(/(?=.*[a-z]).*$/, "Password must contain at least 1 lowercase letter"),

  confirmPwd: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'New password and confirm password should be same'),

  oldpwd: Yup.string()
      .required('Old Password is required')

})
