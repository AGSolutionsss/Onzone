export default {
    category1: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        {
            menu_title: "Fabric",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes: [
                {
                    menu_title: "Fabric Inwards",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/fabric-inwards",
                    child_routes: null,
                },
                {
                    menu_title: "Fabric Stock",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/fabric-inwards-material",
                    child_routes: null,
                },
                {
                    menu_title: "Selected Fabric",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/fabric-inwards-material-selection",
                    child_routes: null,
                },
                {
                    menu_title: "Purchase Fabric",
                    menu_icon: "zmdi zmdi-comment-text-alt",
                    path: "/app/filter",
                    new_item: false,
                    child_routes: null
                },
            ],
        },
        {
            menu_title: "Work Order",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes: [
                {
                    menu_title: "Work Order",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/work-order",
                    child_routes: null,
                },
                /*{
                    menu_title: "Work Order Stock",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/work-order-stock",
                    child_routes: null,
                },*/
            ],
        },
        {
            menu_title: "Reports",
            menu_icon: "zmdi zmdi-account",
            path: "",
            child_routes:[
                {
                    menu_title: "Supplier",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/supplier-report",
                    child_routes: null,
                },
                {
                    menu_title: "CoreItem",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/core-item-report",
                    child_routes: null,
                },
                {
                    menu_title: "Fabric Inwards",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/fabric-inwards-report",
                    child_routes: null,
                },
                {
                    menu_title: "Fabric Stocks",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/fabric-inwards-stock",
                    child_routes: null,
                },
                
            ]
        },
    ],
    category7: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        {
            menu_title: "Master",
            menu_icon: "zmdi zmdi-account",
            path: "",
            child_routes: [
                {
                    menu_title: "Supplier",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/supplier",
                    child_routes: null,
                },
                {
                    menu_title: "Brand",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/brands",
                    child_routes: null,
                },
                
                {
                    menu_title: "Core Item",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/core-item",
                    child_routes: null,
                },
                {
                    menu_title: "Width",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/width",
                    child_routes: null,
                },
                {
                    menu_title: "Shrinkage",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/shrinkage",
                    child_routes: null,
                },
                {
                    menu_title: "Style",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/style",
                    child_routes: null,
                },
                {
                    menu_title: "Factory",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/factory",
                    child_routes: null,
                },
                {
                    menu_title: "Retailers",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/retailers",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Attributes",
            menu_icon: "zmdi zmdi-accounts",
            path: "",
            child_routes: [
                {
                    path: "/app/color",
                    menu_title: "Color"
                },
                {
                    path: "/app/color-theme",
                    menu_title: "Color Theme"
                },
                {
                    path: "/app/design",
                    menu_title: "Design"
                },
                {
                    path: "/app/types",
                    menu_title: "Type"
                }, 
                {
                    path: "/app/occasion",
                    menu_title: "Occasion"
                },  
                {
                    path: "/app/ratio",
                    menu_title: "Ratio"
                }, 
                {
                    path: "/app/ratio-half",
                    menu_title: "Ratio Half"
                },     
            ],
        },

        {
            menu_title: "Fabric",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes: [
                {
                    menu_title: "Fabric Inwards",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/fabric-inwards",
                    child_routes: null,
                },
                {
                    menu_title: "Fabric Stock",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/fabric-inwards-material",
                    child_routes: null,
                },
                {
                    menu_title: "Selected Fabric",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/fabric-inwards-material-selection",
                    child_routes: null,
                },
                {
                    menu_title: "Purchase Fabric",
                    menu_icon: "zmdi zmdi-comment-text-alt",
                    path: "/app/filter",
                    new_item: false,
                    child_routes: null
                },
                
            ],
        },
        {
            menu_title: "Work Order",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes: [
                {
                    menu_title: "Work Order",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/work-order",
                    child_routes: null,
                },
                /*{
                    menu_title: "Work Order Stock",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/work-order-stock",
                    child_routes: null,
                },*/
            ],
        },
        {
            menu_title: "Work Order Receive",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes: [
                {
                    menu_title: "Work Order Receive",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/work-order-receive",
                    child_routes: null,
                },
                {
                    menu_title: "Work Order Sales",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/work-order-sales",
                    child_routes: null,
                },
                {
                    menu_title: "Work Order Final Stock",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/work-order-final-stocks",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Reports",
            menu_icon: "zmdi zmdi-account",
            path: "",
            child_routes:[
                {
                    menu_title: "Supplier",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/supplier-report",
                    child_routes: null,
                },
                {
                    menu_title: "Retailer",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/retailer-report",
                    child_routes: null,
                },
                {
                    menu_title: "CoreItem",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/core-item-report",
                    child_routes: null,
                },
                {
                    menu_title: "Fabric Inwards",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/fabric-inwards-report",
                    child_routes: null,
                },
                {
                    menu_title: "Fabric Stocks",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/fabric-inwards-stock",
                    child_routes: null,
                },
                
            ]
        },
        
        
    ],
    category8: [
        

    ],
    category3: [

    ],
    category4: [

    ],
    category5: [

    ],
    category6: [

    ],
};