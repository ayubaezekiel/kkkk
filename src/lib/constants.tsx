import { useProfile } from "@/hooks/useUser";
import { Cog, User2 } from "lucide-react";

export const hospital_name = location.hostname;
export const hospital_logo = `https://brightedge.dev/${location.host}.jpg`;

export const ServicesRoutes = () => {
  const { profile_data, isProfilePending } = useProfile();
  if (!profile_data && isProfilePending) return [];

  return [
    {
      route: "/dashboard/users/",
      name: "Users",
      icon: User2,
      perm: true, //profile_data?.is_super_user || profile_data?.has_access_to_config,
    },
    {
      route: "/dashboard/settings/",
      name: "Settings",
      icon: Cog,
      perm: true,
    },
  ];
};

export const config_services_routes = [
  {
    route: "/dashboard/config/admissions/",
    name: "Admissions",
    desc: "Manage Admissions, Create Hospital's Wards, Beds and Fluid Routes",
  },
  {
    route: "/dashboard/config/antenatal/",
    name: "Antenatal",
    desc: "Manage Antenatal Packages",
  },
  {
    route: "/dashboard/config/billing/",
    name: "Billing",
    desc: "Check Billing Analytics and Payment History",
  },
  {
    route: "/dashboard/config/consultation/",
    name: "Consultations",
    desc: "Create vitals and Consultation Templates",
  },
  {
    route: "/dashboard/config/lab/",
    name: "Laboratory",
    desc: "Manange Labs, Create Lab Test, Categories, and Test Parameters ",
  },
  {
    route: "/dashboard/config/procedures/",
    name: "Medical Procedures",
    desc: "Manange Procedures, Create Medical Procedures, Categories, Anaesthesia Type and Theatre ",
  },
  {
    route: "/dashboard/config/reports/",
    name: "Medical Reports",
    desc: "Check Reports History",
  },
  {
    route: "/dashboard/config/radiology/",
    name: "Radiology",
    desc: "Manange Radiology, Create Imaging, Imaging Categories, Report Templates",
  },
  {
    route: "/dashboard/config/store/",
    name: "Store",
    desc: "Manange Pharmacy & Consumables, Manage Drug Baches & Inventory ",
  },
  {
    route: "/dashboard/config/service_points/",
    name: "Service Points",
    desc: "Manange all service points and their locations",
  },
];
