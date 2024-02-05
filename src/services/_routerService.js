import Widgets from "Routes/widgets";
import AdvanceUIComponents from "Routes/advance-ui-components";
import ChartsComponents from "Routes/charts";
import Components from "Routes/components";
import Icons from "Routes/icons";
import Dashboard from "Routes/dashboard";
import Crm from "Routes/crm";
import Maintenance from "../container/Maintenance";
import NewListSupplier from "../routes/Supplier/index";
import NewListBrand from "../routes/Brand/index";
import NewListCoreItems from "../routes/CoreItem/index";
import NewListAttributesTypes from "../routes/AttributesTypes/index";
import NewListAttributes from "../routes/Attributes/index";
import NewListWidth from "../routes/width/index";
import NewListFabricInward from "../routes/FabricInward/index";
import NewListFabricInwardMaterials from "../routes/FabricInwardMaterials/index";
import NewListFabricInwardMaterialsSelection from "../routes/FabricInwardMaterialsSelection/index";
import FabricInwardsSummary from "../routes/Reports/FabricInwards/index";
import FabricInwardsStock from "../routes/Reports/FabricStocks/index";
import UserProfile from "../routes/userProfile/index";
import Supplier from "../routes/Reports/Supplier/index";
import Retailer from "../routes/Reports/Retailer/index";
import CoreItem from "../routes/Reports/CoreItem/index";
import NewListShrinkage from "../routes/Shrinkage/index";
import NewListStyle from "../routes/Style/index";
import NewListFactory from "../routes/Factory/index";
import NewListColor from "../routes/Color/index";
import NewListDesign from "../routes/Design/index";
import NewListType from "../routes/Types/index";
import NewListOther from "../routes/Other/index";
import Filter from "../routes/Filter/index";
import NewListWorkOrder from "../routes/WorkOrder/index";
import NewListColorTheme from "../routes/ColorTheme/index";
import NewListOccasion from "../routes/Occasion/index";
import NewListRatio from "../routes/Ratio/index";
import NewListRatioHalf from "../routes/RatioHalf/index";
import NewListWorkOrderStock from "../routes/WorkOrderStock/index";
import NewListCustomer from "../routes/Customer/index";
import NewListWorkOrderReceive from "../routes/WorkOrderReceive/index";
import NewListWorkOrderSales from "../routes/WorkOrderSales/index";
import NewListWorkOrderFinalStock from "../routes/WorkOrderFinalStock/index";

import {
    AsyncAboutUsComponent,


} from "Components/AsyncComponent/AsyncComponent";

export default [{
        path: "dashboard",
        component: Dashboard,
    },
    {
        path: "crm",
        component: Crm,
    },
    {
        path: "widgets",
        component: Widgets,
    },
    {
        path: "icons",
        component: Icons,
    },
    {
        path: "about-us",
        component: AsyncAboutUsComponent,
    },
    {
        path: "charts",
        component: ChartsComponents,
    },
    {
        path: "ui-components",
        component: Components,
    },
    {
        path: "advanced-component",
        component: AdvanceUIComponents,
    },
    {
        path: "maintenance",
        component: Maintenance,

    },
    {
        path: "supplier",
        component: NewListSupplier,
    },
    {
        path: "brands",
        component:NewListBrand,
    },
    {
        path: "core-item",
        component:NewListCoreItems,
    },{
        path:"attributes-types",
        component:NewListAttributesTypes,
    },
    {
        path:"width",
        component:NewListWidth,
    },
    {
        path: "attributes",
        component:NewListAttributes,
    },
    {
        path: "fabric-inwards",
        component:NewListFabricInward,
    },
    {
        path: "fabric-inwards-material",
        component:NewListFabricInwardMaterials,
    },
    {
        path: "fabric-inwards-material-selection",
        component:NewListFabricInwardMaterialsSelection,
    },
    {
        path: "fabric-inwards-report",
        component: FabricInwardsSummary,
    },
    {
        path: "fabric-inwards-stock",
        component: FabricInwardsStock,
    },
    {
        path: "users",
        component: UserProfile,
    },
    {
        path: "supplier-report",
        component: Supplier,
    },
    {
        path: "core-item-report",
        component: CoreItem,
    },
    {
        path: "shrinkage",
        component: NewListShrinkage,
    },
    {
        path: "style",
        component: NewListStyle,
    },
    {
        path: "factory",
        component: NewListFactory,
    },
    {
        path: "color",
        component: NewListColor,
    },
    {
        path: "color-theme",
        component: NewListColorTheme,
    },
    {
        path: "occasion",
        component: NewListOccasion,
    },
    {
        path: "design",
        component: NewListDesign,
    },
    {
        path: "types",
        component: NewListType,
    },
    {
        path: "other",
        component: NewListOther,
    },
    {
        path: "filter",
        component: Filter,
    },
    {
        path: "work-order",
        component: NewListWorkOrder,
    },
    {
        path: "ratio",
        component: NewListRatio,
    },
    {
        path: "ratio-half",
        component: NewListRatioHalf,
    },
    {
        path: "work-order-stock",
        component: NewListWorkOrderStock,
    },
    {
        path: "retailers",
        component: NewListCustomer,
    },
    {
        path: "work-order-receive",
        component: NewListWorkOrderReceive,
    },
    {
        path: "work-order-sales",
        component: NewListWorkOrderSales,
    },
    {
        path: "work-order-final-stocks",
        component: NewListWorkOrderFinalStock,
    },
    {
        path: "retailer-report",
        component: Retailer,
    },
];